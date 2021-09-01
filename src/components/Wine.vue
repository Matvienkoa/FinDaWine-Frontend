<template>
    <div class="container" id="bloc-page-wine">
        <div id="wine-prez">
            <div class="img-card col-6">
                <img :src="getWine.imageUrl" alt="" class="wine-img">
            </div>
            <div class="wine-info col-6">
                <span>{{ getWine.domaine }}</span>
                <span>{{ getWine.appellation }}</span>
                <span>{{ getWine.millesime }}</span>
                <span>{{ getWine.cepage }}</span>
                <span>{{ getWine.description }}</span>
                <span>{{ getWine.pays }}</span>
                <span>{{ getWine.alcool }}</span>
                <span>{{ getWine.format }}</span>
                <span>{{ getWine.prix }}</span>
                <span>{{ getWine.couleur }}</span>
                <span>{{ getWine.oeil }}</span>
                <span>{{ getWine.nez }}</span>
                <span>{{ getWine.bouche }}</span>
                <span>{{ getWine.temperature }}</span>
                <span>{{ getWine.conservation }}</span>
                <span>{{ getWine.accords }}</span>
                <span>{{ getWine.viticulture }}</span>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
    name: 'Wine',
    props: ["id"],
    methods: {
        ...mapActions(["getOneWine"]),
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
    #bloc-page-wine{
        margin-top: 50px;
    }
    .wine-img{
        width: 100%;
        object-fit: cover;
        object-position: center;
    }
    #wine-prez{
        display: flex;
    }
    .wine-info{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
    }
</style>
