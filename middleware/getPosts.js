export default async ({ store, payload }) => {
  if (!store.state.posts.length && !payload) {
    await store.dispatch("getPosts");
  }
  if (!store.state.categories.length && !payload) {
    await store.dispatch("getCategories");
  }
};
