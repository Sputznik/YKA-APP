<template>
  <AppUI title="Members">
    <template v-slot:headerright>
      <router-link :to="{ name: 'Members' }">
        <Icon type="Plus" class="inline text-white" />
      </router-link>
    </template>
    <template v-slot:appbody>
      <OrbitPosts
        :params="params"
        :key="params.unique_id"
        @totalChanged="totalChanged"
      >
        <template v-slot:loadingAnimation>
          <UserListAnimation :total="7" />
        </template>

        <template v-slot:nextPageAnimation>
          <LoadMore />
        </template>

        <template v-slot:whenempty>
          <div class="text-xs text-red border border-red p-2 mt-4">
            No members found for this query
          </div>
        </template>
      </OrbitPosts>
    </template>
  </AppUI>
</template>

<script>
import { ref } from "vue";
import Icon from "@/components/Icon.vue";
import AppUI from "@/components/app-ui/AppUI.vue";
import LoadMore from "@/components/LoadMore.vue";
import UserListAnimation from "@/components/animation/UserListAnimation.vue";

export default {
  name: "Members",
  components: {
    AppUI,
    Icon,
    LoadMore,
    UserListAnimation,
  },
  setup() {
    const totalItems = ref(0);

    const params = ref({
      unique_id: 1,
      per_page: 10,
      post_type: "inpursuit-members",
      style: "MemberList",
      orderby: "title",
      order: "asc",
      pagination: 1,
      search: "",
    });

    const onSearch = (searchText) => {
      // params.value.search = searchText
      // params.value.unique_id++;
      console.log("Search text: " + searchText);
    };

    // const totalChanged = (total) => (totalItems.value = total);

    const totalChanged = (total) => {
      console.log("Total Changed" + total);
    };

    return {
      params,
      onSearch,
      totalChanged,
      totalItems,
    };
  },
};
</script>
