<template>
  <!-- <CModal alignment="center" :visible="modalVisibility" @close="modalVisibility = false">
    <CModalHeader :close-button="true">
      <CModalTitle>{{  }}</CModalTitle>
    </CModalHeader>
    <CModalBody>
      WADAW
    </CModalBody>
    <CModalFooter>
      punten
    </CModalFooter>
  </CModal> -->
  <form @submit.prevent @submit="generateHmac(superSecret, secret, apiKey)">
    <input type="text" class="form-control" placeholder="Secret's secret" v-model="superSecret">
    <input type="text" class="form-control" placeholder="Secret" v-model="secret">
    <input type="text" class="form-control" placeholder="API KEY" v-model="apiKey">
    <input type="submit" class="btn btn-submit">
  </form>
  <div>{{ result }}</div>
</template>

<script setup lang="ts">
// import 'bootstrap/dist/css/bootstrap.min.css'
// import '@coreui/coreui/dist/css/coreui.min.css'
import { Crypto } from "@/_helpers";
import { ref } from "vue";

const getTimestamp = () => {
  const date = new Date()
  date.setMinutes(date.getMinutes(), 0, 0)
  return Math.floor(date.getTime() / 1000 / 60)
}

const generateHmac = async (superSecret: string, secret: string, apiKey: string) => {
  const message = superSecret + `${apiKey}:${getTimestamp()}`;
  result.value = await Crypto.createHMAC(secret, message);
}
  
const superSecret = ref("juene");
const secret = ref();
const apiKey = ref();
const result = ref();
</script>
