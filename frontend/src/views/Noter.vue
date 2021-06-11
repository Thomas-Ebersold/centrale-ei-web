<template>
  <div id="base">
    <h1>Films Notés</h1>
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
import Movie from "@/components/Moview.vue";

export default {
  name: "Noter",
  components: {
    Movie,
  },
  data() {
    return {
      movies: [],
    };
  },
  methods: {
    fetchMovies: function () {
      axios({
        method: "post",
        url: "http://localhost:3000/waitingLines/vue",
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
