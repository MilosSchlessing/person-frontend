<template>
  <div class="login">
    <h2>Login</h2>
    <form @submit.prevent="login">
      <div>
        <label for="username">Username:</label>
        <input type="text" id="username" v-model="username">
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password">
      </div>
      <button type="submit">Login</button>
      <button @click.prevent="createAccount">Create Account</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post('http://localhost:8080/api/v1/login', {
          name: this.name, // Ändern Sie 'username' in 'name'
          password: this.password
        });

        if (response.status === 200) {
          console.log('Login successful');
          this.$router.push('/home'); // Leitet den Benutzer zur Home-Seite um
        } else {
          console.log('Login failed');
        }
      } catch (error) {
        console.error('An error occurred while trying to login:', error);
      }
    },
    createAccount() {
      this.$router.push('/registerview');
    }
  }
}
</script>

<style scoped>
  .login {
    width: 300px;
    margin: 0 auto;
  }

  .login label {
    display: block;
    margin-top: 10px;
  }

  .login input {
    width: 100%;
    padding: 5px;
    margin-top: 5px;
  }

  .login button {
    margin-top: 10px;
  }
</style>