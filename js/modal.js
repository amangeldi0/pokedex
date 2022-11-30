closeModal.addEventListener('click', () => {
    openModal.classList.remove('black')
    modal.className = 'hidden'
})
openModal.addEventListener('click', (evt) => {

    openModal.classList.add('black')
    modal.className = 'modal'
    clearBlock('.pokemon__favourite')
    toRenderFavourites(pokemons)
})

const toRenderFavourites = (array) => {
    array = array.filter(item => item.favourite === true)
    if (array.length !== 0){
        clearBlock('.modal__block__error')
        array.forEach(pokemon => {
            const {front__img, name, types, id} = pokemon
            let div = document.createElement('div')
            div.className = "pokemon__favourite";
            div.innerHTML = `
                
                <div class="pokemon__info">
                    <div class="pokemon__image">
                    ${front__img === null
                        ? '<div class="image__error">Sorry but this Pokemon doesn`t have an image</div>'
                        : `<img src=${front__img} alt="pokemon">`}
                    </div>
                    <div class="type__name">
                        <div class="pokemon__name"><span>Name: </span>${name}</div>
                        <div class='pokemon__types'><span>Type: </span> <div class='type ${types.firstType}'>${types.firstType}</div></div>
                    </div>
                </div>
                <div class="pokemon__delete__favorite">
                    <img src='./assets/trash.png' alt="favourite__icon">
                </div>
                `;
            div.children[1].addEventListener('click', (evt)=> deleteFavourite(id))
            modalBlock.append(div)
        })
    }
    else{
        clearBlock('.modal__block__error')
        let div = document.createElement('div')
        div.className = "modal__block__error";
        div.innerHTML = `<div>Sorry there is no such favourite Pokemon</div>`
        document.querySelector('.favourites__modal__window__content').append(div)
    }
}
