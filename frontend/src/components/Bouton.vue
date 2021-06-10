<template>
  <div>
    <div v-if="liker">
      <button @click="change()">Dans la liste d'attente</button>
    </div>
    <div v-else>
      <button @click="change()">Ajouter à la liste d'attente</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Bouton",
  props: {
    liker: Boolean,
  },

  methods: {
    change: function () {
      this.$emit("liked");
    },
  },
};
</script>
