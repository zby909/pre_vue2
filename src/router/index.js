import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

const constantModulesFiles = require.context('./modules', true, /\.routes\.js/);
const constantRoutes = constantModulesFiles.keys().reduce((modules, modulePath) => {
  const value = constantModulesFiles(modulePath).default;
  Array.isArray(value) ? modules.push(...value) : modules.push(value);
  return modules;
}, []);

const routes = [...constantRoutes];

const router = new VueRouter({
  mode: 'hash',
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  },
});

export default router;
