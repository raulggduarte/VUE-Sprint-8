<template>
  <div class="container">
    <p />
    <div class="topLink">
      <router-link v-if="!currentUser" :to="{ name: 'LogIn' }"
        >Log In</router-link
      >
      <router-link v-if="!currentUser" :to="{ name: 'Register' }"
        >Register</router-link
      >
      <div v-if="currentUser">{{ currentUser }}</div>
      <button v-if="currentUser" @click="logOut">Log Out</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "headerBar",
  components: {},
  methods: {
    logOut() {
      this.$store.dispatch("logOut");
      this.$router.push({ name: "Home" });
    },
  },
  computed: {
    currentUser() {
      return this.$store.state.currentUser;
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  padding: 30px;
  display: flex;
  justify-content: center;
  max-height: 212px;

  p {
    background-image: url("../assets/logo_small.webp");
    background-repeat: no-repeat;
    background-size: cover;
    width: 200px;
    height: 20px;
    background-color: transparent;
    @media (min-width: 400px) {
      width: 350px;
      height: 35px;
    }
    @media (min-width: 700px) {
      width: 350px;
      height: 152px;
      background-image: url("../assets/logo.webp");
    }
  }
  .topLink {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    top: 83px;
    right: 10px;
    @media (min-width: 400px) {
      top: 97px;
      right: 40px;
    }
    @media (min-width: 600px) {
      top: 25px;
    }
    @media (min-width: 700px) {
      top: 35px;
    }
  }
}

.router-link-exact-active {
  text-decoration: underline;
}

button {
  margin: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 50px;
  height: 20px;
  background-color: #b5b7b7;
  color: #000;
  border-radius: 5px;
  vertical-align: middle;
  margin: 5px 0;
  font-size: 10px;

  @media (min-width: 400px) {
    width: 53px;
    height: 23px;
    font-size: 12px;
    border-radius: 5px;
    margin: 5px 0;
  }

  &:hover {
    background-color: #fff;
  }
}
</style>