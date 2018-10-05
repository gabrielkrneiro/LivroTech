import Vue from 'vue';
import VueRouter from 'vue-router';
import HomePage from '../components/HomePage/HomePage.vue';
import LoginPage from '../components/LoginPage/LoginPage.vue';
import AdminPage from '../components/AdminPage/AdminPage.vue';

import store from '../store/index.js';

// rotas importadas
import AutorRotas from './AutorRotas';
import CategoriasRotas from './CategoriasRotas';
import LivroRotas from './LivroRotas';
import UsuarioRotas from './UsuarioRotas';
import PerfilRotas from './PerfilRotas';

// modelos
import Usuario from '../models/Usuario.js';


Vue.use(VueRouter);

const rotasComuns = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage,
  },
  {
    path: '/login',
    name: 'LoginPage',
    component: LoginPage,
  }
]

const rotasInvalidas = [
  {
    path: '/*',
    name: 'Error',
    component: HomePage,
  },
]

// const protegeRotas = (to, from ,next) => {
//   if(localStorage.getItem('email')){
//     next();
//   }
//   next(false);
// }

const rotasProtegidas = [
  {
    path: '/admin',
    name: 'AdminPage',
    component: AdminPage,
    meta: { requiresSession: true }
  },
  ...AutorRotas,
  ...CategoriasRotas,
  ...LivroRotas,
  ...UsuarioRotas,
  ...PerfilRotas
]

const router = new VueRouter({
  mode: 'history',
  routes: [
    ...rotasProtegidas,
    ...rotasComuns,
    ...rotasInvalidas
  ],
});

 // protegendo as rotas
router.beforeEach((to, from, next) => {

  const reqSession = to.matched.some(route => route.meta.requiresSession);

  if (!reqSession) { // se NAO for necessario estar logado
    if (router.app.$session.get('usuario')) { // se houver usuario na sessao do navegador
      let usuario = router.app.$session.get('usuario');
      usuario = new Usuario({ nome: usuario.nome, email: usuario.email });
      usuario
        .estaLogado()
        .then(response => {
          if (response.logado) {
            store.commit('setUsuario', {
              email: usuario.email,
              nome: usuario.nome
            });
            next();
          }
        })
        .catch(error => console.log(error));
    } else {
      next();
    }

    next()
  } else { // se for necessario estar logaddo
    let usuario = router.app.$session.get('usuario');
    if (usuario != false && usuario != undefined) {

      usuario = new Usuario({ nome: usuario.nome, email: usuario.email });
      usuario
        .estaLogado()
        .then(response => {

          if (response.logado) {
            store.commit('setUsuario', {
              email: usuario.email,
              nome: usuario.nome
            });

            if (response.perfil.nome == 'Administrador') {
              next();
            } else {
              next({ name: 'HomePage' });
            }

          } else {

            store.dispatch('resetarUsuarioNoSistema');
            next({ name: 'LoginPage' });
          }

        })
        .catch(error => console.log(error));
    } else {
      next({ name: 'LoginPage' });
    }
  }
});

export default router;
