<template>
  <client-only>
    <div class="container">
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

      <button @click="allPosts">全て表示</button>
      <NuxtLink to="/tags">タグ一覧</NuxtLink>
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

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
