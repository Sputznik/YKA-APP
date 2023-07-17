<template>
  <router-link
    v-bind="$attrs"
    :to="getAuthorLink(author)"
    class="hover:text-dark-red"
    v-if="status == 'success'"
  >
    <span class="capitalize">{{
      author.name ? author.name : author.slug
    }}</span>
  </router-link>
  <span
    v-else
    v-bind="$attrs"
    class="author-name inline-block h-2 w-10 bg-light-gray rounded animate-pulse"
  ></span>
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
