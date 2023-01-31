import store from "@/store";
import { ref, computed } from "vue";
import { useInfiniteQuery } from "vue-query";

const query = (params, API, queryConfig = {}) => {
  const page = ref(1);

  const fetchItems = ({ pageParam = 1 }) => {
    var clonedParams = JSON.parse(JSON.stringify(params));

    // SET CURRENT-PAGE-VALUE TO INFINITE-QUERY PAGE-VALUE
    clonedParams.page = pageParam;
    page.value = pageParam;

    return API(clonedParams);
  };

  const { data, fetchNextPage, status, isFetchingNextPage } = useInfiniteQuery(
    ["OrbitQuery", params],
    fetchItems,
    queryConfig
  );

  // COMPUTATION OF ITEMS FROM DATA PAGES
  const items = computed(() => {
    var arr = [];
    if (data.value && data.value.pages) {
      for (var index in data.value.pages) {
        if (data.value.pages[index].data) {
          for (var key in data.value.pages[index].data) {
            arr.push(data.value.pages[index].data[key]);
          }
        }
      }
    }
    return arr;
  });

  const hasMorePages = computed(() => {
    if (
      data.value &&
      data.value.pages &&
      data.value.pages[0] &&
      data.value.pages[0].headers &&
      data.value.pages[0].headers["x-wp-totalpages"] &&
      page.value < data.value.pages[0].headers["x-wp-totalpages"]
    )
      return true;
    return false;
  });

  const loadMore = () => {
    if (hasMorePages.value) {
      page.value += 1;
      fetchNextPage.value({ pageParam: page.value });
    }
  };

  const scrollComponent = ref(null);

  const watchScroll = () => {
    const element = scrollComponent.value;

    if (
      element &&
      element.getBoundingClientRect().bottom < window.innerHeight &&
      !store.state.processing
    ) {
      loadMore();
    }
  };

  return {
    page,
    items,
    status,
    loadMore,
    watchScroll,
    hasMorePages,
    fetchNextPage,
    scrollComponent,
    isFetchingNextPage,
  };
};

export default query;
