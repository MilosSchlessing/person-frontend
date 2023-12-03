<template>
  <div class="home">
    <h1>Welcome to Hydrate!</h1>
    <p>Remember to drink water regularly throughout the day.</p>
    <img alt="Hydrate logo" src="../assets/logo.png">
    <HelloWorld msg="Stay Hydrated!"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  }
}
</script>

<style scoped>
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
  width: 100px;
  height: 100px;
}

</style>