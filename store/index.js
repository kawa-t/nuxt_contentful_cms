import sdkClient from "@/plugins/contentful.js";

export const state = () => ({
  posts: [],
  categories: [],
  tags: []
});

export const getters = {
  relatedPosts: state => category => {
    const posts = [];
    for (let i = 0; i < state.posts.length; i++) {
      const catId = state.posts[i].fields.category.sys.id;
      if (category.sys.id === catId) posts.push(state.posts[i]);
    }
    return posts;
  },
  associatePosts: state => currentTag => {
    const posts = [];
    for (let i = 0; i < state.posts.length; i++) {
      const post = state.posts[i];
      if (post.fields.tags) {
        const tag = post.fields.tags.find(
          tag => tag.sys.id === currentTag.sys.id
        );

        if (tag) posts.push(post);
      }
    }
    return posts;
  },
  setLinks(state, entries) {
    state.tags = [];
    state.categories = [];
    for (let i = 0; i < entries.length; i++) {
      const entry = entries[i];
      if (entry.sys.contentType.sys.id === "tag") state.tags.push(entry);
      else if (entry.sys.contentType.sys.id === "category")
        state.categories.push(entry);
    }
    state.categories.sort((a, b) => a.fields.sort - b.fields.sort);
  }
};

export const mutations = {
  setPosts(state, payload) {
    state.posts = payload;
  },
  //  setCategories(state, payload) {
  //    state.categories = payload;
  //  },
  setLinks(state, entries) {
    state.tags = [];
    state.categories = [];
    for (let i = 0; i < entries.length; i++) {
      const entry = entries[i];
      if (entry.sys.contentType.sys.id === "tag") state.tags.push(entry);
      else if (entry.sys.contentType.sys.id === "category")
        state.categories.push(entry);
    }
    state.categories.sort((a, b) => a.fields.sort - b.fields.sort);
  }
};

export const actions = {
  async getPosts({ commit }) {
    await sdkClient
      .getEntries({
        content_type: "blogPost",
        order: "-fields.publishedAt",
        include: 1
      })
      .then(res => {
        commit("setLinks", res.includes.Entry);
        commit("setPosts", res.items);
      })
      .catch(console.error);
  }
  // カテゴリー
  // async getCategories({ commit }) {
  //   await sdkClient
  //     .getEntries({
  //       content_type: "category",
  //       order: "fields.sort"
  //     })
  //     .then(res => {
  //       commit("setCategories", res.items);
  //     })
  //     .catch(console.error);
  // }
};
