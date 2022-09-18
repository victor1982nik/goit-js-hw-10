import './css/styles.css';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';
const debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;
//const BASE_URL = 'https://restcountries.com/v3.1/name/';

const inputRef = document.querySelector("#search-box");
const listRef = document.querySelector(".country-list");
const countryRef = document.querySelector(".country-info");

inputRef.addEventListener('input', debounce(handleInput,DEBOUNCE_DELAY));

function handleInput(e) {
    e.preventDefault();
    listRef.innerHTML = '';
    
    const countryName = e.target.value.trim();
    if (!countryName.length)
        return;
          
    fetchCountries(countryName).then((data) => {
    //    debugger;
        if (!data)
            return;
        if (data.length > 10) {
                Notiflix.Notify.warning("Too many matches found. Please enter a more specific name.");
                return null;
            }
        if (data.length < 10 && data.length > 2) {
            renderList(data);
            return;
        }
        renderOne(data);
    }).catch (error => {       
        Notiflix.Notify.failure("Oops, there is no country with that name");
  });
}

function renderList(countries) {
    let markup = '';    
           
    markup = countries.map(({ flags, name }) => {
        return `<li><img src="${flags.svg}"<span>  ${name.official}</span></li>`
    }).join("");        
   
    listRef.insertAdjacentHTML('afterbegin',markup);
}

function renderOne(country) {
    let markup = '';
    const { flags, name, capital, population, languages } = country[0];
        
    markup = `<img src="${flags.svg}"><span class='header'> ${name.official}</span>
       <p><b>Capital: </b>${capital}</p><p><b>Population: </b>${population}</p>
        <p><b>Languages: </b>${Object.values(languages)}</p>`;
    
    listRef.insertAdjacentHTML('afterbegin',markup);
}