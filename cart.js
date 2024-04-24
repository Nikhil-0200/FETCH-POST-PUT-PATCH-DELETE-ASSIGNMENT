let display = document.querySelector("#display");

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
  console.log(data);

  for (let key in data) {
    let cartDataArray = data[key];

    cartDataArray.forEach((ele) => {
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

      dltBtn.addEventListener("click", ()=>{
        dltBtnFnc(ele.id)
      })

      imgDiv.append(img);
      btnDiv.append(dltBtn);

      productsCard.append(imgDiv, title, rating, price, btnDiv);
      display.append(productsCard);
    });

    
  }
}


function dltBtnFnc(id){
    fetch(`http://localhost:3000/allUsersCart/Nikhil/${id}`, {
        method: "DELETE", 
        headers:{
            "Content-Type": "application/json"
        },
    })

    console.log(id);
}

