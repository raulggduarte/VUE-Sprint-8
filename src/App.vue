<template>
  <HeaderBar />
  <NavigationBar v-if="!navigation" />
  <router-view />
  <FooterBar v-if="!navigation" />
</template>

<script>
import HeaderBar from "./components/HeaderBar.vue";
import NavigationBar from "./components/NavigationBar.vue";
import FooterBar from "./components/FooterBar.vue";

export default {
  name: "app",
  components: { HeaderBar, NavigationBar, FooterBar },
  data() {
    return {
      navigation: null,
    };
  },
  beforeCreate() {
    this.$store.dispatch("checkCurrentUser");
    this.$store.dispatch("checkUsers");
    console.log(this.$store.state.users);
  },
    mounted() {},
  methods: {
    checkRoute() {
      if (
        this.$route.name === "LogIn" ||
        this.$route.name === "Register"
      ) {
        this.navigation = true;
        return;
      }
      this.navigation = false;
    },
  },
  watch: {
    $route(){
      this.checkRoute();
    }
  },
};
</script>

<style lang="scss">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #fff;
  background-color: #000;
  flex: 1;
  min-height: 100vh;
  margin: 0;
}

* {
  font-family: "Sofia Sans Semi Condensed", sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

a {
  font-weight: bold;
  color: #b5b7b7;
  text-decoration: none;

  &:hover {
    color: #fff;
  }

  &.router-link-exact-active {
    color: #fff;
  }
}
</style>
