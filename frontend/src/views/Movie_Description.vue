<template>
  <div v-if="movie[0]">
    <div>Title: {{ movie[0].original_title }}</div>
    <img :src="'https://image.tmdb.org/t/p/w500' + movie[0].poster_path" />
    <Bouton @liked="liked()" :liker="attente" />
  </div>
</template>

<script>
import axios from "axios";
import Bouton from "@/components/Bouton.vue";

export default {
  name: "Movie_Description",
  components: {
    Bouton,
  },

  data() {
    return {
      movieName: "",
      movie: [],
      external_id: "",
      request: "",
      attente: false,
    };
  },

  methods: {
    fetchMovies: function () {
      return axios
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
    saveMovie: function () {
      axios({
        method: "post",
        url: "http://localhost:3000/movies/new",
        data: {
          name: this.movie[0].original_title,
        },
      })
        .then(function () {
          console.log("ok");
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    liked: function () {
      this.attente = !this.attente;

      console.log("like");
      console.log(this.$root.nickname);

      axios({
        method: "post",
        url: "http://localhost:3000/waitingLines/new",
        data: {
          nickname: this.$root.nickname,
          movieName: this.movie[0].original_title,
          waiting: this.attente,
        },
      });
    },
  },
  created: function () {
    this.fetchId().then(() => {
      this.fetchMovies().then(() => {
        this.saveMovie();
      });
    });
  },
};
</script>
