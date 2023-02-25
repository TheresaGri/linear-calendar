import express from "express";
const categoriesRouter = express.Router();

categoriesRouter.get("/", (req,res) => {
  res.send("Why");
});

export {categoriesRouter}