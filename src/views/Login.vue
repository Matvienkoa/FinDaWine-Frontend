<template>
  <div id="bloc-page">
      <div class="form">
        <input v-model="email" type="email" class="form-control" placeholder="Adresse mail" required>
        <input v-model="password" type="password" class="form-control" placeholder="Mot de passe" required>
        <button @click="login()" class="btn btn-primary">Connexion</button><br>
        <button @click="goHome()" class="btn btn-secondary">Home</button>
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
    },
    goHome(){
      this.$router.push('/')
    }
  },
}
</script>

<style scoped>
  #bloc-page{
    max-width: 1200px;
  }
  .form{
    display: block;
    width: 60%;
    max-width: 300px;
    margin: auto;
    padding-top: 150px;
    text-align: center;
  }
  input{
    margin-bottom: 20px;
  }
  .btn-secondary{
    margin-top: 30px;
  }
</style>
