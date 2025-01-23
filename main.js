document.addEventListener('DOMContentLoaded', () => {
  const drinksContainer = document.getElementById('drinksContainer')
  const drinkTypeDropDown = document.querySelectorAll(
    '.drink-type-dropdown-link'
  )
  const randomButton = document.getElementById('random-button')
  const closeButton = document.getElementById('close-button')

  // Random button event listener
  randomButton.addEventListener('click', async () => {
    //display close button
    closeButton.style.display = 'block'
    try {
      const response = await fetch(
        'https://www.thecocktaildb.com/api/json/v1/1/random.php'
      )
      const data = await response.json()
      const drink = data.drinks[0]

      if (drink) {
        drinksContainer.innerHTML = ''

        const drinkElement = document.createElement('div')
        drinkElement.classList.add('drink')
        drinkElement.innerHTML = `
                          <img src="${drink.strDrinkThumb}" alt="${drink.strDrink}">
                          <h3>${drink.strDrink}</h3>
                      `
        drinksContainer.appendChild(drinkElement)
      } else {
        drinksContainer.innerHTML = `<p>No drinks found for "${ingredient}".</p>`
      }
    } catch (error) {
      console.error('Error fetching random drink:', error)
    }
  })

  // Type dropdown event listeners
  // assign a click event listener to each drink type dropdown link for Vodka, Gin, Rum, etc.
  drinkTypeDropDown.forEach((link) => {
    link.addEventListener('click', async (event) => {
      //display close button
      closeButton.style.display = 'block'
      // target the html text from inside the dropdown, make it lowercase
      // example "Vodka" -> "vodka"
      // assign it to new variable ingredient
      const ingredient = event.target.textContent.toLowerCase()
      try {
        const response = await fetch(
          `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`
        )
        const data = await response.json()
        const drinks = data.drinks

        if (drinks) {
          drinksContainer.innerHTML = ''
          drinks.forEach((drink) => {
            const drinkElement = document.createElement('div')
            drinkElement.classList.add('drink')
            drinkElement.innerHTML = `
                            <img src="${drink.strDrinkThumb}" alt="${drink.strDrink}">
                            <h3>${drink.strDrink}</h3>
                        `
            drinksContainer.appendChild(drinkElement)
          })
        } else {
          drinksContainer.innerHTML = `<p>No drinks found for "${ingredient}".</p>`
        }
      } catch (error) {
        console.error('Error fetching drinks:', error)
        drinksContainer.innerHTML = `<p>Error loading drinks. Please try again later.</p>`
      }
    })
  })

  // Close button event listener
  closeButton.addEventListener('click', () => {
    drinksContainer.innerHTML = ''
    closeButton.style.display = 'none'
  })
})
