const api = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
  params: {
    api_key: API_KEY,
  },
});

async function getTrendingMoviesPreview() {
  const { data } = await api("trending/movie/day");

  const movies = data.results;

  createMovies(movies, trendingMoviesPreviewList);
}

async function getCategoriesPreview() {
  const { data } = await api("genre/movie/list");

  createCategories(data.genres, categoriesPreviewList);
}

async function getMoviesByCategory(categoryId, categoryName) {
  const { data } = await api("discover/movie", {
    params: {
      with_genres: categoryId,
    },
  });

  headerCategoryTitle.innerHTML = categoryName;

  createMovies(data.results, genericSection);
}

function createCategories(categories, container) {
  container.innerHTML = "";

  categories.forEach((category) => {
    const categoryContainer = document.createElement("div");
    categoryContainer.classList.add("category-container");

    const categoryTitle = document.createElement("h3");
    categoryTitle.classList.add("category-title");
    categoryTitle.setAttribute("id", "id" + category.id);
    categoryTitle.addEventListener("click", () => {
      location.hash = `#category=${category.id}-${category.name}`;
    });
    const categorytitleText = document.createTextNode(category.name);
    categoryTitle.appendChild(categorytitleText);

    categoryContainer.appendChild(categoryTitle);
    container.appendChild(categoryContainer);
  });
}

function createMovies(movies, node) {
  node.innerHTML = "";
  movies.forEach((movie) => {
    const movieContainer = document.createElement("div");
    movieContainer.classList.add("movie-container");

    const movieImg = document.createElement("img");
    movieImg.classList.add("movie-img");
    movieImg.setAttribute("alt", movie.title);
    movieImg.setAttribute(
      "src",
      `https://image.tmdb.org/t/p/w300/` + movie.poster_path
    );
    movieContainer.appendChild(movieImg);
    node.appendChild(movieContainer);
  });
  
}

async function getMoviesBySearch(query) {
    const { data } = await api("search/movie", {
      params: {
        query,
      },
    });
  
    
  
    createMovies(data.results, genericSection);
  }
  
