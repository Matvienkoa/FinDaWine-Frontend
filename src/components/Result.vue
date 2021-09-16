<template>
    <div class="" id="bloc-page">
        <div class="" id="bloc-page-wine">
            <div class="" id="bloc-img"></div>
            <div class="row" id="wine-prez">
                <span v-if="editMode === 'yes'" @click="swithToNoEditMode" id="cancel-edit"><i class="fas fa-times"></i> Annuler la Modification</span>
                <EditWine v-if="editMode === 'yes'" :id="getWine.id"/>
                <div v-if="this.$store.state.admin.isAdmin === 1 && editMode === 'no' && getWine !== null" class="admin-action">
                    <span id="edit-product" @click="switchToEditMode">Modifier le produit</span>
                    <span id="delete-product" @click="switchToDeleteMode">Supprimer le produit</span>
                </div>
                <div v-if="deleteMode === 'yes'" id="deleteBox"><p>Voulez-vous vraiment supprimer ce produit?</p><span @click.prevent="deleteProduct(getWine)" id="yes">Oui</span><span @click="switchToNoDeleteMode" id="no">Non</span></div>
                <div id="choice">
                    <router-link to="/"><span @click="resetLocalStorage" id="home"><i class="fas fa-arrow-left"></i> Retour à l'accueil</span></router-link>
                    <router-link to="/scan"><span @click="resetLocalStorage" id="other-scan"><i class="fas fa-barcode"></i> Scanner un autre Produit</span></router-link>
                </div>
                <div id="no-result" v-if="getWine === null">Oups... <i class="fas fa-meh-rolling-eyes"></i><i class="fas fa-meh-rolling-eyes"></i><br> Ce produit ne fait pas partie de notre catalogue!<br> Essayez un autre code!<br></div>
                <div v-if="getWine !== null && editMode === 'no'" class="img-card col-sm-5">
                    <!-- <img :src="getWine.imageUrl" alt="" class="wine-img" /> -->
                    <img src="../assets/bottle.jpg" class="wine-img">
                </div>
                <div v-if="getWine !== null && editMode === 'no'" id="info1" class="wine-info col-sm-7">
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
                <div v-if="getWine !== null && editMode === 'no'" id="info2" class="wine-info row">
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
import EditWine from '@/components/EditWine.vue';
export default {
    name: "result",
    components: {
        EditWine
    },
    data () {
        return {
            noData: "",
            editMode: "no",
            deleteMode: "no",
        }
    },
    methods: {
        resetLocalStorage() {
            localStorage.removeItem('code');
        },
        switchToEditMode () {
            this.editMode = 'yes'
        },
        swithToNoEditMode () {
            this.editMode = 'no'
        },
        switchToDeleteMode () {
            this.deleteMode = "yes"
        },
        switchToNoDeleteMode () {
            this.deleteMode = "no"
        },
        deleteProduct(getWine) {
            instance.delete(`findawine/wines/${getWine.id}`)
            .then(() => {
                this.$router.push('/');
            })
            .catch((error) => {
                this.error = error.response.data;
                console.log(error.response.data);
            })
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
        this.$store.dispatch('getIfAdmin');
    }
}
</script>

<style scoped>
/*Admin*/
.admin-action{
    margin-top: -20px;
    margin-bottom: 30px;
    font-size: 1.2rem;
    text-align: center;
}
#edit-product, #delete-product{
    margin-left: 15px;
    margin-right: 15px;
    font-weight: bold;
    cursor: pointer;
}
#edit-product{
    color: orange;
}
#cancel-edit{
    text-align: center;
    font-size: 1.3rem;
    margin-bottom: 15px;
    cursor: pointer;
    font-weight: bold;
}
#cancel-edit i{
    margin-right: 15px;
}
#delete-product{
    color: red;
}
#deleteBox{
    color: rgb(86,10,34);
    font-weight: bold;
    margin-bottom: 30px;
    text-align: center;
}
#yes{
    margin-right: 15px;
    cursor: pointer;
    color: green;
    font-size: 1.4rem;
}
#no{
    margin-left: 15px;
    cursor: pointer;
    color: red;
    font-size: 1.4rem;
}

/*Bloc Page*/
#bloc-page{
  max-width: 1200px;
  margin: auto;
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
    text-align: center;
    padding-bottom: 500px;
    margin-top: 80px;
    font-size: 2rem;
    color: rgb(100, 10, 40);
}

/*Produit*/
#bloc-page-wine{
    background-image: url('../assets/bois4.jpg');
}
#bloc-img{
    height: 250px;
    background-image: url('../assets/wine2.png');
    background-size: cover;
}

/*Wine Card*/
#wine-prez{
    width: 95%;
    margin: auto;
    display: flex;
    border-radius: 30px 30px 0 0;
    margin-top: -120px;
    background-color: white;
    padding-top: 40px;
    padding-bottom: 100px;
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
@media screen and (max-width: 576px) {
    .admin-action{
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        margin-top: 5px;
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