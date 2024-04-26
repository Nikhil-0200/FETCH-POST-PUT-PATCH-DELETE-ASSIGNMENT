let display = document.querySelector("#display");
let namess = JSON.parse(localStorage.getItem("loginUserName"));
let total = document.getElementById("total");


async function fetchCartData() {
  try {
    let res = await fetch("http://localhost:3000/allUsersCart");
    let finalData = await res.json();
    showCartData(finalData);
  } catch (error) {
    console.log(error);
  }
}

fetchCartData();

function showCartData(data) {
  let localStorageName = JSON.parse(localStorage.getItem("loginUserName"));

  for (let key in data) {
    if (key === localStorageName) {
      data[key].forEach((ele, index) => {
        let productsCard = document.createElement("div");
        productsCard.id = "productsCard";

        let imgDiv = document.createElement("div");
        imgDiv.id = "imgDiv";

        let img = document.createElement("img");
        img.src = ele.src;

        let title = document.createElement("p");
        title.textContent = ele.title;

        let rating = document.createElement("p");
        rating.textContent = ele.ratings;

        let price = document.createElement("p");
        price.textContent = ele.price;

        let btnDiv = document.createElement("div");
        btnDiv.id = "btnDiv";

        let dltBtn = document.createElement("button");
        dltBtn.textContent = "🗑️";

        dltBtn.addEventListener("click", () => {
          dltBtnFnc(ele, index);
        });

        imgDiv.append(img);
        btnDiv.append(dltBtn);

        productsCard.append(imgDiv, title, rating, price, btnDiv);
        display.append(productsCard);
      });

    }
  }
}

async function calculateTotalPrice(){
  let res = await fetch("http://localhost:3000/allUsersCart");
  let finalData = await res.json();

  let newArray = finalData[namess];

  console.log(newArray);

  let result = newArray.reduce((acc, curr)=> acc + curr.price, 0);

console.log(result);

total.textContent = `Total Price: ${result}`


}

calculateTotalPrice()

async function dltBtnFnc(ele, index) {
  let res = await fetch("http://localhost:3000/allUsersCart");
  let finalData = await res.json();

  finalData[namess].splice(index, 1);

  console.log();

  fetch("http://localhost:3000/allUsersCart", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(finalData),
  });
}
