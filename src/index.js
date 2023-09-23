import { fetchBreeds, fetchCatByBreed } from "./cat-api";

const refBreedSelect = document.querySelector('.breed-select')
const refCatInfo = document.querySelector('.cat-info');

const refError = document.querySelector('.error');
refError.style.display = "none";

refBreedSelect.addEventListener('change', onCreateCard);

function onCreateCard() {
  const currentSelectValue = refBreedSelect.value;
  
  return fetchCatByBreed(currentSelectValue)
  .then(cat => {
    const markup = createCardBreeds(cat);
    refCatInfo.innerHTML = '';
    if (!markup.textContent) {
      refCatInfo.insertAdjacentHTML("beforeend",  markup);
      return;
    }
  })
  .catch(() => {
    onError()
  });
};


function onError() {
  refError.style.display = "block";
};

function createCardBreeds(breeds) {
  return  breeds.map(( {url, name, description, temperament} ) => {
    return `<li>
    <img class="image" width=500 height=350 src="${url}" alt="${name}"/>
    <h2>${name}</h2>
    <p>${description}</p>
    <p>${temperament}</p>
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