<template>
  <img :src="'https://image.tmdb.org/t/p/w200/' + movie.poster_path" />
  <p>{{ movie.title }}</p>
  <p>{{ movie.release_date }}</p>
</template>

<script>
export default {
  name: "Movie",
  props: {
    movie: Object,
  },
};
</script>

<style>
img {
  border: 2px solid black;
  -moz-border-radius: 7px;
  -webkit-border-radius: 7px;
  border-radius: 7px;
  background: #000000;
  display: inline-block;
}
</style>