export const fetchAllCities = async () => {
  const res = await fetch('http://localhost:4000/api/cities');
  const cities = await res.json();
  return cities;
};
export const fetchPopularCities = async () => {
  const res = await fetch('http://localhost:4000/api/cities/popular');
  const popularCities = await res.json();
  return popularCities;
};
export const setCityCookie = (city) => {
  document.cookie = `city=${city} ; path =/`;
};
export const getCityCookies = () => {
  const cookieName = 'city=';
  const cookieArray = document.cookie.split('; ');
  let result = null;

  cookieArray.forEach((cookie) => {
    if (cookie.indexOf(cookieName) === 0) {
      result = cookie.substring(cookieName.length);
    }
  });

  return result;
};
