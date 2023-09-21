import { fetchBreeds } from "./cat-api";

fetchBreeds()

function renderMarkup(e) {
  const markup = e.map(({name, id}) => {
    return `<li><h2>${name}</h2></li>`
  })  
};