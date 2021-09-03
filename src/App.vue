<template>
  <div id="nav">
    <img src="./assets/grape.png" alt="" id="logo-grape">
    <img src="./assets/title.png" alt="" id="logo-title">
    <h1>Notre Séléction de Vins...</h1>
  </div>
  <router-view/>
</template>

<style>
/*Polices*/
@font-face {
    font-family: 'rochesterregular';
    src: url('./assets/polices/Rochester-Regular-webfont.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}
@font-face {
    font-family: 'allura';
    src: url('./assets/polices/Allura-Regular.otf');
    font-weight: normal;
    font-style: normal;
}

h1{
  font-family: 'allura';
  font-size: 2.2rem;
  margin-bottom: -10px;
  margin-top: 16px;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-image: url('./assets/bois4.jpg');
  background-repeat: repeat;
  /*background-image: linear-gradient(342deg, rgba(77, 77, 77,0.05) 0%, rgba(77, 77, 77,0.05) 25%,rgba(42, 42, 42,0.05) 25%, rgba(42, 42, 42,0.05) 38%,rgba(223, 223, 223,0.05) 38%, rgba(223, 223, 223,0.05) 75%,rgba(36, 36, 36,0.05) 75%, rgba(36, 36, 36,0.05) 100%),linear-gradient(170deg, rgba(128, 128, 128,0.05) 0%, rgba(128, 128, 128,0.05) 34%,rgba(212, 212, 212,0.05) 34%, rgba(212, 212, 212,0.05) 57%,rgba(25, 25, 25,0.05) 57%, rgba(25, 25, 25,0.05) 89%,rgba(135, 135, 135,0.05) 89%, rgba(135, 135, 135,0.05) 100%),linear-gradient(367deg, rgba(55, 55, 55,0.05) 0%, rgba(55, 55, 55,0.05) 14%,rgba(209, 209, 209,0.05) 14%, rgba(209, 209, 209,0.05) 60%,rgba(245, 245, 245,0.05) 60%, rgba(245, 245, 245,0.05) 69%,rgba(164, 164, 164,0.05) 69%, rgba(164, 164, 164,0.05) 100%),linear-gradient(375deg, rgba(248, 248, 248,0.05) 0%, rgba(248, 248, 248,0.05) 32%,rgba(148, 148, 148,0.05) 32%, rgba(148, 148, 148,0.05) 35%,rgba(202, 202, 202,0.05) 35%, rgba(202, 202, 202,0.05) 51%,rgba(181, 181, 181,0.05) 51%, rgba(181, 181, 181,0.05) 100%),linear-gradient(218deg, rgb(101,97,97),rgb(101,97,97));
  */
}
#nav {
  padding: 16px;
  background-image: linear-gradient(68deg,rgb(86,10,34), rgb(121,36,61));
  text-align: right;
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
h1{
  color: white;
}
</style>
