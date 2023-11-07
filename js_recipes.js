const requestInput = document.getElementById("requestInput");
const requestButton = document.getElementById("submitRequestButton");
const resultsDiv = document.getElementById("results");

requestButton.addEventListener("click", () => {
    const query = requestInput.value;
    if (query.trim() !== "") {
        getRecipes(query).catch(reason => prompt(reason));
    }
});

async function getRecipes(query) {
    const apiUrl = "https://api.api-ninjas.com/v1/recipe?query=" + query;
    try {
        const response = await fetch(apiUrl, {
            headers: {
                "X-Api-Key" :  "cIvnNNgSQAYozRjPMFFMUA==heTpt79yQ1iHzjgR"
            }
        });
        const data = await response.json();
        displayRecipes(data);
    } catch (error) {
        console.error("Error:", error);
    }
}

function displayRecipes(recipes) {
    resultsDiv.innerHTML = "";

    recipes.forEach(recipe => {
        const title = recipe.title;
        const ingredients = recipe.ingredients.split("|");
        const servings = recipe.servings;
        const instructions = recipe.instructions;

        const title_h3 = document.createElement("h3");
        const servings_p = document.createElement("p");
        const ingredients_ul = document.createElement("ul");
        ingredients.forEach(ingredient =>{
            const li = document.createElement("li");
            li.textContent = ingredient;
            ingredients_ul.appendChild(li);
        });
        const instructions_p = document.createElement("p");

        title_h3.textContent = title;
        servings_p.textContent = servings;
        instructions_p.textContent = instructions;

        resultsDiv.appendChild(title_h3);
        resultsDiv.appendChild(servings_p);
        resultsDiv.appendChild(ingredients_ul);
        resultsDiv.appendChild(instructions_p);
    });
}