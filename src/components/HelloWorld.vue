<template>
  <div class="hello container">
    <h1>hey hey</h1>
    <input v-model="searchKey" type="search" class="search" placeholder="Entrez le nom d'un vin...">
    <select v-model="countrySelected" name="" id="">
      <option value="">Choisir un Pays</option>
      <option v-for="option in countryOption" :key="option.id" :value="option.id">{{option.name}}</option>
    </select>
    <select v-model="regionSelected" name="" id="">
      <option value="">Choisir une Région</option>
      <option v-for="option in regionOption" :key="option.id" :value="option.id">{{option.name}}</option>
    </select>
    <select v-model="appellationSelected" name="" id="">
      <option value="">Choisir une Appellation</option>
      <option v-for="option in appellationOption" :key="option.id" :value="option.id">{{option.name}}</option>
    </select>
    <select v-model="couleurSelected" name="" id="">
      <option value="">Choisir une Couleur</option>
      <option v-for="option in couleurOption" :key="option.id" :value="option.id">{{option.name}}</option>
    </select>
    <select v-model="viticultureSelected" name="" id="">
      <option value="">Choisir une Viticulture</option>
      <option v-for="option in viticultureOption" :key="option.id" :value="option.id">{{option.name}}</option>
    </select>
    <div @click="cancelSearch" v-if="searchkey || countrySelected || regionSelected || appellationSelected || couleurSelected || viticultureSelected" class="cancel">
      <h5>Annuler la Recherche</h5>
    </div>
    <h3 v-if="search.length === 0">Aucun Résultat</h3>
    <div id="wine-prez" class="row">
      <div v-for="wine, id in search" :key="id" class="col-6">
        <router-link :to="{name: 'wine', params: {id: wine.id}}">
          <div class="wine-card">
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
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import instance from '../axios';
//import { mapActions, mapGetters } from 'vuex';
export default {
  name: 'HelloWorld',
  data () {
    return {
      wines: [],
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
    }
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
.wine-card{
  display: flex;
  margin-bottom: 50px;
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
