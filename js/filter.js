// live searching listener
filter.addEventListener('input', (event) => {
    pokemons = JSON.parse(localStorage.getItem('allPokemons')).filter(item => {
        return item.name.toLowerCase().trim().includes(event.target.value.toLowerCase().trim())
    })
    sortByType.value = ''
    sortByOrder.value = ''
    currentPage = 1
    paginationInput.value = currentPage
    pokemonCount = pokemons.length
    pageCount = Math.ceil(pokemonCount / paginationLimit);
    toRenderPokemon(pokemons, 0, paginationLimit)
})

// soring button listener
sort.addEventListener('click', () => {
    currentPage = 1
    paginationInput.value = currentPage
    pokemonCount = pokemons.length
    paginationLimit = Number(limitBy.value)
    pageCount = Math.ceil(pokemonCount / paginationLimit);
    filter.value = ''

    pokemons = JSON.parse(localStorage.getItem('allPokemons')).filter(item => {
        if (sortByType.value !== ''){
            return item.types.firstType === sortByType.value
        }else{
            return item
        }
    }).sort((a, b, array) => {
        if (sortByOrder.value !== ''){
            if (sortByOrder.value === 'incAttack'){
                return a.stats.attack - b.stats.attack
            }else if(sortByOrder.value === 'decAttack'){
                return b.stats.attack - a.stats.attack
            }else if(sortByOrder.value === 'incWeight'){
                return a.weight - b.weight
            }else if(sortByOrder.value === 'decWeight'){
                return b.weight - a.weight
            }
        }else {
            return array
        }
    })

    toRenderPokemon(pokemons, 0, paginationLimit)
})

// show hidden fn for search
searchButton.addEventListener('click', (event) => {
    pokemonContainer.classList.remove('short')
    sidebar.classList.remove('actives')
    searchInputBlock.classList.toggle('active')
    searchButton.classList.toggle('active')
    filter.focus()
    window.addEventListener('click' , event => {
        if (!event.target.closest('#header__search__button') && !event.target.closest('#header__search__input__block')) {
            searchInputBlock.classList.remove('active')
            searchButton.classList.remove('active')
            filter.blur()
        }
    })
})