<template>
  <component
    :is="component"
    :post="post"
    :key="post.slug"
    status="success"
  ></component>
</template>

<script>
import { ref } from "vue";
import { useRoute } from "vue-router";

export default {
  name: "SingleBase",
  props: {
    type: String,
    template: String,
  },
  setup(props) {
    var component = ref(props.template);
    const route = useRoute();

    const post = JSON.parse(history.state.post);

    return {
      post,
      component,
    };
  },
};
</script>
