const $ = document;

import {
  setCityCookie,
  getCityCookies,
  fetchPopularCities,
  fetchAllCities,
} from './utils/cities.js';
const PopularCitiesContainer = $.querySelector('.main__cities-list .row');
const citiesSearchInput = $.querySelector('.main__input');
const SearchCityResultContainer = $.querySelector('.search-result-cities');

let cities = null;

const ShowPapularCities = (cities) => {
  cities.forEach((city) => {
    PopularCitiesContainer.insertAdjacentHTML(
      'beforeend',
      ` <div class="col-2 d-flex justify-content-center">
    <li class="main__cities-item">
      <a class="main__cities-link" href="#" onclick="cityClickHandler(event , '${city.href}')">${city.name}</a>
    </li>
  </div>`
    );
  });
};
const cityClickHandler = (event, city) => {
  event.preventDefault();
  setCityCookie(city);
  window.location.href = `http://127.0.0.1:5500/DivarProject/Frontend/pages/main.html?city:${city}`;
};
const loadCityPost = (cityCookie) => {
  if (cityCookie) {
    window.location.href = `http://127.0.0.1:5500/DivarProject/Frontend/pages/main.html?city:${cityCookie}`;
  }
};
const SearchInputHandler = (event) => {
  const SearchTitle = event.target.value;
  if (SearchTitle.trim()) {
    const citiesResult = cities.filter((city) =>
      city.name.startsWith(SearchTitle)
    );
    SearchCityResultContainer.classList.add('active');
    SearchCityResultContainer.innerHTML = '';
    citiesResult.forEach((city) => {
      SearchCityResultContainer.insertAdjacentHTML(
        'beforeend',
        `
            <li>${city.name}</li>`
      );
    });
  } else {
    SearchCityResultContainer.classList.remove('active');
  }
};

citiesSearchInput.addEventListener('keyup', (event) =>
  SearchInputHandler(event)
);
window.addEventListener('load', async () => {
  const popularCities = await fetchPopularCities();
  ShowPapularCities(popularCities);
  loadCityPost(getCityCookies());
  cities = await fetchAllCities();
});

window.cityClickHandler = cityClickHandler;
