import Vue from 'vue';
import Vuex from 'vuex';
// import router from '../router/index.js';
import LoginStore from './LoginStore.js';
import LivrosStore from './LivrosStore.js';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    login: LoginStore,
    livros: LivrosStore
  }
})
