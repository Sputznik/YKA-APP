<template>
  <AppUI
    title="Profile"
    :configUI="{
      maintitle_classes: 'hidden',
      stickytitle_classes: 'opacity-100',
    }"
  >
    <template v-slot:append>
      <button class="text-xs text-white" @click="handleLogout">Logout</button>
    </template>
    <template v-slot:appbody>
      <div class="flex flex-col items-center gap-y-2 text-center">
        <AuthorAvatar class="h-24 w-24" :author="author" :status="status" />
        <div class="author-meta">
          <AuthorName class="author-name" :author="author" :status="status" />
          <p>
            <strong>{{ location }}</strong>
          </p>
        </div>
        <div class="follow-numbers" v-if="follow">
          <button data-follow-status="following">
            {{ follow.no_following }} Following
          </button>
          |
          <button data-follow-status="followers">
            {{ follow.no_followers }} Followers
          </button>
        </div>
        <AuthorSocial :author="author" :status="status" />
        <div
          v-html="author.description"
          class="author-desc text-md font-light py-1"
        ></div>
      </div>
    </template>
  </AppUI>
</template>

<script>
import { useStore } from "vuex";
import { computed, ref } from "vue";
import { useQuery } from "vue-query";
import { useRouter } from "vue-router";

// Helpers
import API from "@/api";
import Util from "@/lib/Util";

// Templates
import AppUI from "@/components/app-ui/AppUI.vue";
import AuthorName from "@/templates/author/AuthorName.vue";
import AuthorSocial from "@/templates/author/AuthorSocial";
import AuthorAvatar from "@/templates/author/AuthorAvatar.vue";

export default {
  name: "Profile",
  components: {
    AppUI,
    AuthorName,
    AuthorAvatar,
    AuthorSocial,
  },
  setup() {
    const store = useStore();
    const router = useRouter();

    const loggedInUserId = ref(store.state.account.id);

    const getProfile = () => API.requestUser(loggedInUserId.value);

    const { status, data } = useQuery(
      `authorProfileQuery${loggedInUserId.value}`,
      getProfile
    );

    const author = computed(() =>
      data.value && data.value.data ? data.value.data : {}
    );

    const follow = computed(() => {
      return author.value?.follow
        ? Util.convertToObject(author.value.follow)
        : {};
    });

    const location = computed(() => {
      const { yka_user_state, yka_user_city } = author.value;

      return [yka_user_state, yka_user_city]
        .filter((location) => {
          return location;
        })
        .join(", ");
    });

    const handleLogout = () => {
      store.commit("flushAccountSettings");
      router.push({ name: "Login", replace: true });
    };

    return {
      author,
      follow,
      status,
      location,
      handleLogout,
    };
  },
};
</script>
