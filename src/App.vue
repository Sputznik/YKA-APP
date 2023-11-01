<template>
  <SplashScreen v-if="!appLoaded" />
  <router-view v-else :key="$route.fullPath" />
</template>

<script>
import API from "@/api";
import SplashScreen from "@/components/SplashScreen.vue";

export default {
  data() {
    return {
      appLoaded: false,
    };
  },
  components: {
    SplashScreen,
  },
  methods: {},
  mounted() {
    API.requestAppSettings().then((response) => {
      if (response.status === 200) {
        window.yka_app = response.data;
        this.appLoaded = true;
      }
    });
  },
};
</script>
