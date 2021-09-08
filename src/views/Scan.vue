<template>
    <div id="bloc-page-scan">
        <div id="box-title">
            <router-link to="/"><i class="fas fa-times" id="close-photo"></i></router-link>
            <h3 @click="takeScan" >Prendre un scan</h3>
            <h5>{{barCode}}</h5>
        </div>
        <div class="container" id="photo"></div>
        <div id="" class="">
            <span id="domaine"></span>
            <!-- <span><span class="titles">Appellation : </span>{{ getWine.appellation }}</span>
            <span><span class="titles">Millésime : </span>{{ getWine.millesime }}</span>
            <span><span class="titles">Pays : </span>{{ getWine.pays }}</span>
            <span><span class="titles">Région :</span> {{ getWine.region }}</span>
            <span><span class="titles">Couleur : </span>{{ getWine.couleur }}</span>
            <span><span class="titles">Cépage : </span>{{ getWine.cepage }}</span>
            <span><span class="titles">Viticulture : </span>{{ getWine.viticulture }}</span>
            <span><span class="titles">Alcool : </span>{{ getWine.alcool }} %</span>
            <span><span class="titles">Format : </span>{{ getWine.format }} cL</span>
            <span><span class="titles">Prix TTC : </span>{{ getWine.prix }} €</span>   
            <span><span class="titles">Description : </span>{{ getWine.description }}</span>
            <span><span class="titles">A l'Oeil : </span>{{ getWine.oeil }}</span>
            <span><span class="titles">Au Nez : </span>{{ getWine.nez }}</span>
            <span><span class="titles">En Bouche : </span>{{ getWine.bouche }}</span>
            <span><span class="titles">Température de Service : </span>{{ getWine.temperature }}</span>
            <span><span class="titles">Garde : </span>{{ getWine.conservation }}</span>
            <span><span class="titles">Accords : </span>{{ getWine.accords }}</span> -->
        </div> 
    </div>
</template>

<script>
import instance from '../axios';
import Quagga from 'quagga';
export default {
    name: 'Scan',
    data() {
        return {
            wines: [],
            barCode: "",
            scanMode: 'yes',
        }
    },
    methods: {
        switchToScan() {
            scanMode = 'yes'
        },
        switchToNoScan() {
            scanMode = 'no'
        },
        takeScan() {
            Quagga.init({
                inputStream : {
                name : "Live",
                type : "LiveStream",
                target: document.querySelector('#photo')
            },
            decoder : {
                readers : ["ean_reader"]
            }
            }, function(err) {
                if (err) {
                    console.log(err);
                    return
                }
                console.log("Initialization finished. Ready to start");
                Quagga.start();
            })
            Quagga.onDetected(function(result) {
                let code = result.codeResult.code;
                console.log(code);
                localStorage.setItem('barCode', code);
                Quagga.stop();
            })
        }
    },
    mounted: function () {
        instance.get('findawine/wines')
            .then((response) => response.data)
            .then((response) => {
                this.wines = response;
            })
         
        

    }
}
</script>

<style scoped>
#box-title{
    display: flex;
    align-items: center;
    justify-content: center;
}
#close-photo{
    color: white;
    font-size: 1.5rem;
    margin-left: -80px;
    margin-right: 100px;
    padding-top: 12px;
}
#photo{
    margin-top: 30px;
}
h3{
    color: white;
    margin-top: 20px;
}
h5{
    color: white;
}
</style>