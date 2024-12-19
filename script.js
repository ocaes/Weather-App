document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('themeToggle');
const body = document.body;


themeToggle.addEventListener('click', () => {
    if (body.classList.contains('dark-mode')) {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
        themeToggle.textContent = '☀️';
    } else {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
        themeToggle.textContent = '🌜';
    }
});



// Disable scrolling when loader is present
window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    if (loader) {
        document.body.style.overflow = 'hidden';
    }
});

window.addEventListener('load', () => {
    setTimeout(() => {
        const loader = document.querySelector('.loader');
        const white = document.querySelector('.white-space');
        if (loader) {
            loader.style.display = 'none';
            white.style.display = 'none';
            document.body.style.overflow = 'scroll';
        }
    },2000)
  
});


 // Change the delay as per your requirement
// Get the search input element
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
// Get the temperature element

const errormsg = document.getElementById("error")



const errorMsg = document.getElementById('error');
const API_KEY = "142f577c492000d03f02c48c16fb6814";  
searchButton.addEventListener('click', () => {
    getWeatherData();
    searchInput.value = '';
});
const getWeatherData = async ()=>{
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${API_KEY}`;
    try{
        const response = await fetch(url);
      
            if(!response.ok){
                errormsg.classList.remove('hidden');
             } 
        
             setInterval(() => {
                errorMsg.classList.add('hidden');
            }, 3000);
        const data = await response.json();
        // console.log(data);
        const {main, name, weather, sys} = data;
        const tempRound =  Math.round(main.temp - 273.15);
        const tempMin = Math.round(main.temp_min - 273.15);
        const tempMax = Math.round(main.temp_max - 273.15);
        const emoji = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
        // Create a new card element
        const newCard = document.createElement("div");
        newCard.className = "weather-card"; // Apply the correct class
        newCard.innerHTML = `

                  <div class="temperature">${tempRound}°c</div>
            <div class="weather-info">
                  <div>
                    <div class="location">${name}, ${sys.country}</div>
                    <div class="weather-condition">${weather[0].description}</div>
                </div>
                <div class="name">
                    <span class="temp-range">${tempMin}°c - ${tempMax}°c</span>
                    <span class="weather-icon"><img src="${emoji}" alt="Weather Icon"></span>
                </div>
            </div>`;
        document.getElementById("weather-container").appendChild(newCard);
        
    
    
        // Create elements inside the new card


        // Update the text content of the elements


       

        // Append the new card to the DOM
        document.getElementById('weather-container').appendChild(newCard);
    }
    catch(error){
        console.error(error);
        errorMsg.textContent = error.message;
    }

};

async function generateWeatherCards() {
    const API_KEY = "142f577c492000d03f02c48c16fb6814";
    const cities = ["Rome", "New Delhi", "Paris"];
    const weatherContainer = document.getElementById("weather-container");

    const fetchWeatherData = async (city) => {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error(`Error fetching weather data for ${city}:`, error);
            return null;
        }
    };

    const createWeatherCard = (data) => {
        const { main, name, weather, sys } = data;
        const tempRound = Math.round(main.temp - 273.15);
        const tempMin = Math.round(main.temp_min - 273.15);
        const tempMax = Math.round(main.temp_max - 273.15);
        const emoji = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

        // Create a new weather card
        const newCard = document.createElement("div");
        newCard.className = "weather-card";
        newCard.innerHTML = `
            <div class="temperature">${tempRound}<sup>°c</sup></div>
            <div class="weather-info">
                <div>
                    <div class="location">${name}, ${sys.country}</div>
                    <div class="weather-condition">${weather[0].description}</div>
                </div>
                <div class="name">
                    <span class="temp-range">${tempMin}<sup>°c</sup> - ${tempMax}<sup>°c</sup></span>
                    <span class="weather-icon"><img src="${emoji}" alt="Weather Icon"></span>
                </div>
            </div>`;
        weatherContainer.prepend(newCard);
    };

    for (const city of cities) {
        const data = await fetchWeatherData(city);
        if (data) {
            createWeatherCard(data);
        }
    }
    animateCards();
}

generateWeatherCards();
// Call the function to generate the cards on page load

function animateCards() {
    const cards = document.querySelectorAll('.weather-card'); // Select all cards
    gsap.from(cards, {
        opacity: 0,       // Start with opacity 0
        y: 50,   
        delay:2,         // Start from below the screen
        stagger: 0.2,     // Delay between each card's animation
        duration: 1,      // Duration of each animation
        // Easing function
    });
}

});