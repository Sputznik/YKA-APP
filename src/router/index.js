// import { createRouter, createWebHashHistory } from "vue-router";
import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import Events from "@/views/Events.vue";
import Members from "@/views/Members.vue";
import Profile from "@/views/Profile.vue";
import Comments from "@/views/Comments.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/members",
    name: "Members",
    component: Members,
  },
  {
    path: "/events",
    name: "Events",
    component: Events,
  },
  {
    path: "/comments",
    name: "Comments",
    component: Comments,
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
