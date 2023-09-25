import axios from "axios";

const BASE_URL = 'https://api.thecatapi.com/v1';

const api_key = axios.defaults.headers.common["x-api-key"] = "live_MXi5doRNd1frIwcTUSayHMbUzMu4g8g8BHMhu0kMWmQAFAOGRfjnD7G5rfdmtWET";

export function fetchBreeds(){
    const url = `${BASE_URL}/breeds`;
    return fetch(url)
    .then(response => {
        if (!response.ok) {
            throw new Error(response.status);
        };
        return response.json();
    })
};

export function fetchCatByBreed (breedId) {
    const url = `${BASE_URL}/images/search?api_key=${api_key}&breed_ids=${breedId}&limit=1`;

    return  fetch(url)
    .then(result => {
        if (!result.ok) {
            throw new Error(result.status);
        };
        return result.json();
    })
};