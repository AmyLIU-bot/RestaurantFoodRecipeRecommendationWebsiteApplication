const api_key='0a6051abde5e4d4d8cffca384adaff01';
const number=1;

let query = ``;
// Function to get recipe from query using API call. 
// Input: query (dish)
async function getRecipe(query) {
    try{
        const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${api_key}&number=${number}&query=${query}`);
        const data = await response.json();
          
          displayRecipe(data.results[0]);
      } catch (error) {
          console.error("Error fetching recipes:", error);
      }
}

// Function to display recipe from getRecipe() WIP
// Input: data (JSobject of one dish)
function displayRecipe(data){
    recipe_name = document.getElementById("recipe-name");
    recipe_name.textContent = data.title;
}

// Check if getRecipe should run based on a redirect from recommendation.html by checking the "query" parameter
query = new URLSearchParams(window.location.search).get('query');
if (query){
    getRecipe(query);
}