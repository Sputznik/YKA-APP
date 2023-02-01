<template>
  <AppUI title="Home">
    <template v-slot:headerright>
      <router-link :to="{ name: 'Home' }">
        <Icon type="Plus" class="inline text-white" />
      </router-link>
    </template>
    <template v-slot:appbody>
      <div class="home">
        <OrbitPosts :params="{ style: 'PostList', pagination: 1 }">
          <template v-slot:loadingAnimation>
            <PostListAnimation />
          </template>
          <template v-slot:nextPageAnimation>
            <LoadMore />
          </template>
          <template v-slot:whenempty>
            <div class="text-xs text-red border border-red p-2 mt-4">
              Sorry, we could not find any articles
            </div>
          </template>
        </OrbitPosts>
      </div>
    </template>
  </AppUI>
</template>

<script>
import Icon from "@/components/Icon.vue";
import LoadMore from "@/components/LoadMore.vue";
import AppUI from "@/components/app-ui/AppUI.vue";
import PostListAnimation from "@/templates/post-list/PostListAnimation.vue";

export default {
  name: "Home",
  components: {
    AppUI,
    Icon,
    LoadMore,
    PostListAnimation,
  },
};
</script>
