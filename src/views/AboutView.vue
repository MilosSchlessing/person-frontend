<template>
  <div class="about">
    <h1>Welcome to Hydrate!</h1>
    <p>We are dedicated to helping you stay hydrated. Remember to drink water regularly throughout the day.</p>
      <div class="row">
        <div class="champpics-col">
          <img src="/water1.jpg">
          <div class="layer">
            <h3 class="test">"Trinken ist keine Option, sondern eine Verpflichtung – halte deinen Körper gut bewässert, um ihn am besten gedeihen zu lassen."<br> ~Sidar Dali </h3>
          </div>
        </div>
        <div class="champpics-col">
          <img src="/water2.jpg">
          <div class="layer">
            <h3 class="test">"Dein Körper ist wie ein Garten; gieße ihn mit Wasser, damit die Blumen der Gesundheit blühen können."<br> ~Mustafa Nazari </h3>
          </div>
        </div>
        <div class="champpics-col">
          <img src="/water3.jpg">
          <div class="layer">
            <h3 class="test">"Wasser ist die Quelle des Lebens – trinke genug, um deine eigene Quelle der Vitalität zu sein."<br> ~Nikita Mantel </h3>
          </div>
        </div>
      </div>
    <h1></h1>
    <p></p>
  </div>
</template>

<style scoped>
.about {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: auto;
  background: linear-gradient(to bottom, #89CFF0 0%, #FFFFFF 100%);
  font-family: Arial, sans-serif;
}

.about h1, .about p {
  color: #0077be;
}

.about p {
  width: 60%;
  text-align: center;
}

.row {
  display: flex;
  justify-content: center;
  width: 80%;
  margin: auto;
}

.champpics-col {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  flex: 1;
  border-radius: 10px;
  margin-bottom: 15px;
}

.champpics-col img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 15px;
}

.layer {
  position: absolute;
  top: 0; /* Adjust these values */
  left: 0; /* Adjust these values */
  width: 100%;
  height: 100%;
  background: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.5s;
  border-radius: 20px;
  box-sizing: border-box;
}

.layer h3 {
  color: #fff;
  text-align: center;
  max-width: 80%;
}

.champpics-col:hover .layer {
  opacity: 1;
}

.test {
  color: #ffffff !important;
  font-weight: bold;
  text-shadow: 2px 2px 4px #000000;
}
</style>