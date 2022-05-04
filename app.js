let kittens = []
/**
 * Called when submitting the new Kitten Form
 * This method will pull data from the form
 * use the provided function to give the data an id
 * then add that data to the kittens list.
 * Then reset the form
 */
function addKitten(event) {
  event.preventDefault()
  let form = event.target
  let id = Math.floor(Math.random() * 100)
  let nameExists = kittens.find(k => k.name == form.name.value)
  if (!nameExists) {

    let kitten = {
      name: form.name.value,
      id: id,
      affection: 5,
      mood: "tolerant"
    }
    kittens.push(kitten)
    form.reset()
    // console.log(kittens);
    saveKittens()
    drawKittens()
  } else {
    alert("Choose a unique name")
  }


}

/**
 * Converts the kittens array to a JSON string then
 * Saves the string to localstorage at the key kittens 
 */
function saveKittens() {
  const jsonArr = JSON.stringify(kittens);

  // save to localStorage
  localStorage.setItem("kittens", jsonArr);
}

/**
 * Attempts to retrieve the kittens string from localstorage
 * then parses the JSON string into an array. Finally sets
 * the kittens array to the retrieved array
 */
function loadKittens() {
  const str = localStorage.getItem("kittens");

  // convert string to valid object
  // console.log(str);
  const parsedArr = JSON.parse(str);
  if (parsedArr != null) {
    kittens = parsedArr

  }

}

/**
 * Draw all of the kittens to the kittens element
 */
function drawKittens() {
  let template = ''
  kittens.forEach(k => template += `
  <div class="card" id="${k.id}">
    <img src="http://thiscatdoesnotexist.com/" class="kitten ${k.mood}">
    <div class="d-flex">
    ${k.name}
    ${k.affection}
    </div>
    <div>
    <button onClick="pet(${k.id})"> Pet </button>
    <button onClick="catnip(${k.id})"> Catnip </button>
    </div>
  </div>
  `)
  document.getElementById("kittens").innerHTML = template
}


/**
 * Find the kitten in the array by its id
 * @param {string} id 
 * @return {Kitten}
 */
function findKittenById(id) {
  return kittens.find(k => k.id == id)
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
  let kitten = findKittenById(id)
  let number = Math.random()
  console.log(number);
  if (number > 0.5) {
    kitten.affection += 1
  } else {
    kitten.affection -= 1
  }
  console.log(kitten)
  console.log(kitten.affection);
  // document.getElementById(`${id}`)
  // saveKittens()
  setKittenMood(kitten)
  // drawKittens()


}

/**
 * Find the kitten in the array of kittens
 * Set the kitten's mood to tolerant
 * Set the kitten's affection to 5
 * @param {string} id
 */
function catnip(id) {
  let kitten = findKittenById(id)
  kitten.mood = "tolerant"
  kitten.affection = 5
  // saveKittens()
  setKittenMood(kitten)
  // drawKittens()
}

/**
 * Sets the kittens mood based on its affection
 * @param {Kitten} kitten 
 */
function setKittenMood(kitten) {
  if (kitten.affection > 5) {
    kitten.mood = "happy"
  } else if (kitten.affection < 3) {
    kitten.mood = "sad"
  } else {
    kitten.mood = "tolerant"
  }
  saveKittens()
  drawKittens()
}

/**
 * Removes all of the kittens from the array
 * remember to save this change
 */
function clearKittens() {
  kittens = []
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
  drawKittens()
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
console.log(kittens)
