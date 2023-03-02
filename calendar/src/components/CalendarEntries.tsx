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

  useEffect(() => {
    async function loadData() {
      let data = await getCalendarEntries();
      setEvents(data);
    }
    loadData();
  }, []);

  const deleteEvent = (id: number) => {
    setEvents(events.filter((event) => event.id !== id));
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

  return (
    <div>
      {events.map((event) => {
        if (event.date.month === month) {
          return (
            <div className="calendarEntries" key={event.id}>
              <p>
                {event.date.dayOfWeek} {event.date.day}
              </p>

              <InputField
                inputValue={event.title}
                changeEvent={(e) => changeTitle(event.id, e)}
              ></InputField>

              <Button onPress={() => deleteEvent(event.id)}>delete</Button>
            </div>
          );
        }
      })}
    </div>
  );
}
