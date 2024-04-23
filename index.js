let display = document.querySelector("#display");

async function fetchData(url){
    let res = await fetch(url);
    let finalData = await res.json();

    console.log(finalData)
    showProducts(finalData)
}

let productsURL = "http://localhost:3000/products";
let userURL = "http://localhost:3000/users";
let cartURL = "http://localhost:3000/allUsersCart"

fetchData(productsURL)

function showProducts(products){
    products.forEach((ele)=>{
        let productsCard = document.createElement("div");
        productsCard.id = "productsCard";

        let imgDiv = document.createElement("div");
        imgDiv.id = "imgDiv";

        let img = document.createElement("img");
        img.src = ele.src;

        let title = document.createElement("p");
        title.textContent = `Product Name: ${ele.title}`;

        let rating = document.createElement("p");
        rating.textContent = `Rating: ${ele.ratings}`;

        let price = document.createElement("p");
        price.textContent = `Price: ${ele.price}`;

        imgDiv.append(img);
        productsCard.append(imgDiv, title, rating, price)
        display.append(productsCard)
    })
}

