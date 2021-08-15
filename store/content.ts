import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";

type Post = {};

@Module({
  name: "content",
  stateFactory: true,
  namespaced: true
})
export default class Contnents extends VuexModule {
  private posts: Post[] = [];

  public get GetContents() {
    return this.posts;
  }

  @Mutation
  private setPosts(post: Post) {}
}
