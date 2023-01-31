<template>
  <AppUI title="Members">
    <template v-slot:headerright>
      <router-link :to="{ name: 'Members' }">
        <Icon type="Plus" class="inline text-white" />
      </router-link>
    </template>
    <template v-slot:appbody>
      <OrbitAuthors
        :params="{
          per_page: 10,
          style: 'MemberList',
          pagination: 1,
        }"
      >
        <template v-slot:loadingAnimation>
          <MemberListAnimation :total="7" />
        </template>

        <template v-slot:nextPageAnimation>
          <LoadMore />
        </template>

        <template v-slot:whenempty>
          <div class="text-xs text-red border border-red p-2 mt-4">
            Sorry, we could not find any members
          </div>
        </template>
      </OrbitAuthors>
    </template>
  </AppUI>
</template>

<script>
import Icon from "@/components/Icon.vue";
import AppUI from "@/components/app-ui/AppUI.vue";
import LoadMore from "@/components/LoadMore.vue";
import OrbitAuthors from "@/lib/OrbitAuthors.vue";
import MemberListAnimation from "@/templates/member-list/MemberListAnimation.vue";

export default {
  name: "Members",
  components: {
    AppUI,
    Icon,
    LoadMore,
    OrbitAuthors,
    MemberListAnimation,
  },
};
</script>
