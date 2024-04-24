let display = document.querySelector("#display");
let userName = document.querySelector("#userName");


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

        let dltBtn = document.createElement("button");
        dltBtn.textContent = "🛒"
        dltBtn.addEventListener("click", ()=>{
            addToCart(ele, index)
        })

        btnDiv.append(dltBtn)
        imgDiv.append(img);
        productsCard.append(imgDiv, title, rating, price, btnDiv)
        display.append(productsCard)
    })
}

async function  getUserData(){
    let res = await fetch(cartURL);
    let finalData = await res.json()

    for(let key in finalData){
        userName.textContent = key
    }

    return finalData;

}


async function addToCart(ele, index){

    let cartData = {};

    cartData.id = generateUserId();
    cartData.title = ele.title;
    cartData.src = ele.src;
    cartData.price = ele.price;
    cartData.ratings = ele.ratings;

    let currentCartData = await getUserData()

    if(currentCartData.hasOwnProperty(userName.textContent)){
        currentCartData[userName.textContent].push(cartData)
    }
    else{
        currentCartData[userName.textContent] = [cartData]
    }

    fetch(cartURL, {
        method:"PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(currentCartData)
    })
}

function generateUserId() {
    return Math.random().toString(36).substr(2, 9); // Example of generating a random alphanumeric string
}