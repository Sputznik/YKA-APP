<template>
  <AppUI title="Comments">
    <template v-slot:headerright>
      <router-link :to="{ name: 'Comments' }">
        <Icon type="Plus" class="inline text-white" />
      </router-link>
    </template>
    <template v-slot:appbody>Comments</template>
  </AppUI>
</template>

<script>
import Icon from "@/components/Icon.vue";
import AppUI from "@/components/app-ui/AppUI.vue";

export default {
  name: "Comments",
  components: {
    AppUI,
    Icon,
  },
};
</script>
