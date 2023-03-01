import express from "express";
import fs from "fs";
const eventsRouter = express.Router();

eventsRouter.get("/", (req, res) => {
  let events = JSON.parse(fs.readFileSync("./data/events.json"));
  let categories = JSON.parse(fs.readFileSync("./data/categories.json"));

  if (req.query["from"] !== undefined) {
    let date;
    if (req.query["from"] === "now") {
      const dateOfToday = new Date();
      let dayOfToday =
        dateOfToday.getDate() < 10
          ? `0${dateOfToday.getDate()}`
          : `${dateOfToday.getDate()}`;
      let monthOfToday =
        dateOfToday.getMonth() + 1 < 10
          ? `0${dateOfToday.getMonth() + 1}`
          : `${dateOfToday.getMonth() + 1}`;
      date = `${dateOfToday.getFullYear()}-${monthOfToday}-${dayOfToday}`;
    } else {
      date = req.query["from"];
    }
    events = events.filter((event) => {
      let dayOfEvent;
      let monthOfEvent;
      dayOfEvent =
        event.date.day < 10 ? `0${event.date.day}` : `${event.date.day}`;
      monthOfEvent =
        event.date.month < 10 ? `0${event.date.month}` : `${event.date.month}`;

      let dateOfEvent = `${event.date.year}-${monthOfEvent}-${dayOfEvent}`;
      if (dateOfEvent >= date) {
        return event;
      }
    });
  }

  if (req.query["to"] !== undefined) {
    let date = req.query["to"];
    console.log(req.query["to"]);
    events = events.filter((event) => {
      let dayOfEvent;
      let monthOfEvent;
      dayOfEvent =
        event.date.day < 10 ? `0${event.date.day}` : `${event.date.day}`;
      monthOfEvent =
        event.date.month < 10 ? `0${event.date.month}` : `${event.date.month}`;

      let dateOfEvent = `${event.date.year}-${monthOfEvent}-${dayOfEvent}`;
      if (dateOfEvent <= date) {
        return event;
      }
    });
  }

  if (req.query["category"] !== undefined) {
    const filteredCategory = categories.find(
      (category) => category.name === req.query["category"]
    );
    const id = filteredCategory.id;
    events = events.filter(
      (event) => event.categoryID.toString() === id.toString()
    );
  }

  if (req.query["sortDates"] !== undefined) {
    if (req.query["sortDates"] === "ascending") {
      events.sort((a, b) => {
        const dateA = new Date(
          a.date.year,
          a.date.month - 1,
          a.date.day,
          a.date.hour,
          a.date.minute
        );
        const dateB = new Date(
          b.date.year,
          b.date.month - 1,
          b.date.day,
          b.date.hour,
          b.date.minute
        );
        return dateA - dateB;
      });
    }
  }

  res.json(events);
});

eventsRouter.get("/:id", (req, res) => {
  const events = JSON.parse(fs.readFileSync("./data/events.json"));
  const eventId = events.find((event) => event.id.toString() === req.params.id);
  res.json(eventId);
});

eventsRouter.post("/", (req, res) => {
  const newEvent = req.body;
  let events = JSON.parse(fs.readFileSync("./data/events.json"));

  let maxId = 0;
  for (let event of events) {
    maxId = Math.max(maxId, event.id);
  }
  newEvent.id = maxId + 1;

  events.push(newEvent);
  fs.writeFileSync("./data/events.json", JSON.stringify(events));
  res.json({ status: "success" });
});

eventsRouter.put("/:id", (req, res) => {
  let id = Number(req.params.id);
  const newEvent = req.body;
  const events = JSON.parse(fs.readFileSync("./data/events.json"));
  const newEventIndex = events.findIndex((event) => event.id === id);
  const eventId = events[newEventIndex].id;
  events[newEventIndex] = { ...newEvent, id: eventId };
  fs.writeFileSync("./data/events.json", JSON.stringify(events));
});

eventsRouter.patch("/:id", (req, res) => {
  let id = Number(req.params.id);
  let newData = req.body;
  const events = JSON.parse(fs.readFileSync("./data/events.json"));
  let newEvents = events.map((event) =>
    event.id === id ? { ...event, ...newData } : event
  );

  fs.writeFileSync("./data/events.json", JSON.stringify(newEvents));
  res.json(newEvents);
});

eventsRouter.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const events = JSON.parse(fs.readFileSync("./data/events.json"));
  const filteredEvents = events.filter((event) => event.id !== id);
  fs.writeFileSync("./data/events.json", JSON.stringify(filteredEvents));
  res.json(filteredEvents);
});

export { eventsRouter };
