import express from "express";
import fs from "fs";
const eventsRouter = express.Router();

eventsRouter.get("/", (req, res) => {
  let events = JSON.parse(fs.readFileSync("./data/events.json"));
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



  res.json(events);
});

eventsRouter.get("/:id", (req, res) => {
  const events = JSON.parse(fs.readFileSync("./data/events.json"));
  const eventId = events.find((event) => event.id.toString() === req.params.id);
  res.json(eventId);
});

export { eventsRouter };
