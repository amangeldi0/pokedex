const searchButton = document.querySelector('#header__search__button')
const searchInputBlock = document.querySelector('#header__search__input__block')

searchButton.addEventListener('click', (event) => {
    searchInputBlock.classList.toggle('active')
    searchButton.classList.toggle('active')
    window.addEventListener('click' , event => {
        if (!event.target.closest('#header__search__button') && !event.target.closest('#header__search__input__block')) { // если этот элемент или его родительские элементы не окно навигации и не кнопка
            searchInputBlock.classList.remove('active')
            searchButton.classList.remove('active')
        }
    })
})

searchInputBlock.addEventListener('keypress', event => {
    const filtered = JSON.parse(localStorage.getItem('pokeapi')).filter(item => {
        return item.name.toLowerCase().includes(event.target.value.toLowerCase())
    })
    if (event.target.value.length !== 0){
        if (event.key === 'Enter'){
            clearBlock('.pagination-number')
            getPaginationNumbers(filtered.length, paginationLimit)
            clearBlock('.pokemon__block')
            filtered.slice(0, paginationLimit).forEach(pokemon => detail(pokemon.url))
            document.querySelectorAll('.pagination-number').forEach(button => {
                const page = Number(button.getAttribute('page-index'))
                button.addEventListener('click', event => {
                    clearBlock('.pokemon__block')
                    filtered
                        .slice(paginationLimit * (page - 1), paginationLimit * page)
                        .forEach(pokemon => detail(pokemon.url))

                })
            })
        }
    }else {
        if(event.key === 'Enter'){
            clearBlock('.pagination-number')
            clearBlock('.pokemon__block')
            getPaginationNumbers(pokemonCount, paginationLimit)
            JSON.parse(localStorage.getItem('pokeapi'))
                .slice(0, 20)
                .forEach(pokemon => detail(pokemon.url))

        }

    }
})
