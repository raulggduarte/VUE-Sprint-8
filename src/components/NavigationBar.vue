<template>
  <div class="navbar">
    <nav>
      <router-link :to="{ name: 'Home' }">Home</router-link>
      <router-link :to="{ name: 'Ships' }">Ships</router-link>
    </nav>
  </div>
</template>

<script>
export default {
  name: "navigationBar",
};
</script>

<style lang="scss" scoped>
.navbar {
  padding: 15px 0px;
  border-bottom: 1px solid #b5b7b7;
  border-top: 1px solid rgba(180, 182, 182, 0.5);
  a {
    font-size: 20px;
    padding: 15px 20px;
    border-right: 1px solid rgba(180, 182, 182, 0.5);
    border-left: 1px solid rgba(180, 182, 182, 0.5);

    &:hover {
      color: #000;
      background-color: rgb(180, 182, 182);
    }
  }
}

.router-link-exact-active {
  border-bottom: 1px solid #15f2fd;
  box-shadow: 0px 0px 15px #15f2fd;
  }
</style>