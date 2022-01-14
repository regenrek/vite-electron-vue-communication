import 'virtual:windi.css';
import './styles/index.css';

import { createApp } from 'vue';
import App from '/@/App.vue';
import router from '/@/router';
import { startTrackingWindowVisibility } from '/@/utils/telemetry';
import 'ant-design-vue/dist/antd.css';

createApp(App)
  .use(router)
  .mount('#app-root');

  
startTrackingWindowVisibility('hidden');
