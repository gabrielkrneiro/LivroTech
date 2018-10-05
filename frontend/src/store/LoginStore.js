import router from '../router/index.js';

export default {
  state: {

      usuario: null,
      error: null
  },

  mutations: {

    setUsuario(state, payload) {
      state.usuario = payload;
    },

    setError(state, payload) {
      if (payload == null) {
        state.error = null;
      } else {
        state.error = new Error(payload);
      }
    }
  },

  actions: {

    logarUsuario({ commit, state }, usuario) {

      return usuario
        .logar()
        .then(
          response => {

            response.logado = true;

            commit('setError', null);

            commit('setUsuario', {
              email: response.email,
              nome: response.nome
            });

            this._vm.$session.start();
            this._vm.$session.set('usuario',{
              email: response.email,
              nome: response.nome
            });

            router.push({ name: 'AdminPage' });

          },
          error => commit('setError', error.message)
        );
    },

    deslogarUsuario({ dispatch }, usuario) {
      usuario
        .deslogar()
        .then(
          () => {
            dispatch('resetarUsuarioNoSistema');
            router.push({ name: 'HomePage' });
          }
        )
        .catch(error => console.log(error));
    },

    resetarUsuarioNoSistema({ commit }) {
      commit('setUsuario', false);
      this._vm.$session.destroy();
    }
  },

  getters: {

    usuarioNoVuex(state) {
      return state.usuario != false && state.usuario != undefined;
    },

    usuarioNoLocalStorage() {
      // return router.app.$session.get('usuario') != false && router.app.$session.get('usuario') != undefined;
      return router.app.$session.exists() && router.app.$session.get('usuario') != false && router.app.$session.get('usuario') != undefined;
    },

    existeErroNoLogin(state) {
      return state.error !== null && state.error !== undefined;
    }
  }
}
