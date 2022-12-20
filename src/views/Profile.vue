<template>
  <AppUI
    title="Profile"
    :configUI="{
      maintitle_classes: 'hidden',
      stickytitle_classes: 'opacity-100',
    }"
  >
    <template v-slot:headerright>
      <router-link :to="{ name: 'Profile' }" class="text-xs text-white">
        Logout
      </router-link>
    </template>
    <template v-slot:appbody>Profile</template>
  </AppUI>
</template>

<script>
import AppUI from "@/components/app-ui/AppUI.vue";

export default {
  name: "Profile",
  components: {
    AppUI,
  },
};
</script>
