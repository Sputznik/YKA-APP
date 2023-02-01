<template>
  <div class="w-full bg-lighter-gray relative h-1 overflow-hidden">
    <div
      :class="{ hidden: !$store.state.processing }"
      class="w-full inline-block fluentProgressBar-waiting"
    ></div>
  </div>
</template>
<script>
export default {
  name: "AppProgressBar",
};
</script>
