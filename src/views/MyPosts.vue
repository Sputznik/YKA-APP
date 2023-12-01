<template>
  <AppUI title="My Posts">
    <template v-slot:appbody>
      <div class="home">
        <OrbitPosts
          :params="{ style: 'PostList', pagination: 1, author: loggedInUserId }"
        >
          <template v-slot:loadingAnimation>
            <PostListAnimation />
          </template>
          <template v-slot:nextPageAnimation>
            <LoadMore />
          </template>
          <template v-slot:whenempty>
            <p class="text-sm text-red border border-red p-2 mt-4">
              Could not find any posts.Start writing one.
            </p>
          </template>
        </OrbitPosts>
      </div>
    </template>
  </AppUI>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";

// Templates
import LoadMore from "@/components/LoadMore.vue";
import AppUI from "@/components/app-ui/AppUI.vue";
import PostListAnimation from "@/templates/post-list/PostListAnimation.vue";

export default {
  name: "MyPosts",
  components: {
    AppUI,
    LoadMore,
    PostListAnimation,
  },
  setup() {
    const store = useStore();
    const loggedInUserId = ref(store.state.account.id);

    return {
      loggedInUserId,
    };
  },
};
</script>
