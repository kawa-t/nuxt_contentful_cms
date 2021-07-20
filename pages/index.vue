<template>
  <client-only>
    <div class="">
      <NuxtLink to="/tags">タグ一覧</NuxtLink>
      <button @click="allPosts">全て表示</button>
      <div>
        <button
          v-for="(category, index) in categories"
          :key="index"
          :category="category"
          @click="filterPostData(category.fields.name)"
        >
          {{ category.fields.name }}
        </button>
      </div>
      <div v-if="filterposts.length > 0">
        <TitleCard
          v-for="(post, index) in filterposts"
          :key="index"
          :post="post"
        />
      </div>
      <div v-else>
        <TitleCard v-for="(post, index) in posts" :key="index" :post="post" />
      </div>
    </div>
  </client-only>
</template>

<script>
import TitleCard from "../components/TitleCard.vue";
import { mapState } from "vuex";

export default {
  data: function() {
    return {
      filterData: []
    };
  },
  components: {
    TitleCard
  },
  computed: {
    ...mapState(["posts", "filterposts", "categories"])
  },
  methods: {
    filterPostData: function(name) {
      this.filterData = this.posts
        .map(v => v)
        .filter(v => v.fields.category.fields.name === name);

      this.$store.commit("filterposts", this.filterData);
    },
    allPosts: function() {
      this.$store.commit("filterposts", []);
    }
  }
};
</script>

<style></style>
