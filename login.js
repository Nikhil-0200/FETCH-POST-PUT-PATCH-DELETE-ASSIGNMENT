let myForm = document.querySelector("form");
let nameVariable = [];

myForm.addEventListener("submit", (event) => {
  submitForm(event);
});

let obj = {};

function submitForm(e) {
  e.preventDefault();

  let targetElements = e.target;

  let name = targetElements[0].value;
  let email = targetElements[1].value;
  let password = targetElements[2].value;

  obj.name = name;
  obj.email = email;
  obj.password = password;

  fetchUserData();
}

async function fetchUserData() {
  try {
    let res = await fetch("http://localhost:3000/users");

    let finalData = await res.json();

    console.log(finalData);

    compareData(finalData);
  } catch (error) {
    console.log(error);
  }
}

function compareData(finalData) {
  finalData.forEach((element) => {
    if (
      element.name === obj.name &&
      element.email === obj.email &&
      element.password === obj.password
    ) {
      nameVariable.push(element.name);
      postUserName(nameVariable)
      console.log(nameVariable);
      window.location.href = "index.html";
    } else {
      alert("Enter Valid Details");
    }
  });
}

function postUserName(userName) {
  let data = {
    [userName]: []
  };

  fetch("http://localhost:3000/allUsersCart", {
    method: "POST", 
    headers:{
        "Content-Type" : "application/json"
    },
    body: JSON.stringify(data)
  });
}
