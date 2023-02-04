/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {
    let count = 0
    // loop over each item in the data
    for(let i = 0; i < games.length; i++){
        
        let g = games[i]

        const game_card = document.createElement("div")

        game_card.classList.add("game-card");

        game_card.innerHTML = `
            <h2>${g.name}</h2>
            <img src = "${g.img}" class = "game-img" />
            <p>${g.description}</p>
            <p>Backers: ${g.backers}</p>
        `

        document.getElementById("games-container").appendChild(game_card)

        count = count + 1
    }

    console.log(count)
        // create a new div element, which will become the game card


        // add the class game-card to the list


        // set the inner HTML using a template literal to display some info 
        // about each game
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")


        // append the game to the games-container

}

// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games
addGamesToPage(GAMES_JSON)

/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
let countNoOfTotalContributions = GAMES_JSON.reduce((acc,g) => acc + g.backers, 0)
console.log(countNoOfTotalContributions)

// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = `
    <p> ${countNoOfTotalContributions.toLocaleString('en-US')} </p>
`

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");
let totalAmountMoneyPledged = GAMES_JSON.reduce((acc, g) => acc+g.pledged, 0)
console.log(totalAmountMoneyPledged)
// set inner HTML using template literal
raisedCard.innerHTML = `
    <p>\$${totalAmountMoneyPledged.toLocaleString('en-US')}</p>
`

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
const totalNoOfGames = GAMES_JSON.length
console.log(totalNoOfGames)
gamesCard.innerHTML =  `
    <p> ${totalNoOfGames} </p>
`

/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    let gamesNotGoal = GAMES_JSON.filter((g) => {
        return g.pledged < g.goal
    });

    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(gamesNotGoal)
}
filterUnfundedOnly()


// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    let gamesGoalMet = GAMES_JSON.filter((g) => {
        return g.pledged >= g.goal
    })

    // use the function we previously created to add unfunded games to the DOM
    addGamesToPage(gamesGoalMet)
}
filterFundedOnly()

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON)

}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly)
fundedBtn.addEventListener("click", filterFundedOnly)
allBtn.addEventListener("click", showAllGames)

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
let unfundedGames = GAMES_JSON.filter((g)=>{
    return g.pledged < g.goal
})
let unfundedCount = unfundedGames.length
console.log(unfundedCount)

// create a string that explains the number of unfunded games using the ternary operator
let unfundedStr = unfundedCount === 1 ? `At present, 1 game is unfunded.` : `At present, ${unfundedCount} games are unfunded.`

// create a new DOM element containing the template string and append it to the description container
const strDisplay = `Total amount raised \$${totalAmountMoneyPledged.toLocaleString('en-US')} for ${GAMES_JSON.length} games all together. ${unfundedStr}`

const pElement = document.createElement("p");
pElement.textContent = strDisplay

descriptionContainer.appendChild(pElement)



/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
console.log(sortedGames)
let [firstGame, secondGame, ...remainingGames] = sortedGames;

// create a new element to hold the name of the top pledge game, then append it to the correct element
const topGame = document.createElement("p")
topGame.innerHTML = ` 
    <p> ${firstGame.name} </p>
    <p> Funded Amount: \$${firstGame.pledged.toLocaleString('en-US')} </p>
`
firstGameContainer.appendChild(topGame)

// do the same for the runner up item
const secondTopGame = document.createElement("p")
secondTopGame.innerHTML = `
    <p> ${secondGame.name} </p>
    <p> Funded Amount: \$${secondGame.pledged.toLocaleString('en-US')} </p>
`
secondGameContainer.appendChild(secondTopGame)



/***************Additionl things which i feel would be needed to the dashboard */
const firstUnfundedContainer = document.getElementById("first-unfunded-game")
const secondUnfundedContainer = document.getElementById("second-unfunded-game")

let unfundedGamestemp = GAMES_JSON.filter((g)=>{
    return g.pledged < g.goal
})
const sortingAsc = unfundedGamestemp.sort((item1, item2) => {
    return item1.pledged - item2.pledged;
})
console.log(sortingAsc)
let [firstUnfundedGame, secondUnfundedGame, ...restUnfundedGames] = sortingAsc;

const topUnfundedGame = document.createElement("p")
topUnfundedGame.innerHTML = `
    <p> ${firstUnfundedGame.name} </p>
    <p> Funded Amount: \$${firstUnfundedGame.pledged.toLocaleString('en-US')} </p>
`
firstUnfundedContainer.appendChild(topUnfundedGame);

const secondTopUnfundedGame = document.createElement("p")
secondTopUnfundedGame.innerHTML = `
    <p> ${secondUnfundedGame.name} </p>
    <p> Funded Amount: \$${secondUnfundedGame.pledged.toLocaleString('en-US')} </p>
`
secondUnfundedContainer.appendChild(secondTopUnfundedGame);