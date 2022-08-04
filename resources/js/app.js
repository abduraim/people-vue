import './bootstrap';

import { createApp } from 'vue';
import router from './router';

import App from './App.vue';

const app = createApp(App);

import NewsItem from "./components/news/NewsItem.vue";

app.component("NewsItem", NewsItem)

app
    .use(router)
    .mount('#app');