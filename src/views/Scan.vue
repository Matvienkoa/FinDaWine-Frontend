<template>
    <div class="" id="bloc-page-scan">
        <div id="home-bloc">
          <router-link to="/"><span @click="stopScan()" id="home"><i class="fas fa-arrow-left"></i> Retour</span></router-link>
        </div>
        <div id="photo"></div>
    </div>
</template>

<script>
import Quagga from 'quagga';
export default {
  name: "Scan",
  data() {
    return {
      barCode: "",
    };
  },
  methods: {
    stopScan() {
      Quagga.stop()
    }
  },
  mounted() {
    Quagga.init({
        inputStream : {
        name : "Live",
        type : "LiveStream",
        constraints: {
        width: 680,
        height: 800,
        },
        area: { // defines rectangle of the detection/localization area
          top: "0%",    // top offset
          right: "0%",  // right offset
          left: "0%",   // left offset
          bottom: "0%"  // bottom offset
        },
        singleChannel: false, // true: only the red color-channel is read
        target: document.querySelector('#photo')
        },
        decoder : {
        readers : ["ean_reader"]
        },
        halfSample: true,
        patchSize: "medium",
    }, function(err) {
        if (err) {
            console.log(err);
            return
        }
        console.log("Initialization finished. Ready to start");
        Quagga.start();
    });
    Quagga.onDetected(function(data){
        localStorage.setItem('code', data.codeResult.code);
        Quagga.stop()
        window.location.href = '/result'
    });
  }
};
</script>

<style scoped>
#bloc-page-scan{
  max-width: 1200px;
  margin: auto;
  text-align: center;
}
#photo{
  margin: auto;
}
#home-bloc{
  margin-top: 30px;
  margin-bottom: 30px;
}
#home{
    font-size: 1.2rem;
    font-weight: bold;
    color: white;
    cursor: pointer;
    border-radius: 30px;
    padding: 8px 15px;
    background-color:rgb(100, 10, 40) ;
    margin-bottom: 50px;
}
#home i{
    margin-right: 10px;
}
a{
  text-decoration: none;
}
</style>