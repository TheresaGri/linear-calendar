import { useEffect, useState } from "react";
type calendarProps = {
  month: number;
};

type Event = {
  id: string;
  title: string;
  date: string;
};

export default function CalendarEntries({ month }: calendarProps) {
  async function getCalendarEntries(month: number): Promise<Event[]> {
    const url = `http://localhost:3000/api/events?from=2023-0${month}-01&to=2023-0${month}-31&sortDates=ascending`;
    const res = await fetch(url);
    const data = await res.json();
    return data;
  }

  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    getCalendarEntries(month).then((data) => {
      setEvents(data);
    });
  }, [month]); 

  return (
    <div>
      {events.map((event) => (
        <div key={event.id}>
          <h2>{event.title}</h2>
          <p>{event.date}</p>
        </div>      ))}
    </div>
  );
}
