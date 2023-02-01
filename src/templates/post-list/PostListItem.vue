<template>
  <article
    class="mb-6 flex"
    :class="[hasFeaturedImage ? 'justify-between' : null, post.type]"
  >
    <router-link
      :to="getPostLink(post)"
      class="thumbnail-bg h-32 w-1/3 rounded-2xl bg-gray"
      v-if="hasFeaturedImage"
    >
      <FeaturedImage
        :media_id="post.featured_media"
        v-if="post.featured_media"
        :key="post.featured_media"
      />
    </router-link>
    <div v-else class="h-32"></div>
    <div
      class="post-content flex flex-col justify-between"
      :class="[
        hasFeaturedImage
          ? 'w-2/3 pl-6'
          : 'w-full p-6 border border-light-gray flex-1',
      ]"
    >
      <router-link :to="getPostLink(post)">
        <h5
          class="font-bold leading-5 md:leading-6 sm:leading-5 text-lg mt-0"
          v-html="truncate(post.title.rendered)"
        ></h5>
      </router-link>
      <div class="flex flex-wrap justify-between gap-2 text-sm w-full">
        <OrbitAuthor
          :params="{ style: 'AuthorName', id: post.author }"
          v-if="post.author"
        />
        <OrbitTerm
          v-if="getFirstCategory(post)"
          :params="{ style: 'TermName', id: getFirstCategory(post) }"
        />
      </div>
    </div>
  </article>
</template>

<script>
import Util from "@/lib/Util";
import OrbitTerm from "@/lib/OrbitTerm.vue";
import OrbitAuthor from "@/lib/OrbitAuthor.vue";
import FeaturedImage from "@/templates/post/FeaturedImage.vue";

export default {
  name: "PostListItem",
  props: {
    post: Object,
  },
  components: {
    OrbitTerm,
    OrbitAuthor,
    FeaturedImage,
  },
  computed: {
    hasFeaturedImage() {
      return this.post.featured_media ? true : false;
    },
  },
  methods: {
    truncate: (text) => Util.truncate(text),
    getPostLink: (post) => Util.getPostLink(post),
    getFirstCategory: (post) =>
      post.categories && post.categories.length ? post.categories[0] : 0,
  },
};
</script>

<style scoped>
.thumbnail-bg {
  flex: 0 0 180px;
  height: 120px;
  @apply overflow-hidden;
}

.post-content {
  flex-basis: calc(100% - 180px);
}

@media (max-width: 768px) {
  .thumbnail-bg {
    flex-basis: 120px;
  }

  .post-content {
    flex-basis: calc(100% - 120px);
  }
}
</style>
