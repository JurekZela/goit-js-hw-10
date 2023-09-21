import axios from "axios";

axios.defaults.headers.common["x-api-key"] = "live_MXi5doRNd1frIwcTUSayHMbUzMu4g8g8BHMhu0kMWmQAFAOGRfjnD7G5rfdmtWET";

let page = 1;

const searchParams = new URLSearchParams({
    limit: 10,
    page: 5,

});

export function fetchBreeds(){
    fetch(`https://api.thecatapi.com/v1/breeds?${searchParams}`)
    .then(response => {
        if (!response.ok) {
            throw new Error(response.status);
        };
        return response.json();
    })
    .then(response => {
        const events = response._embedded.events;
        console.log(events);

        page =+ 1;
    })
    .catch((err) => {
        console.log(err.message);
    });
};