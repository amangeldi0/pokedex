const clearBlock = (selector) => {
    return document.querySelectorAll(`${selector}`)
        .forEach(block => block.remove())
}
window.addEventListener("load", () => {
    fetchToPokemon(baseUrl, 0, paginationLimit)
    const local = localStorage.getItem('pokeapi')
    const localPokemon = localStorage.getItem('allPokemons')
    const array = JSON.parse(localStorage.getItem('allPokemons'))

    if (local === null){
        fetchToWithoutOffset()
    }
    if (localPokemon === null){
        fetchToPokemon()
    }

    document.querySelectorAll('.pagination-number').forEach(button => {
        const page = Number(button.getAttribute('page-index'))
        button.addEventListener('click', event => {
            clearBlock('.pokemon__block')
            JSON.parse(localStorage.getItem('pokeapi'))
                .slice(paginationLimit * (page - 1), paginationLimit * page)
                .forEach(pokemon => detail(pokemon.url))

        })
    })

    toRenderPokemon(array, 20, 0)

});
document.querySelector('.header__logo').addEventListener('click', () => {
    location.reload()
})