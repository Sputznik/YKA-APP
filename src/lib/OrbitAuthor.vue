<template>
  <component :is="params.style" :author="author" :status="status"></component>
</template>

<script>
import API from "@/api.js";
import { computed } from "vue";
import { useQuery } from "vue-query";

import AuthorName from "@/templates/author/AuthorName.vue";

export default {
  props: {
    params: Object,
  },
  components: {
    AuthorName,
  },

  setup(props) {
    const getAuthor = () => API.requestUser(props.params.id);

    const { status, data } = useQuery(
      "authorQuery" + props.params.id,
      getAuthor
    );

    const author = computed(() =>
      data.value && data.value.data ? data.value.data : {}
    );

    return {
      author,
      status,
    };
  },
};
</script>
