// sidebar close fn
const close = () => {
    sidebar.classList.remove('actives')
    pokemonContainer.classList.remove('short')

}

// if you not tap on details so it'll close
window.addEventListener('click' , event => {
    if (!event.target.closest('#pokemon__sidebar__container') && !event.target.closest('.pokemon__block')) {
        sidebar.classList.remove('actives')
        pokemonContainer.classList.remove('short')
    }
})

// render sidebar
const renderToSideBar = (pokemon) => {
    sidebar.classList.add('actives')
    pokemonContainer.classList.add('short')
    sidebarContainer.innerHTML = ''
    const pokemonBlock = document.createElement('div')
    pokemonBlock.className = 'sidebar__pokemonBlock'
    pokemonBlock.innerHTML = ''
    const {name, id, types, baseXP, weight, height, stats, front__img} = pokemon
    const {hp, attack, defense, speed} = stats
    pokemonBlock.innerHTML = `
        <div class="pokemon__header__block">
            <div class="pokemon__header__block__number">No. ${id}</div>
            <div class="pokemon__header__block__name">
                <div class="name">${name}</div>    
                <img src="./assets/ball.png" alt="ball">
            </div>
        </div>
        ${front__img === null ? `<div class="pokemon__error">Sorry but this Pokemon doesn't have an image</div>` : `<div class="pokemon__image"><img src=${front__img} alt=""></div>`}
        <div class="pokemon__info__block block">
            <div class="type info ">
                <div class="title">Type</div>
                <div class="value">${types.secondType ? `${types.firstType}, ${types.secondType}` : `${types.firstType}`}</div>
            </div>
            <div class="baseXP info">
                <div class="title">Base XP</div>
                <div class="value">${baseXP} xp</div>
            </div>
            <div class="height info">
                <div class="title">Height</div>
                <div class="value">${height} cm</div>
            </div>
            <div class="weight info">
                <div class="title">Weight</div>
                <div class="value">${weight} kg</div>
            </div>
        </div>
        <div class="pokemon__stats__block block">
            <div class="hp stat info">
                <div class="title">Hp</div>
                <div class="value">${hp}</div>
            </div>
            <div class="attack stat info">
                <div class="title">Attack</div>
                <div class="value">${attack}</div>
            </div>
            <div class="defense stat info">
                <div class="title">Defense</div>
                <div class="value">${defense}</div>
            </div>
            <div class="speed stat info">
                <div class="title">Speed</div>
                <div class="value">${speed}</div>
            </div>
        </div> 
        <div class="close__block"><button class="close" onclick='' id="close">close</button></div>
    `
    sidebarContainer.append(pokemonBlock)
    document.querySelector('#close').addEventListener('click', () => close())
}