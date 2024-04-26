let display = document.querySelector("#display");
let userName = document.querySelector("#userName");
let logout = document.getElementById("logout");

let namess = JSON.parse(localStorage.getItem("loginUserName"))
userName.textContent = namess

logout.addEventListener("click", ()=>{
    localStorage.removeItem("loginUserName")
    location.reload()
})


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
    products.forEach((ele, index)=>{
        let productsCard = document.createElement("div");
        productsCard.id = "productsCard";

        let imgDiv = document.createElement("div");
        imgDiv.id = "imgDiv";

        let img = document.createElement("img");
        img.src = ele.src;

        let title = document.createElement("p");
        title.textContent = `${ele.title}`;

        let rating = document.createElement("p");
        rating.textContent = `Rating: ${ele.ratings}`;

        let price = document.createElement("p");
        price.textContent = `Price: ${ele.price}`;

        let btnDiv = document.createElement("div");
        btnDiv.id = "btnDiv";

        let addBtn = document.createElement("button");
        addBtn.textContent = "🛒"
        addBtn.addEventListener("click", ()=>{
            addToCart(ele, index)
        })

        btnDiv.append(addBtn)
        imgDiv.append(img);
        productsCard.append(imgDiv, title, rating, price, btnDiv)
        display.append(productsCard)
    })
}


async function addToCart(ele, index){

    let res = await fetch("http://localhost:3000/allUsersCart");
    let data = await res.json();

    if(data[namess] === undefined){
        data[namess] = [];
        data[namess].push(ele)
    }
    else{
        data[namess].push(ele)
    }





    fetch("http://localhost:3000/allUsersCart", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })


}

function generateUserId() {
    return Math.random().toString(36).substr(2, 9); // Example of generating a random alphanumeric string
}