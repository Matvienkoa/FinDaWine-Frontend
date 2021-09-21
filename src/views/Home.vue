<template>
  <div class="" id="bloc-page">
    <i v-if="showWine === 'yes'" @click="switchToHideWine" id="close-wine" class="fas fa-times"></i>
    <Wine v-if="showWine === 'yes'" :id="wineId"/>
    <div v-if="showWine === 'no'" id="bloc-page-home">
      <div class="" id="bloc-img"></div>
      <div class="row row-cols-auto align-items-center justify-content-evenly" id="search-container">
        <span class="col">
          <i class="fas fa-search"></i>
          <input v-model="searchKey" type="search" id="search-key" placeholder="Entrez le nom d'un vin...">
        </span>
        <span id="scan" class="col">
          <i class="fas fa-barcode" id="barcode"></i>
          <router-link to="scan"><span id="scan-txt">Scanner un Produit</span></router-link>
        </span>
      </div>
      <div class="row row-cols-auto align-items-center justify-content-center" id="select-container">  
        <select v-model="countrySelected" class="select col">
          <option value="">Choisir un Pays</option>
          <option v-for="option in countryOption" :key="option.id" :value="option.id">{{option.name}}</option>
        </select>
        <select v-model="regionSelected" class="select col">
          <option value="">Choisir une Région</option>
          <option v-for="option in regionOption" :key="option.id" :value="option.id">{{option.name}}</option>
        </select>
        <select v-model="appellationSelected" class="select col">
          <option value="">Choisir une Appellation</option>
          <option v-for="option in appellationOption" :key="option.id" :value="option.id">{{option.name}}</option>
        </select>
        <select v-model="couleurSelected" class="select col">
          <option value="">Choisir une Couleur</option>
          <option v-for="option in couleurOption" :key="option.id" :value="option.id">{{option.name}}</option>
        </select>
        <select v-model="viticultureSelected" class="select col">
          <option value="">Choisir une Viticulture</option>
          <option v-for="option in viticultureOption" :key="option.id" :value="option.id">{{option.name}}</option>
        </select>
        <div @click="cancelSearch" v-if="searchkey || countrySelected || regionSelected || appellationSelected || couleurSelected || viticultureSelected" class="cancel col-12">
          <i class="fas fa-times" id="cancel-cross"></i>
          <h5>Annuler la Recherche</h5>
        </div>
        <div v-if="this.$store.state.admin.isAdmin === 1" class="col-12" id="add-product"><router-link to="/addproduct"><i class="fas fa-plus"></i><span> Ajouter un Produit</span></router-link></div>
      </div>
      <div id="wine-prez" class="row">
        <h3 v-if="search.length === 0" id="no-result">Nous n'avons pas encore ce Vin...<br>Peut être prochainement ^^</h3>
        <i v-if="search.length === 0" class="fas fa-wine-glass-alt"></i>
        <div @click="switchToShowWine(), setUpWineId(wine.id)" v-for="wine, id in search" :key="id" class="col-sm-6 col-lg-4 col-xxl-3 wine-card">
              <div class="col-4 img-card">
                <!-- <img :src="wine.imageUrl" alt="" class="wine-img"> -->
                <img src="../assets/bottle.jpg" class="wine-img">
              </div>
              <div id="wine-legend" class="col-8">
                <div id="wine-info">
                  <span><span class="titles">Domaine :</span> {{ wine.domaine }}</span>
                  <span><span class="titles">Appellation :</span> {{ wine.appellation }}</span>
                  <span><span class="titles">Millésime :</span> {{ wine.millesime }}</span>
                  <span><span class="titles">Région :</span> {{ wine.region }}</span>
                  <span><span class="titles">Couleur :</span> {{ wine.couleur }}</span>
                  <span><span class="titles">Prix TTC :</span><span id="prix"> {{ wine.prix }} € </span><span v-if="wine.promo === '1'" id="promo">Promo</span></span>
                </div>
                <span id="more-infos">+ d'Infos</span>
              </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import instance from '../axios';
