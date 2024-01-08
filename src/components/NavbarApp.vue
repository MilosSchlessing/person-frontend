<template>
  <nav class="navbar navbar-expand-lg">
    <router-link to="/">
      <img src="../assets/wasser.png" alt="Icon" class="navbar-icon">
    </router-link>
    <div class="container-fluid">
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <router-link class="nav-link" to="/">Home</router-link>
          <router-link class="nav-link" to="/about">About</router-link>
          <router-link class="nav-link" to="/persons">Persons</router-link>
          <router-link class="nav-link" to="/create-user">Create User</router-link>
          <router-link class="nav-link" to="/registerview">E-Mail Reminder</router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  display: flex;
  padding: 2% 6%;
  justify-content: flex-start;
  align-items: center;
  background: linear-gradient(to bottom, #89CFF0 0%, #89CFF0 100%);
}

.navbar-icon {
  position: absolute;
  left: 10px;
  top: 10px;
  width: 120px;
  height: 120px;
}

.navbar-brand, .nav-link {
  color: #0077be !important;
  margin-right: 20px;
  transition: color 0.3s ease;
}

.navbar-nav {
  flex: 1;
  text-align: right;
}

.navbar-nav .nav-link {
  list-style: none;
  display: inline-block;
  padding: 8px 12px;
  position: relative;
  line-height: 1;
  color: #fff;
  text-decoration: none;
  font-size: 13px;
}

.navbar-nav .nav-link::after {
  content: '';
  width: 0%;
  height: 2px;
  background: goldenrod;
  display: block;
  margin: auto;
  transition: 0.5s;
}

.navbar-nav .nav-link:hover::after {
  width: 100%;
  transition: 0.5s;
}
</style>