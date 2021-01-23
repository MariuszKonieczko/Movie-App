window.onload = function () {
  getMovies(APIURL);

  const form = document.getElementById('form');
  const search = document.getElementById('search');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchTerm = search.value;

    if (searchTerm) {
      getMovies(SEARCHAPI + searchTerm);
      search.value = '';
    }
  });
};

const APIURL =
  'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1';
const IMGPATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCHAPI =
  'https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=';

async function getMovies(url) {
  const response = await fetch(url);
  const responseData = await response.json();

  showMovies(responseData.results);
}

function showMovies(movies) {
  const main = document.getElementById('main');

  main.innerHTML = '';

  movies.forEach((movie) => {
    const { poster_path, title, vote_average, overview } = movie;

    if (poster_path != null) {
      const movieEL = document.createElement('div');

      movieEL.classList.add('movie');
      movieEL.innerHTML = `
    <img src="${IMGPATH + poster_path}" alt="${title}">
    <div class="movie-info">
      <h3>${title}</h3>
      <span class="${getClassByRate(vote_average)}">${vote_average}</span>
    </div><div class="overview"><h3>Overview:</h3>${overview}</div>`;

      main.appendChild(movieEL);
    }
  });
}

function getClassByRate(vote) {
  if (vote >= 7) {
    return 'green';
  } else if (vote >= 5) {
    return 'orange';
  } else return 'red';
}
