<template>
  <div class="register">
    <h2>Register</h2>
    <form @submit.prevent="register">
      <div>
        <label for="username">Username:</label>
        <input type="text" id="username" v-model="username">
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password">
      </div>
      <button type="submit">Register</button>
    </form>
    <p v-if="message">{{ message }}</p> <!-- Zeigt die Meldung an, wenn sie gesetzt ist -->
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      name: '', // Ändern Sie 'username' in 'name'
      password: ''
    };
  },
  methods: {
    async register() {
      try {
        const response = await axios.post('http://localhost:8080/api/v1/account', {
          name: this.name, // Ändern Sie 'username' in 'name'
          password: this.password
        });

        if (response.status === 201) {
          console.log('Account creation successful');
          this.$router.push('/about');
        } else {
          console.log('Account creation failed');
        }
      } catch (error) {
        console.error('An error occurred while trying to create an account:', error);
      }
    }
  }
}
</script>


<!-- Rest des Codes bleibt unverändert -->

<style scoped>
.register {
  width: 300px;
  margin: 0 auto;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.register h2 {
  text-align: center;
}

.register form {
  display: flex;
  flex-direction: column;
}

.register form div {
  margin-bottom: 10px;
}

.register form button {
  cursor: pointer;
}
</style>