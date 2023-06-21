let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

function renderToy(toy){
  const toyCollection = document.querySelector("#toy-collection")
  let newToy = document.createElement('div')
  newToy.className = 'card'
  newToy.innerHTML = `
      <h2> ${toy.name} </h2>
      <img src= "${toy.image}" class="toy-avatar"/>
      <p4> ${toy.likes} likes </p4>
      <br>
      <button class="like-btn" id="${toy.id}"> Like ❤️ </button>
  `
  newToy.querySelector(".like-btn").addEventListener("click",(e)=>{
    toy.likes+=1
    console.log(toy.likes)
    newToy.querySelector("p4").innerText = `${toy.likes} likes`
    console.log(newToy.querySelector("p4").innerText)
    updateLikes(toy)
  })
  toyCollection.appendChild(newToy)
}

function getAllToys(){
  fetch("http://localhost:3000/toys")
  .then(resp => resp.json())
  .then(toyData=>toyData.forEach(toy=>renderToy(toy)))
}

getAllToys()

function manageNewToy(e){
  e.preventDefault() //Prevents the default behavior of page refreshing
  ///We want to send the data from 
  let inputs = document.querySelectorAll("form>input")
  let toyObj = {
    name: inputs[0].value,
    image: inputs[1].value,
    likes: 0
  }
  console.log(toyObj)
  addNewToy(toyObj)
} 

function addNewToy(newToy){
  fetch("http://localhost:3000/toys",{
  method: 'POST',
  headers:{ 
    'Content-type': 'application/json'
    },
    body:JSON.stringify(newToy)
  })
  .then(res=>res.json())
  .then(toy=> renderToy(toy))
}

function updateLikes(toyObj){
  fetch(`http://localhost:3000/toys/${toyObj.id}`,{
    method: 'PATCH',
    headers:{
      'Content-type' : 'application/json'
    },
    body:JSON.stringify(toyObj)
  })
  .then(res=>res.json())
  .then(toy=>console.log(toy))
}

document.querySelector(".add-toy-form").addEventListener("submit",manageNewToy)

const likeBtns = document.querySelectorAll(".like-btn")
console.log(likeBtns)
likeBtns.forEach(btn=>{
  console.log(btn)
  btn.addEventListener("click",increaseToyLikes)
})

