<template>
  <router-link
    :to="getAuthorLink(author)"
    class="hover:text-dark-red"
    v-if="status == 'success'"
  >
    <span class="capitalize">{{
      author.name ? author.name : author.slug
    }}</span>
  </router-link>
  <div class="h-2 bg-light-gray rounded animate-pulse mb-2" v-else></div>
</template>

<script>
import Util from "@/lib/Util";

export default {
  name: "AuthorName",
  props: {
    author: Object,
    status: String,
  },
  methods: {
    getAuthorLink: (author) => Util.getAuthorLink(author),
  },
};
</script>
