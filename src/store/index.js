import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate';
import axios from 'axios';
import router from '../router/index';

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    user: "",
    auth: ""
  },
  mutations: {
    user(state, paylord) {
      state.user = paylord;
    },
    auth(state, paylord) {
      state.auth = paylord;
    },
    logout(state, paylord) {
      state.auth = paylord;
    },
  },
  actions: {
    async login({ commit }, { email, password }) {
      const responseLogin = await axios.post(
        "https://calm-spire-40988.herokuapp.com/api/login",
        {
          email: email,
          password: password,
        }
      );
      const responseUser = await axios.get(
        "https://calm-spire-40988.herokuapp.com/api/user",
        {
          params: {
            email: email,
          },
        }
      );
      commit("auth", responseLogin.data.auth);
      commit("user", responseUser.data.data[0]);
      console.log(this.state.auth);
      router.replace("/home");
    },
    logout({ commit }) {
      axios.post("https://calm-spire-40988.herokuapp.com/api/logout", {
        auth: this.state.auth,
      })
        .then((response) => {
          console.log(response);
          commit("logout", response.data.auth);
          router.replace("/");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  getters: {
    username: state => state.user ? state.user.name : "",
    userid: state => state.user ? state.user.id : ""
  },
});
