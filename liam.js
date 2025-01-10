// Selector
const counters = document.querySelectorAll('.counter');
// Main function
for(let n of counters) {
  const updateCount = () => {
    const target = + n.getAttribute('data-target');
    const count = + n.innerText;
    const speed = 2000; // change animation speed here
    const inc = target / speed; 
    if(count < target) {
      n.innerText = Math.ceil(count + inc);
      setTimeout(updateCount, 1);
    } else {
      n.innerText = target;
    }
  }
  updateCount();
}

//results list
const list = document.querySelector('.results')

//pop up section
const modalSection = document.querySelector('.model-section')


const searchBtn = document.querySelectorAll('.searchEvent')
const alphabetBtn = document.getElementById('alphabet-btn')
const spiritsBtn = document.getElementById('spirits-btn')
const randomBtn = document.getElementById('random-btn')


const searchContainer = document.querySelector('.nav-bottom-container')
const alphabetContainer = document.querySelector('.alphabet-container')
const spiritContainer = document.querySelector('.spirits-container')
const randomContainer =  document.querySelector('.random-drink-container')

const closeBtn = document.querySelectorAll('button')

const mainContainer = document.querySelector('.main-container')
const clickOff = document.querySelector('.hero').addEventListener('click', close)



document.querySelector('span').addEventListener('click', () => {
  console.log('help')
})


searchBtn.forEach(btn => btn.addEventListener('click', searchBar))


closeBtn.forEach(button => 
  button.addEventListener('click', close))
  
function close(e){
  e.stopPropagation()
  console.log('closed')
  
    document.documentElement.style.setProperty('--background-color', '#feffef');
   
    alphabetContainer.classList.remove('hide')
    spiritContainer.classList.remove('hide')
    randomContainer.classList.remove('hide')
    searchContainer.classList.remove('hide')
    mainContainer.style.marginTop = "80px"
    list.innerHTML = ""

  }
     

function searchBar(e){
  e.stopPropagation()

  console.log('cl')
  list.innerHTML = ""
      searchContainer.classList.add('hide')

      alphabetContainer.classList.remove('hide')

      spiritContainer.classList.remove('hide')
  
      randomContainer.classList.remove('hide')

      mainContainer.style.marginTop = "95px"
     }


alphabetBtn.addEventListener('click', () => {

  list.innerHTML = ""
      alphabetContainer.classList.add('hide')

      spiritContainer.classList.remove('hide')
     
      randomContainer.classList.remove('hide')

      searchContainer.classList.remove('hide')

      mainContainer.style.marginTop = "145px"

     })
spiritsBtn.addEventListener('click', () => {
  
  list.innerHTML = ""
      alphabetContainer.classList.remove('hide')
      spiritContainer.classList.add('hide')
      randomContainer.classList.remove('hide')
      searchContainer.classList.remove('hide')
      mainContainer.style.marginTop = "145px"
     })
randomBtn.addEventListener('click', () => {


  list.innerHTML = ""
      mainContainer.style.marginTop = "80px"
      alphabetContainer.classList.remove('hide')
      spiritContainer.classList.remove('hide')
      searchContainer.classList.remove('hide')
     })



//empty variable for tracking timeouts
let fetchHandle

//hides mobilekeyboard when pressing off of it
const acceptsInput = (elem) => {
  if (!elem) {
    return false
  }
  let tag = elem.tagName
  return tag == 'INPUT' || tag == 'SELECT' || tag == 'TEXTAREA' || elem.isContentEditable || elem.tabIndex >= 0
}
document.addEventListener('touchend', (e) => {
  let target = e.target
  if(!acceptsInput(target)){
    document.activeElement.blur()
  }
})


// dynamic search bar eventlistener
document.querySelector('input').addEventListener('keyup', () => {
  //check if theres already a timeout, if there is then cancel it
  if(fetchHandle) clearTimeout(fetchHandle)
  // setup a new timeout to run runSearch after 300 milliseconds
  fetchHandle = setTimeout(runSearch, 300)
})

