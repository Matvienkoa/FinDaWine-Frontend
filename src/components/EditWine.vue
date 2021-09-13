<template>
    <div class="container" id="bloc-page-edit-wine">
        <h3>Modifier un Produit</h3>
        <form @submit.prevent="editProduct">
            <label for="domaine" class="form-label">Domaine :</label>
            <input v-model="domaine" type="text" name="domaine" class="form-control" required>
            <label for="appellation" class="form-label">Appellation :</label>
            <input v-model="appellation" type="text" name="appellation" class="form-control">
            <label for="millesime" class="form-label">Millésime :</label>
            <input v-model="millesime" type="text" name="millesime" class="form-control" required>
            <label for="pays" class="form-label">Pays :</label>
            <input v-model="pays" type="text" name="pays" class="form-control" required>
            <label for="region" class="form-label">Région :</label>
            <input v-model="region" type="text" name="region" class="form-control" required>
            <label for="couleur" class="form-label">Couleur :</label>
            <input v-model="couleur" type="text" name="couleur" class="form-control" required>
            <label for="cepage" class="form-label">Cépage(s) :</label>
            <input v-model="cepage" type="text" name="cepage" class="form-control">
            <label for="viticulture" class="form-label">Viticulture :</label>
            <input v-model="viticulture" type="text" name="viticulture" class="form-control" required>
            <label for="alcool" class="form-label">Alcool :</label>
            <input v-model="alcool" type="text" name="alcool" class="form-control" required>
            <label for="format" class="form-label">Format :</label>
            <input v-model="format" type="text" name="format" class="form-control" required>
            <label for="prix" class="form-label">Prix :</label>
            <input v-model="prix" type="text" name="prix" class="form-control" required>
            <label for="description" class="form-label">Déscription :</label>
            <input v-model="description" type="textarea" name="description" class="form-control" required>
            <label for="file" class="form-label">Image :</label>
            <input type="file" @change="onFileSelected" class="form-control">
            <label for="EAN" class="form-label">EAN :</label>
            <input v-model="EAN" type="number" name="EAN" class="form-control" required>
            <label for="oeil" class="form-label">A l'Oeil :</label>
            <input v-model="oeil" type="text" name="oeil" class="form-control">
            <label for="nez" class="form-label">Au Nez :</label>
            <input v-model="nez" type="text" name="nez" class="form-control">
            <label for="bouche" class="form-label">En Bouche :</label>
            <input v-model="bouche" type="text" name="bouche" class="form-control">
            <label for="gouts" class="form-label">Goûts :</label>
            <input v-model="gouts" type="text" name="gouts" class="form-control">
            <label for="temperature" class="form-label">Température de Service :</label>
            <input v-model="temperature" type="text" name="temperature" class="form-control">
            <label for="conservation" class="form-label">Garde :</label>
            <input v-model="conservation" type="text" name="conservation" class="form-control">
            <label for="accords" class="form-label">Accords :</label>
            <input v-model="accords" type="text" name="accords" class="form-control">
            <label for="promo" class="form-label">En Promo : (1 = oui ; 0 = non)</label>
            <input v-model="promo" type="number" min="0" max="1" name="promo" class="form-control">
            <button type="submit" class="btn btn-success">Modifier</button>
        </form>
    </div> 
</template>

<script>
import instance from '../axios';
import { mapActions } from 'vuex';
export default {
    name: 'EditWine',
    props: ["id"],
    data() {
        return {
            domaine: this.$store.state.wine.domaine,
            appellation: this.$store.state.wine.appellation,
            millesime: this.$store.state.wine.millesime,
            pays: this.$store.state.wine.pays,
            region: this.$store.state.wine.region,
            couleur: this.$store.state.wine.couleur,
            cepage: this.$store.state.wine.cepage,
            viticulture: this.$store.state.wine.viticulture,
            alcool: this.$store.state.wine.alcool,
            format: this.$store.state.wine.format,
            prix: this.$store.state.wine.prix,
            description: this.$store.state.wine.description,
            EAN: this.$store.state.wine.EAN,
            oeil: this.$store.state.wine.oeil,
            nez: this.$store.state.wine.nez,
            bouche: this.$store.state.wine.bouche,
            gouts: this.$store.state.wine.gouts,
            temperature: this.$store.state.wine.temperature,
            conservation: this.$store.state.wine.conservation,
            accords: this.$store.state.wine.accords,
            promo: this.$store.state.wine.promo,
            selectedFile: null,
        }
    },
    methods: {
        ...mapActions(["getOneWine"]),
        onFileSelected(event) {
            this.selectedFile = event.target.files[0]
        },
        editProduct() {
            const formData = new FormData();
            formData.append("domaine", this.domaine);
            formData.append("appellation", this.appellation);
            formData.append("millesime", this.millesime);
            formData.append("pays", this.pays);
            formData.append("region", this.region);
            formData.append("couleur", this.couleur);
            formData.append("cepage", this.cepage);
            formData.append("viticulture", this.viticulture);
            formData.append("alcool", this.alcool);
            formData.append("format", this.format);
            formData.append("prix", this.prix);
            formData.append("description", this.description);
            formData.append("imageUrl" , this.selectedFile);
            formData.append("EAN", this.EAN);
            formData.append("oeil", this.oeil);
            formData.append("nez", this.nez);
            formData.append("bouche", this.bouche);
            formData.append("gouts", this.gouts);
            formData.append("temperature", this.temperature);
            formData.append("conservation", this.conservation);
            formData.append("accords", this.accords);
            formData.append("promo", this.promo);
            instance.put(`findawine/wines/${this.id}`, formData)
            .then(() => {
                window.location.reload();
            })
            .catch((error) => {
                this.error = error.response.data;
                console.log(error.response.data);
            })
            this.domaine = ""
            this.appellation = ""
            this.millesime = ""
            this.pays = ""
            this.region = ""
            this.couleur = ""
            this.cepage = ""
            this.viticulture = ""
            this.alcool = ""
            this.format = ""
            this.prix = ""
            this.description = ""
            this.selectedFile = null
            this.EAN = ""
            this.oeil = ""
            this.nez = ""
            this.bouche = ""
            this.gouts = ""
            this.temperature = ""
            this.conservation = ""
            this.accords = ""
            this.promo = ""
        }
    },
    computed: {
    },
    created: function () {
       this.getOneWine(this.id);
    }
}
</script>

<style scoped>
   h3{
        font-weight: bold;
        color: rgb(86,10,34);
        margin-bottom: 20px;
    }
    form{
        max-width: 500px;
        margin: auto;
        text-align: start;
    }
    label{
        color: rgb(86,10,34);
        font-weight: bold;
        margin-top: 10px;
    }
    input{
        margin-bottom: 10px;
    }
    button{
        display: block;
        margin: auto;
        margin-top: 30px;
        font-size: 1.2rem;
        margin-bottom: 30px;
    }
    @media screen and (max-width: 610px) {
        form{
            width: 90%;
        }
    }
</style>