// SWIPER SLIDER
var swiper = new Swiper(".bg-slider-thumbs", {
  loop: true,
  spaceBetween: 0,
  slidesPerView: 0,
});
var swiper2 = new Swiper(".bg-slider", {
  loop: true,
  spaceBetween: 0,
  thumbs: {
    swiper: swiper,
  },
});

// NAVIGATION BAR EFFECTS ON SCROLL
window.addEventListener("scroll", function () {
  const header = document.querySelector("header");
  header.classList.toggle("sticky", window.scrollY > 0)
})


// RESPONSIVE NAVIGATION MENU TOGGLE
const menuBtn = document.querySelector(".nav-menu-btn");
const closeBtn = document.querySelector(".nav-close-btn");
const navigation = document.querySelector(".navigation");
menuBtn.addEventListener("click", () => {
  navigation.classList.add("active")
});
closeBtn.addEventListener("click", () => {
  navigation.classList.remove("active")
});



// <<<===== API =====>>>
const BASE_URL = 'https://api.themoviedb.org'
const IMG_URL = 'https://image.tmdb.org/t/p/w500';

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNDQwM2U2ZjVhNmRiM2RlNjQ0YTk2YTc1YzZlMDY1OCIsInN1YiI6IjY0YjZjZTFhMTM2NTQ1MDBjNzMxYjgxMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WIdhklxfZxbZk73JES6TRvAnRuUVAMaxirzDXg2Iorw'
  }
};



// SEARCH 
const searchButton = document.querySelector('.search-button');
searchButton.addEventListener('click', async function () {
  const inputKeyword = document.querySelector('.input-keyword');
  const search = await getSearch(inputKeyword.value);
  UISearch(search);

  const detailBtn = document.querySelectorAll('.modal-detail-button');
  detailBtn.forEach(btn => {
    btn.addEventListener('click', function () {
      const movieId = this.dataset.id;
      fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=c4403e6f5a6db3de644a96a75c6e0658`)
        .then(response => response.json())
        .then(m => {
        
        // Show Titile Detail
        let titleDetail = `<h3 style="padding-top: 30px;">DETAIL MOVIE</h3>
                          <hr style="margin-bottom: 20px;">`
        const titleContainer = document.querySelector('.title-detail')
        titleContainer.innerHTML = titleDetail;
        
        // Show Detail Movie
        const detailMovie = showDetailMovie(m);
        const modalBody = document.querySelector('.body-detail');
        modalBody.innerHTML = detailMovie;
        })
    })
  })
})

function getSearch(keyword) {
  return fetch('https://api.themoviedb.org/3/search/movie?query='+ keyword, options)
  .then(response => response.json())
  .then(response => response.results)
}

function UISearch(search) {
  // Show Search Result
  let titleSearch = `<h3 style="padding-top: 30px;">SEARCH RESULT</h3>
                    <hr style="margin-bottom: 20px;">`
  const titleContainer = document.querySelector('.title-search')
  titleContainer.innerHTML = titleSearch;

  // Show Card Search
  let searchMovies = ''
  search.forEach( s => searchMovies += showSearchMovies(s))
  const searchContainer = document.querySelector('.body-search')
  searchContainer.innerHTML = searchMovies;
}


// POPULAR MOVIES
fetch(`${BASE_URL}/3/discover/movie`, options)
  .then(response => response.json())
  .then(response => {
    const movies = response.results.slice(0, 14)
    let cards = '';
    movies.forEach(m => cards += showCards(m))
    const movieContainer = document.querySelector('.body-section')
    movieContainer.innerHTML = cards;

    // Detail Popular Movies
    const detailBtn = document.querySelectorAll('.modal-detail-button');
    detailBtn.forEach(btn => {
      btn.addEventListener('click', function () {
        const movieId = this.dataset.id;
        console.log(movieId)
        fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=c4403e6f5a6db3de644a96a75c6e0658`)
          .then(response => response.json())
          .then(m => {

          // Title Detail 
          let titleDetail = `<h3 style="padding-top: 30px;">DETAIL MOVIES</h3>
                            <hr style="margin-bottom: 20px;">`
          const titleContainer = document.querySelector('.title-detail')
          titleContainer.innerHTML = titleDetail;
          
          // Detail Movie
          const detailMovie = showDetailMovie(m);
          const modalBody = document.querySelector('.body-detail');
          modalBody.innerHTML = detailMovie;
          })
      })
    })
  })

  // TOP MOVIES
