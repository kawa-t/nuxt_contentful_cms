export default async ({ store, payload }) => {
  if (!store.state.posts.length && !payload) {
    await store.dispatch("getPosts");
  }
};
