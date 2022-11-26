const searchButton = document.querySelector('#header__search__button')
const searchInputBlock = document.querySelector('#header__search__input__block')
const search = document.querySelector('#search')

searchButton.addEventListener('click', (event) => {
    searchInputBlock.classList.toggle('active')
    searchButton.classList.toggle('active')
    search.focus()
    window.addEventListener('click' , event => {
        if (!event.target.closest('#header__search__button') && !event.target.closest('#header__search__input__block')) { // если этот элемент или его родительские элементы не окно навигации и не кнопка
            searchInputBlock.classList.remove('active')
            searchButton.classList.remove('active')
            search.blur()
        }
    })
})

searchInputBlock.addEventListener('input', event => {
    const filtered = JSON.parse(localStorage.getItem('allPokemons')).filter(item => {
        return item.name.toLowerCase().includes(event.target.value.toLowerCase())
    })
    clearBlock('.pagination-number')
    getPaginationNumbers(filtered.length, paginationLimit)
    clearBlock('.pokemon__block')
    toRenderPokemon(filtered, 20, 0)
    document.querySelectorAll('.pagination-number').forEach(button => {
        const page = Number(button.getAttribute('page-index'))
        button.addEventListener('click', event => {
            clearBlock('.pokemon__block')
            toRenderPokemon(filtered, paginationLimit * page, paginationLimit * (page - 1))
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            })
        })
    })
})
