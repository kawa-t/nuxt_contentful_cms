<template>
  <div class="AnimetionContiner">
    <div class="AnimetionCircle"></div>
  </div>
</template>
<script>
export default {};
</script>
<style lang="postcss" scoped>
.AnimetionContiner {
  width: 400px;
  height: 400px;
  z-index: -10;
  position: absolute;
  top: 20px;
}

.AnimetionCircle {
  width: 400px;
  height: 400px;
  animation: uneune 15s linear infinite;
  background: #fc2;
  /* border-radius: 40% 70% 50% 30%/40% 50% 30% 50%; */
  transition-duration: 0.3s;
  mix-blend-mode: multiply;
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

  90% {
    border-radius: 60% 50% 70% 80% / 50% 60% 50% 70%;
  }

  100% {
    border-radius: 40% 70% 50% 30%/40% 50% 30% 50%;
  }
}
</style>
