import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import "./assets/tailwind.css";
import "./assets/global.css";
import OrbitPosts from "@/lib/OrbitPosts.vue";

const app = createApp(App);

app.component("OrbitPosts", OrbitPosts);

// createApp(App).use(store).use(router).mount("#app");

app.use(store).use(router).mount("#app");
