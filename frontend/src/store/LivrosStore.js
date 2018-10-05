import nocover from '../../static/no-cover.jpg'

export default {
  state: {
    livros: [],
    nocover: nocover
  },

  mutations: {
    setLivros(state, payload) {
      state.livros = payload;
    },

  },

  actions: {
    atualizarListaDeLivros({ commit }, livros) {
      commit('setLivros', livros);
    },
  },

  getters: {

  }
}
