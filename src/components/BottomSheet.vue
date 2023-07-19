<template>
  <div
    :key="`bottom-sheet-${bottomSheetId}`"
    class="bottom-sheet"
    :class="{ 'bottom-sheet-active': showBottomSheet }"
  >
    <div class="bottom-sheet-dialog" :class="dialogClasses">
      <div class="bottom-sheet-body" :class="bodyClasses">
        <slot name="body">Add Bottom Sheet Content</slot>
      </div>
    </div>
    <div
      class="bottom-sheet-backdrop"
      :class="backDropClasses"
      :data-toggle-bottom-sheet="bottomSheetId"
    ></div>
  </div>
</template>
<script>
export default {
  name: "BottomSheet",
  props: {
    bodyClasses: String,
    dialogClasses: String,
    backDropClasses: String,
    isOpen: {
      type: Boolean,
      default: false,
    },
    bottomSheetId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      showBottomSheet: false,
    };
  },
  methods: {
    handleToggleBottomSheet(ev) {
      if (ev.target.dataset.toggleBottomSheet === this.bottomSheetId) {
        this.showBottomSheet = !this.showBottomSheet;
        document.body.classList.toggle("overflow-y-hidden"); // Show / Hide scrollbar
      }
    },
  },
  mounted() {
    this.showBottomSheet = this.isOpen;
  },
  beforeMount() {
    window.addEventListener("click", this.handleToggleBottomSheet);
  },
  beforeUnmount() {
    window.removeEventListener("click", this.handleToggleBottomSheet);
  },
};
</script>
<style>
.bottom-sheet-dialog {
  z-index: 1004;
  transform: translateY(110%);
  transition-duration: 0.2s;
  transition-property: transform;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  @apply w-full min-h-0 fixed left-0 bottom-0 rounded-t-3xl bg-white text-black;
}

.bottom-sheet-active .bottom-sheet-dialog {
  transform: translateY(0);
}

.bottom-sheet-body {
  @apply h-full py-4 px-3 overflow-x-hidden overflow-y-auto rounded-t-3xl select-none;
}

.bottom-sheet-backdrop {
  z-index: 1;
  transition: opacity 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  @apply absolute top-0 left-0 w-full bg-black opacity-0;
}

.bottom-sheet-active .bottom-sheet-backdrop {
  z-index: 1003;
  @apply opacity-30 h-full;
}
</style>
