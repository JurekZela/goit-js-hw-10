import { fetchBreeds, fetchCatByBreed } from "./cat-api";
import './css/styles.css';

const refBreedSelect = document.querySelector('.breed-select')
const refCatInfo = document.querySelector('.cat-info');
const refError = document.querySelector('.error');

refError.style.display = "none";

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

function onLoader() {
  const refLoader = document.querySelector('.loader');

  refLoader.classList.remove('loader');
};
onLoader()

function onError() {
  refError.style.display = "block";
  refBreedSelect.style.display = "none";
};

function createCardBreeds(breeds) {
  return  breeds.map(({ url, name, description, temperament }) => {
    return `<li class = "card">
    <img class="image" src="${url}" alt="${name}"/>
    <div class = "block-cat-info">
    <h2>${name}</h2>
    <p class ="desc">${description}</p>
    <p class ="temp"><span class="text_temp">Temperament:</span> ${temperament}</p>
    </div>
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