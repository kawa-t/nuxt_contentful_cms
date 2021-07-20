<template>
  <div>
    <nuxt-link :to="linkTo(post)">
      <article>
        <figure>
          <img :src="setHeaderImg(post).url" :alt="setHeaderImg(post).title" />
          <div>タイトル：：{{ post.fields.title }}</div>
          <div>
            <small>{{ $getFormattedDate(post.fields.publishedAt) }}</small>
          </div>
        </figure>
        <template v-if="post.fields.tags">
          <div v-for="tag in post.fields.tags" :key="tag.sys.id">
            <nuxt-link :to="linkToTag(tag)">
              タグ：{{ tag.fields.name }}
            </nuxt-link>
          </div>
        </template>
      </article>
    </nuxt-link>
  </div>
</template>
<script>
import { mapState, mapGetters } from "vuex";

export default {
  props: {
    post: {
      type: Object,
      reqire: true,
      default: () => {
        return {
          fields: {
            title: "sample",
            publishhehAt: new Date(),
            headerImage: null
          }
        };
      }
    }
  },
  computed: {
    ...mapState(["filterposts"]),
    ...mapGetters(["setHeaderImg"])
  },
  methods: {
    linkTo(post) {
      return { name: "posts-slug", params: { slug: post.fields.slug } };
    },
    linkToTag(tag) {
      return {
        name: "tags-slug",
        params: { slug: tag.fields.slug }
      };
    }
  },
  mounted: function() {
    this.$store.commit("filterposts", []);
  }
};
</script>
