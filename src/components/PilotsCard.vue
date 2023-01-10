<template>
  <div class="pilotsCard" v-if="pilotsPhotos.length > 0">
    <h3>PILOTS</h3>
    <ul>
      <li v-for="(pilot, index) in pilotsPhotos" :key="index">
        <img :src="pilot" alt="" />
        <p>{{ pilotsNames[index] }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "PilotsCard",
  props: ["pilotsPhotos", "pilotsNames"],
};
</script>

<style lang="scss">
.pilotsCard {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgba(63, 63, 63, 0.6);

  h3 {
    width: 100%;
    text-align: left;
    margin: 0;
    padding: 15px 15px 10px 15px;
    border-bottom: 1px dotted rgba(180, 182, 182, 0.5);
    font-size: 20px;

    @media (min-width: 500px) {
      font-size: 30px;
      padding: 25px 40px;
    }

    @media (min-width: 800px) {
      padding: 25px 60px;
      font-size: 35px;
    }
    @media (min-width: 1000px) {
      padding: 25px 40px;
    }
  }

  ul {
    list-style: none;
    padding: 20px;
    @media (min-width: 700px) {
      display: grid;
      grid-template-columns: 1fr 1fr;
    }

    @media (min-width: 1200px) {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr;
    }

    li {
      background-color: rgba(63, 63, 63, 0.6);
      padding: 20px;
      border-radius: 15px 0 15px 0;
      margin: 10px 0;
      @media (min-width: 700px) {
        margin: 10px 10px;
      }

      img {
        width: 100%;
      }

      p {
        font-size: 25px;
        padding-top: 15px;
      }
    }
  }
}
</style>