<template>
  <div class="app-ui">
    <PrimaryAppBar
      :title="title"
      :scrolled="scrolled"
      :class="appbarClasses"
      :showSecondaryAppbar="showSecondaryAppbar"
    >
      <template v-for="(index, name) in $slots" v-slot:[name]>
        <slot :name="name" />
      </template>
    </PrimaryAppBar>
    <SecondaryAppBar
      ref="secondaryAppBar"
      :title="title"
      :class="appbarClasses"
      :showSecondaryAppbar="showSecondaryAppbar"
    >
      <template v-for="(index, name) in $slots" v-slot:[name]>
        <slot :name="name" />
      </template>
    </SecondaryAppBar>
    <AppProgressBar />
    <div class="p-4 bg-white min-h-screen" :class="bodyClasses">
      <slot name="appbody"></slot>
    </div>
    <AppFooter :showFooter="showFooter" />
  </div>
</template>

<script>
import Util from "@/lib/Util";
import AppFooter from "./AppFooter.vue";
import AppProgressBar from "./AppProgressBar.vue";
import PrimaryAppBar from "./PrimaryAppBar.vue";
import SecondaryAppBar from "./SecondaryAppBar.vue";

export default {
  name: "AppUI",
  props: {
    title: String,
    bodyClasses: String,
    appbarClasses: String,
    showFooter: {
      type: Boolean,
      default: true,
    },
    showSecondaryAppbar: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    AppFooter,
    AppProgressBar,
    PrimaryAppBar,
    SecondaryAppBar,
  },
  data() {
    return {
      scrolled: false,
    };
  },
  methods: {
    getElementHeight(element) {
      return `${element.clientHeight}`;
    },
    handleScroll() {
      const component = this;

      const elementHeight = component.getElementHeight(
        this.$refs.secondaryAppBar.$el
      );

      Util.debounceEvent(function () {
        component.scrolled = window.scrollY > elementHeight;
      }, 100);
    },
  },
  mounted() {
    if (this.showSecondaryAppbar) {
      window.addEventListener("scroll", this.handleScroll);
    }
  },
  unmounted() {
    if (this.showSecondaryAppbar) {
      window.removeEventListener("scroll", this.handleScroll);
    }
  },
};
</script>

<style>
.primary-appbar .appbar-content,
.secondary-appbar .appbar-content {
  @apply flex items-center w-full;
}

.appbar-title {
  @apply flex-1 min-w-0 text-base overflow-hidden whitespace-nowrap overflow-ellipsis;
}

.appbar-append,
.appbar-prepend {
  @apply flex items-center;
}

.appbar-prepend {
  @apply pr-2 mr-auto;
}

.appbar-append {
  @apply pl-2 ml-auto flex gap-3;
}

.secondary-appbar .appbar-title {
  @apply text-2xl;
}

#app-footer {
  @apply sticky z-10 bg-lighter-gray bottom-0 w-full border-t border-gray;
}

.footer-list {
  @apply items-center flex;
}

.footer-list li {
  @apply flex-auto p-2 pb-6 text-center;
}

.footer-list li svg {
  @apply inline-block;
}
</style>
