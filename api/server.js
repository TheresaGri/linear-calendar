import express from "express";
import { eventsRouter } from "./routers/events.js";
import { categoriesRouter } from "./routers/categories.js";
const app = express();

const PORT = 3000;

app.use("/api/events", eventsRouter);
app.use("/api/categories", categoriesRouter);

app.listen(PORT);
