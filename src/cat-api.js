import axios from "axios";

const BASE_URL = 'https://api.thecatapi.com/v1';

axios.defaults.headers.common["x-api-key"] = "live_MXi5doRNd1frIwcTUSayHMbUzMu4g8g8BHMhu0kMWmQAFAOGRfjnD7G5rfdmtWET";

const searchParams = new URLSearchParams({
    limit: 40,
});

export function fetchBreeds(){
    const url = `${BASE_URL}/breeds?${searchParams}`;
    return fetch(url)
    .then(response => {
        if (!response.ok) {
            throw new Error(response.status);
        };
        return response.json();
    })
};

export function fetchCatByBreed (breedId) {
    const url = `${BASE_URL}/images/search?breed_ids=${breedId}`;
    
    return  fetch(url)
    .then(response => {
        if (!response.ok) {
            throw new Error(response.status);
        };
        return response.json();
    })
};