<template>
  <div class="add-user-title">Add new user:</div>
  <div class="add-user-form-container">
    <form ref="addUserForm">
      <input
        class="add-user-input"
        v-model="user.nickname"
        placeholder="nickname"
        required
      />
      <input
        class="add-user-input"
        v-model="user.firstName"
        placeholder="First name"
      />
      <input
        class="add-user-input"
        v-model="user.lastName"
        placeholder="Last name"
      />
    </form>
    <button class="add-user-button" @click="addUser()">Add user</button>
    <div v-if="userCreationError">{{ userCreationError }}</div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "AddUser",
  data: function () {
    return {
      user: {
        nickname: "",
        firstName: "",
        lastName: "",
      },
      userCreationError: "",
    };
  },
  methods: {
    addUser: function () {
      if (!this.$refs.addUserForm.checkValidity()) {
        this.$refs.addUserForm.reportValidity();
        return;
      }
      console.log("on");
      this.$root.nickname = this.user.nickname;
      localStorage.setItem("nickname", this.user.nickname);
      axios
        .post(`${process.env.VUE_APP_BACKEND_BASE_URL}/users/new`, this.user)
        .then(() => {
          console.log("ze");
          this.userCreationError = "New user creat, you are connect";
          this.$emit("userAdded");
          this.user = {
            nickname: "",
            firstName: "",
            lastName: "",
          };
        })
        .catch((error) => {
          this.userCreationError = "You are connect";
          console.error(error);
        });
    },
  },
};
</script>
<style scoped>
.add-user-title {
  margin-bottom: 10px;
}

.add-user-form-container {
  display: flex;
  margin-bottom: 20px;
}

.add-user-input {
  margin-right: 10px;
  padding: 5px;
}

.add-user-button {
  cursor: pointer;
  padding: 5px;
}
</style>
