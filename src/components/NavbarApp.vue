<template>
  <nav class="navbar navbar-expand-lg">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Hydrate</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <router-link class="nav-link" to="/">Home</router-link>
          <router-link class="nav-link" to="/about">About</router-link>
          <router-link class="nav-link" to="/persons">Persons</router-link>
          <router-link class="nav-link" to="/create-user">Create User</router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  background: linear-gradient(to bottom, #89CFF0 0%, #89CFF0 100%);
}

.navbar-brand, .nav-link {
  color: #0077be !important;
  margin-right: 20px;
  transition: color 0.3s ease;
}

.nav-link {
  color: #0077be !important;
  transition: color 0.3s ease;
}

.navbar .navbar-nav .nav-link {
  margin-right: 20px;
}

.nav-link:hover {
  color: #002233 !important;
}
.navbar-brand:hover {
  color: #002233 !important;
}

.router-link-active {
  color: #005580 !important;
}
</style>