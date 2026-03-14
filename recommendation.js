// Function to handle navigation between pages
function navigateTo(page) {
    if (page === 'quiz') {
        window.location.href = "quiz.html"; // Navigate to the quiz page
    } else if (page === 'recommendation') {
        window.location.href = "Recommendation.html"; // Navigate to the recommendation page
    } else if (page === 'account') {
        goToAccountPage(); // Navigate to the account page
    }
}

// Function to redirect to the account page
function goToAccountPage() {
    window.location.href = "profile.html";
}

// Attach event listeners to buttons after the DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
    // Get all the sidebar buttons
    const navButtons = document.querySelectorAll(".nav-btn");

    navButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const buttonText = button.textContent.trim();

            if (buttonText === "Quiz") {
                navigateTo("quiz");
            } else if (buttonText === "Recommendation") {
                navigateTo("recommendation");
            } else if (buttonText === "Account") {
                navigateTo("account");
            } else {
                alert(`${buttonText} navigation is not implemented yet.`);
            }
        });
    });

    // Add event listener to the circle button for account navigation
    const circleButton = document.querySelector(".circle-btn");
    if (circleButton) {
        circleButton.addEventListener("click", () => {
            navigateTo("account");
        });
    }
});

// Javascript time baby
const form = document.getElementById("search_bar_form") 
const input = document.getElementById("search_bar_input")

const api_key='0a6051abde5e4d4d8cffca384adaff01';
const number=5;

let query = ``;

// Add an event listener to the form to handle the submit event
form.addEventListener("submit", function(event){
    // Prevent the form from submitting and reloading the page
    event.preventDefault();

    // Update the input value
    query = input.value;  // This can be any value you want to set
    spoonacular_get();
    add_marker(query)
});

async function spoonacular_get(){
    try{
      const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${api_key}&number=${number}&query=${query}`);
      const data = await response.json();
        
        displayRecipes(data.results);
    } catch (error) {
        console.error("Error fetching recipes:", error);
    }
}

function displayRecipes(recipes) {
    // Get or create a <ul> element to hold the recipes
    let recipeList = document.getElementById("recipe-list");

    // Clear previous results
    recipeList.innerHTML = "";

    // Loop through the recipes and add them as list items
    recipes.forEach((recipe) =>{
        // Create list item
        const listItem = document.createElement("li");

        // Create an <a> tag
        const link = document.createElement("a");
        link.className = "recipeListClass"
        link.textContent = recipe.title; // Use the recipe title
        link.addEventListener("click", () => {
            window.location.href = `recipe.html?query=${recipe.title}`;
        });

        // Append the <a> tag to the list item
        listItem.appendChild(link);

        // Append the list item to the list
        recipeList.appendChild(listItem);
})
}

async function add_marker(food) {
    // const { Place } = await google.maps.importLibrary("places");
    // const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
    
    // // Clear existing markers
    // clearMarkers();

    // // Creating circle object that is centered on OIC campus and has a radius of 3km
    // const {Circle} = await google.maps.importLibrary("maps");
    // center = {lat: 34.810165968274035, lng: 135.560902018011};
    // radius = 3000;

    // circle = new google.maps.Circle({
    //   center: center,
    //   radius: radius,
    // })

    // const request = {
    //   textQuery: `${food} restaurant Osaka Ibaraki`,
    //     fields: ["displayName", "location", "types"],
    //     locationRestriction: circle.getBounds(),
    //     maxResultCount: 10,
    //     language: "ja",
    // };

    // const request2 = {
    //   textQuery: `${food} restaurant Osaka Ibaraki`,
    //   fields: ["displayName", "location", "types"],
    //   locationRestriction: circle.getBounds(),
    //   maxResultCount: 10,
    //   language: "en",
    // };

    // if (!areRequestsEqual(request, request2)) {
    //   // If they are different, append request2 to request
    //   // You can combine the two by putting them into an array or handle them separately
    //   const requests = [request, request2];
    // }

    // const { places } = await Place.searchByText(request);
    // if (places.length) {
    //     console.log(places);

    //     const { LatLngBounds } = await google.maps.importLibrary("core");
    //     const bounds = new LatLngBounds();

    //     // Loop through and add new markers
    //     places.forEach((place) => {
    //         const marker = new AdvancedMarkerElement({
    //             map,
    //             position: place.location,
    //             title: place.displayName,
    //         });

    //         // Add marker to the markers array
    //         markers.push(marker);

    //         bounds.extend(place.location);
    //         console.log(place);
    //     });

    //     // Adjust the map to fit the bounds of the new markers
    //     map.fitBounds(bounds);
    // }
}