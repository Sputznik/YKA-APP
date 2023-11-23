import { createStore } from "vuex";

export default createStore({
  state: {
    post: {},
    errors: [],
    account: {},
    settings: {},
    processing: false,
    status: "loading",
  },
  mutations: {
    setProcessing(state, payload) {
      state.processing = payload;
    },
    setStatus(state, payload) {
      state.status = payload;
    },
    setPost(state, payload) {
      state.post = payload;
    },
  },
  actions: {},
  modules: {},
});
