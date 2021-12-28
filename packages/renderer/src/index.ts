import 'virtual:windi.css';
import './styles/index.css';

import { createApp } from 'vue';
import App from '/@/App.vue';
import router from '/@/router';
import { startTrackingWindowVisibility } from '/@/utils/telemetry';

createApp(App)
  .use(router)
  .mount('#app-root');

  
startTrackingWindowVisibility('hidden');
