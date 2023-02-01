<template>
  <div class="py-3 sm:py-4" v-for="i in total" :key="i">
    <div class="animate-pulse flex space-x-4">
      <div class="rounded-full bg-light-gray h-12 w-12"></div>
      <div class="flex-1 space-y-3 py-1">
        <div class="h-2 bg-light-gray rounded"></div>
        <div class="space-y-3">
          <div class="grid grid-cols-3 gap-4">
            <div class="h-2 bg-light-gray rounded col-span-2"></div>
            <div class="h-2 bg-light-gray rounded col-span-1"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MemberListAnimation",
  props: {
    total: {
      type: Number,
      default: 5,
    },
  },
};
</script>
