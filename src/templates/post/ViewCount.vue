<template>
  <div class="hidden"><!-- View Count Updated --></div>
  <div
    :key="post.id"
    class="my-6 pb-4 font-medium text-sm border-lighter-gray border-b-2"
    v-if="status == 'success'"
  >
    <p class="text-base" v-html="viewCount()"></p>
    <p class="text-gray text-xs">
      Views are calculated from the date of publishing and are visible only to
      the author of the post.
    </p>
  </div>
</template>

<script>
import Util from "@/lib/Util";

export default {
  props: {
    post: Object,
    status: String,
  },
  methods: {
    viewCount() {
      const viewCount = parseInt(this.post.view_count);
      return viewCount > 1
        ? `${Util.abbreviateNumber(viewCount)} reads`
        : `${viewCount} reads`;
    },
  },
};
</script>
