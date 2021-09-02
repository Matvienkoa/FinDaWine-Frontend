<template>
  <div id="nav">
    <img src="./assets/grape.png" alt="" id="logo-grape">
    <img src="./assets/title.png" alt="" id="logo-title">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </div>
  <router-view/>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  background-image: linear-gradient(68deg,rgb(86,10,34), rgb(121,36,61));
}
#nav a {
  font-weight: bold;
  color: #2c3e50;
}
#nav a.router-link-exact-active {
  color: #42b983;
}
#logo-grape{
  width: 40px;
  position: absolute;
  left: 10px;
  top: 15px;
}
#logo-title{
  width: 60px;
  position: absolute;
  left: 60px;
  top: 17px;
}
</style>
