<template>
  <div>
    <button @click="etoile(1)" :class="{ active: score >= 1 }">✩</button>
    <button @click="etoile(2)" :class="{ active: score >= 2 }">✩</button>
    <button @click="etoile(3)" :class="{ active: score >= 3 }">✩</button>
    <button @click="etoile(4)" :class="{ active: score >= 4 }">✩</button>
    <button @click="etoile(5)" :class="{ active: score >= 5 }">✩</button>
  </div>
  <p v-if="score > 0">{{ score }}/5</p>
  <p v-else>non noté</p>
</template>

<script>
export default {
  name: "Etoile",
  props: {
    score: Number,
  },
  methods: {
    etoile: function (k) {
      this.etoiler = k;
      this.$emit("rate", k);
    },
  },
};
</script>

<style scoped>
.active {
  background-color: red;
}
.nonactive {
  background-color: black;
}
</style>
