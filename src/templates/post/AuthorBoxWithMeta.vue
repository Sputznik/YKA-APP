<template>
  <div
    class="w-full flex items-center rounded-lg cursor-pointer mb-6"
    v-if="status == 'success'"
  >
    <div class="author-avatar-parent mr-4">
      <OrbitAuthor
        :key="post.author"
        :params="{ style: 'AuthorAvatar', id: post.author }"
      />
    </div>
    <div>
      <div class="text-sm">
        <OrbitAuthor
          :key="post.author"
          class="capitalize font-bold"
          :params="{ style: 'AuthorName', id: post.author }"
        />
      </div>
      <div class="meta text-xs text-gray">
        <span class="item mr-2">{{ formatDate(post.date) }}</span>
        <span
          class="item mr-2 dot"
          v-if="post.categories && post.categories.length"
        ></span>
        <slot
          name="metacategories"
          v-if="post.categories && post.categories.length"
        >
          <div
            class="item inline"
            v-for="(category_id, index) in post.categories"
            :key="category_id"
          >
            <OrbitTerm :params="{ style: 'TermName', id: category_id }" />
            <span v-if="index + 1 < post.categories.length">, </span>
          </div>
        </slot>
      </div>
    </div>
  </div>
  <div class="h-4 bg-lighter-gray rounded animate-pulse mb-6" v-else></div>
</template>
<script>
import Util from "@/lib/Util";
import OrbitTerm from "@/lib/OrbitTerm.vue";
import OrbitAuthor from "@/lib/OrbitAuthor.vue";

export default {
  name: "AuthorBoxWithMeta",
  props: {
    post: Object,
    status: String,
  },
  components: {
    OrbitTerm,
    OrbitAuthor,
  },
  methods: {
    formatDate: (dateString) => Util.formatDate(dateString),
  },
};
</script>
