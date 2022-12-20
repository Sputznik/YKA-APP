<template>
  <AppUI title="Home">
    <template v-slot:headerright>
      <router-link :to="{ name: 'Home' }">
        <Icon type="Plus" class="inline text-white" />
      </router-link>
    </template>
    <template v-slot:appbody>
      <div class="home">HOMEPAGE</div>
    </template>
  </AppUI>
</template>

<script>
// @ is an alias to /src
import Icon from "@/components/Icon.vue";
import AppUI from "@/components/app-ui/AppUI.vue";

export default {
  name: "Home",
  components: {
    AppUI,
    Icon,
  },
};
</script>
