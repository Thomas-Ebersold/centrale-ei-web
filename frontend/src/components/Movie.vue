<template>
  <div>
    <h2>{{ movie.title }}</h2>
    <img
      :src="'https://image.tmdb.org/t/p/w200' + movie.poster_path"
      :alt="movie.title"
    />
    <p>{{ movie.release_date }}</p>
  </div>
</template>

<script>
export default {
  name: "Movie",
  props: {
    movie: Object,
  },
};
</script>

<style scoped>
img {
  height: 750 px;
}

div {
  width: 250px;
}
</style>
