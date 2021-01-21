// Core
import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './app.vue';
import VueMeta from 'vue-meta';

Vue.use(VueMeta, {
  // optional pluginOptions
  refreshOnceOnNavigation: true
});

// Environment
import dotenv from 'dotenv';
dotenv.config();

// Store
import store from './store';

// Global components
import Globals from './global-components.js';
Globals.forEach(component => {
  Vue.component(component.name, component);
});

// Cookies
import VueCookies from 'vue-cookies';
Vue.use(VueCookies);

// Jquery
import jquery from 'jquery';
window.$ = jquery;
window.jquery = jquery;

// Styles
// Fonts
import './assets/scss/_fonts.scss';
import './assets/scss/_global.scss';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'bootstrap/dist/js/bootstrap.js';

// Plugins
import { BootstrapVue } from 'bootstrap-vue';
Vue.use(BootstrapVue);

// Masonry (will probably get removed in the very very near future lmao)
import { VueMasonryPlugin } from 'vue-masonry';
Vue.use(VueMasonryPlugin);

// Clipboard (might find a better one or code it myself idk)
import clipboard from 'v-clipboard';
Vue.use(clipboard);

// FUNCTIONS
// Let's be honest i will 1000% refactor this.
let filter = (text, length, clamp) => {
  clamp = clamp || '...';
  let node = document.createElement('div');
  node.innerHTML = text;
  let content = node.textContent;
  return content.length > length ? content.slice(0, length) + clamp : content;
};
Vue.filter('truncate', filter);

// Router
import router from './routes';
Vue.use(VueRouter);

// Mount Vue
const app = new Vue({
  render: h => h(App),
  router,
  store: store
});
app.$mount('#srs');
