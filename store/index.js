import sdkClient from "@/plugins/contentful.js";

export const state = () => ({
  posts: []
});

export const getters = {};

export const mutations = {
  setPosts(state, payload) {
    state.posts = payload;
  }
};

export const actions = {
  async getPosts({ commit }) {
    await sdkClient
      .getEntries({
        content_type: "blogPost",
        order: "-fields.publishedAt"
      })
      .then(res => {
        commit("setPosts", res.items);
      })
      .catch(console.error);
  }
};
