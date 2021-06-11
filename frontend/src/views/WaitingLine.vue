<template>
  <div id="base">
    <h1>Ma Liste</h1>
    <ul>
      <li v-for="(movie, index) in movies" :key="movie.id" id="liste">
        {{ index + 1 }}
        <Movie :movie="movie" />
      </li>
    </ul>
    <div v-if="failed">
      <p>You are not connected please connect</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Movie from "@/components/Moview.vue";

export default {
  name: "WaitingLine",
  components: {
    Movie,
  },
  data() {
    return {
      movies: [],
      failed: false,
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
          this.failed = true;
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
