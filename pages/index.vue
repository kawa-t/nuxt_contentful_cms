<template>
  <client-only>
    <main class="flex flex-wrap h-screen xs:min-w-full">
      <article class="max-h-screen flex flex-col justify-center lg:w-1/4 p-2">
        <SideMenu />
      </article>
      <article class="w-full lg:w-3/4 overflow-hidden">
        <div class="lg:block xs:hidden">
          <BackgoundAnimetion />
        </div>
        <div
          class="flex flex-wrap align-items justify-center"
          v-if="filterposts.length !== 0"
        >
          <TitleCard
            v-for="(post, index) in filterposts"
            :key="index"
            :post="post"
          />
        </div>
        <div class="flex flex-wrap justify-center" v-else>
          <TitleCard v-for="(post, index) in posts" :key="index" :post="post" />
        </div>
        <div>
          <HeaderNavigation />
        </div>
      </article>
    </main>
  </client-only>
</template>

<script>
import TitleCard from "../components/TitleCard.vue";
import TagsList from "../pages/tags";
import HeaderNavigation from "../components/headerNavigation";
import BackgoundAnimetion from "../components/BackgoundAnimetion";
import SideMenu from "../components/SideMenubar";
import { mapState } from "vuex";

export default {
  components: {
    TitleCard,
    TagsList,
    HeaderNavigation,
    BackgoundAnimetion,
    SideMenu
  },
  computed: {
    ...mapState(["posts", "filterposts"])
  }
};
</script>

<style lang="postcss" scoped>
.activeCategory {
  @apply border-b-4 border-yellow-200 text-yellow-500 xs:text-yellow-400 xs:border-yellow-300;
}
</style>
