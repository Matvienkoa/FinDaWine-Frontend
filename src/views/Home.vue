<template>
  <div class="container">
    <i v-if="showWine === 'yes'" @click="switchToHideWine" id="close-wine" class="fas fa-times"></i>
    <Wine v-if="showWine === 'yes'" :id="wineId"/>
    <div v-if="showWine === 'no'" id="bloc-page-home">
      <h1>Notre Sélection de Vins</h1>
      <div class="" id="search-container">
        <span>
          <i class="fas fa-search"></i>
          <input v-model="searchKey" type="search" id="search-key" placeholder="Entrez le nom d'un vin...">
        </span>
        <span>
          <i class="fas fa-barcode" id="barcode"></i>
          <span id="scan-txt">Scanner un Produit</span>
        </span>
      </div>
      <div class="row row-cols-auto align-items-center justify-content-center" id="select-container">  
        <select v-model="countrySelected" class="search col">
          <option value="">Choisir un Pays</option>
          <option v-for="option in countryOption" :key="option.id" :value="option.id">{{option.name}}</option>
        </select>
        <select v-model="regionSelected" class="search col">
          <option value="">Choisir une Région</option>
          <option v-for="option in regionOption" :key="option.id" :value="option.id">{{option.name}}</option>
        </select>
        <select v-model="appellationSelected" class="search col">
          <option value="">Choisir une Appellation</option>
          <option v-for="option in appellationOption" :key="option.id" :value="option.id">{{option.name}}</option>
        </select>
        <select v-model="couleurSelected" class="search col">
          <option value="">Choisir une Couleur</option>
          <option v-for="option in couleurOption" :key="option.id" :value="option.id">{{option.name}}</option>
        </select>
        <select v-model="viticultureSelected" class="search col">
          <option value="">Choisir une Viticulture</option>
          <option v-for="option in viticultureOption" :key="option.id" :value="option.id">{{option.name}}</option>
        </select>
        <div @click="cancelSearch" v-if="searchkey || countrySelected || regionSelected || appellationSelected || couleurSelected || viticultureSelected" class="cancel">
          <h5>Annuler la Recherche</h5>
        </div>
        <h3 v-if="search.length === 0">Aucun Résultat</h3>
      </div>
      <div id="wine-prez" class="row">
        <div @click="switchToShowWine(), setUpWineId(wine.id)" v-for="wine, id in search" :key="id" class="col-sm-6 wine-card">
              <div class="col-5 img-card">
                <img :src="wine.imageUrl" alt="" class="wine-img">
              </div>
              <div id="wine-info">
                <span>Domaine : {{ wine.domaine }}</span>
                <span>Appellation : {{ wine.appellation }}</span>
                <span>Millésime : {{ wine.millesime }}</span>
                <span>Région : {{ wine.region }}</span>
                <span>Couleur : {{ wine.couleur }}</span>
                <span> Prix TTC : {{ wine.prix }} €</span>
                <span>+ d'Infos</span>
              </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import instance from '../axios';
import Wine from '@/components/Wine.vue';
//import { mapActions, mapGetters } from 'vuex';
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
      showWine: "no"
    }
  },
  props: {
  },
  methods: {
    //...mapActions(["getAllWines"]),
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
    //...mapGetters(["getWines"]),
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
    //this.getAllWines();
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
    }, 500);
  }
}
</script>

<style scoped>
#close-wine{
  cursor: pointer;
  font-size: 2.5rem;
  position: absolute;
  top: 100px;
  left: 5%;
}
#search-container{
  display: flex;
  justify-content: space-evenly;
  margin-bottom: 20px;
}
#search-container i{
  margin-right: 15px;
}
#search-container span{
  display: flex;
  align-items: center;
}
#barcode{
  font-size: 2rem;
}
#scan-txt{
  display: block;
}

#select-container{
  margin-bottom: 20px;
}
.search{
  margin-right: 30px;
  margin-bottom: 10px;
}
.wine-card{
  display: flex;
  margin-bottom: 50px;
  cursor: pointer;
}
#wine-info{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}
#wine-info p{
  margin-bottom: 0;
}
.img-card{
  display: flex;
}
.wine-img{
  width: 100%;
  object-fit: cover;
  object-position: center;
}
a {
  text-decoration: none;
  color: black;
}
</style>
