<template>
  <keep-alive v-if="status == 'success'">
    <router-link
      :to="getTermLink(term)"
      class="hover:underline hover:text-dark-red"
      ><span>{{ term.name }}</span></router-link
    >
  </keep-alive>
  <span
    class="inline-block h-2 w-10 bg-light-gray rounded animate-pulse"
    v-else
  ></span>
</template>

<script>
import Util from "@/lib/Util";

export default {
  name: "TermName",
  props: {
    status: String,
    term: Object,
  },
  methods: {
    getTermLink: (term) => Util.getTermLink(term),
  },
};
</script>
