<template>
  <h1 v-if="nickname" class="center">{{ nickname }}</h1>
  <h1 v-else class="center">Not connected</h1>
  <div class="nav">
    <router-link class="nav-link" to="/">Home</router-link> |
    <router-link class="nav-link" to="/noter">Noter</router-link> |
    <router-link class="nav-link" to="/users">Users</router-link> |
    <router-link class="nav-link" to="/waitingline">WaitingLine</router-link>
  </div>
  <router-view />
</template>

<script>
export default {
  data() {
    return {
      nickname: null,
    };
  },
};
</script>
<style scoped>
.nav {
  text-align: center;
  padding: 30px;
}
.center {
  text-align: center;
}
.nav-link {
  font-weight: bold;
  color: #2c3e50;
}

.nav-link.router-link-exact-active {
  color: #42b983;
}
</style>
