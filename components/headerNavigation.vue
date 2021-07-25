<template>
  <div class="container">
    <div class="circle cycleType"></div>
  </div>
</template>
<style lang="postcss" scoped>
.container {
  width: 400px;
  height: 400px;
  position: absolute;
  bottom: 0px;
  right: 0px;
  z-index: -10;
}

@media screen and (max-width: 480px) {
  .container {
    width: 300px;
    height: 300px;
    bottom: 0px;
    right: 100px;
  }
  .circle {
    width: 300px;
    height: 300px;
  }
}

.circle {
  width: 400px;
  height: 400px;
  cursor: pointer;
  /* animation: uneune 30s linear infinite; */
  overflow: hidden;
  background: #fc2;
  border-radius: 40% 70% 50% 30%/40% 50% 30% 50%;
  transition-duration: 0.3s;
}

/* @keyframes uneune {
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
    border-radius: 80% 60% 40% 70% / 70% 50% 80% 40%;
  }

  90% {
    border-radius: 60% 60% 50% 550% / 50% 40% 40% 50%;
  }

  100% {
    border-radius: 40% 70% 50% 30%/40% 50% 30% 50%;
  }
} */
</style>
