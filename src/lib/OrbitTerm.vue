<template>
  <component :is="params.style" :term="term" :status="status"></component>
</template>

<script>
import API from "@/api.js";
import { computed } from "vue";
import { useQuery } from "vue-query";

export default {
  props: {
    params: Object,
  },
  components: {},

  setup(props) {
    function getTerm() {
      return API.requestTerm(props.params.id, "categories");
    }

    const { status, data } = useQuery("termQuery" + props.params.id, getTerm);

    const term = computed(() =>
      data.value && data.value.data ? data.value.data : {}
    );

    return {
      term,
      status,
    };
  },
};
</script>
