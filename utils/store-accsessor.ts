/* eslint-disable import/no-mutable-exports */
import { Store } from "vuex";
import { getModule } from "vuex-module-decorators";
import Content from "~/store/content";

let ContentStore: Content;
function initialiseStores(store: Store<any>): void {
  ContentStore = getModule(Content, store);
}

export { initialiseStores, ContentStore };
