window.addEventListener("load", loadSite);

function loadSite() {
  console.log("Client-side code running");
  getAllCarsFromServer();
}

// Hämta alla bilar och skriv ut lista i html
function getAllCarsFromServer() {
  const button = document.getElementById("myBtn1");
  button.addEventListener("click", () => {
    fetch("http://localhost:3000/api/cars/")
      .then((res) => {
        return res.json();
      })
      .then((cars) => {
        createCarList(cars);
      });
  });
}

function createCarList(cars) {
  const carList = document.createElement("ul");

  cars.forEach((car) => {
    let li = document.createElement("li");
    li.textContent =
      "id: " +
      car.id +
      ", | " +
      "brand: " +
      car.brand +
      ", | " +
      "model: " +
      car.model +
      ", | " +
      "year: " +
      car.year;
    carList.appendChild(li);
    console.log(car.id);
  });
  const list = document.querySelector("#list");
  list.appendChild(carList);
}

// Sök efter bil med hjälp av ID

function getCarWithIdFromServer() {
  const carId = document.getElementById("searchCarId").value;
  console.log(carId);

  fetch("http://localhost:3000/api/cars/" + carId)
    .then((res) => {
      return res.json();
    })
    .then((car) => {
      createCarList([car]);
    });
}

function addCar() {
  let addCar = document.getElementById("createCar");
  let formData = new FormData(addCar);
  console.log(formData);

  for (var pair of formData.entries()) {
    console.log(pair[0] + " - " + pair[1]);
  }

  fetch("http://localhost:3000/api/cars", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((res) => {
      return res.json();
    })
    .then((result) => {
      console.log("Success:", result);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
