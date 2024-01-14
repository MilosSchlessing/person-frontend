<template>
  <div class="things">
    <h1>E-Mail Motivation</h1>
    <p>Hier können Sie sich eine Motivations-E-Mail senden lassen!</p>

    <form @submit.prevent="addOrToggleEmail">
      <label for="email">Email:</label>
      <input class="type-1" id="email" v-model="newEmail" type="email">
      <button class="glowing-btn" type="submit">E-Mail senden!</button>
    </form>

    <div v-if="currentEmailReminder">
      <h2>Ausgewählte E-Mail: {{ currentEmailReminder.email }}</h2>
      <button class="glowing-btn" @click="toggleReminder">E-Mail erneut senden!</button>
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
        const response = await axios.get(`https://watergoal-backend.onrender.com/emailReminders/${this.newEmail}`);
        this.currentEmailReminder = response.data;
        if (this.currentEmailReminder) {
          console.log(`Reminder for ${this.newEmail} is ${this.currentEmailReminder.reminderEnabled ? 'enabled' : 'disabled'}`);
        } else {
          console.log(`No reminder found for ${this.newEmail}. Adding new email.`);
          await axios.post('https://watergoal-backend.onrender.com/emailReminders/create', {
            email: this.newEmail
          });
        }
      } catch (error) {
        console.error(error);
      }
    },
    async toggleReminder() {
      try {
        await axios.post(`https://watergoal-backend.onrender.com/emailReminders/enableReminder/${this.currentEmailReminder.id}`);
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