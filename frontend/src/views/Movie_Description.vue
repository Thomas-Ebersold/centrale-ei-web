<template>
  <div>Title: {{ movie[0].original_title }}</div>
  <img :src="'https://image.tmdb.org/t/p/w500' + movie[0].poster_path" />
</template>

<script>
import axios from "axios";

export default {
  name: "Movie_Description",

  data() {
    return {
      movieName: "",
      movie: [],
      external_id: "",
      request: "",
    };
  },

  methods: {
    fetchMovies: function () {
      axios
        .get(this.request)
        .then((response) => {
          this.movie = response.data.movie_results;
          console.log(this.movie);
        })
        .catch((error) => {
          console.log("error");
        });
    },

    fetchId: function () {
      return axios
        .get(
          "https://api.themoviedb.org/3/movie/" +
            this.$route.params.id +
            "/external_ids?api_key=a0a7e40dc8162ed7e37aa2fc97db5654"
        )
        .then((response) => {
          this.external_id = response.data.imdb_id;
          this.request =
            "https://api.themoviedb.org/3/find/" +
            this.external_id +
            "?api_key=a0a7e40dc8162ed7e37aa2fc97db5654&language=en-US&external_source=imdb_id";
          console.log(this.request);
        });
    },
  },
  created: function () {
    this.fetchId().then(() => {
      this.fetchMovies();
    });
  },
};
</script>
