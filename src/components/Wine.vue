<template>
    <div class="" id="bloc-page-wine">   
        <div class="row" id="bloc-img"></div>
        <div class="row" id="wine-prez">
            <span v-if="editMode === 'yes'" @click="swithToNoEditMode" id="cancel-edit"><i class="fas fa-times"></i> Annuler la Modification</span>
            <EditWine v-if="editMode === 'yes'" :id="this.id"/>
            <div v-if="this.$store.state.admin.isAdmin === 1 && editMode === 'no'" class="admin-action">
                <span id="edit-product" @click="switchToEditMode">Modifier le produit</span>
                <span id="delete-product" @click="switchToDeleteMode">Supprimer le produit</span>
            </div>
            <div v-if="deleteMode === 'yes'" id="deleteBox"><p>Voulez-vous vraiment supprimer ce produit?</p><span @click.prevent="deleteProduct(getWine)" id="yes">Oui</span><span @click="switchToNoDeleteMode" id="no">Non</span></div>
            <div v-if="editMode === 'no'" class="img-card col-sm-5">
                <img :src="getWine.imageUrl" alt="" class="wine-img">
            </div>
            <div v-if="editMode === 'no'" id="info1" class="wine-info col-sm-7">
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
            <div v-if="editMode === 'no'" id="info2" class="wine-info row">   
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
</template>

<script>
import instance from '../axios';
import { mapActions, mapGetters } from 'vuex';
import EditWine from '@/components/EditWine.vue';
export default {
    name: 'Wine',
    props: ["id"],
    components: {
        EditWine
    },
    data () {
        return {
            editMode: "no",
            deleteMode: "no",
        }
    },
    methods: {
        ...mapActions(["getOneWine"]),
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
                window.location.reload();
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
    created: function () {
       this.getOneWine(this.id);
    }
}
</script>

<style scoped>
/*Admin*/
.admin-action{
    margin-top: -20px;
    margin-bottom: 30px;
    font-size: 1.2rem;
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
#delete-product{
    color: red;
}
#deleteBox{
    color: rgb(86,10,34);
    font-weight: bold;
    margin-bottom: 20px;
}
#yes{
    margin-right: 15px;
    cursor: pointer;
    color: green;
    font-size: 1.2rem;
}
#no{
    margin-left: 15px;
    cursor: pointer;
    color: red;
    font-size: 1.2rem;
}

/*Bloc-page*/
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
}
</style>
