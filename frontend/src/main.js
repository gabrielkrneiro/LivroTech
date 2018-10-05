// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';

import VeeValidate from 'vee-validate';

import Buefy from 'buefy'

import 'buefy/lib/buefy.css'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import router from './router';

import VueSession from 'vue-session'

import App from './App';

import store from './store/index.js';

Vue.use(VueSession, {persist: true})
Vue.use(Buefy);
Vue.use(VeeValidate);
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
});
