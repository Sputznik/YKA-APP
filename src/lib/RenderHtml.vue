<template>
  <component :is="getComponent()" :block="block"></component>
</template>
<script>
import { compile, h } from "vue/dist/vue.esm-bundler.js";

export default {
  props: {
    html: String,
  },
  setup(props) {
    var html = "";
    html = props.html.replace(
      /<script[^>]*>(?:(?!<\/script>)[^])*<\/script>/g,
      ""
    );
    html = html.replace(/<style[^>]*>(?:(?!<\/style>)[^])*<\/style>/g, "");

    return () => h(compile(html));
  },
};
</script>
