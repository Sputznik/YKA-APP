<template>
  <div class="post-description">
    <RenderHtml
      v-if="status == 'success' && post.content"
      :html="post.content.rendered"
    />
    <div
      class="h-96 bg-lighter-gray rounded animate-pulse mt-6 mb-6"
      v-else
    ></div>
  </div>
</template>
<script>
import Util from "@/lib/Util";
import RenderHtml from "@/lib/RenderHtml";

export default {
  props: {
    post: Object,
    status: String,
  },
  components: {
    RenderHtml,
  },
  setup(props) {
    if (props.post && props.post.content && props.post.content.rendered) {
      Util.appendScripts(props.post.content.rendered);
    }
  },
};
</script>

<style>
.post-description p {
  @apply my-6 text-lg;
}
.post-description iframe {
  @apply max-w-full;
}
.post-description a[href] {
  @apply text-dark-red underline;
}
.post-description h1,
.post-description h2,
.post-description h3,
.post-description h4 {
  @apply font-bold mt-8;
}
.post-description h1 {
  @apply text-4xl;
}
.post-description h2 {
  @apply text-3xl;
}
.post-description h3 {
  @apply text-2xl;
}
.post-description h4 {
  @apply text-lg;
}
</style>
