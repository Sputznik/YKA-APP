<template>
  <router-link
    v-bind="$attrs"
    :to="getAuthorLink(author)"
    v-if="status == 'success'"
    class="author-avatar h-12 w-12 overflow-hidden"
  >
    <img
      :src="author.yka_avatar_url"
      class="rounded-full w-full h-full object-cover"
    />
  </router-link>
  <div
    v-else
    v-bind="$attrs"
    class="author-avatar animate-pulse h-12 w-12"
  ></div>
</template>
<script>
import Util from "@/lib/Util";

export default {
  name: "AuthorAvatar",
  props: {
    author: Object,
    status: String,
  },
  methods: {
    getAuthorLink: (author) => Util.getAuthorLink(author),
  },
};
</script>

<style scoped>
.author-avatar {
  @apply rounded-full flex items-center justify-center text-3xl bg-light-gray;
}
</style>
