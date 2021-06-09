<template>
  <div id="base">
    <h1>Liste film</h1>
    <input type="text" v-model="movieName" placeholder="film" />
    <p>film : {{ movieName }}</p>
    <ul>
      <li v-for="(movie, index) in movies" :key="movie.id" id="liste">
        {{ index + 1 }}
        <Movie :movie="movie" />
      </li>
    </ul>
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
    };
  },
  methods: {
    fetchMovies: function () {
      axios
        .get(
          `https://api.themoviedb.org/3/movie/popular?api_key=a0a7e40dc8162ed7e37aa2fc97db5654&language=en-US&page=1`
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
