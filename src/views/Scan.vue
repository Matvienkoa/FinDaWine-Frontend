<template>
    <div class="container" id="bloc-page-scan">
        <div id="photo">
            <v-quagga :onDetected="logIt" :readerSize="readerSize" :readerTypes="['ean_reader']"></v-quagga>
        </div>
    </div>
</template>

<script>
import instance from '../axios';
import Quagga from 'quagga';
export default {
  name: "Scan",
  data() {
    return {
      readerSize: {
        width: 640,
        height: 480,
      },
      barCode: "",
    };
  },
  methods: {
    logIt(data) {
      this.$store.commit('SET_BARCODE', data.codeResult.code);
      instance.get(`findawine/wines/code/${data.codeResult.code}`)
            .then((response) => {
            this.$store.state.wine = response.data;
      })
      Quagga.stop();
      this.$router.push('/wine');
    },
  },
};
</script>

<style scoped>
#photo {
  height: 100vh;
}
</style>
