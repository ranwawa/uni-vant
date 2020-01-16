import Vue from 'vue';
import App from './App';
import section from '@/pages/components/section.vue';

Vue.component('uv-section', section);
Vue.config.productionTip = false;
App.mpType = 'app';
const app = new Vue({
  ...App,
});
app.$mount();
