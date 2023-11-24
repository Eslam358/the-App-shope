import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./stores";
import { createPinia } from "pinia";

import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import "@mdi/font/css/materialdesignicons.css";
const Vuetify = createVuetify({
  components,
  directives,
});
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import mitt from "mitt";
const emitter = mitt();
const Pinia = createPinia();
createApp(App)
  .use(store)
  .use(Vuetify)
  .use(Pinia)
  .use(router)
  .provide("emitter", emitter)
  .mount("#app");
