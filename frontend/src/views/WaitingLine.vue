<template>
  <div id="base">
    <h1>Liste film</h1>
    <input type="text" v-model="movieName" placeholder="film" />
    <p>film : {{ movieName }}</p>
    <ul>
      <li v-for="(movie, index) in movies" :key="movie.id" id="liste">
        {{ 20 * (page - 1) + index + 1 }}
        <Movie :movie="movie" />
      </li>
    </ul>
    <button @click="next()">Next</button>
    <div v-if="page != 1">
      <button @click="prev()">Prev</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Movie from "@/components/Moview.vue";

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
      axios({
        method: "post",
        url: "http://localhost:3000/waitingLines",
        data: {
          nickname: this.$root.nickname,
        },
      })
        .then((response) => {
          this.movies = response.data;
          console.log(response.data);
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
