import express from "express";
import fs from "fs";
const eventsRouter = express.Router();

eventsRouter.get("/", (req, res) => {
  const events = JSON.parse(fs.readFileSync("./data/events.json"));
  res.json(events);
});

eventsRouter.get("/:id", (req, res) => {
  const events = JSON.parse(fs.readFileSync("./data/events.json"));
  const eventId = events.filter((event) => event.id.toString() === req.params.id);
  res.json(eventId);
});

export { eventsRouter };