import Wine from '@/components/Wine.vue';
export default {
  name: 'Home',
  components: {
    Wine,
  },
  data () {
    return {
      wines: [],
      wineId: "",
      searchKey: "",
      countryList: [],
      countryOption: [],
      countrySelected: "",
      regionList: [],
      regionOption: [],
      regionSelected: "",
      appellationList: [],
      appellationOption: [],
      appellationSelected: "",
      couleurList: [],
      couleurOption: [],
      couleurSelected: "",
      viticultureList: [],
      viticultureOption: [],
      viticultureSelected: "",
      promoList: [],
      showWine: "no",
    }
  },
  props: {
  },
  methods: {
    cancelSearch() {
      this.searchKey = "";
      this.regionSelected = "";
      this.countrySelected = "";
      this.appellationSelected = "";
      this.couleurSelected = "";
      this.viticultureSelected = "";
    },
    switchToShowWine() {
      this.showWine = 'yes';
    },
    switchToHideWine() {
      this.showWine = 'no';
    },
    setUpWineId(id) {
      this.wineId = id
    },
  },
  computed: {
    search() {
      return this.wines.filter((wine) => {
        return (
          wine.domaine.toLowerCase().includes(this.searchKey.toLowerCase()) &&
          wine.pays.toLowerCase().includes(this.countrySelected.toLowerCase()) &&
          wine.region.toLowerCase().includes(this.regionSelected.toLowerCase()) &&
          wine.appellation.toLowerCase().includes(this.appellationSelected.toLowerCase()) &&
          wine.couleur.toLowerCase().includes(this.couleurSelected.toLowerCase()) &&
          wine.viticulture.toLowerCase().includes(this.viticultureSelected.toLowerCase())
        )
      })
    },
  },
  mounted() {
     instance.get('findawine/wines')
      .then((response) => response.data)
      .then((response) => {
        this.wines = response;
      })
      .then(() => {
        for (let i = 0; i < this.wines.length; i++) {
          if (!this.countryList.includes(this.wines[i].pays)) {
            this.countryList.push(this.wines[i].pays)
          }
          if (!this.regionList.includes(this.wines[i].region)) {
            this.regionList.push(this.wines[i].region)
          }
          if (!this.appellationList.includes(this.wines[i].appellation)) {
            this.appellationList.push(this.wines[i].appellation)
          }
          if (!this.couleurList.includes(this.wines[i].couleur)) {
            this.couleurList.push(this.wines[i].couleur)
          }
          if (!this.viticultureList.includes(this.wines[i].viticulture)) {
            this.viticultureList.push(this.wines[i].viticulture)
          }
        }
      })
      .then(() => {
        this.$store.dispatch('getIfAdmin');
      })
      .catch((response) => {
        console.log(response);
      })

    setTimeout(() => {
      let arrCountry = this.countryList.sort();
      for (let i = 0; i < arrCountry.length; i++) {
        this.countryOption.push({
          name: arrCountry[i],
          id: arrCountry[i],
        });
      }
      let arrRegion = this.regionList.sort();
      for (let i = 0; i < arrRegion.length; i++) {
        this.regionOption.push({
          name: arrRegion[i],
          id: arrRegion[i],
        });
      }
      let arrAppellation = this.appellationList.sort();
      for (let i = 0; i < arrAppellation.length; i++) {
        this.appellationOption.push({
          name: arrAppellation[i],
          id: arrAppellation[i],
        });
      }
      let arrCouleur = this.couleurList.sort();
      for (let i = 0; i < arrCouleur.length; i++) {
        this.couleurOption.push({
          name: arrCouleur[i],
          id: arrCouleur[i],
        });
      }
      let arrViticulture = this.viticultureList.sort();
      for (let i = 0; i < arrViticulture.length; i++) {
        this.viticultureOption.push({
          name: arrViticulture[i],
          id: arrViticulture[i],
        });
      }
    }, 500)
  },
}
</script>

<style scoped>

/*Home-Page*/
#bloc-page{
  max-width: 1200px;
  margin: auto;
}
#bloc-page-home{
  background-image: url('../assets/bois4.jpg');
}

/*bg img*/
#bloc-img{
  height: 250px;
  background-image: url('../assets/vignes2.png');
  background-size: cover;
}

/*Search*/
#search-container{
  width: 95%;
  margin: auto;
  padding-bottom: 20px;
  border-radius: 30px 30px 0 0;
  margin-top: -60px;
  background-color: rgb(231, 231, 231);
  padding-top: 15px;
  box-shadow: 0px -2px 0px rgb(100, 10, 40);
}
#search-container i{
  margin-right: 15px;
  color: rgb(86,10,34);
}
#search-container span{
  display: flex;
  align-items: center;
  font-size: 1.1rem;
}
.fa-search{
  font-size: 1.5rem;
}
#scan{
  cursor: pointer;
  background-color: rgb(124, 21, 54);
  border-radius: 20px;
  padding: 6px 20px;
}
#scan i, #scan a{
  color: white;
}
#scan a{
  text-decoration: none;
}
#barcode{
  font-size: 2.5rem;
  color: rgb(86,10,34);
}
#scan-txt{
  font-weight: bold;
}

