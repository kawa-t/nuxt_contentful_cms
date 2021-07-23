<template>
  <div class="container lg:visible">
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
  width: 400px;
  height: 400px;
  position: absolute;
  bottom: 0px;
  right: 0px;
}

.circle {
  width: 400px;
  height: 400px;
  border-radius: 50%;
  cursor: pointer;
  animation: uneune 30s linear infinite;
  overflow: hidden;
}

.cycleType {
  background: #fc2;
  z-index: -10;
  border-radius: 40% 70% 50% 30%/40% 50% 30% 50%;
  transition-duration: 0.3s;
}

.activeCycle {
  transform: scale(1.2);
  transition-duration: 0.3s;
}

@keyframes uneune {
  0% {
    border-radius: 40% 70% 50% 30%/40% 50% 30% 50%;
  }

  25% {
    border-radius: 50% 60% 60% 90% / 60% 80% 40% 90%;
  }

  50% {
    border-radius: 60% 40% 70% 60% / 40% 60% 50% 60%;
  }

  75% {
    border-radius: 90% 60% 40% 70% / 70% 50% 80% 40%;
  }

  100% {
    border-radius: 60% 50% 70% 80% / 50% 60% 50% 70%;
  }
}
</style>