fetch(`${BASE_URL}/3/movie/top_rated`, options)
.then(response => response.json())
.then(response => {
  const movies = response.results.slice(0, 14)
  console.log(movies);
  let cards = '';
  movies.forEach(m => cards += showCards(m))
  const movieContainer = document.querySelector('.body-top')
  movieContainer.innerHTML = cards;

  // Detail Popular Movies
  const detailBtn = document.querySelectorAll('.modal-detail-button');
  detailBtn.forEach(btn => {
    btn.addEventListener('click', function () {
      const movieId = this.dataset.id;
      console.log(movieId)
      fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=c4403e6f5a6db3de644a96a75c6e0658`)
        .then(response => response.json())
        .then(m => {

        // Title Detail 
        let titleDetail = `<h3 style="padding-top: 30px;">DETAIL MOVIES</h3>
                          <hr style="margin-bottom: 20px;">`
        const titleContainer = document.querySelector('.title-detail')
        titleContainer.innerHTML = titleDetail;
        
        // Detail Movie
        const detailMovie = showDetailMovie(m);
        const modalBody = document.querySelector('.body-detail');
        modalBody.innerHTML = detailMovie;
        })
    })
  })
})


// SEARCH MOVIES
function showSearchMovies(s) {
  return `<div class="card">
            <div class="card-image">
            <a href="#" class="modal-detail-button data-toggle="modal" data-id="${s.id}" data-target="#movieDetailModal"><img src="${IMG_URL+s.poster_path}" alt=""></a>
            </div>
            <div class="card-info">
              <h3>${s.original_title}</h3>
              <div class="info-detail">
                <p><i class="uil uil-clock"></i>${s.release_date.slice(0, 4)}</p>
                <p><i class="uil uil-star"></i>${s.vote_average}</p>
              </div>
            </div>
          </div>`
};

// MOVIES POPULER
function showCards(m) {
  return `<div class="card">
            <div class="card-image">
            <a href="#" class="modal-detail-button data-toggle="modal" data-id="${m.id}" data-target="#movieDetailModal"><img src="${IMG_URL+m.poster_path}" alt=""></a>
            </div>
            <div class="card-info">
              <h3>${m.original_title}</h3>
              <div class="info-detail">
                <p><i class="uil uil-calender"></i>${m.release_date.slice(0, 4)}</p>
                <p><i class="uil uil-star"></i>${m.vote_average}</p>
              </div>
            </div>
          </div>`
};

// DETAIL MOVIE POPULER
function showDetailMovie(m) {
  let genre = m.genres.map( g => g.name)
  return `<div clas="detail-card" style="display: flex; gap: 30px; flex-wrap: wrap;" >
            <div class="img-detail">
              <img src="${IMG_URL+m.backdrop_path}" alt="">
            </div>
            <div class="description">
              <h3>${m.original_title}</h3>
              <p>${m.overview}</p>
              <div class="detail-content">
                <span><i class="uil uil-calender"></i>${m.release_date.slice(0, 4)}</span>
                <span><i class="uil uil-star"></i>${m.vote_average.toFixed(1)}</span>
                <span><i class="uil uil-usd-circle"></i>${m.original_language}</span>
                <span><i class="uil uil-usd-circle"></i>${m.budget}</span>
                <span><i class="uil uil-tag-alt"></i>${m.tagline}</span>
                <span><i class="uil uil-film"></i>${genre.join(', ')} </span>
              </div>
              <div class="button">
                <a class="read-btn" href="https://www.youtube.com/results?search_query=${m.original_title}">Trailer</a>
                <a class="read-btn" href="https://www.youtube.com/results?search_query=${m.original_title}">Movie</a>
              </div>
            </div>
          </div>`
};









