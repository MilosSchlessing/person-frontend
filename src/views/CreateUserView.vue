<template>
  <div class="createUser">
    <h1>Create User</h1>
    <form @submit.prevent="createUser">
      <label for="name">Name:</label>
      <input class="type-1" id="name" v-model="newUser.name" required>
      <label for="ml">ML:</label>
      <input class="type-1" id="ml" v-model="newUser.ml" required>
      <button class='glowing-btn' type="submit">Create User</button>
    </form>

    <p v-if="userId">Your user ID is: {{ userId }}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      newUser: {
        name: '',
        ml: '',
      },
      userId: null,
    };
  },
  methods: {
    createUser() {
      axios
        .post('http://localhost:8080/watergoal', this.newUser)
        .then(response => {
          this.userId = response.data.id;
        })
        .catch(error => console.log(error));
    },
  },
};
</script>


<style scoped>
@import '../styles.css';
.createUser {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 60vh;
  background: linear-gradient(to bottom, #89CFF0 0%, #FFFFFF 100%);
  font-family: Arial, sans-serif;
}
</style>