<template>
  <div id="app-footer" v-if="showFooter">
    <ul class="footer-list">
      <li v-for="item in items" :key="item">
        <router-link :to="{ name: item.routeName }" class="hover:opacity-80">
          <Icon
            class="text-black h-5 w-5"
            :type="item.icon"
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
          icon: "Home",
          routeName: "Home",
          allowedRoutes: ["Home"],
        },

        {
          icon: "Members",
          routeName: "Members",
          allowedRoutes: ["Members", "SingleMember"],
        },
        {
          icon: "Event",
          routeName: "Events",
          allowedRoutes: ["Events", "SingleEvent"],
        },
        {
          icon: "Comment",
          routeName: "Comments",
          allowedRoutes: ["Comments"],
        },
        {
          icon: "Profile",
          routeName: "Profile",
          allowedRoutes: ["Profile"],
        },
      ],
    };
  },
};
</script>
