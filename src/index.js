import { fetchBreeds, fetchCatByBreed } from "./cat-api";
import './css/Styles.css';

const refBreedSelect = document.querySelector('.breed-select')
const refCatInfo = document.querySelector('.cat-info');

const refError = document.querySelector('.error');
refError.style.display = "none";
const refLoader = document.querySelector('.loader');

refBreedSelect.addEventListener('change', onCreateCard);

function onCreateCard(e) {
  const targetSelectValue = e.target.value;

  return fetchCatByBreed(targetSelectValue)
  .then(cat => {
    const markup = createCardBreeds(cat);
    refCatInfo.innerHTML = '';
    if (!markup.textContent) {
      refCatInfo.insertAdjacentHTML("beforeend",  markup);
    }
  })
  .catch(() => {
    onError()
  });
};


function onError() {
  refError.style.display = "block";
  refBreedSelect.style.display = "none";
};

function createCardBreeds(breeds) {
  return  breeds.map(({ url, name, description, temperament }) => {
    return `<li class = "card">
    <img class="image" width=500 height=350 src="${url}" alt="${name}"/>
    <h2>${name}</h2>
    <p class ="desc">${description}</p>
    <p class ="temp"><span class="text_temp">Temperament:</span> ${temperament}</p>
    </li>`
  }).join('')
};

fetchBreeds().then(
  breeds => {
    breeds.map(breed => {
      const option = document.createElement("option");
      option.value = breed.id;
      option.textContent = breed.name;
      refBreedSelect.append(option);
    })
  })
  .catch((err) => {
    console.log(err.message);
  });