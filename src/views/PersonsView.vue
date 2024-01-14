<template>
  <div class="things">
    <h1>Wasseraufnahme hinzufügen!</h1>
    <p>Hier kannst du über deine ID dein eingetragenes Ziel aufrufen und deine tägliche Wasseraufnahme hinzufügen.</p>
    <form @submit.prevent="getThing">
      <label for="id">ID:</label>
      <input class="type-1" id="id" v-model="thingId" required>

      <button class="glowing-btn" type="submit">Hol mein Wasserziel!</button>
    </form>
    <p>{{ getThingMessage }}</p>
    <div v-if="currentThing">
      <p>Name: {{ currentThing.name }}</p>
      <p>ML: {{ currentThing.ml }}</p>
    </div>
    <p>Hier kannst du deine tägliche Wasseraufnahme hinzufügen.</p>
    <form @submit.prevent="addDailyWaterIntake">
      <label for="dailyWaterIntake">Tägliche Wasseraufnahme:</label>
      <input class="type-1" id="dailyWaterIntake" v-model="newDailyWaterIntake" required>

      <label for="date">Datum:</label>
      <input class="type-1" id="date" v-model="newDate" type="date" required>

      <button class="glowing-btn" type="submit">Wasseraufnahme hinzufügen</button>
      <button class="glowing-btn" type="button" v-if="currentThing"
        @click="changeDailyWaterIntake(currentThing.id)">Wasseraufnahme ändern</button>
    </form>
    <p>{{ addIntakeMessage }}</p>
  </div>
  <div class="chart-container">
    <button class="glowing-btn" @click="createChart">Chart erstellen</button>
    <br>
    <br>
    <button class="glowing-btn" v-if="chart" @click="showAverageIntake = true">Berechne Durchschnitt</button>
    <p v-if="showAverageIntake">Durchschnittliche Wasseraufnahme: {{ averageIntake }}ml</p>
    <p>{{ chartMessage }}</p>
    <canvas id="myChart" ref="myChart"></canvas>
    <button class="glowing-btn" @click="downloadChart" v-if="chart">Download Chart</button>
  </div>
</template>

<style scoped>
.things {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
  background: linear-gradient(to bottom, #89CFF0 0%, #FFFFFF 100%);
  padding: 20px;
}

.things h1,
.things h2,
.thing-item p {
  color: #0077be;
  margin-bottom: 10px;
}

.things form {
  margin-bottom: 10px;
}

.things form input,
.things form button {
  margin-top: 5px;
}

.chart-container {
  margin-top: -150px;
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
      showAverageIntake: false,
    }
  },

  methods: {
    resetAddIntakeMessage() {
      this.addIntakeMessage = '';
    },
    calculateAverageIntake() {
      if (this.dailyWaterIntakes.length > 0) {
        const totalIntake = this.dailyWaterIntakes.reduce((sum, intake) => sum + intake.ml, 0);
        this.averageIntake = totalIntake / this.dailyWaterIntakes.length;
      } else {
        this.averageIntake = 0;
      }
    },
    async getThing() {
      try {
        const response = await axios.get(`https://watergoal-backend.onrender.com/watergoal/${this.thingId}`);
        if (response.data) {
          this.currentThing = response.data;
          this.dailyWaterIntakes = response.data.dailyWaterIntakes;
          this.editMode = false;
          this.getThingMessage = '';
          this.resetData();
        } else {
          this.getThingMessage = 'Keine Daten für diese ID gefunden.';
          this.currentThing = null;
          this.thingId = '';
        }
      } catch (error) {
        console.error(error);
        this.getThingMessage = 'Fehler beim Abrufen der Daten.';
        this.currentThing = null;
        this.thingId = '';
      }
    },
    async updateThing() {
      const response = await axios.put(`https://watergoal-backend.onrender.com/watergoal/${this.thingId}`, this.currentThing);
      this.currentThing = response.data;
      this.editMode = false;
    },

    async addDailyWaterIntake() {
      if (this.currentThing) {
        const existingIntake = this.dailyWaterIntakes && this.dailyWaterIntakes.find(intake => intake.date === this.newDate);
        if (existingIntake) {
          this.addIntakeMessage = 'Es kann nicht mehr als eine Angabe pro Tag hinzugefügt werden.';
          return;
        }

        const response = await axios.post('https://watergoal-backend.onrender.com/dailyWaterIntake', {
          waterGoal: { id: this.currentThing.id },
          date: this.newDate,
          ml: this.newDailyWaterIntake
        })

        this.currentThing.dailyWaterIntake = response.data.dailyWaterIntake
        this.newDailyWaterIntake = ''
        this.newDate = ''
        this.resetAddIntakeMessage();

        await this.fetchDailyWaterIntakes();
      } else {
        console.error('currentThing is null!');
      }
    },

    async fetchDailyWaterIntakes() {
      if (this.currentThing) {
        try {
          const response = await axios.get(`https://watergoal-backend.onrender.com/dailyWaterIntake/${this.currentThing.id}`);
          this.dailyWaterIntakes = response.data || [];
          this.calculateAverageIntake();
        } catch (error) {
          console.error(error);
          this.dailyWaterIntakes = [];
        }
      } else {
        console.error('currentThing is null!');
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
        if (this.chart) {
          this.chart.destroy();
          this.chart = null;
        }
      }
    },

    downloadChart() {
      if (!this.chart) {
        console.error('No chart available to download');
        return;
      }

      const canvas = this.$refs.myChart;
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = 'chart.png';
      document.body.appendChild(link);
      link.click();
    },
    resetData() {
      this.averageIntake = 0;
      if (this.chart) {
        this.chart.destroy();
        this.chart = null;
      }
    },
    async changeDailyWaterIntake() {
      if (!this.currentThing || !this.newDate || !this.newDailyWaterIntake) {
        console.error('No current thing selected or date provided for update');
        return;
      }

      try {
        const dataToUpdate = {
          ml: this.newDailyWaterIntake
        };

        await axios.put(`https://watergoal-backend.onrender.com/dailyWaterIntake/${this.currentThing.id}/${this.newDate}`, dataToUpdate);
        await this.fetchDailyWaterIntakes();

        this.newDailyWaterIntake = '';
        this.newDate = '';
      } catch (error) {
        console.error('An error occurred while updating the daily water intake:', error);
      }
    },
  }
}
</script>
