<template>
    <div class="container" id="bloc-page">
        <div class="" id="bloc-page-wine">
            <div class="row" id="bloc-img"></div>
            <div class="row" id="wine-prez">
                <div class="img-card col-sm-5">
                    <img :src="getWine.imageUrl" alt="" class="wine-img" />
                </div>
                <div id="info1" class="wine-info col-sm-7">
                    <span><span class="titles">Domaine : </span>{{ getWine.domaine }}</span>
                    <span><span class="titles">Appellation : </span>{{ getWine.appellation }}</span>
                    <span><span class="titles">Millésime : </span>{{ getWine.millesime }}</span>
                    <span><span class="titles">Pays : </span>{{ getWine.pays }}</span>
                    <span><span class="titles">Région :</span> {{ getWine.region }}</span>
                    <span><span class="titles">Couleur : </span>{{ getWine.couleur }}</span>
                    <span><span class="titles">Cépage : </span>{{ getWine.cepage }}</span>
                    <span><span class="titles">Viticulture : </span>{{ getWine.viticulture }}</span>
                    <span><span class="titles">Alcool : </span>{{ getWine.alcool }} %</span>
                    <span><span class="titles">Format : </span>{{ getWine.format }} cL</span>
                    <span><span class="titles">Prix TTC : </span>{{ getWine.prix }} €</span>
                </div>
                <div id="info2" class="wine-info row">
                    <span><span class="titles">Description : </span>{{ getWine.description }}</span>
                    <span><span class="titles">A l'Oeil : </span>{{ getWine.oeil }}</span>
                    <span><span class="titles">Au Nez : </span>{{ getWine.nez }}</span>
                    <span><span class="titles">En Bouche : </span>{{ getWine.bouche }}</span>
                    <span><span class="titles">Température de Service : </span>{{ getWine.temperature }}</span>
                    <span><span class="titles">Garde : </span>{{ getWine.conservation }}</span>
                    <span><span class="titles">Accords : </span>{{ getWine.accords }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    name: "result",
    data () {
        return {
        }
    },
    computed: {
        ...mapGetters(["getWine"]),
    },
}
</script>

<style scoped>
#bloc-page{
  max-width: 95%;
}

/*Produit*/
#bloc-page-wine{
    max-width: 95%;
    margin: auto;
}
#bloc-img{
    height: 250px;
    background-image: url('../assets/cave.png');
    background-size: cover;
    margin-right: -200px;
    margin-left: -200px;
}
.img-card{
    display: flex;
}
.wine-img{
    width: 100%;
    object-fit: cover;
    object-position: center;
}
#wine-prez{
    display: flex;
    border-radius: 30px 30px 0 0;
    margin-top: -120px;
    background-color: white;
    padding-top: 40px;
    box-shadow: 0px -2px 0px rgb(100, 10, 40);
}
#info1{
    padding-bottom: 80px;
    padding-top: 20px;
    font-size: 1.2rem;
}

#test span{
    margin-bottom: 10px;
}
#info2{
    font-size: 1.2rem;
    padding-top: 50px;
    padding-left: 40px;
}
.wine-info{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    text-align: start;
    font-size: 1.1rem;
}
.titles{
    font-weight: bold;
    color: rgb(86,10,34);
}

@media screen and (min-width: 1182px) {
    #bloc-page{
        max-width: 80%;
    }
#wine-prez{
    margin-top: -90px;
  }
  #bloc-img{
    height: 300px;
    margin-right: -310px;
    margin-left: -310px;
  }
}
</style>