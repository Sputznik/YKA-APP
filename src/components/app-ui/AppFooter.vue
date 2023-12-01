<template>
  <div id="app-footer" v-if="showFooter">
    <ul class="footer-list">
      <li v-for="item in items" :key="item">
        <router-link :to="{ name: item.routeName }" class="hover:opacity-80">
          <Icon
            :icon="item.icon"
            class="text-black h-5 w-5"
            :class="{ 'text-purple': item.allowedRoutes.includes($route.name) }"
          />
          <p
            class="text-xs pt-1"
            :class="{ 'text-purple': item.allowedRoutes.includes($route.name) }"
          >
            {{ item.routeName }}
          </p>
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script>
import Icon from "@/components/Icon.vue";

export default {
  name: "AppFooter",
  props: {
    showFooter: Boolean,
  },
  components: {
    Icon,
  },
  data() {
    return {
      items: [
        {
          icon: "home",
          routeName: "Home",
          allowedRoutes: ["Home"],
        },
        {
          icon: "search",
          routeName: "Search",
          allowedRoutes: ["Search"],
        },
        {
          icon: "archive",
          routeName: "MyPosts",
          allowedRoutes: ["MyPosts"],
        },
        {
          icon: "profile",
          routeName: "Profile",
          allowedRoutes: ["Profile"],
        },
        // {
        //   icon: "members",
        //   routeName: "Members",
        //   allowedRoutes: ["Members", "SingleMember"],
        // },
        // {
        //   icon: "event",
        //   routeName: "Events",
        //   allowedRoutes: ["Events", "SingleEvent"],
        // },
        // {
        //   icon: "comment",
        //   routeName: "Comments",
        //   allowedRoutes: ["Comments"],
        // },
      ],
    };
  },
};
</script>
