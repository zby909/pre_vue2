import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import 'normalize.css';
import '@/styles/index.scss';
import '@/plugins/vant';
import '@/directive/directives';
import '@/iconfont/iconfont';
import '@/components/index';
import apiModules from '@/api/index';
Vue.prototype.$API = apiModules;

Vue.config.productionTip = false;

let vm = new Vue({
  router,
  store,
  render: h => h(App),
});
vm.$mount('#app');
