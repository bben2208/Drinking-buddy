
document.addEventListener('DOMContentLoaded', () => {
    const dropdownLinks = document.querySelectorAll('.dropdown-link'); // Select dropdown links
    const drinksContainer = document.getElementById('drinksContainer');
    const drinksSection = document.getElementById('drinksSection');
  
    // Add event listeners to each dropdown link
    dropdownLinks.forEach(link => {
      link.addEventListener('click', async (event) => {
        const ingredient = event.target.dataset.ingredient; // Get the ingredient from the data attribute
        try {
          // Fetch data from the API
          const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`);
          const data = await response.json();
  
          // Check if the API returned results
          if (data.drinks) {
            const drinks = data.drinks;
            drinksContainer.innerHTML = ''; // Clear previous results
  
            // Loop through each drink and display it
            drinks.forEach(drink => {
              const drinkElement = document.createElement('div');
              drinkElement.classList.add('drink');
              drinkElement.innerHTML = `
                <img src="${drink.strDrinkThumb}" alt="${drink.strDrink}">
                <h3>${drink.strDrink}</h3>
              `;
              drinksContainer.appendChild(drinkElement);
            });
  
            // Show the drinks section
            drinksSection.style.display = 'flex';
          } else {
            drinksContainer.innerHTML = `<p>No drinks found for "${ingredient}".</p>`;
            drinksSection.style.display = 'flex';
          }
        } catch (error) {
          console.error('Error fetching data:', error);
          drinksContainer.innerHTML = `<p>Error loading drinks. Please try again later.</p>`;
          drinksSection.style.display = 'flex';
        }
      });
    });
  });

console.log('yo')

//navbar buttons
const smallLogoButton = document.querySelector('#smallLogo')
const dunnoWhatButton = document.querySelector('#push')
const glassButton = document.querySelector('#glass')
const searchButton = document.querySelector('#search')
const aZButton = document.querySelector('#A-ZButtonNew')

smallLogoButton.addEventListener('click', () => {
  console.log('smallLogoButton')
  location.reload(); // Refresh the page
});

dunnoWhatButton.addEventListener('click', async () => {
  console.log('dunnoWhatButton')
  try {
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
    const data = await response.json();
    const drink = data.drinks[0];

    document.getElementById('hologramImage').src = drink.strDrinkThumb;
    document.getElementById('hologramName').textContent = drink.strDrink;
    document.getElementById('hologramDescription').textContent = drink.strInstructions;

    document.getElementById('hologram').style.display = 'block';
  } catch (error) {
    console.error('Error fetching data:', error);
  }
});

// Add event listener for dropdown links
const dropdownLinks = document.querySelectorAll('.dropdown-linkNew');
dropdownLinks.forEach(link => {
  link.addEventListener('click', async (event) => {
    const letter = event.target.dataset.ingredient;
    try {
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter.toLowerCase()}`);
      const data = await response.json();
      const drinks = data.drinks.slice(0, 10); // Get up to 10 drinks

      const drinksContainer = document.getElementById('drinksContainer');
      drinksContainer.innerHTML = ''; // Clear previous results

      if (drinks) {
        drinks.forEach(drink => {
          const drinkElement = document.createElement('div');
          drinkElement.classList.add('drink');
          drinkElement.innerHTML = `
            <img src="${drink.strDrinkThumb}" alt="${drink.strDrink}">
            <h3>${drink.strDrink}</h3>
            <p>${drink.strInstructions}</p>
          `;
          drinksContainer.appendChild(drinkElement);
        });
      } else {
        drinksContainer.innerHTML = '<p>No drinks found.</p>';
      }

      document.getElementById('drinksSection').style.display = 'block';
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  });
});