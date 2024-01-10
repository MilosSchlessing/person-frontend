<template>
  <div class="things">
    <h1>Email Reminder</h1>

    <form @submit.prevent="addOrToggleEmail">
      <label for="email">Email:</label>
      <input class="type-1" id="email" v-model="newEmail" type="email">
      <button class="glowing-btn" type="submit">Add or find E-Mail</button>
    </form>

    <div v-if="currentEmailReminder">
      <h2>Current Email: {{ currentEmailReminder.email }}</h2>
      <p>Reminder Enabled: {{ currentEmailReminder.reminderEnabled ? 'Yes' : 'No' }}</p>
      <button class="glowing-btn" @click="toggleReminder">Toggle Reminder</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      newEmail: '',
      currentEmailReminder: null,
      emailToFind: '',
    };
  },
  methods: {
  async addOrToggleEmail() {
    try {
      const response = await axios.get(`http://localhost:8080/emailReminders/${this.newEmail}`);
      this.currentEmailReminder = response.data;
      if (this.currentEmailReminder) {
        console.log(`Reminder for ${this.newEmail} is ${this.currentEmailReminder.reminderEnabled ? 'enabled' : 'disabled'}`);
      } else {
        console.log(`No reminder found for ${this.newEmail}. Adding new email.`);
        await axios.post('http://localhost:8080/emailReminders/create', {
          email: this.newEmail
        });
      }
    } catch (error) {
      console.error(error);
    }
  },
    async toggleReminder() {
      try {
        await axios.post(`http://localhost:8080/emailReminders/enableReminder/${this.currentEmailReminder.id}`);
        // Toggle the reminder after the server request is successful
        this.currentEmailReminder.reminderEnabled = !this.currentEmailReminder.reminderEnabled;
      } catch (error) {
        console.error(error);
      }
    }
  } 
  };
</script>

<style scoped>
.things {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  background: linear-gradient(to bottom, #89CFF0 0%, #FFFFFF 100%);
  padding: 20px;
}

.things h1,
.things h2,
.things p {
  color: #0077be;
  margin-bottom: 15px;
}

.things form {
  margin-bottom: 20px;
}

.things form input,
.things form button {
  margin-top: 5px;
}
</style>