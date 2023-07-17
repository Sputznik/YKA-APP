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
import PostBase from "@/templates/single/PostBase.vue";

export default {
  name: "SingleBase",
  props: {
    type: String,
    template: String,
  },
  components: { PostBase },
  setup(props) {
    var component = ref(props.template);

    const post = JSON.parse(history.state.post);

    return {
      post,
      component,
    };
  },
};
</script>
