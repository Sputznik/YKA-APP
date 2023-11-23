<template>
  <component
    :is="template"
    :status="status"
    :post="currentPost"
    :key="currentPost.slug"
  ></component>
</template>

<script>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";

// Helpers
import API from "@/api";

// Templates
import PostBase from "@/templates/single/PostBase.vue";

const allowedTemplates = ["PostBase"];

export default {
  name: "SingleBase",
  props: {
    type: String,
    template: {
      type: String,
      required: true,
      validator: (value) => allowedTemplates.includes(value),
    },
  },
  components: { PostBase },
  setup(props) {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const slug = ref(route.params.slug);
    const status = computed(() => store.state.status);
    const currentPost = computed(() => store.state.post);

    // LOAD POST FROM BROWSER HISTORY API
    const cachedPost = window?.history?.state?.post
      ? JSON.parse(window?.history?.state?.post)
      : null;

    // SAVE THE POST IN STORE
    const setPost = (post) => {
      store.commit("setPost", post);
      store.commit("setStatus", "success");
    };

    // GET POST FROM THE SERVER
    const setPostFromServer = (slug) => {
      API.requestPosts(props.type, { slug: slug }).then((response) => {
        // IF THE RESPONSE IS AN EMPTY ARRAY, REDIRECT TO NOTFOUND PAGE WITHOUT MODIFYING THE URL
        // PRESERVE PATH, QUERY, HASH
        if (!response.data.length) {
          router.push({
            name: "NotFound",
            query: route.query,
            hash: route.hash,
            params: { pathMatch: route.path.substring(1).split("/") },
          });
          return;
        }

        const data = response.data[0];

        setPost(data);

        // PUSH THE POST OBJECT TO BROWSER HISTORY STATE
        window.history.pushState({ post: JSON.stringify(data) }, "");
      });
    };

    // FETCH POST FROM THE SERVER IF NOT PRESENT IN THE BROWSER HISTORY OR IF THE SLUG DOES NOT MATCH
    if (!cachedPost || cachedPost["slug"] !== slug.value) {
      setPostFromServer(slug.value);
    } else {
      setPost(cachedPost);
    }

    return {
      status,
      currentPost,
    };
  },
};
</script>
