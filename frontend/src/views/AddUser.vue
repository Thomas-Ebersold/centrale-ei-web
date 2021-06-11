<template>
  <div class="base">
    <div class="add-user-title">Add new user:</div>
    <div class="add-user-form-container">
      <div class="entrer">
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
      </div>
      <button class="add-user-button" @click="addUser()">Add user</button>
    </div>
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

.base {
  text-align: center;
}

.add-user-form-container {
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 10px;
}
.entrer {
  margin-bottom: 10px;
}

.add-user-input {
  text-align: center;
  margin-right: 10px;
  padding: 5px;
}

.add-user-button {
  cursor: pointer;
  padding: 5px;
}
</style>