/*Select Filter*/
#select-container{
  width: 95%;
  margin: auto;
  padding-bottom: 50px;
  padding-top: 10px;
  background-color: rgb(231, 231, 231);
}
.select{
  cursor: pointer;
  margin-right: 15px;
  margin-left: 15px;
  margin-bottom: 10px;
  border-color: rgb(86,10,34);
  border-width: 2px;
  border-radius: 7px;
  height: 35px;
  width: 200px;
}

/*Cancel Search*/
.cancel{
  margin-top: 5px;
  color: rgb(86,10,34);
  display: flex;
  align-items: center;
  justify-content: center;
}
.cancel h5{
  padding-top: 6px;
  cursor: pointer;
}
#cancel-cross{
  margin-right: 10px;
  font-size: 1.5rem;
  cursor: pointer;
}

/*No-result*/
#no-result{
  font-size: 2rem;
  margin-top: 50px;
  text-align: center;
}
.fa-wine-glass-alt{
  font-size: 2.5rem;
  margin-top: 50px;
  text-align: center;
}

/*Wines Card*/
/*Bloc*/
#wine-prez{
  width: 95%;
  margin: auto;
  border-radius: 30px 30px 0 0;
  margin-top: -40px;
  padding-bottom: 350px;
  background-color: #fff;
  padding-top: 20px;
  box-shadow: 0px -2px 0px rgb(100, 10, 40);
}
/*Cards*/
.wine-card{
  display: flex;
  margin-bottom: 50px;
  cursor: pointer;
}
/*Img*/
.img-card{
  display: flex;
}
.wine-img{
  width: 100%;
  object-fit: cover;
  object-position: center;
}
/*Infos*/
#wine-legend{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
#wine-info{
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  text-align: start;
}
.titles{
  font-weight: bold;
  color: rgb(86,10,34);
}
#more-infos{
  align-self: center;
  margin-top: 20px;
  font-weight: bold;
  color: white;
  border: 2px solid white;
  border-radius: 30px;
  padding: 2px 6px;
  background-color: rgb(153, 75, 98);
}
#prix{
  margin-left: 10px;
  font-weight: bold;
  font-size: 1.1rem;
  color: rgb(160, 34, 72);
}
#promo{
  font-weight: bold;
  color: red;
  margin-left: 10px;
  font-size: 1.2rem;
}

/*Special-close Wine-Component*/
#close-wine{
  cursor: pointer;
  font-size: 2rem;
  position: absolute;
  top: 100px;
  left: 30px;
  color: rgb(86,10,34);
  border: 4px solid rgb(86,10,34);
  border-radius: 40px;
  padding: 1px 7px;
}
@media screen and (min-width: 1742px){
  #close-wine{
    top: 280px;
    left: 400px;
  }
}
@media screen and (min-width: 1652px) and (max-width: 1741px){
  #close-wine{
    top: 280px;
    left: 300px;
  }
}
@media screen and (min-width: 1551px) and (max-width: 1651px){
  #close-wine{
    top: 280px;
    left: 250px;
  }
}
@media screen and (min-width: 1332px) and (max-width: 1550px){
  #close-wine{
    top: 280px;
    left: 200px;
  }
}
@media screen and (min-width: 1183px) and (max-width: 1331px){
  #close-wine{
    top: 280px;
    left: 90px;
  }
}
@media screen and (min-width: 951px) and (max-width: 1182px){
  #close-wine{
    top: 280px;
    left: 50px;
  }
}
@media screen and (min-width: 462px) and (max-width: 950px) {
  #close-wine{
    top: 280px;
    left: 40px;
  }
}
@media screen and (max-width: 461px) {
  #close-wine{
    top: 340px;
  }
}

/*Admin Functions*/
#add-product{
  font-size: 1.3rem;
  padding-top: 5px;
  padding-bottom: 5px;
  color: rgb(7, 105, 7);
  font-weight: bold;
  text-align: center;
}
#add-product a{
  text-decoration: none;
  color: rgb(17, 94, 17);
}
#add-product i{
  cursor: pointer;
  margin-right: 7px;
}
#add-product span{
  cursor: pointer;
}

/* -----Responsive-----*/
@media screen and (max-width: 460px) {
  #search-container{
    margin-top: -110px;
    padding-top: 20px;
    padding-bottom: 10px;
  }
  #scan{
    margin-top: 20px;
    background-color: rgb(124, 21, 54);
    border-radius: 20px;
    padding: 6px 15px;
  }
  #scan i, #scan a{
    color: white;
  }
  .select{
    width: 70%;
  }
  #select-container{
    padding-bottom: 60px;
  }
}
@media screen and (min-width: 461px) and (max-width: 589px) {
  #scan{
    margin-top: 20px;
  }
}
</style>
