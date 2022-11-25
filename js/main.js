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
});
document.querySelector('.header__logo').addEventListener('click', () => {
    location.reload()
})