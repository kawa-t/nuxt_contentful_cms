<template>
  <div class="container">
    <TitleCard v-for="(post, index) in posts" :key="index" :post="post" />
  </div>
</template>

<script>
import TitleCard from "../components/TitleCard.vue";

export default {
  components: {
    TitleCard
  },
  data() {
    return {
      posts: [
        {
          fields: {
            title: "これはテストです",
            publishedAt: new Date()
          }
        },
        {
          fields: {
            title: "これはテスト222です",
            publishedAt: new Date()
          }
        }
      ]
    };
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
