import Notiflix from 'notiflix';
const BASE_URL = 'https://restcountries.com/v3.1/name/';

export function fetchCountries(name) {
    const url = BASE_URL + `${name}?fields=name,population,capital,flags,languages`;
    //debugger;
    return fetch(url)
        .then(response => {
        if (!response.ok) {
            throw new Error(response.status);
        }        
        return response.json();
    })
        .catch (error => {       
        Notiflix.Notify.failure("Oops, there is no country with that name");
  });
}