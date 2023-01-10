<template>
  <div class="container">
    <div class="shipProfile" v-if="currentShip">
      <h2>{{ this.currentShip[0].name }}</h2>
      <img :src="this.currentShip[0].photo" :alt="this.currentShip[0].name" />
      <h3>DETAILS</h3>
      <div class="shipDetails">
        <h5 class="detail">
          MODEL: <span class="specs">{{ this.currentShip[0].model }}</span>
        </h5>
        <h5 class="detail">
          STARSHIP CLASS:
          <span class="specs">{{ this.currentShip[0].starship_class }}</span>
        </h5>
        <h5 class="detail">
          MANUFACTURER:
          <span class="specs">{{ this.currentShip[0].manufacturer }}</span>
        </h5>
        <h5 class="detail">
          COST:
          <span class="specs"
            >{{ this.currentShip[0].cost_in_credits }} credits</span
          >
        </h5>
        <h5 class="detail">
          CREW: <span class="specs">{{ this.currentShip[0].crew }}</span>
        </h5>
        <h5 class="detail">
          PASSANGERS CAPACITY:
          <span class="specs">{{ this.currentShip[0].passengers }}</span>
        </h5>
        <h5 class="detail">
          CARGO CAPACITY:
          <span class="specs"
            >{{ this.currentShip[0].cargo_capacity }} tons</span
          >
        </h5>
        <h5 class="detail">
          CONSUMABLES:
          <span class="specs">{{ this.currentShip[0].consumables }}</span>
        </h5>
        <h5 class="detail">
          LENGTH: <span class="specs">{{ this.currentShip[0].length }} m</span>
        </h5>
        <h5 class="detail">
          MAX ATMOSPHERING SPEED:
          <span class="specs"
            >{{ this.currentShip[0].max_atmosphering_speed }} km/h</span
          >
        </h5>
        <h5 class="detail">
          HYPERDRIVE RATING:
          <span class="specs">{{ this.currentShip[0].hyperdrive_rating }}</span>
        </h5>
        <h5 class="detail">
          MAX SPEED IN REALSPACE:
          <span class="specs">{{ this.currentShip[0].MGLT }} MGLT</span>
        </h5>
      </div>
          <PilotsCard :pilotsPhotos="pilotsPhotos" :pilotsNames="pilotsNames" v-if="currentShip" />
    </div>

  </div>
</template>

<script>
import PilotsCard from "../components/PilotsCard.vue";
import axios from "axios";

export default {
  name: "ViewShip",
  components: { PilotsCard },
  data() {
    return {
      currentShip: null,
      pilotsId: [],
      pilotsPhotos: [],
      pilotsNames: [],
    };
  },
  methods: {
    setPilotsIds(currentShip) {
      if (currentShip.pilots.length > 0) {
        currentShip.pilots.forEach((pilot) => {
          let pilotUrl = pilot;
          pilotUrl = pilotUrl.replace(/\/$/, "");
          let pilotID = pilotUrl.substr(pilotUrl.lastIndexOf("/") + 1);
          this.pilotsId.push(pilotID);
        });
        this.setPilotsPhotos(this.pilotsId);
        this.setPilotsNames(this.pilotsId);
      }
    },
    setPilotsPhotos(idArray) {
      idArray.forEach((id) => {
        this.pilotsPhotos.push(
          `https://starwars-visualguide.com/assets/img/characters/${id}.jpg`
        );
      });
    },
    async setPilotsNames(idArray) {
      // idArray.pilots.forEach((pilot) => {
        for (const pilot of idArray) {
        let data = null;

        try {
          data = await axios.get(`https://swapi.dev/api/people/${pilot}`);
        } catch (error) {
          console.log(error);
        }

        if (!data) {
          try {
            data = await axios.get(`https://swapi.py4e.com/api/people/${pilot}`);
          } catch (error) {
            alert(error);
            console.log(error);
          }
        }
        this.pilotsNames.push(data.data.name);
      }
    },
  },
  async mounted() {
    this.currentShip = await this.$store.state.ships.filter((ship) => {
      return ship.name === this.$route.params.name;
    });
    this.setPilotsIds(this.currentShip[0]);
  },
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.shipProfile {
  width: 100%;
  max-width: 1000px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 30px;
  background-color: rgba(63, 63, 63, 0.3);
  border-radius: 15px 0 15px 0;

  h2 {
    padding-left: 20px;
    margin: 10px 0;
    font-size: 40px;
    text-align: left;

    @media (min-width: 500px) {
      padding: 10px 25px;
      font-size: 45px;
    }

    @media (min-width: 800px) {
      padding: 20px 30px;
      font-size: 50px;
    }
  }

  img {
    width: 100%;
    max-width: 1200px;
  }

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

  .shipDetails {
    padding: 5px 15px 20px 15px;
    font-size: 20px;
    width: 100%;
    text-align: left;
    @media (min-width: 500px) {
      font-size: 25px;
      padding: 25px 40px;
    }

    @media (min-width: 800px) {
      font-size: 30px;
      padding: 25px 60px 30px 60px;
    }

    @media (min-width: 1000px) {
      font-size: 27px;
      column-count: 2;
      column-gap: 65px;
      padding: 25px 40px 30px 40px;
    }

    .detail {
      padding: 5px 0;
      text-align: left;
      font-weight: 800;
      @media (min-width: 1000px) {
        min-width: 480px;
      }

      .specs {
        font-weight: 300;
        padding-left: 2px;
      }
    }
  }
}
</style>