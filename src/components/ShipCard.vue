<template>
  <div class="card">
    <router-link
      class="link"
      :to="{ name: 'ViewShip', params: { name: this.ship.name } }"
    >
      <h3>{{ ship.name }}</h3>
      <h5>{{ ship.model }}</h5>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "shipCard",
  props: ["ship"],
};
</script>

<style lang="scss" scoped>
.link {
  display: flex;
  flex-direction: column;
  align-items: start;
  text-align: start;

  width: 60vw;
  margin: 15px;
  padding: 10px 30px;
  background-color: rgba(63, 63, 63, 0.3);

  &:hover {
    background-color: rgba(63, 63, 63, 0.6);
  }

  h3 {
    margin-bottom: 5px;
    font-size: 20px;
  }

  h5 {
    margin-bottom: 5px;
    font-size: 15px;
    color: rgba(180, 182, 182, 0.8);
    padding-left: 2px;
  }
}
</style>