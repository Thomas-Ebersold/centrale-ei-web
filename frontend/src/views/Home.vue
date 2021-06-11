<template>
  <div id="base">
    <h1>Film</h1>
    <input type="text" v-model="movieName" placeholder="film" />
    <button @click="search()">Search</button>
    <ul>
      <li v-for="(movie, index) in movies" :key="movie.id" id="liste">
        {{ 20 * (page - 1) + index + 1 }}
        <Movie :movie="movie" />
      </li>
    </ul>
    <div v-if="page != 1">
      <button @click="prev()">Prev</button>
    </div>
    <button @click="next()">Next</button>
  </div>
</template>

<script>
import axios from "axios";
import Movie from "@/components/Movie.vue";

export default {
  name: "Home",
  components: {
    Movie,
  },
  data() {
    return {
      movieName: "",
      movies: [],
      page: 1,
    };
  },
  methods: {
    fetchMovies: function () {
      axios
        .get(
          `https://api.themoviedb.org/3/movie/popular?api_key=a0a7e40dc8162ed7e37aa2fc97db5654&language=en-US&page=${this.page}`
        )
        .then((response) => {
          this.movies = response.data.results;
          console.log(response.data.results[0].title);
        })
        .catch((error) => {
          // Do something if call failed
          console.log(error);
        });
    },
    next: function () {
      this.page = this.page + 1;
      this.fetchMovies();
    },
    prev: function () {
      this.page = this.page - 1;
      this.fetchMovies();
    },
    search: function () {
      axios
        .get(
          `https://api.themoviedb.org/3/search/movie?api_key=57359ff087905e870d40ba4880a1dce0&language=en-US&query=${this.movieName}&page=1&include_adult=true`
        )
        .then((res) => {
          console.log(res);
          this.movies = res.data.results;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  created: function () {
    this.fetchMovies();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.home {
  text-align: center;
}

#base {
  text-align: center;
}

h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
