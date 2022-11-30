
// add delete favourite fn
const onFavourite = (id, state, event) => {
    event.stopPropagation()
    if (state){
        const newArr = JSON.parse(localStorage.getItem('allPokemons')).map(item => {
            if (item.id === id) {
                return {...item, favourite: false}
            }else {
                return item
            }
        })

        localStorage.setItem('allPokemons', JSON.stringify(newArr))
        pokemons = JSON.parse(localStorage.getItem('allPokemons'))
        toRenderPokemon(pokemons,paginationLimit * (currentPage - 1), paginationLimit * currentPage)
    }else {
        const newArr = JSON.parse(localStorage.getItem('allPokemons')).map(item => {
            if (item.id === id) {
                return {...item, favourite: true}
            }else {
                return item
            }
        })
        localStorage.setItem('allPokemons', JSON.stringify(newArr))
        pokemons = JSON.parse(localStorage.getItem('allPokemons'))
        toRenderPokemon(pokemons,paginationLimit * (currentPage - 1), paginationLimit * currentPage)
    }

}

const deleteFavourite = (id) => {
    const newArr = JSON.parse(localStorage.getItem('allPokemons')).map(item => {
        if (item.id === id) {
            return {...item, favourite: false}
        }else {
            return item
        }
    })
    clearBlock('.pokemon__favourite')
    localStorage.setItem('allPokemons', JSON.stringify(newArr))
    pokemons = JSON.parse(localStorage.getItem('allPokemons'))
    toRenderPokemon(pokemons,paginationLimit * (currentPage - 1), paginationLimit * currentPage)
    toRenderFavourites(pokemons)
}
