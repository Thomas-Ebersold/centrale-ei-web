<template>
  <div>
    <div v-if="liker">
      <button @click="change()">✔ Ma liste</button>
    </div>
    <div v-else>
      <button @click="change()">+ Ma Liste</button>
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
