import { createRouter, createWebHistory } from "vue-router";
import store from "@/store";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/Home"),
  },
  {
    path: "/members",
    name: "Members",
    component: () => import("@/views/Members"),
  },
  {
    path: "/events",
    name: "Events",
    component: () => import("@/views/Events"),
  },
  {
    path: "/comments",
    name: "Comments",
    component: () => import("@/views/Comments"),
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import("@/views/Profile"),
  },
  {
    path: "/:year/:month/:slug",
    name: "SinglePost",
    component: () => import("@/views/SinglePost"),
  },
  {
    path: "/author/:slug",
    name: "Author",
    component: () => import("@/views/Author"),
  },
  {
    path: "/:taxonomy/:slug",
    name: "Archive",
    component: () => import("@/views/Archive"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to) {
    if (to.hash) {
      return { el: to.hash, behavior: "smooth" };
    }

    return { left: 0, top: 0 };
  },
});

router.beforeEach((to, from, next) => {
  if (to.name) {
    store.commit("setProcessing", true);
  }
  next();
});

router.afterEach(() => {
  store.commit("setProcessing", false);
});

export default router;
