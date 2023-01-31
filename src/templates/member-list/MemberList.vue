<template>
  <ul class="divide-y divide-lightgray">
    <li class="py-3 sm:py-4" v-for="member in authors" :key="member.id">
      <div class="flex items-center space-x-4">
        <div class="flex-shrink-1">
          <a class="p-0.5 inline-block">
            <!-- <img
              class="bg-lightgray w-12 h-12 object-cover rounded-full inline-block ring-white ring-2"
              :src="member.avatar"
              :alt="member.name"
              v-if="member.name"
            /> -->
            <span
              class="bg-lightgray w-12 h-12 object-cover rounded-full font-semibold inline-block ring-white ring-2 flex items-center justify-center"
              v-if="member.name"
            >
              {{ member.name[0] }}
            </span>
          </a>
        </div>
        <div class="flex-1 min-w-0">
          <a
            v-if="member.name"
            v-html="member.name"
            class="text-lg leading-tight"
          ></a>
          <p class="text-sm text-gray">Last seen just now</p>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  name: "MemberList",
  props: {
    authors: Array,
  },
};
</script>
