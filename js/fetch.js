const pokemonContainer = document.querySelector('#pokemon__container')

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

const toRenderPokemon = (array, limit, page) => {
    clearBlock('.pokemon__block')
    clearBlock('.pokemon__block__error')
    if (array.length !== 0){
        array.slice(page, limit).forEach(pokemon => {
            const {front__img, name, height, types, weight, stats, id} = pokemon
            let div = document.createElement('div')
            div.className = "pokemon__block";
            div.innerHTML = `
                <div class="pokemon__image">
                    ${front__img === null
                ? '<div class="image__error">Sorry but this Pokemon doesnt have an image</div>'
                : `<img src=${front__img} alt="pokemon">`}
                </div>
                <div class="pokemon__name">${name}</div>
                <div class='pokemon__types ${types}'>${types}</div>
                <button class="pokemon__add__favorite">
                    <img src="./assets/favourite__icon.png" alt="favourite__icon">
                </button> 
                <div class="hover">
                
                </div>  
                `;
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

const toLocalHost = async (url) => {
    try {
        const res = await fetch(url).then(response => response.json())
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
                    front__img: pokemon.sprites.front_default,
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
                    types: type
                }
                pokemonToLocalHost.push(pokemonObj)
                localStorage.setItem('allPokemons', JSON.stringify(pokemonToLocalHost))
            }).then(() => window.location.reload())
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

