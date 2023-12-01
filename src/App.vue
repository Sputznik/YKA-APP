<template>
  <SplashScreen v-if="!appLoaded" />
  <router-view v-else :key="$route.fullPath" />
</template>

<script>
import { useStore } from "vuex";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

// Helpers
import API from "@/api";

// Templates
import SplashScreen from "@/components/SplashScreen.vue";

export default {
  name: "App",
  components: {
    SplashScreen,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const appLoaded = ref(false);

    // REDIRECT TO LOGIN PAGE IF NOT LOGGED IN
    const redirectToLogin = () => {
      store.commit("getAccountSettings");
      if (!store.state.account) router.push({ name: "Login", replace: true });
      return false;
    };

    onMounted(() => {
      API.requestAppSettings().then((response) => {
        if (response.status === 200) {
          window.yka_app = response.data;
          appLoaded.value = true;
          redirectToLogin();
        }
      });
    });

    return {
      appLoaded,
    };
  },
};
</script>
