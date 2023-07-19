<template>
  <div class="primary-appbar h-14 p-4 sticky top-0 z-20 bg-purple text-white">
    <div class="appbar-content">
      <div v-if="$slots.prepend" class="appbar-prepend">
        <slot name="prepend"></slot>
      </div>
      <div
        v-if="title"
        v-html="title"
        :class="opacityClass"
        class="appbar-title transition-all"
      ></div>
      <div
        v-if="$slots.append"
        :class="opacityClass"
        class="appbar-append transition-all"
      >
        <slot name="append"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PrimaryAppBar",
  props: {
    title: String,
    scrolled: Boolean,
    showSecondaryAppbar: Boolean,
  },
  computed: {
    opacityClass() {
      return {
        "opacity-0": this.showSecondaryAppbar,
        "opacity-100": this.showSecondaryAppbar && this.scrolled,
      };
    },
  },
};
</script>
