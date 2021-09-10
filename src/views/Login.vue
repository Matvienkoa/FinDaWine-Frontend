<template>
  <div id="bloc-page">
      <div class="form">
        <input v-model="email" type="email" class="form-control" placeholder="Adresse mail" required>
        <input v-model="password" type="password" class="form-control" placeholder="Mot de passe" required>
        <button @click="login()" class="btn btn-primary">Connexion</button>
      </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  methods: {
    login() {
      this.$store.dispatch('login', {
        email: this.email,
        password: this.password
      })
      .then(() => {
        this.$store.dispatch('getIfAdmin');
        this.$router.push('/')
      })
    }
  },
}
</script>

<style scoped>
  #bloc-page{
    background-image: url('../assets/bois4.jpg');
    background-size: cover;
    height: 100vh;
  }
  .form{
    display: block;
    width: 60%;
    max-width: 300px;
    margin: auto;
    padding-top: 150px;
  }
  input{
    margin-bottom: 20px;
  }
</style>
