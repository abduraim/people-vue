import './bootstrap';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

import BaseInput from "./components/base/BaseInput.vue";

const app = createApp(App);

app
    .component("BaseInput", BaseInput);

app
    .use(router)
    .mount('#app');