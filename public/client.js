window.addEventListener("load", loadSite);

function loadSite() {
  console.log("Client-side code running");
  getAllCarsFromServer();
  const formCreate = document.getElementById("createCar");
  formCreate.addEventListener("submit", addCar);
  const formAdd = document.getElementById("updateCars");
  formAdd.addEventListener("submit", updateCar);
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

// Lägg till bil
function addCar(event) {
  event.preventDefault();
  event.stopPropagation();

  let formData = new FormData(event.target);

  let newCar = {};
  for (var pair of formData.entries()) {
    newCar[pair[0]] = pair[1];
  }

  fetch("http://localhost:3000/api/cars", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newCar),
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

// Ta bort bil

function deleteCarFromServer() {
  const carId = document.getElementById("deleteCarId").value;

  fetch("http://localhost:3000/api/cars/" + carId, {
    method: "DELETE",
  })
    .then((res) => {
      return res.json();
    })
    .then((result) => {
      console.log("Success:", result);
    });
}

//Ändra Uppgifter

function getCarWithIdFromServer2() {
  const carId = document.getElementById("searchCarId2").value;

  fetch("http://localhost:3000/api/cars/" + carId)
    .then((res) => {
      return res.json();
    })
    .then((car) => {
      showCar(car);
    });

  function showCar(car) {
    document.forms["updateCar"].elements["updateCarId"].value = car.id;
    document.forms["updateCar"].elements["updateCarModel"].value = car.model;
    document.forms["updateCar"].elements["updateCarBrand"].value = car.brand;
    document.forms["updateCar"].elements["updateCarYear"].value = car.year;
  }
}

function updateCar(event) {
  event.preventDefault();
  event.stopPropagation();
  let formData = new FormData(event.target);

  event.target = null;

  let updatedCar = {};
  for (var pair of formData.entries()) {
    updatedCar[pair[0]] = pair[1];
  }
  console.log(updatedCar.id);

  fetch("http://localhost:3000/api/cars/" + updatedCar.id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedCar),
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
