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

  let flag = false;

  finalData.forEach((ele)=>{
    if(ele.email === obj.email){
      if(ele.password === obj.password){
        flag = true;
        localStorage.setItem("loginUserName", JSON.stringify(ele.name))
        alert("Login Sucessfull")
        window.location.href = "index.html"
        
      }
      else{
        alert("Wrong Password")
      }
    }

   

  })

  if(flag == false){
    alert("User Not Found, Please Register")
  }
}

