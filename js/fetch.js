const pokemonContainer = document.querySelector('#pokemon__container')
const baseUrl = 'https://pokeapi.co/api/v2/pokemon/'


async function fetchToPokemon(url, offset, limit) {
    try{
        const res = await fetch(`${url}?offset=${offset}&limit=${limit}`).then(res => res.json())
        res.results.forEach(pokemon => detail(pokemon.url))

    }catch (e) {
        throw new Error(e)
    }
}