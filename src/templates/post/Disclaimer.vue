<template>
  <h4 v-if="status == 'success'" class="self-note italic font-medium text-sm border-light-gray border-b-2 opacity-50 pb-4 mt-6 mb-6">
    This post has been self-published. Youth Ki Awaaz neither endorses, nor is responsible for the views expressed by the author.
  </h4>
  <div class="h-4 bg-lighter-gray rounded animate-pulse mt-6 mb-6" v-else></div>
</template>
<script>

export default{
  props: {
    post: Object,
    status: String
  }
}
</script>
