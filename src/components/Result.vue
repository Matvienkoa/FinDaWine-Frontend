<template>
    <div class="container" id="bloc-page">
        <div class="" id="bloc-page-wine">
            <div class="row" id="bloc-img"></div>
            <div class="row" id="wine-prez">
                <div id="choice">
                    <router-link to="/"><span @click="resetLocalStorage" id="home"><i class="fas fa-arrow-left"></i> Retour à l'accueil</span></router-link>
                    <router-link to="/scan"><span @click="resetLocalStorage" id="other-scan"><i class="fas fa-barcode"></i> Scanner un autre Produit</span></router-link>
                </div>
                <div id="no-result" v-if="getWine === null">Oups... <i class="fas fa-meh-rolling-eyes"></i><i class="fas fa-meh-rolling-eyes"></i><br> Ce produit ne fait pas partie de notre catalogue!<br> Essayez un autre code!<br></div>
                <div v-if="getWine !== null" class="img-card col-sm-5">
                    <img :src="getWine.imageUrl" alt="" class="wine-img" />
                </div>
                <div v-if="getWine !== null" id="info1" class="wine-info col-sm-7">
                    <span class="query"><span class="titles">Domaine : </span><span>{{ getWine.domaine }}</span></span>
                    <span class="query"><span class="titles">Appellation : </span><span>{{ getWine.appellation }}</span></span>
                    <span class="query"><span class="titles">Millésime : </span><span>{{ getWine.millesime }}</span></span>
                    <span class="query"><span class="titles">Pays : </span><span>{{ getWine.pays }}</span></span>
                    <span class="query"><span class="titles">Région :</span><span> {{ getWine.region }}</span></span>
                    <span class="query"><span class="titles">Couleur : </span><span>{{ getWine.couleur }}</span></span>
                    <span class="query"><span class="titles">Cépage : </span><span>{{ getWine.cepage }}</span></span>
                    <span class="query"><span class="titles">Viticulture : </span><span>{{ getWine.viticulture }}</span></span>
                    <span class="query"><span class="titles">Alcool : </span><span>{{ getWine.alcool }} %</span></span>
                    <span class="query"><span class="titles">Format : </span><span>{{ getWine.format }} cL</span></span>
                    <span class="query"><span class="titles">Prix TTC : </span><span>{{ getWine.prix }} €</span></span>
                </div>
                <div v-if="getWine !== null" id="info2" class="wine-info row">
                    <span class="query"><span class="titles">Description : </span><span>{{ getWine.description }}</span></span>
                    <span class="query"><span class="titles">A l'Oeil : </span><span>{{ getWine.oeil }}</span></span>
                    <span class="query"><span class="titles">Au Nez : </span><span>{{ getWine.nez }}</span></span>
                    <span class="query"><span class="titles">En Bouche : </span><span>{{ getWine.bouche }}</span></span>
                    <span class="query"><span class="titles">Température de Service : </span><span>{{ getWine.temperature }}</span></span>
                    <span class="query"><span class="titles">Garde : </span><span>{{ getWine.conservation }}</span></span>
                    <span class="query"><span class="titles">Accords : </span><span>{{ getWine.accords }}</span></span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import instance from '../axios';
import { mapGetters } from 'vuex';
export default {
    name: "result",
    data () {
        return {
            noData: ""
        }
    },
    methods: {
        resetLocalStorage() {
            localStorage.removeItem('code');
        }
    },
    computed: {
        ...mapGetters(["getWine"]),
    },
    mounted() {
        let code = localStorage.getItem('code');
        instance.get(`findawine/wines/code/${code}`)
            .then((response) => {
                    this.$store.state.wine = response.data;
            })
        
    }
}
</script>

<style scoped>
/*Bloc Page*/
#bloc-page{
  max-width: 95%;
}

/*Options*/
a{
    text-decoration: none;
}
#choice{
    margin-top: -10px;
    margin-bottom: 20px;
    font-size: 1.2rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
}
#home, #other-scan{
    font-weight: bold;
    color: white;
    cursor: pointer;
    border-radius: 30px;
    padding: 8px 15px;
    background-color:rgb(100, 10, 40) ;
}
#home i, #other-scan i{
    margin-right: 10px;
}

/*No Result*/
#no-result{
    height: 100vh;
    margin-top: 80px;
    font-size: 2rem;
    color: rgb(100, 10, 40);
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
/*Wine Card*/
#wine-prez{
    display: flex;
    border-radius: 30px 30px 0 0;
    margin-top: -120px;
    background-color: white;
    padding-top: 40px;
    padding-bottom: 40px;
    box-shadow: 0px -2px 0px rgb(100, 10, 40);
}
.img-card{
    display: flex;
}
.wine-img{
    width: 100%;
    object-fit: cover;
    object-position: center;
}
.wine-info{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    text-align: start;
    font-size: 1.1rem;
}
#info1{
    padding-bottom: 40px;
    padding-top: 20px;
    font-size: 1.2rem;
    font-weight: bold;
}
#info1 span{
    margin-bottom: 5px;
}
#info2{
    font-size: 1.2rem;
    padding-top: 20px;
    padding-left: 40px;
    font-weight: bold;
}
#info2 span{
    margin-bottom: 5px;
}
.titles{
    color: rgb(86,10,34);
}

/*Responsive*/
@media screen and (min-width: 1182px) {
    #wine-prez{
        margin-top: -90px;
    }
    #bloc-img{
        height: 300px;
        margin-right: -310px;
        margin-left: -310px;
    }
}

@media screen and (max-width: 576px) {
    .admin-action{
        display: flex;
        flex-direction: column;
        align-items: flex-end;
    }
    #edit-product, #delete-product{
        font-size: 1rem;
    }
    #cancel-edit{
        margin-top: 35px;
        font-size: 1.2rem;
    }
    #wine-prez{
        padding-top: 20px;
    }
    #info1, #info2{
        width: 95%;
        margin: auto;
        font-size: 1rem;
        align-items: center;
        text-align: center;
    }
    #info2{
        padding: 0;
    }
    .query{
        display: flex;
        flex-direction: column;
    }
    
}

@media screen and (max-width: 650px) {
    #choice{
        flex-direction: column;
    }
    #choice a{
        margin-top: 20px;
    }
    #no-result{
        font-size: 1.5rem;
        margin-top: 20px;
    }
}
</style>