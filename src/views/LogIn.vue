<template>
  <div class="container">
    <div class="top">
      <h1>Log In to view the ships!</h1>
      <input v-model="email" type="email" />
      <input v-model="password" type="password" />
      <button @click="logUser">Log In</button>
      <div class="toRegister">
        <p class="login-register">Don't have an account?</p>
        <router-link class="router-link" :to="{ name: 'Register' }"
          >Register</router-link
        >
      </div>
    </div>
    <div class="bottom">
      <router-link :to="{ name: 'Home' }">Home</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "LogIn",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    logUser() {
      this.$store.dispatch("logUser", {
        user: this.email,
        psw: this.password,
      });
      this.email = "";
      this.password = "";

      if (this.$store.state.currentUser) {
        this.$router.push({ name: "Ships" });
      }
    },
  },
};
</script>


<style lang="scss" scoped>
.container {
  .top {
    display: flex;
    flex-direction: column;
    align-items: center;

    h1 {
      margin: 40px;
      @media (min-width: 400px) {
        font-size: 40px;
      }
    }

    input {
      margin: 10px;
      width: 60%;
      height: 30px;
      border-radius: 0 15px 0 15px;
      padding-left: 15px;
      @media (min-width: 400px) {
        font-size: 20px;
        height: 40px;
        margin: 20px;
      }
    }

    button {
      margin: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      width: 120px;
      height: 30px;
      background-color: #b5b7b7;
      color: #000;
      border-radius: 20px;
      vertical-align: middle;
      margin: 20px 0;
      font-size: 20px;

      @media (min-width: 400px) {
        width: 300px;
        height: 60px;
        font-size: 40px;
        border-radius: 25px;
        margin: 40px 0;
      }

      &:hover {
        background-color: #fff;
      }
    }

    .toRegister {
      margin: 20px;
      font-size: 15px;
      @media (min-width: 400px) {
        font-size: 20px;
      }
    }
  }
  .bottom {
    position: absolute;
    bottom: 30px;
    left: 30px;
    font-size: 20px;

    @media (min-width: 400px) {
      bottom: 50px;
      left: 50px;
      font-size: 40px;
    }
  }
}
</style>