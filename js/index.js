// get elements from html

const searchButton = document.querySelector('#header__search__button')
const searchInputBlock = document.querySelector('#header__search__input__block')
const filter = document.querySelector('#search')
const sortByType = document.querySelector('#sort__by__type__select')
const sortByOrder = document.querySelector('#sort__by__increase__select')
const limitBy = document.querySelector('#limitInput')
const sort = document.querySelector('#sort')

const modal = document.querySelector('#modal')
const closeModal = document.querySelector('#close__modal')
const openModal = document.querySelector('#favourites')
const modalBlock = document.querySelector('.favourites__modal__window__content')

const prev = document.querySelector('#prev')
const next = document.querySelector('#next')
const paginationInput = document.querySelector('#pagination__input')

const sidebar = document.querySelector('#pokemon__sidebar')
const sidebarContainer = document.querySelector('#pokemon__sidebar__container')
const pokemonContainer = document.querySelector('#pokemon__container')

// variables
const allUrl = 'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0'
const pokemonToLocalHost = []
let pokemonCount
let currentPage = 1
let paginationLimit
let pageCount
let pokemons
let state = true

// fetch to all pokemons
async function fetchToPokemon() {
    let div = document.createElement('div')
    div.className = 'pokemon__loader'
    div.innerHTML = `<img src="./assets/pokemonLoader.gif" alt="loader">`
    pokemonContainer.append(div)
    try{
        await fetch(allUrl).then(res => res.json())
            .then(response => response.results.forEach(pokemon => toLocalHost(pokemon.url)))

    }catch (e) {
        throw new Error(e)
    }
}

// rendering pokemon
const toRenderPokemon = (array, from, to) => {
    clearBlock('.pokemon__block')
    clearBlock('.pokemon__block__error')
    if (array.length !== 0){
        array.slice(from, to).forEach(pokemon => {
            const {front__img, name, types, id, favourite} = pokemon
            let div = document.createElement('div')
            div.className = "pokemon__block";
            div.innerHTML = `
                <div class="pokemon__image">
                    ${front__img === null
                ? '<div class="image__error">Sorry but this Pokemon doesnt have an image</div>'
                : `<img src=${front__img} alt="pokemon">`}
                </div>
                <div class="pokemon__name">${name}</div>
                <div class='pokemon__types ${types.firstType}'>${types.firstType}</div>
                <div class="pokemon__add__favorite">
                    <img src=${favourite ? './assets/trash.png' : './assets/favourite__icon.png'} alt="favourite__icon">
                </div>
                `;
            div.children[3].addEventListener('click', (evt)=> onFavourite(id , favourite, evt))
            pokemonContainer.append(div)
            div.addEventListener('click', () => renderToSideBar(pokemon))
        })
    }else{
        let div = document.createElement('div')
        div.className = "pokemon__block__error";
        div.innerHTML = `Sorry there is no such Pokemon`
        document.querySelector('.pokemon').append(div)
    }
}

// set pokemons to local host
const toLocalHost =  (url) => {
    try {

        const res =  fetch(url).then(response => response.json())
            .then(pokemon => {
                let type

                if (pokemon.types.length === 2){
                    type = {
                        firstType: pokemon.types[0].type.name,
                        secondType: pokemon.types[1].type.name,
                    }
                }else{
                    type = {
                        firstType: pokemon.types[0].type.name,
                    }
                }
                const pokemonObj = {
                    id: pokemon.id,
                    front__img: pokemon.sprites.other['official-artwork'].front_default,
                    baseXP: pokemon.base_experience,
                    name: pokemon.name,
                    height: pokemon.height,
                    weight: pokemon.weight,
                    stats: {
                        hp: Math.floor(pokemon.stats[0].base_stat),
                        attack: Math.floor(pokemon.stats[1].base_stat),
                        defense: Math.floor(pokemon.stats[2].base_stat),
                        speed: Math.floor(pokemon.stats[5].base_stat)
                    },
                    types: type,
                    favourite: false
                }
                pokemonToLocalHost.push(pokemonObj)
                localStorage.setItem('allPokemons', JSON.stringify(pokemonToLocalHost))
            })
    } catch (e) {
        throw new Error(e)
    }
}

// start func which assignment variables and get pokemon from LS
window.addEventListener("load", () => {
    const localPokemon = localStorage.getItem('allPokemons')

    if (localPokemon === null){
        state = false
    }

    if (state){

        paginationLimit = Number(limitBy.value)
        pokemons = JSON.parse(localStorage.getItem('allPokemons'))
        paginationInput.value = currentPage
        pokemonCount = pokemons.length
        pageCount = Math.ceil(pokemonCount / paginationLimit);
        toRenderPokemon(pokemons,paginationLimit * (currentPage - 1), paginationLimit * currentPage)
    }
    else {

        fetchToPokemon().then(() => clearBlock('.pokemon__loader')).then(() => window.location.reload())
    }

});

document.querySelector('.header__logo').addEventListener('click', () => {
    location.reload()
})

// pokemon types
const types = [
    'normal',
    'fighting',
    'flying',
    'poison',
    'ground',
    'rock',
    'bug',
    'ghost',
    'steel',
    'fire',
    'water',
    'grass',
    'electric',
    'psychic',
    'ice',
    'dragon',
    'dark',
    'fairy',
    'unknown',
    'shadow'
]

// clear block fn
const clearBlock = (selector) => {
    return document.querySelectorAll(`${selector}`)
        .forEach(block => block.remove())
}

//render types
types.forEach(type => {
    let option = document.createElement('option')
    option.className = 'type'
    option.innerText = type
    sortByType.append(option)
})