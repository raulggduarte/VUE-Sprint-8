<template>
  <div class="container">
    <h1>{{ msg }}</h1>
    <p class="coverImage" />
    <router-link to="/ships">SHOW ME ALL!</router-link>
  </div>
</template>

<script>
export default {
  name: "HomeView",
  data() {
    return {
      msg: "ALL YOUR STAR WARS FAVOURITE SHIPS IN ONE SITE",
    };
  },
  methods: {
  },
  created() {
    this.$store.dispatch("fetchShips");
  },
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #000;

  h1 {
    padding: 50px 50px;
    @media (min-width: 600px) {
      padding: 50px 100px;
    }
  }

  .coverImage {
    background-image: url("https://starwars-visualguide.com/assets/img/starships/9.jpg");
    background-size: cover;
    background-position: center 0px;
    width: 100%;
    height: 300px;
    @media (min-width: 800px) {
    background-position: center -50px;
    }
  }

  a {
    display: flex;
    justify-content: center;
    align-content: center;
    flex-direction: column;
    width: 220px;
    height: 50px;
    background-color: #b5b7b7;
    color: #000;
    border-radius: 20px;
    vertical-align: middle;
    margin: 50px 0;
    font-size: 30px;

    @media (min-width: 400px) {
      width: 300px;
      height: 60px;
      font-size: 40px;
      border-radius: 25px;
    }

    &:hover {
      background-color: #fff;
    }
  }
}
</style>