//function to fetch data for input
const runSearch = () => {
  window.scrollTo(0,0)
    //takes value from the search bar
    let drink = document.querySelector('input').value 
  //replaces spaces with underscores for https
    let drinkUnderscore = drink.replace(/ /g,"_")
    
    if(drink !== ""){
            fetchData(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drinkUnderscore}`)
    }
}
   

 
// event listener for each letter
['a','b','c','d','e','f','g','h',
'i','j','k','l','m','n','o','p','q',
'r','s','t','v','w','y','z'].forEach(choice => document.getElementById(choice).addEventListener('click', () => letterChoice(choice)))


// function for alphabet selection
function letterChoice(choice){

  fetchData(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${choice}`)
        
}

//even listener for each spirit
["rum", "gin", "vodka", "tequila"].forEach(choice => document.getElementById(choice).addEventListener('click', () => spiritChoice(choice)))


// function for ingredient selection
function spiritChoice(choice){
  
  fetchData(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${choice}`)
  
}

  //None alchoholic section
document.getElementById('non-alcoholic').addEventListener('click', () => { 
  
  fetchData(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic`)

})
        

//random drink
document.getElementById('random-btn').addEventListener('click', () => {

  fetchData(`https://www.thecocktaildb.com/api/json/v1/1/random.php`)

})

//clears html, fetches data to grab ID and runs createItem with ID as param
const fetchData = (data) => { 
  
  list.innerHTML = ""

  fetch(data)
  .then(res => res.json()) // parse response as JSON
  .then(data => {
    // console.log(data.drinks)
    data.drinks.forEach(result => {
     
      //return random drink to variable 
      createItem(result)

    })
  }) 

  .catch(err => {
      console.log(`error ${err}`)
 });

}


//variable to create HTML with a param for data
const createItem = (result) => {
  document.documentElement.style.setProperty('--background-color', '#eaeccd');

      fetch(` https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${ result.idDrink }`)
      .then(res => res.json()) // parse response as JSON
      .then(data => {

        // console.log(data.drinks)
        returned = data.drinks[0]

        if(returned.strIngredient2 === null){
          returned.strIngredient2 = ''
         }
        if(returned.strIngredient3 === null){
          returned.strIngredient3 = ''
         }
         if(returned.strIngredient4 === null){
          returned.strIngredient4 = ''
         }
    
        
         

        let newLi = document.createElement('li');
        newLi.className = 'card-container'
        newLi.innerHTML =  ` <img class="card-img" src="${ returned.strDrinkThumb }" alt="${ result.strDrink }">
                             <div class="name-ingredients">   
                                  <span class="drink-name">${ returned.strDrink }</span> 
                                  <div class="ingredients-container">
                                    <span class="drink-ingredient">${ returned.strIngredient1 }</span>
                                    <span class="drink-ingredient">${ returned.strIngredient2 }</span>
                                    <span class="drink-ingredient">${ returned.strIngredient3 }</span>
                                    <span class="drink-ingredient">${ returned.strIngredient4 }</span>
                                  </div>
                             </div> `
        newLi.classList.add('new-box')

        let newDiv = document.createElement('div')
              newDiv.className = 'modal'
              newDiv.innerHTML = `<div class="modal-container">
                                  <span class="modal-name">${ returned.strDrink }</span>
                                  <img class="modal-img" src="${ returned.strDrinkThumb }" alt="${ returned.strDrink }">
                                  <div class="modal-ingredients">
                                    <span class="drink-ingredient">${ returned.strIngredient1 }</span>
                                    <span class="drink-ingredient">${ returned.strIngredient2 }</span>
                                    <span class="drink-ingredient">${ returned.strIngredient3 }</span>
                                    <span class="drink-ingredient">${ returned.strIngredient4 }</span>
                                  </div>
                                  <p class="modal-instructions">${ returned.strInstructions }</p>
                                  </div>
                                  `            
                console.log('test')
                  //adds open class to display modal and image

                  newLi.addEventListener('click', () => {

              newDiv.classList.add('open')
              newDiv.classList.add('new-box')
              
              //event listener for when clicking off of the pop up modal
              newDiv.addEventListener('click', (e) => {
              //if the element clicked contains modal class, remove the open class
              if(e.target.classList.contains('modal')){
                  newDiv.classList.remove('open')
                  newDiv.classList.remove('new-box')
              
              }
            })
            modalSection.appendChild(newDiv)
          })
          list.appendChild(newLi)
        })
      .catch(err => {
        console.log(`error ${err}`)
    })
  }
