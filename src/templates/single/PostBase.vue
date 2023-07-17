<template>
  <AppUI
    :title="post.title.rendered"
    :configUI="{
      maintitle_classes: 'hidden',
      stickytitle_classes: 'opacity-100',
      hide_maintitle: true,
      hide_footer: true,
    }"
  >
    <template v-slot:appbody>
      <div :class="`single-${post.type}`">
        <PostTitle :status="status" :post="post" />
        <AuthorBoxWithMeta :status="status" :post="post" />
        <PostViewCount :status="status" :post="post" v-if="post.id" />
        <PostFeaturedImage
          v-if="post.featured_media"
          :key="post.featured_media"
          :media_id="post.featured_media"
        />
        <PostDescription :status="status" :post="post" :key="post.content" />
        <PostDisclaimer :status="status" :post="post" />
        <div class="p-4 -mx-4 bg-lightest-gray" v-if="post.author">
          <OrbitPosts
            class="mb-16"
            :params="{
              author: post.author,
              style: 'PostList',
              per_page: 5,
              exclude: post.id,
            }"
            :key="post.author"
          >
            <template v-slot:title>
              <h4 class="font-bold font-2xl my-4">
                More from
                <OrbitAuthor
                  :params="{ id: post.author, style: 'AuthorName' }"
                />
              </h4>
            </template>
            <template v-slot:loadingAnimation>
              <PostListAnimation />
            </template>
          </OrbitPosts>
        </div>
      </div>
    </template>
  </AppUI>
</template>

<script>
import OrbitPosts from "@/lib/OrbitPosts.vue";
import OrbitAuthor from "@/lib/OrbitAuthor.vue";
import AppUI from "@/components/app-ui/AppUI.vue";
import PostTitle from "@/templates/post/Title.vue";
import PostViewCount from "@/templates/post/ViewCount.vue";
import PostDisclaimer from "@/templates/post/Disclaimer.vue";
import PostDescription from "@/templates/post/Description.vue";
import PostFeaturedImage from "@/templates/post/FeaturedImage.vue";
import AuthorBoxWithMeta from "@/templates/post/AuthorBoxWithMeta.vue";
import PostListAnimation from "@/templates/post-list/PostListAnimation.vue";

export default {
  name: "PostBase",
  props: {
    post: Object,
    status: String,
  },
  components: {
    AppUI,
    PostTitle,
    OrbitPosts,
    OrbitAuthor,
    PostViewCount,
    PostDisclaimer,
    PostDescription,
    PostFeaturedImage,
    AuthorBoxWithMeta,
    PostListAnimation,
  },
  methods: {},
};
</script>
