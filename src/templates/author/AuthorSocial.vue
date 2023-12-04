<template>
  <ul v-if="status == 'success'" class="user-social-links flex flex-wrap gap-3">
    <template v-for="(url, slug) in author.yka_user_social" :key="slug">
      <li v-if="url" :class="`my-3 user-social-${slug}-icon`">
        <a
          :href="url"
          :aria-label="slug"
          class="block"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon class="h-6 w-6 mx-auto" :icon="slug" aria-hidden="true" />
        </a>
      </li>
    </template>
  </ul>
</template>

<script>
import Icon from "@/components/Icon";

export default {
  name: "AuthorSocial",
  components: {
    Icon,
  },
  props: {
    author: Object,
    status: String,
  },
};
</script>

<style>
.user-social-facebook-icon {
  margin-left: -8px;
}
</style>
