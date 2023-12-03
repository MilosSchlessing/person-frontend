<template>
  <div class="things">
    <form @submit.prevent="getThing">
      <label for="id">ID:</label>
      <input id="id" v-model="thingId" required>

      <button type="submit">Get my Watergoal!</button>
    </form>

    <div v-if="currentThing">
      <p>Name: {{ currentThing.name }}</p>
      <p>ML: {{ currentThing.ml }}</p>

      <button @click="editMode = true">Edit</button>

      <form v-if="editMode" @submit.prevent="updateThing">
        <label for="name">Name:</label>
        <input id="name" v-model="currentThing.name" required>

        <label for="ml">ML:</label>
        <input id="ml" v-model="currentThing.ml" required>

        <button type="submit">Update Thing</button>
      </form>
    </div>
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
}

.things h1, .things h2, .thing-item p {
  color: #0077be;
}

.thing-item {
  margin-bottom: 20px;
}


.edit-button, .submit-button {
  background-color: #0077be;
  color: #fff;
  border: none;
  padding: 10px 20px;
  margin-top: 10px;
  border-radius: 5px;
  cursor: pointer;
}

.edit-button:hover, .submit-button:hover {
  background-color: #005580;
}
</style>

<script>
import axios from 'axios';

export default {
  name: 'PersonsView',
  data() {
    return {
      things: [],
      newThing: {
        name: '',
        ml: '',
      },
      currentThing: null,
      editMode: false,
    };
  },
  methods: {
    getThing() {
      axios
        .get(`http://localhost:8080/watergoal/${this.thingId}`)
        .then(response => {
          this.currentThing = response.data;
        })
        .catch(error => console.log(error));
    },
    editThing(index) {
      this.currentThing = this.things[index];
      this.editMode = true; // Set editMode to true when editing a thing
    },
    updateThing() {
      axios
        .put(`http://localhost:8080/watergoal/${this.currentThing.id}`, this.currentThing)
        .then(response => {
          this.things = this.things.map(thing =>
            thing.id === this.currentThing.id ? this.currentThing : thing
          );
          this.editMode = false; // Set editMode to false after updating
        })
        .catch(error => console.log(error));
    },
  },
  mounted() {
    axios
      .get('http://localhost:8080/things')
      .then(response => {
      this.things = response.data;
      this.things.sort((a, b) => a.id - b.id);
    })
      .catch(error => console.log(error));
  },
};
</script>

