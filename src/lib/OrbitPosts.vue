<template>
  <div class="orbit-posts" ref="scrollComponent">
    <slot name="title" v-if="items.length"></slot>
    <component
      v-bind="$attrs"
      :is="params.style"
      :posts="items"
      :total="total"
      v-if="status == 'success'"
    ></component>
    <slot name="loadingAnimation" v-else></slot>
    <slot name="nextPageAnimation" v-if="isFetchingNextPage"></slot>
    <slot name="whenempty" v-if="!items.length && status == 'success'"></slot>
  </div>
</template>
<script>
import { members } from "@/sample-data";
import MemberList from "@/templates/member-list/MemberList.vue";

export default {
  name: "OrbitPosts",
  props: {
    params: Object,
  },
  components: {
    MemberList,
  },
  data() {
    return {
      items: [],
      total: 0,
      status: "fail",
      isFetchingNextPage: true,
    };
  },
  created() {
    this.$store.state.processing = true;
    setTimeout(() => {
      this.items = members;
      this.total = this.members ? this.members.length : 0;
      this.status = "success";
      this.isFetchingNextPage = false;
      this.$store.state.processing = false;
    }, 1500);
  },
};
</script>
