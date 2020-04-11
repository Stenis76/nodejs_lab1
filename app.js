const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());
const cars = [
  { id: 1, brand: "Volvo", model: "V90", year: "2018" },
  { id: 2, brand: "BMW", model: "Z3", year: "2005" },
  { id: 3, brand: "Mercedes", model: "S500", year: "2014" },
  { id: 4, brand: "Volvo", model: "C30", year: "2010" },
];

// GET
app.get("/", (req, res) => {
  res.send("Hello World, Dick is here");
});

app.get("/api/cars/", (req, res) => {
  res.send(cars);
});

app.get("/api/cars/:id", (req, res) => {
  const car = cars.find((c) => c.id === parseInt(req.params.id));
  console.log(car);

  if (!car) res.status(404).send("car not found");
  res.send(car);
});

// POST
app.post("/api/cars/", (req, res) => {
  const car = {
    id: idGenerator(),
    brand: req.body.brand,
    model: req.body.model,
    year: req.body.year,
  };
  cars.push(car);
  res.send(car);
});

app.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});

let idGenerator = () => {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
};
