import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import "./assets/tailwind.css";
import "./assets/global.css";
import { VueQueryPlugin } from "vue-query";
import axios from "axios";
import VueAxios from "vue-axios";

import OrbitPosts from "@/lib/OrbitPosts.vue";

const VueQueryPluginOptions = {
  queryClientConfig: {
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  },
};

const app = createApp(App);

app.component("OrbitPosts", OrbitPosts);

// createApp(App).use(store).use(router).mount("#app");

app
  .use(VueQueryPlugin, VueQueryPluginOptions)
  .use(VueAxios, axios)
  .use(store)
  .use(router)
  .mount("#app");
