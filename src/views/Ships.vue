
<template>
  <div class="container">
    <ShipCard
      class="hello"
      :ship="ship"
      v-for="(ship, index) in getShips"
      :key="index"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ShipCard from "../components/ShipCard.vue";

export default {
  name: "ShipsView",
  components: { ShipCard },
  data() {
    return {
      page: 1,
    };
  },
  computed: {
    ...mapGetters(["getShips"]),
  },
  methods: {
    async handleScroll() {
      let bottomOfWindow =
        document.documentElement.scrollTop + window.innerHeight ===
        document.documentElement.offsetHeight;
      if (bottomOfWindow) {
        if (this.page < this.$store.state.count) {
          await this.page++;
          await this.$store.dispatch("loadShips", [this.page]);
        }
      }
    },
  },
  created() {
    this.$store.dispatch("fetchShips");
    window.addEventListener("scroll", this.handleScroll);
  },
  unmounted() {
    window.removeEventListener("scroll", this.handleScroll);
  },
};
</script>



<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #000;
  padding: 25px;
}
</style>