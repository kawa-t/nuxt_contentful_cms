<template>
  <div class="container">
    <NuxtLink to="/">
      <div
        class="circle cycleType"
        @mouseover="TitleOver"
        @mouseleave="titleLeave"
        :class="{ activeCycle: activityCycle }"
      ></div>
    </NuxtLink>
  </div>
</template>
<script>
export default {
  data: function() {
    return {
      titleLink: false,
      activityCycle: false
    };
  },
  methods: {
    TitleOver: function() {
      this.activityCycle = true;
    },
    titleLeave: function() {
      this.activityCycle = false;
    }
  }
};
</script>
<style lang="postcss" scoped>
.container {
  position: absolute;
  top: 30px;
  left: 30px;
}

.circle {
  width: 200px;
  height: 200px;
  margin: 0;
  border-radius: 50%;
  mix-blend-mode: multiply;
  cursor: pointer;
}

.cycleType {
  background: #fc2;
  border-radius: 40% 40% 50% 40%/30% 50% 40% 50%;
  transition-duration: 0.3s;
}

.activeCycle {
  transform: scale(1.2);
  transition-duration: 0.3s;
}
</style>
