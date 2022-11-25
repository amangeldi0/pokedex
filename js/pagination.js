
const paginationButtons = document.querySelector('#pagination__buttons')

let currentPage = 1
let paginationLimit = 20
let pokemonCount = 1154
const pageCount = Math.ceil(pokemonCount / paginationLimit);


const appendPageNumber = (index) => {
    const pageNumber = document.createElement("button");
    pageNumber.className = "pagination-number";
    pageNumber.innerHTML = index;
    pageNumber.setAttribute("page-index", index);
    paginationButtons.appendChild(pageNumber);
};

const getPaginationNumbers = (pokemon, pgLimit) => {
    const result = Math.ceil(pokemon / pgLimit);
    console.log(result)
    for (let i = 1; i <= result; i++) {
        appendPageNumber(i);
    }
};



getPaginationNumbers(pokemonCount, paginationLimit)

