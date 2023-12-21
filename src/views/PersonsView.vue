<template>
  <div class="things">
    <form @submit.prevent="getThing">
      <label for="id">ID:</label>
      <input id="id" v-model="thingId" required>

      <button type="submit">Get my Watergoal!</button>
    </form>
    <p>{{ getThingMessage }}</p>
    <div v-if="currentThing">
      <p>Name: {{ currentThing.name }}</p>
      <p>ML: {{ currentThing.ml }}</p>
    </div>
    <form @submit.prevent="addDailyWaterIntake">
      <label for="dailyWaterIntake">Daily Water Intake:</label>
      <input id="dailyWaterIntake" v-model="newDailyWaterIntake" required>

      <label for="date">Date:</label>
      <input id="date" v-model="newDate" type="date" required>

      <button type="submit">Add Daily Water Intake</button>
    </form>
    <p>{{ addIntakeMessage }}</p> 
  </div>
  <div class="chart-container">
    <button @click="createChart">Create Chart</button>
    <p>{{ chartMessage }}</p> <!-- Zeigen Sie die Meldung hier an -->
    <canvas id="myChart"></canvas>
  </div>
</template>

<style scoped>
.things {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(to bottom, #89CFF0 0%, #FFFFFF 100%);
  padding: 20px; /* Fügt einen Abstand um die gesamte .things Div hinzu */
}

.things h1,
.things h2,
.thing-item p {
  color: #0077be;
  margin-bottom: 15px; /* Fügt einen Abstand unter den Überschriften und Paragraphen hinzu */
}

.things form {
  margin-bottom: 20px; /* Fügt einen Abstand unter den Formularen hinzu */
}

.things form input,
.things form button {
  margin-top: 5px; /* Fügt einen Abstand über den Eingabefeldern und Buttons hinzu */
}
.chart-container {
  margin-top: -250px; /* Zieht den Container näher an den oberen Inhalt */
}

.chart-container button:hover{
  border: 1px solid goldenrod;
    background: goldenrod;
    transition: 1s;
}
</style>

<script>
import axios from 'axios';
import { Chart, BarController, BarElement, CategoryScale, LinearScale } from 'chart.js';
Chart.register(BarController, BarElement, CategoryScale, LinearScale);

export default {
  name: 'PersonsView',
  data() {
    return {
      thingId: '',
      currentThing: null,
      editMode: false,
      newDailyWaterIntake: '',
      newDate: '',
      dailyWaterIntakes: [],
      chart: null,
      chartMessage: '',
      addIntakeMessage: '',
      getThingMessage: '',
    }
  },

  methods: {
    async getThing() {
  try {
    const response = await axios.get(`http://localhost:8080/watergoal/${this.thingId}`);
    if (response.data) {
      this.currentThing = response.data;
      this.dailyWaterIntakes = response.data.dailyWaterIntakes;
      this.editMode = false;
      this.getThingMessage = '';
    } else {
      this.getThingMessage = 'Keine Daten für diese ID gefunden.';
      this.currentThing = null; // Setzen Sie currentThing auf null
      this.thingId = ''; // Setzen Sie thingId auf einen leeren String
    }
  } catch (error) {
    console.error(error);
    this.getThingMessage = 'Fehler beim Abrufen der Daten.';
    this.currentThing = null; // Setzen Sie currentThing auf null
    this.thingId = ''; // Setzen Sie thingId auf einen leeren String
  }
  },
    async updateThing() {
      const response = await axios.put(`http://localhost:8080/watergoal/${this.thingId}`, this.currentThing);
      this.currentThing = response.data;
      this.editMode = false;
    },

    async addDailyWaterIntake() {
  if (this.currentThing) {
    const existingIntake = this.dailyWaterIntakes.find(intake => intake.date === this.newDate);
    if (existingIntake) {
      this.addIntakeMessage = 'Es kann nicht mehr als eine Angabe pro Tag hinzugefügt werden.';
      return;
    }

        const response = await axios.post('http://localhost:8080/dailyWaterIntake', {
          waterGoal: { id: this.currentThing.id },
          date: this.newDate,
          ml: this.newDailyWaterIntake
        })

        this.currentThing.dailyWaterIntake = response.data.dailyWaterIntake
        this.newDailyWaterIntake = ''
        this.newDate = ''

        await this.fetchDailyWaterIntakes();
      } else {
        console.error('currentThing is null');
      }
    },

    async fetchDailyWaterIntakes() {
  if (this.currentThing) {
    try {
      const response = await axios.get(`http://localhost:8080/dailyWaterIntake/${this.currentThing.id}`);
      this.dailyWaterIntakes = response.data || [];
    } catch (error) {
      console.error(error);
      this.dailyWaterIntakes = [];
    }
  } else {
    console.error('currentThing is null');
    this.dailyWaterIntakes = [];
  }
},

    async createChart() {
      await this.fetchDailyWaterIntakes();
      if (this.dailyWaterIntakes && this.dailyWaterIntakes.length > 0) {
        this.dailyWaterIntakes.sort((a, b) => new Date(a.date) - new Date(b.date));
        this.chartMessage = '';
        const ctx = document.getElementById('myChart').getContext('2d');
        const targetIntake = this.currentThing.ml;

        if (this.chart) {
          this.chart.destroy();
        }

        this.chart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: this.dailyWaterIntakes.map(intake => intake.date),
            datasets: [{
              label: 'Daily Water Intake',
              data: this.dailyWaterIntakes.map(intake => intake.ml),
              backgroundColor: this.dailyWaterIntakes.map(intake => intake.ml < targetIntake ? 'red' : 'green'),
            }]
          },
          options: {
            scales: {
              y: {
                min: 0,
                max: 5000,
                ticks: {
                  stepSize: 500
                }
              }
            }
          }
        });
      } else {
        console.error('dailyWaterIntakes is empty or undefined');
        this.chartMessage = 'Es konnte kein Diagramm für die angegebene ID erstellt werden, da keine Daten vorhanden sind.';
      }
    },
  }
}
</script>
