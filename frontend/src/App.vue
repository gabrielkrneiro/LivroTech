<template>
  <div id="app">
    <transition name="fade">
        <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'app',
};
</script>

<style>
@import '../src/assets/styles/index.css';
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.fade-leave-active {
  transition: .1s;
}

.fade-leave {
  opacity: 1;
}

.fade-enter-active {
  transition: .1s .1s
}

.fade-enter-to {
  opacity: 1;
}


/* bounce */
/* .bounce-enter-active {
  animation: bounce-in .5s .5s;
}
.bounce-leave-active {
  animation: bounce-in .5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
} */


/* funcionando slide-fade  */
/* .slide-fade-enter-active {
  transition: all .3s .5s ease;
}
.slide-fade-leave-active {
  transition: all .5s ease;
}
.slide-fade-enter {
  opacity: .1;
  transform: translateX(-5em);
}

.slide-fade-leave-to {
  transform: translateX(5em);
  opacity: 0;
} */

/* funcionando */
/* .slide-leave-active {
  transition: .5s ease;
}

.slide-enter-active {
  transition: 2s .5s ease;
}

.slide-leave-to{
  transform: translateX(-100%);
}

.slide-enter {
  transform: translateX(100%);
} */

</style>
