let myForm = document.querySelector("form");

myForm.addEventListener("submit", (event)=>{
    submitForm(event)
})


function submitForm(e){
    e.preventDefault();

    let targetElements = e.target;

    let name = targetElements[0].value
    let email = targetElements[1].value
    let password = targetElements[2].value

    let obj = {};

    obj.userId = generateUserId(),
    obj.name = name;
    obj.email = email;
    obj.password = password 

    fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(obj)
    })
}

function generateUserId() {
    return Math.random().toString(36).substr(2, 9);
}