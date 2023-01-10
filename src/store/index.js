import { createStore } from 'vuex'
import axios from "axios";

export default createStore({
  state: {
    ships: [],
    count: null,
    users: [],
    currentUser: null,
  },
  getters: {
    getShips: (state) => state.ships,
  },
  mutations: {
    SET_SHIPS(state, ships) {
      state.ships = ships;
    },
    SET_COUNT(state, count) {
      state.count = count;
    },
    LOAD_SHIPS(state, ships) {
      ships.forEach(ship => {
        state.ships.push(ship);
      });
    },
    SET_ID(state) {
      state.ships.forEach(ship => {
        if (!ship.id) {
          let url = ship.url;
          url = url.replace(/\/$/, "");
          ship.id = url.substr(url.lastIndexOf("/") + 1);
        }
      })
    },
    SET_PHOTO(state) {
      state.ships.forEach(ship => {
        if (!ship.photo) {
          let photoUrl = `https://starwars-visualguide.com/assets/img/starships/${ship.id}.jpg`;
          fetch(photoUrl).then((response) => {
            if (response.status === 404) {
              photoUrl = "https://starwars-visualguide.com/assets/img/big-placeholder.jpg";
            }
            ship.photo = photoUrl;
          });
        }
      });
    },
    createNewUser(state, payload) {
      const parsed = JSON.parse(localStorage.getItem('all_users'));
      if (parsed) { state.users = parsed; }
      state.users.push(payload);
      console.log(state.users);
      localStorage.setItem('all_users', JSON.stringify(state.users));
    },
    setCurrentUser(state, payload) {
      state.currentUser = payload.user;
      localStorage.setItem('current_user', JSON.stringify(payload.user));
    },
    checkCurrentUser(state) {
      const currentUser = JSON.parse(localStorage.getItem('current_user'));
      if (currentUser) {
        state.currentUser = currentUser
      } else {
        state.currentUser = null
      }
    },
    checkUsers(state) {
      const storedUsers = JSON.parse(localStorage.getItem('all_users'));
      if (storedUsers) {
        state.users = storedUsers;
      }
    },
    deleteUsers(state) {
      localStorage.removeItem('all_users')
      console.log("All users removed");
      if (!JSON.parse(localStorage.getItem('all_users'))) {
        state.users = [];
        state.currentUser = null;
      }
    },
    logOut() {
      localStorage.removeItem('current_user');
    },
    logUser(state, payload) {
      const registeredUsers = JSON.parse(localStorage.getItem('all_users'));
      if (registeredUsers.find(user => user.user === payload.user && user.psw === payload.psw)) {
        state.currentUser = payload.user;
        localStorage.setItem('current_user', JSON.stringify(payload.user));
        console.log(`User ${payload.user} logged in`);
      } else {
        alert("User not found!");
      }
    },
  },
  actions: {
    async fetchShips({ commit }) {
      let data = null;

      try {
        data = await axios.get(
          `https://swapi.dev/api/starships`
        );
      } catch (error) {
        console.log(error);
      }

      if (!data) {
        try {
          data = await axios.get(
            `https://swapi.py4e.com/api/starships`
          );
        } catch (error) {
          alert(error);
          console.log(error);
        }
      }

      commit("SET_SHIPS", data.data.results);
      commit("SET_COUNT", Math.round(data.data.count / 10));
      commit("SET_ID");
      commit("SET_PHOTO");
    },
    async loadShips({ commit }, [page]) {
      let data = null;

      try {
        data = await axios.get(
          `https://swapi.dev/api/starships/?page=${page}`
        );
      } catch (error) {
        console.log(error);
      }

      if (!data) {
        try {
          data = await axios.get(
            `https://swapi.py4e.com/api/starships/?page=${page}`
          );
        } catch (error) {
          alert(error);
          console.log(error);
        }
      }

      commit("LOAD_SHIPS", data.data.results);
      commit("SET_ID");
      commit("SET_PHOTO");
    },
    createNewUser({ commit }, payload) {
      commit("createNewUser", payload);
      commit("setCurrentUser", payload);
      console.log("User created", payload);
    },
    checkCurrentUser({ commit }) {
      commit("checkCurrentUser");
    },
    checkUsers({ commit }) {
      commit("checkUsers");
    },
    deleteUsers({ commit }) {
      commit("deleteUsers");
    },
    logOut({ commit }) {
      commit("logOut");
      commit("checkCurrentUser");
      console.log("User logged off");
    },
    async logUser({ commit }, payload) {
      await commit("logUser", payload);
      commit("checkCurrentUser");
    },
  },
  modules: {
  }
})
