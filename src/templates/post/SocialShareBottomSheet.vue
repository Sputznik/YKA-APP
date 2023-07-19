<template>
  <BottomSheet
    :bottomSheetId="shareId"
    dialogClasses="h-56"
    bodyClasses="flex justify-center items-center"
  >
    <template v-slot:body>
      <ul
        v-if="status == 'success'"
        class="social-share-icons flex flex-wrap items-start gap-2 justify-center"
      >
        <li v-for="icon in icons" :key="icon.name">
          <a
            v-if="icon.name != 'like'"
            target="_blank"
            :href="icon.url"
            :aria-label="icon.title"
            class="inline-block"
            :class="`icon-${icon.name}`"
            :data-toggle-bottom-sheet="shareId"
          >
            <Icon :icon="icon.name" />
          </a>
          <button
            v-else
            class="inline-flex items-center gap-2"
            :class="`icon-${icon.name}`"
            :data-toggle-bottom-sheet="shareId"
          >
            <Icon icon="arrow-up" />
            <span class="text-sm font-medium">10 Upvotes</span>
          </button>
        </li>
      </ul>
      <div class="h-4 bg-lighter-gray rounded animate-pulse mb-6" v-else></div>
    </template>
  </BottomSheet>
</template>

<script>
import Icon from "@/components/Icon.vue";
import BottomSheet from "@/components/BottomSheet.vue";

export default {
  name: "SocialShareBottomSheet",
  components: {
    Icon,
    BottomSheet,
  },
  props: {
    shareId: {
      type: String,
      requied: true,
    },
    post: Object,
    status: String,
  },
  data() {
    return {
      icons: [
        { name: "like", title: "Recommend this post" },
        {
          name: "facebook",
          title: "Share on Facebook",
          url: `https://www.facebook.com/sharer/sharer.php?u=${this.post.link}`,
        },
        {
          name: "twitter",
          title: "Share on Twitter",
          url: `https://twitter.com/intent/tweet?text=${this.post.title.rendered}&url=${this.post.link}`,
        },
        {
          name: "whatsapp",
          title: "Share on Whatsapp",
          url: `https://api.whatsapp.com/send?text=${this.post.link}`,
        },
      ],
      upvotes: null,
    };
  },
  methods: {},
};
</script>

<style>
.social-share-icons a,
.social-share-icons button {
  @apply rounded p-2 text-white;
}

.social-share-icons .icon-like {
  background-color: #ee1077;
  word-break: break-word;
}

.social-share-icons .icon-facebook {
  background-color: #3b5998;
}

.social-share-icons .icon-twitter {
  background-color: #1dcaff;
}
.social-share-icons .icon-whatsapp {
  background-color: #25d366;
}

.social-share-icons svg {
  @apply h-7 w-7;
}
</style>
