const express = require("express");
const app = express();
const port = 3000;
const fs = require("fs");
const path = require("path");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static("public"));

// skapar unika IDs
let idGenerator = () => {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
};

app.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});

// GET
app.get("/", (req, res) => {
  res.send("Hello World, Dick is here");
});

app.get("/api/cars/", (req, res) => {
  // Läs in från json fil
  const carsRawData = fs.readFileSync("output.json");
  let cars = JSON.parse(carsRawData);
  res.send(cars);
});

app.get("/api/cars/:id", (req, res) => {
  // Läs in från json fil
  fs.readFile("output.json", (err, data) => {
    if (err) return res.status(404).send("file not found");

    let cars = JSON.parse(data);

    const car = cars.find((c) => c.id == req.params.id);

    if (!car) return res.status(404).send("car not found");
    res.send(car);
  });
});

// POST
app.post("/api/cars/", (req, res) => {
  // Läs in från json fil
  const carsRawData = fs.readFileSync("output.json");
  let cars = JSON.parse(carsRawData);
  if (!req.body.brand.length > 2) {
    res.status(400).send("BAD INPUT");
    return;
  }

  const car = {
    id: idGenerator(),
    brand: req.body.brand,
    model: req.body.model,
    year: req.body.year,
  };

  cars.push(car);

  const jsonContent = JSON.stringify(cars);
  console.log(jsonContent);

  fs.writeFile("output.json", jsonContent, "utf8", function (err) {
    if (err) {
      console.log("An error occured");
      return console.log(err);
    }
    console.log("JSON file has been saved");
  });
  res.send(car);
});

// PUT

app.put("/api/cars/:id", (req, res) => {
  // Läs in från json fil
  console.log("PUT", req.body);

  const carsRawData = fs.readFileSync("output.json");
  let cars = JSON.parse(carsRawData);

  const carIndex = cars.findIndex((c) => c.id == req.params.id);
  if (carIndex === -1) return res.status(404).send("car not found");

  const updatedCar = { ...cars[carIndex], ...req.body };
  cars[carIndex] = updatedCar;

  const jsonContent = JSON.stringify(cars);
  console.log(jsonContent);

  fs.writeFile("output.json", jsonContent, "utf8", function (err) {
    if (err) {
      console.log("An error occured");
      return console.log(err);
    }
    console.log("JSON file has been saved");
  });
  res.send(cars[carIndex]);
});

// DELETE
app.delete("/api/cars/:id", (req, res) => {
  // Läs in från json fil

  const carsRawData = fs.readFileSync("output.json");
  let cars = JSON.parse(carsRawData);
  const carIndex = cars.findIndex((c) => c.id == req.params.id);

  if (carIndex === -1) return res.status(404).send("car not found");

  cars.splice(carIndex, 1);

  const jsonContent = JSON.stringify(cars);
  console.log(jsonContent);

  fs.writeFile("output.json", jsonContent, "utf8", function (err) {
    if (err) {
      console.log("An error occured");
      return console.log(err);
    }
    console.log("JSON file has been saved");
  });
  res.sendStatus(200);
});
