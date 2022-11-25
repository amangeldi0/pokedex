const pokemonContainer = document.querySelector('#pokemon__container')
const baseUrl = 'https://pokeapi.co/api/v2/pokemon/'

const allUrl = 'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0'
const pokemonToLocalHost = []

async function fetchToPokemon() {
    try{
        const res = await fetch(allUrl).then(res => res.json())
        res.results.forEach(pokemon => toLocalHost(pokemon.url))

    }catch (e) {
        throw new Error(e)
    }
}
const detail = async (url) => {
    try {
        const res = await fetch(url).then(response => response.json())
            .then(pokemon => {
                let div = document.createElement('div')
                div.className = "pokemon__block";

                div.innerHTML = `
                <div class="pokemon__image">
                    <img src=${pokemon.sprites['front_default']} alt="pokemon">
                </div>
                <div class="pokemon__name">${pokemon.name}</div>
                <div class='pokemon__types ${pokemon.types[0].type.name}'>${pokemon.types[0].type.name}</div>
                <button class="pokemon__add__favorite">
                    <img src="./assets/favourite__icon.png" alt="favourite__icon">
                </button>`;
                pokemonContainer.append(div)

            })
    } catch (e) {
        throw new Error(e)
    }
}
const fetchToWithoutOffset = async () => {
    try {
        const resAllPok = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0').then(res => res.json())
        await localStorage.setItem('pokeapi', JSON.stringify(resAllPok.results))
    }catch (e) {
        throw new Error()
    }
}
const clearBlock = (selector) => {
    return document.querySelectorAll(`${selector}`)
        .forEach(block => block.remove())
}
