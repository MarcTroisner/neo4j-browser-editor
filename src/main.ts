import { createApp } from 'vue';
import { OhVueIcon } from 'oh-vue-icons';

import App from '@/App.vue';
import router from '@/router';
import pinia from '@/stores';
import '@/plugins/ohVueIcons';

import './assets/main.css';

const app = createApp(App);

app.use(pinia);
app.use(router);
app.component('VIcon', OhVueIcon);

app.mount('#app');
