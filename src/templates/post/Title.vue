<template>
  <h1
    v-if="status == 'success' && post.title"
    v-html="post.title.rendered"
    class="post-title mb-6 font-bold font-poppins text-2xl md:text-3xl"
  ></h1>
  <div class="h-8 bg-lighter-gray rounded animate-pulse mb-6" v-else></div>
</template>

<script>
export default {
  props: {
    post: Object,
    status: String,
  },
};
</script>
