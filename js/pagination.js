
//pagination input lister
paginationInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter'){
        if (pageCount > Number(event.target.value)){
            currentPage = Number(event.target.value)
            toRenderPokemon(pokemons,paginationLimit * (currentPage - 1), paginationLimit * currentPage)
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            })
            paginationInput.blur()
        }else if(pageCount === Number(event.target.value)){
            next.disabled = true
            prev.disabled = false
        }else{
            paginationInput.value = pageCount
            currentPage = pageCount
            toRenderPokemon(pokemons,paginationLimit * (currentPage - 1), paginationLimit * currentPage)
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            })
            paginationInput.blur()
        }
    }
})

// prev button listener
prev.addEventListener('click', () => {
    next.disabled = false
    if (currentPage === 1){
        prev.disabled = true
    }
    else{
        prev.disabled = false
        currentPage -= 1
        paginationInput.value = currentPage
        toRenderPokemon(pokemons,paginationLimit * (currentPage - 1), paginationLimit * currentPage)
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }
})

// next button listener
next.addEventListener('click', () => {
    prev.disabled = false
    if (currentPage < pageCount){
        currentPage += 1
        paginationInput.value = currentPage
        toRenderPokemon(pokemons,paginationLimit * (currentPage - 1), paginationLimit * currentPage)
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }else{
        next.disabled = true
    }
})

