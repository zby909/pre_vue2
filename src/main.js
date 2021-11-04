import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import 'normalize.css';
import '@/style/index';
import '@/plugins/vant';
import '@/utils/directives';
import '@/style/iconfont/iconfont';
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
