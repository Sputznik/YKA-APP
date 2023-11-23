<template>
  <AppUI>
    <template v-slot:appbody>
      <div class="page-container text-center">
        <h1 class="text-8xl font-bold my-6 text-gray">404</h1>
        <h2 class="text-2xl mb-4">Ah! You broke the internet!</h2>
        <p class="font-thin text-lg mb-4">
          Just kidding... what you are looking for couldn't be found.
        </p>
        <p class="font-thin text-lg">
          Or the post you were looking for was redirected or deleted.
        </p>
        <p class="font-thin text-lg">
          Or, you could head to our
          <router-link class="underline" :to="{ name: 'Home' }" replace>
            homepage
          </router-link>
        </p>
      </div>
    </template>
  </AppUI>
</template>
<script>
import AppUI from "@/components/app-ui/AppUI.vue";

export default {
  name: "NotFound",
  components: {
    AppUI,
  },
};
</script>
