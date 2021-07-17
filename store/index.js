import sdkClient from "@/plugins/contentful.js";

export const state = () => ({
  posts: [],
  categories: []
});

export const getters = {
  relatedPosts: state => category => {
    const posts = [];
    for (let i = 0; i < state.posts.length; i++) {
      const catId = state.posts[i].fields.category.sys.id;
      if (category.sys.id === catId) posts.push(state.posts[i]);
    }
    return posts;
  }
};

export const mutations = {
  setPosts(state, payload) {
    state.posts = payload;
  },
  setCategories(state, payload) {
    state.categories = payload;
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
  },
  // カテゴリー
  async getCategories({ commit }) {
    await sdkClient
      .getEntries({
        content_type: "category",
        order: "fields.sort"
      })
      .then(res => {
        commit("setCategories", res.items);
      })
      .catch(console.error);
  }
};
