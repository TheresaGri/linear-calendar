import { useEffect, useState } from "react";
import Button from "./Button";
import "./CalendarEntries.css";
import InputField from "./InputField";

type calendarProps = {
  month: number;
};

type Event = {
  id: number;
  title: string;
  date: number;
  categoryId: number;
};

export default function CalendarEntries({ month }: calendarProps) {
  async function getCalendarEntries(): Promise<Event[]> {
    const url = `http://localhost:3000/api/events?sortDates=ascending`;
    const res = await fetch(url);
    const data = await res.json();
    return data;
  }

  const [events, setEvents] = useState<Event[]>([]);
  const [categories, setCategories] = useState<Event[]>([]);

  useEffect(() => {
    async function loadData() {
      let data = await getCalendarEntries();
      setEvents(data);
    }
    loadData();
  }, []);

  async function getCategoryData() {
    const url = "http://localhost:3000/api/categories";
    const res = await fetch(url);
    const data = await res.json();
    return data;
  }

  useEffect(() => {
    async function loadCategoryData() {
      let dataCategory = await getCategoryData();
      setCategories(dataCategory);
    }
    loadCategoryData();
  }, []);

  const deleteEvent = (id: number) => {
    setEvents(events.filter((event) => event.id !== id));
    fetch(`http://localhost:3000/api/events/${id}`, {
      method: "DELETE",
      headers: { "Content-type": "application/json" },
    });
  };

  const updateEvent = (id: number) => {
    const filteredEvent = events.filter((event) => event.id === id);
    const newTitle = filteredEvent[0].title;
    console.log(filteredEvent);
    fetch(`http://localhost:3000/api/events/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ title: newTitle }),
      headers: { "Content-type": "application/json" },
    });
  };

  const changeTitle = (id: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const newEvents = events.map((event) => {
      if (event.id === id) {
        return {
          ...event,
          title: e.target.value,
        };
      } else {
        return event;
      }
    });
    setEvents(newEvents);
  };

  const changeColorOfEvent = (categoryId: number) => {
    const filteredCategory = categories.find(
      (category) => category.id === categoryId
    );
    let color;
    if (filteredCategory === undefined) {
      color = "white";
    } else {
      color = filteredCategory.color;
    }
    return color;
  };

  return (
    <div>
      {events.map((event) => {
        if (event.date.month === month) {
          return (
            <div
              className="calendarEntries"
              style={{
                backgroundColor: `${changeColorOfEvent(event.categoryID)}`,
              }}
              key={event.id}
            >
              <p>
                {event.date.dayOfWeek} {event.date.day}
              </p>
              <InputField
                style={{
                  backgroundColor: `${changeColorOfEvent(event.categoryID)}`,
                }}
                inputValue={event.title}
                changeEvent={(e) => changeTitle(event.id, e)}
              ></InputField>
              <Button onPress={() => updateEvent(event.id)}>edit</Button>
              <Button onPress={() => deleteEvent(event.id)}>delete</Button>
            </div>
          );
        }
      })}
    </div>
  );
}
