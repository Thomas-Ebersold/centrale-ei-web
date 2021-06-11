<template>
  <div v-if="movie[0]" class="center">
    <h1>Title: {{ movie[0].original_title }}</h1>
    <div class="enligne">
      <img :src="'https://image.tmdb.org/t/p/w500' + movie[0].poster_path" />
      <p class="moyen">{{ movie[0].overview }}</p>
    </div>
    <Bouton @liked="liked()" :liker="attente" />
    <Etoile @rate="rate" :score="note" />
  </div>
</template>

<script>
import axios from "axios";
import Bouton from "@/components/Bouton.vue";
import Etoile from "@/components/Etoile.vue";

export default {
  name: "Movie_Description",
  components: {
    Bouton,
    Etoile,
  },

  data() {
    return {
      movieName: "",
      movie: [],
      external_id: "",
      request: "",
      attente: false,
      note: 0,
    };
  },

  methods: {
    liker: function () {
      return axios({
        method: "post",
        url: "http://localhost:3000/waitingLines/movies",
        data: {
          nickname: this.$root.nickname,
          movieName: this.movie[0].original_title,
        },
      }).then((res) => {
        console.log(res.data);
        if (res.length == 0) {
          this.attente = false;
          this.note = 0;
        } else {
          this.attente = res.data[0].waiting;
          this.note = res.data[0].rate;
        }
      });
    },
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
    rate: function (k) {
      this.note = k;
      axios({
        method: "post",
        url: "http://localhost:3000/waitingLines/new",
        data: {
          nickname: this.$root.nickname,
          movieName: this.movie[0].original_title,
          waiting: this.attente,
          rate: this.note,
        },
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
      return axios({
        method: "post",
        url: "http://localhost:3000/movies/new",
        data: {
          name: this.movie[0].original_title,
          id: this.$route.params.id,
          path: this.movie[0].poster_path,
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
          rate: this.note,
        },
      });
    },
  },
  created: function () {
    this.fetchId().then(() => {
      this.fetchMovies().then(() => {
        this.saveMovie().then(() => {
          this.liker();
        });
      });
    });
  },
};
</script>

<style scoped>
.enligne {
  display: inline-block;
}
.center {
  text-align: center;
}
.moyen {
  width: 50%;
  margin-left: auto;
  margin-right: auto;
  text-align: justify;
}
</style>
