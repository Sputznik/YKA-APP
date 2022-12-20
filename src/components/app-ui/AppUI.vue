<template>
  <div class="app-ui">
    <AppHeader
      :title="title"
      :colors="colors"
      :scrolled="scrolled"
      :move_sticky_up="move_sticky_up"
      :stickytitle_classes="stickytitle_classes"
    >
      <template v-for="(index, name) in $slots" v-slot:[name]>
        <slot :name="name" />
      </template>
    </AppHeader>
    <AppMainTitle
      :hide_maintitle="hide_maintitle"
      :maintitle_classes="maintitle_classes"
      :title="title"
      :colors="colors"
      :scrolled="scrolled"
      :move_sticky_up="move_sticky_up"
      :stickytitle_classes="stickytitle_classes"
    >
      <template v-for="(index, name) in $slots" v-slot:[name]>
        <slot :name="name" />
      </template>
    </AppMainTitle>
    <AppProgressBar />
    <div class="p-4 bg-white min-h-screen" :class="`${body_classes}`">
      <slot name="appbody"></slot>
    </div>
    <AppFooter :hide_footer="hide_footer" />
  </div>
</template>

<script>
import { ref } from "vue";
import { helper } from "@/lib/helper";
import AppHeader from "./AppHeader.vue";
import AppMainTitle from "./AppMainTitle.vue";
import AppFooter from "./AppFooter.vue";
import AppProgressBar from "./AppProgressBar";

export default {
  name: "AppUI",
  props: {
    configUI: Object,
    title: String,
  },
  components: {
    AppHeader,
    AppMainTitle,
    AppProgressBar,
    AppFooter,
  },
  data() {
    return {
      scrolled: false,
      move_sticky_up: false,
    };
  },
  setup(props) {
    // console.log(props);
    const maintitle_classes = ref(null);
    maintitle_classes.value =
      props.configUI && props.configUI.maintitle_classes
        ? props.configUI.maintitle_classes
        : "";
    const stickytitle_classes = ref(null);
    stickytitle_classes.value =
      props.configUI && props.configUI.stickytitle_classes
        ? props.configUI.stickytitle_classes
        : "";
    const body_classes = ref(null);
    body_classes.value =
      props.configUI && props.configUI.body_classes
        ? props.configUI.body_classes
        : "";
    const colors = ref(null);
    colors.value =
      props.configUI && props.configUI.colors
        ? props.configUI.colors
        : "bg-purple text-white";
    const hide_maintitle = ref(null);
    hide_maintitle.value =
      props.configUI && props.configUI.hide_maintitle
        ? props.configUI.hide_maintitle
        : false;
    const hide_footer = ref(null);
    hide_footer.value =
      props.configUI && props.configUI.hide_footer
        ? props.configUI.hide_footer
        : false;
    return {
      maintitle_classes,
      stickytitle_classes,
      body_classes,
      colors,
      hide_maintitle,
      hide_footer,
    };
  },
  mounted() {
    const component = this;

    const { debounceEvent } = helper();

    window.addEventListener("scroll", function () {
      debounceEvent(() => {
        if (window.scrollY > 34) {
          component.scrolled = true;
        } else {
          component.scrolled = false;
        }
      }, 10);
    });
  },
};
</script>

<style>
.header-list,
.footer-list {
  @apply items-center flex;
}
.header-list li,
.footer-list li {
  @apply flex-auto;
}

#app-footer {
  @apply sticky z-10 bg-lightergray bottom-0 w-full border-t border-gray;
}

.footer-list li {
  @apply p-2 pb-6 text-center;
}
.footer-list li svg {
  @apply inline-block;
}

.header-list li {
}

.header-list li:nth-child(1),
.header-list li:nth-child(3) {
  @apply w-8;
}

.header-list li:nth-child(1) {
  @apply pl-1;
}

.header-list li:nth-child(2) {
  @apply text-center px-2;
}

.header-list li:nth-child(3) {
  @apply pr-1;
}

.maintitle {
  @apply text-2xl p-4 pt-4 bg-purple text-white border-b border-lightgray;
}
</style>
