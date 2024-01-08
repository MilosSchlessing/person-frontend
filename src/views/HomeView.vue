<template>
  <div class="home">
    <h1>Welcome to Hydrate!</h1>
    <p>Remember to drink water regularly throughout the day.</p>
    <img alt="Hydrate logo" src="../assets/wasserglas.png" :class="{ shake: isShaking }">
    <button class="glowing-btn" @click="shakeImage">Stay Hydrated!</button>
    <HelloWorld msg="Stay Hydrated!"/>
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  },
  data() {
    return {
      isShaking: false
    }
  },
  methods: {
    shakeImage() {
      this.isShaking = true;
      setTimeout(() => {
        this.isShaking = false;
      }, 1000); // Stop shaking after 1 second
    }
  }
}
</script>

<style scoped>
@import '../styles.css';
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(to bottom, #89CFF0 0%, #FFFFFF 100%);
  font-family: Arial, sans-serif;
}

.home h1, .home p {
  color: #0077be;
}

.home img {
}

@keyframes shake {
  0% { transform: translate(1px, 1px) rotate(0deg); }
  10% { transform: translate(-1px, -2px) rotate(-1deg); }
  20% { transform: translate(-3px, 0px) rotate(1deg); }
  30% { transform: translate(3px, 2px) rotate(0deg); }
  40% { transform: translate(1px, -1px) rotate(1deg); }
  50% { transform: translate(-1px, 2px) rotate(-1deg); }
  60% { transform: translate(-3px, 1px) rotate(0deg); }
  70% { transform: translate(3px, 1px) rotate(-1deg); }
  80% { transform: translate(-1px, -1px) rotate(1deg); }
  90% { transform: translate(1px, 2px) rotate(0deg); }
  100% { transform: translate(1px, -2px) rotate(-1deg); }
}

.shake {
  animation: shake 0.5s; 
  animation-iteration-count: infinite; 
}
</style>