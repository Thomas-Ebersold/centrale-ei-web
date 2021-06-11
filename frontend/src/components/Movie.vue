<template>
  <div class="zoom">
    <div class="image">
      <h2>{{ movie.title }}</h2>
      <router-link :to="'/movie/' + movie.id">
        <img
          :src="'https://image.tmdb.org/t/p/w200' + movie.poster_path"
          title="Movie"
        />
      </router-link>
    </div>
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
div {
  width: 200px;
}

img {
  border: 2px solid black;
  -moz-border-radius: 7px;
  -webkit-border-radius: 7px;
  border-radius: 7px;
  background: #000000;
  display: inline-block;
}

.zoom {
  width: 320px;
  height: 240px;
}
.image {
  width: 100%;
  height: 100%;
}
.image img {
  /* La transition s'applique à la fois sur la largeur et la hauteur, avec une durée d'une seconde. */
  -webkit-transition: all 0.5s ease; /* Safari et Chrome */
  -moz-transition: all 0.5s ease; /* Firefox */
  -ms-transition: all 0.5s ease; /* Internet Explorer 9 */
  -o-transition: all 0.5s ease; /* Opera */
  transition: all 0.5s ease;
}
.image:hover img {
  /* L'image est grossie de 25% */
  -webkit-transform: scale(1.25); /* Safari et Chrome */
  -moz-transform: scale(1.25); /* Firefox */
  -ms-transform: scale(1.25); /* Internet Explorer 9 */
  -o-transform: scale(1.25); /* Opera */
  transform: scale(1.25);
}
</style>
