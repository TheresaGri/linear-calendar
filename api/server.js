import express from "express";
import cors from "cors";
import { eventsRouter } from "./routers/events.js";
import { categoriesRouter } from "./routers/categories.js";
import fs from "fs";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

const PORT = 3000;

app.get("/", (req, res) => {
  const homePage = fs.readFileSync("home.html", { encoding: "utf-8" });
  res.send(homePage);
});

app.use("/api/events", eventsRouter);
app.use("/api/categories", categoriesRouter);

app.listen(PORT);
