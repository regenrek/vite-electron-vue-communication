import {createApp} from 'vue';
import App from '/@/App.vue';
import router from '/@/router';
import store from '/@/store';
import environment from '../../core/src/index';

createApp(App)
  .use(router)
  .use(store)
  .mount('#app');

environment.connectToStore(store);