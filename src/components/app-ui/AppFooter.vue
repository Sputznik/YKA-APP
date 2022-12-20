<template>
  <div id="app-footer" v-if="!hide_footer">
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
import { ref } from "vue";
import Icon from "@/components/Icon";

export default {
  name: "AppFooter",
  props: {
    hide_footer: Boolean,
  },
  components: {
    Icon,
  },
  setup() {
    const items = ref([
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
    ]);

    return {
      items,
    };
  },
};
</script>
