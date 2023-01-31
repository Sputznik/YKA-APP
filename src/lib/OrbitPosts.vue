<template>
  <div class="orbit-posts" ref="scrollComponent">
    <slot name="title" v-if="items.length"></slot>
    <component
      v-bind="$attrs"
      :is="params.style"
      :posts="items"
      v-if="status == 'success'"
    ></component>
    <slot name="loadingAnimation" v-else></slot>
    <slot name="nextPageAnimation" v-if="isFetchingNextPage"></slot>
    <slot name="whenempty" v-if="!items.length && status == 'success'"></slot>
  </div>
</template>
<script>
import API from "@/api";
import Util from "@/lib/Util";
import { onMounted, onUnmounted, computed } from "vue";

import OrbitQuery from "@/lib/OrbitQuery";

export default {
  props: {
    params: Object,
  },
  components: {},
  setup(props) {
    const params = computed(() => {
      var params = Util.removeEmptyParams(
        JSON.parse(JSON.stringify(props.params))
      );

      params.post_type = params.post_type ? params.post_type : "posts";
      return params;
    });

    //console.log( params.value );

    const requestAPI = (params) => API.requestPosts(params.post_type, params);

    const { items, watchScroll, scrollComponent, status, isFetchingNextPage } =
      OrbitQuery(params.value, requestAPI);

    const handleScroll = () => {
      Util.debounceEvent(function () {
        watchScroll();
      }, 50);
    };

    onMounted(() => {
      if (props.params.pagination) {
        window.addEventListener("scroll", handleScroll);
      }
    });

    onUnmounted(() => {
      if (props.params.pagination) {
        window.removeEventListener("scroll", handleScroll);
      }
    });

    return {
      items,
      status,
      scrollComponent,
      isFetchingNextPage,
    };
  },
};
</script>
