<template>
  <AppUI title="Events">
    <template v-slot:headerright>
      <router-link :to="{ name: 'Events' }">
        <Icon icon="plus" class="inline text-white" />
      </router-link>
    </template>
    <template v-slot:appbody>Events</template>
  </AppUI>
</template>

<script>
import Icon from "@/components/Icon.vue";
import AppUI from "@/components/app-ui/AppUI.vue";

export default {
  name: "Events",
  components: {
    AppUI,
    Icon,
  },
};
</script>
