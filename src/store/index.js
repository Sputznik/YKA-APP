import { createStore } from "vuex";

export default createStore({
  state: {
    post: {},
    errors: [],
    account: null,
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
    getAccountSettings(state) {
      if (localStorage.yka_account_settings) {
        state.account = JSON.parse(localStorage.yka_account_settings);
      }
    },
    saveAccountSettings(state, payload) {
      state.account = payload;
      localStorage.yka_account_settings = JSON.stringify(payload);
    },
    flushAccountSettings(state) {
      state.account = null;
      localStorage.yka_account_settings = null;
    },
  },
  actions: {},
  modules: {},
});
