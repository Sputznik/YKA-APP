<template>
  <div
    v-if="showSecondaryAppbar"
    class="secondary-appbar mt-0 transition-all duration-200 delay-50 relative p-4 bg-purple text-white"
  >
    <div class="appbar-content">
      <div v-html="title" class="appbar-title" v-if="title"></div>
      <div v-if="$slots.append" class="appbar-append">
        <slot name="append"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SecondaryAppBar",
  props: {
    title: String,
    showSecondaryAppbar: Boolean,
  },
};
</script>
