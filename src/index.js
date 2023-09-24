import SlimSelect from 'slim-select'
import 'slim-select/dist/slimselect.css';
import { fetchBreeds, fetchCatByBreed } from "./cat-api";
import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refBreedSelect = document.querySelector('.breed-select')
const refCatInfo = document.querySelector('.cat-info');
const refLoader = document.querySelector('.loader');

refLoader.style.display = "none";

refBreedSelect.addEventListener('change', onCreateCard);

function onCreateCard(e) {
  const targetSelectValue = e.target.value;
  refLoader.style.display = "block";
 
  return fetchCatByBreed(targetSelectValue)
  .then(cat => {
   
    const markup = createCardBreeds(cat);
    refCatInfo.innerHTML = '';

    if (!markup.textContent) {
      refCatInfo.insertAdjacentHTML("beforeend",  markup);
      refLoader.style.display = "none";
    }
  })
  .catch(() => {
    onError()
  })
};

function onError() {
  refLoader.style.display = "none";
  refCatInfo.innerHTML = '';

  Notify.failure('Oops! Something went wrong! Try reloading the page or select another cat breed!');
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

    new SlimSelect({
      select: refBreedSelect,
  });
  })
  .catch(() => {
    onError()
  });