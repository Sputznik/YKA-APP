<template>
  <img
    :srcset="srcset"
    :alt="media.alt_text"
    :src="thumbnail_url"
    sizes="(max-width: 400px) 100w, (min-width: 700px) 1200w"
    :width="media.media_details.width"
    :height="media.media_details.height"
    v-if="status == 'success'"
    class="w-full border-2 border-lighter-gray"
  />
  <div class="animate-pulse h-96 w-full bg-lighter-gray" v-else></div>
</template>
<script>
import API from "@/api";

import { computed, ref } from "vue";
import { useQuery } from "vue-query";

export default {
  name: "FeaturedImage",
  props: {
    media_id: Number,
  },
  components: {},
  setup(props) {
    //console.log( props.media_id )

    const media_id = ref(props.media_id);

    const getMedia = () => API.requestAttachment(media_id.value);

    const { status, data } = useQuery(["singleMedia", media_id], getMedia);

    const media = computed(() =>
      data.value && data.value.data ? data.value.data : {}
    );

    const thumbnail_url = computed(() =>
      data.value &&
      data.value.data &&
      data.value.data.media_details &&
      data.value.data.media_details.sizes &&
      data.value.data.media_details &&
      data.value.data.media_details.sizes.thumbnail &&
      data.value.data.media_details.sizes.thumbnail.source_url
        ? data.value.data.media_details.sizes.thumbnail.source_url
        : ""
    );

    const srcset = computed(() => {
      var dataSrc = [];
      if (
        data.value &&
        data.value.data &&
        data.value.data.media_details &&
        data.value.data.media_details.sizes
      ) {
        for (var size in data.value.data.media_details.sizes) {
          var image = data.value.data.media_details.sizes[size];

          dataSrc.push(image.source_url + " " + image.width + "w");
          //console.log(  );
        }
      }
      return dataSrc.join(",");
    });

    return {
      status,
      media,
      srcset,
      thumbnail_url,
    };
  },
};
</script>
<style>
.thumbnail-bg img {
  @apply object-cover w-full h-full;
}
</style>
