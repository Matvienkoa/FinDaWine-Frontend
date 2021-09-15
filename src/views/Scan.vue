<template>
    <div class="" id="bloc-page-scan">
        <div id="photo">
            <!-- <v-quagga :onDetected="logIt" :readerSize="readerSize" :readerTypes="['ean_reader']"></v-quagga> -->
        </div>
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
}
#photo{
  margin: auto;
  text-align: center;
  margin-top: 50px;
}
</style>