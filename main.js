let headerArea = document.querySelector('header')
let mainArea = document.querySelector('main')

// construct a new card with your own values
class Pokemon {
    constructor(id, name) {
        this.id = id
        this.name = name
        this.height = 34
        this.base_experience = 10000
    }
}

const createButton = document.querySelector('#createPokemon')
createButton.addEventListener('click', function () {

    })

// create a new card from the existing api data
const newButton = document.querySelector('#newPokemon')
newButton.addEventListener('click', function () {
    let pokeId = prompt('Please enter a Pokemon ID')
    if (pokeId > 0 && pokeId <= 807) {
        getAPIData(`https://pokeapi.co/api/v2/pokemon/${pokeId}`)
            .then(result => {
                populateDOM(result)
            })
    } else {
        alert('There are no Pokemon with that ID. Choose another one between 1 and 807.')
    }
})


// async function
async function getAPIData(url) {
    try {
        const response = await fetch(url)
        const data = await response.json()
        return data
    } catch (error) {
        console.error(error)
    }
}

// use the returned async data
const theData = getAPIData('https://pokeapi.co/api/v2/pokemon?limit=100&offset=200')

    .then(data => {
        for (const pokemon of data.results) {
            getAPIData(pokemon.url)
                .then(pokedata => {
                    console.log(pokedata.random)
                    populateDOM(pokedata)

                })
        }

    })



// populateDOM function
function populateDOM(single_pokemon) {

    // create the divs for the card structure
    let pokeScene = document.createElement('div')
    let pokeCard = document.createElement('div')
    let pokeFront = document.createElement('div')
    let pokeBack = document.createElement('div')

    // specify which class each div is
    pokeScene.setAttribute('class', 'scene')
    pokeCard.setAttribute('class', 'card')
    pokeFront.setAttribute('class', 'card__face card__face--front')
    pokeBack.setAttribute('class', 'card__face card__face--back')
   
    //calling the functions to fill the front and back of the card
    fillCardBack(pokeBack, single_pokemon)
    fillCardFront(pokeFront, single_pokemon)

    // append the front and back of card
    pokeCard.appendChild(pokeBack)
    pokeCard.appendChild(pokeFront)

    // append the card to the main div
    pokeScene.appendChild(pokeCard)

    // append the main div to the mainArea
    mainArea.appendChild(pokeScene)

    // flipping the card
    pokeCard.addEventListener('click', function () {
        pokeCard.classList.toggle('is-flipped')
    })
}

// functions to fill the front and back of the cards
function fillCardFront(pokeFront, data) {
    let pokeName = document.createElement('h3')
    let pokePicture = document.createElement('img')
    pokeName.setAttribute('class', 'name-front-of-card')
    pokePicture.setAttribute('class', 'pokeImage')
    let pokeNum = getPokeNumber(data.id)
    pokeName.textContent = `${data.name[0].toUpperCase()}${data.name.slice(1)}`
    pokePicture.src = `https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/images/${pokeNum}.png`
    
    pokeFront.appendChild(pokePicture)
    pokeFront.appendChild(pokeName)
    
   
}

function fillCardBack(pokeBack, data) {

    let pokeNameBack = document.createElement('h1')
    let pokeNameBackTitle = document.createElement('h3')
    let pokeOrder = document.createElement('h3')
    let pokeExperienceTitle = document.createElement('h3')
    let pokeExperience = document.createElement('h1')

    pokeNameBackTitle.textContent = 'Name:'
    pokeNameBack.textContent = `${data.name[0].toUpperCase()}${data.name.slice(1)}`
    pokeOrder.textContent = `Pokemon #${data.id}`
    pokeExperienceTitle.textContent = 'Base Experience:'
    pokeExperience.textContent = `${data.base_experience}`

    pokeOrder.setAttribute('class', 'poke-order-heading')
    pokeNameBackTitle.setAttribute('class', 'poke-back-name-title')
    pokeNameBack.setAttribute('class', 'poke-back-name')
    pokeExperienceTitle.setAttribute('class', 'poke-experience-title')
    pokeExperience.setAttribute('class', 'poke-experience')

    pokeBack.appendChild(pokeOrder)
    pokeBack.appendChild(pokeNameBackTitle)
    pokeBack.appendChild(pokeNameBack)
    pokeBack.appendChild(pokeExperienceTitle)
    pokeBack.appendChild(pokeExperience)
}

// adding zeros to fix image url
function getPokeNumber(id) {
    if (id < 10) return `00${id}`
    if (id > 9 && id < 100) {
        return `0${id}`
    } else return id
}


