<template>
  <div
    class="bg-orange p-2 px-8 my-4 rounded text-white text-center mx-auto w-48"
  >
    Loading
    <Icon icon="circular-loader" class="inline h-4 w-4" />
  </div>
</template>

<script>
import Icon from "@/components/Icon";

export default {
  name: "LoadMore",
  components: {
    Icon,
  },
};
</script>
