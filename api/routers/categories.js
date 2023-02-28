import express from "express";
import fs from "fs";
const categoriesRouter = express.Router();

categoriesRouter.get("/", (req, res) => {
  const categories = JSON.parse(fs.readFileSync("./data/categories.json"));
  res.json(categories);
});

categoriesRouter.get("/:id", (req, res) => {
  const id = req.params.id;
  const categories = JSON.parse(fs.readFileSync("./data/categories.json"));
  const filteredById = categories.find(
    (category) => category.id === Number(id)
  );
  res.json(filteredById);
});

categoriesRouter.post("/", (req, res) => {
  const categories = JSON.parse(fs.readFileSync("./data/categories.json"));
  const newCategory = req.body;
  let maxId = 0;
  for (let category of categories) {
    if (maxId < category.id) {
      maxId = category.id;
    }
  }
  newCategory.id = maxId +1;
  categories.push(newCategory);
  fs.writeFileSync("./data/categories.json", JSON.stringify(categories));
});

//put
//patch

categoriesRouter.delete("/:id", (req,res) => {
  const id = Number(req.params.id);
  const categories = JSON.parse(fs.readFileSync("./data/categories.json"));
  const filteredCategory = categories.filter((category) => category.id !== id);
  fs.writeFileSync("./data/categories.json", JSON.stringify(filteredCategory));
} );


export { categoriesRouter };
