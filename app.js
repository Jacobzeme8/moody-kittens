// @ts-nocheck
let kittens = []
let kitten = {}


/**
 * Called when submitting the new Kitten Form
 * This method will pull data from the form
 * use the provided function to give the data an id
 * then add that data to the kittens list.
 * Then reset the form
 */
function addKitten(event) {
  event.preventDefault()
  let newKitten = event.target
  if(kittens.find(kitten => kitten.name == newKitten.name.value)){
    newKitten.reset()
    throw new Error("Kitten Name already Exists!!")
  }
  
  kitten = {
    name: newKitten.name.value,
    mood : "tolerant",
    id : generateId(),
    affection : 5
  }

  newKitten.reset()
  console.log(kitten)
  kittens.push(kitten)
  saveKittens()
  drawKittens()
  
}



/**
 * Converts the kittens array to a JSON string then
 * Saves the string to localstorage at the key kittens 
 */
function saveKittens() {
  window.localStorage.setItem("kittens", JSON.stringify(kittens))
}

/**
 * Attempts to retrieve the kittens string from localstorage
 * then parses the JSON string into an array. Finally sets
 * the kittens array to the retrieved array
 */
function loadKittens() {
  let kittensData = JSON.parse(window.localStorage.getItem("kittens"))
  if(kittensData){
    kittens = kittensData
  }
  
  drawKittens()
}

/**
 * Draw all of the kittens to the kittens element
 */
function drawKittens() {
  let kittensCardElem = document.getElementById("kittens")
  let kittensTemplate = ` `
  kittens.forEach(kitten =>{
    kittensTemplate +=`<div class = "kitten ${kitten.mood} card">
    <img src="Kitten.png" alt="moody-logo.png" height="100px" width="100px">
    <p class=" pacifico d-flex justify-content-center">${kitten.name}</p>
    <p class=" pacifico d-flex justify-content-center">${kitten.mood}</p>
    <p>
      <button onclick="pet('${kitten.id}')">Pet</button>
      <button onclick="catnip('${kitten.id}')">Catnip</button>
    </p>
    <span class ="d-flex justify-content-center"> 
    <button class="abandon-kittons" onclick = "abandonKitten()">Abandon</button> 
    </span>
  </div> `
  }
  )
  
  kittensCardElem.innerHTML = kittensTemplate
}


/**
 * Find the kitten in the array by its id
 * @param {string} id 
 * @return {Kitten}
 */
function findKittenById(id) {
let index = kittens.findIndex(kitten => kitten.id == id)
return index;
}


/**
 * Find the kitten in the array of kittens
 * Generate a random Number
 * if the number is greater than .5 
 * increase the kittens affection
 * otherwise decrease the affection
 * @param {string} id 
 */
function pet(id) {
  let index = findKittenById(id);
  let randomNumber = Math.random()
  if(randomNumber > .5){
    kittens[index].affection++
  }
  else{
    kittens[index].affection--
  }
  setKittenMood()
}

/**
 * Find the kitten in the array of kittens
 * Set the kitten's mood to tolerant
 * Set the kitten's affection to 5
 * @param {string} id
 */
function catnip(id) {
  index = findKittenById(id)
  kittens[index].affection = 5;
  setKittenMood()
  saveKittens()
  drawKittens()
}

/**
 * Sets the kittens mood based on its affection
 * @param {Kitten} kitten 
 */
function setKittenMood(kitten) {
  kittens.forEach(kitten => {
    if(kitten.affection > 9){
      kitten.affection--;
      kitten.mood = "happy"
    }
    else if(kitten.affection > 7){
      kitten.mood = "happy"
    }
    else if(kitten.affection > 2) {
      kitten.mood = "tolerant"
    }
    else if(kitten.affection > 0) {
      kitten.mood = "angry"
    } 
    else{kitten.mood = "gone"}
    
  });
  saveKittens()
 drawKittens()
}

function abandonKitten(){
  let index = findKittenById()
  kittens.splice(index, 1)
  saveKittens()
  drawKittens()
}
/**
 * Removes all of the kittens from the array
 * remember to save this change
 */
function clearKittens(){
  kittens.splice(0, kittens.length)
  saveKittens()
  drawKittens()
}

/**
 * Removes the welcome content and should probably draw the 
 * list of kittens to the page. Good Luck
 */
function getStarted() {
  document.getElementById("welcome").remove();
  console.log('Good Luck, Take it away')
}


// --------------------------------------------- No Changes below this line are needed

/**
 * Defines the Properties of a Kitten
 * @typedef {{name: string, mood: string, affection: number}} Kitten
 */


/**
 * Used to generate a random string id for mocked
 * database generated Id
 * @returns {string}
 */
function generateId() {
  return Math.floor(Math.random() * 10000000) + "-" + Math.floor(Math.random() * 10000000)
}

loadKittens();
