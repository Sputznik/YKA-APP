import { createStore } from "vuex";

export default createStore({
  state: {
    post: {},
    errors: [],
    account: {},
    settings: {},
    processing: false,
  },
  mutations: {
    setProcessing(state, flag) {
      state.processing = flag;
      return state.processing;
    },
  },
  actions: {},
  modules: {},
});
