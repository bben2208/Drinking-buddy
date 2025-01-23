document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded');

    const drinksContainer = document.getElementById('drinksContainer');
    const closeButton = document.getElementById('close-button')

    // Dropdown ingredient links
    const dropdownLinks = document.querySelectorAll('.dropdown-link');
    dropdownLinks.forEach(link => {
        link.addEventListener('click', async (event) => {
            const ingredient = event.target.dataset.ingredient;
            closeButton.style.display = 'block';
            console.log(`Fetching drinks for ingredient: ${ingredient}`);
            if (!ingredient) return;
            debugger

            try {
                const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`);
                const data = await response.json();
console.log(data)
                if (data.drinks) {
                    drinksContainer.innerHTML = '';
                    data.drinks.forEach(drink => {
                        const drinkElement = document.createElement('div');
                        drinkElement.classList.add('drink');
                        drinkElement.innerHTML = `
                            <img src="${drink.strDrinkThumb}" alt="${drink.strDrink}">
                            <h3>${drink.strDrink}</h3>
                        `;
                        drinksContainer.appendChild(drinkElement);
                    });
                } else {
                    drinksContainer.innerHTML = `<p>No drinks found for "${ingredient}".</p>`;
                }
            } catch (error) {
                console.error('Error fetching drinks:', error);
                drinksContainer.innerHTML = `<p>Error loading drinks. Please try again later.</p>`;
            }
        });
    });

    closeButton.addEventListener('click', () =>{ 
        drinksContainer.innerHTML = ''
        closeButton.style.display = 'none';
    });

    // Navbar button event listeners
    const smallLogoButton = document.getElementById('smallLogo');
    const dunnoWhatButton = document.getElementById('dunnoWhatButton');

    smallLogoButton.addEventListener('click', () => {
        console.log('Logo clicked!');
        location.reload();
    });

    dunnoWhatButton.addEventListener('click', async () => {
        console.log('Random button clicked');
        try {
            const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
            const data = await response.json();
            const drink = data.drinks[0];

            document.getElementById('hologramImage').src = drink.strDrinkThumb;
            document.getElementById('hologramName').textContent = drink.strDrink;
            document.getElementById('hologramDescription').textContent = drink.strInstructions;
            document.getElementById('hologram').style.display = 'block';
        } catch (error) {
            console.error('Error fetching random drink:', error);
        }
    });
});
