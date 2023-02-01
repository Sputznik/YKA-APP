<template>
  <div class="post-list" v-if="posts.length">
    <PostListItem v-for="post in posts" :key="post.id" :post="post" />
  </div>
</template>

<script>
import PostListItem from "@/templates/post-list/PostListItem.vue";

export default {
  name: "PostList",
  props: {
    posts: Array,
  },
  components: { PostListItem },
};
</script>
