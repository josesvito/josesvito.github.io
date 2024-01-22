<template>
  <div class="znim-bg d-flex vh-100">
    <div class="container-md m-auto">
      <h1 class="text-light text-md-start text-center">0nymous Generate HMAC</h1>
      <form class="znim-glass-light p-3 rounded" @submit.prevent @submit="generateHmac(superSecret, secret, apiKey)">
        <div class="row g-2">
          <div class="col-md-4">
            <input type="text" class="form-control" placeholder="Secret's secret" v-model="superSecret">
          </div>
          <div class="col-md-4">
            <input type="text" class="form-control" placeholder="Secret" v-model="secret">
          </div>
          <div class="col-md-4">
            <input type="text" class="form-control" placeholder="API KEY" v-model="apiKey">
          </div>
          <div class="w-100">
            <input type="submit" class="btn btn-primary w-100">
          </div>
          <div class="w-100 position-relative">
            <div class="form-control znim-box-result">{{ result ?? "AUTH KEY HERE" }}</div>
            <button type="button" @click="copy" class="btn position-absolute top-0 end-0 me-1">
              <fawesome-pro icon="copy" variant="fal" />
            </button>
            <small class="text-end text-success" :class="showCopy ? 'd-block' : 'd-none'">Copied!</small>
          </div>
        </div>
      </form>
      <center>
        <small class="text-center text-white">Copyright &copy; {{ new Date().getFullYear() }} <router-link to="/hello" target="_blank">0nymous</router-link>. All rights reserved.</small>
      </center>
    </div>
  </div>
</template>

<script setup lang="ts">
import 'bootstrap/dist/css/bootstrap.min.css'
import '@coreui/coreui/dist/css/coreui.min.css'
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

const copy = () => {
  if (result.value) {
    navigator.clipboard.writeText(result.value);
    showCopy.value = true;
    clearTimeout(showCopyTimeout.value);
    showCopyTimeout.value = setTimeout(() => showCopy.value = false, 5000)
  }
}

const showCopyTimeout = ref();
const showCopy = ref(false);
const superSecret = ref("juene");
const secret = ref();
const apiKey = ref();
const result = ref();
</script>

<style scoped>
.znim-bg {
  background: linear-gradient(45deg, #000, #333);
}
.znim-glass-light {
  background: linear-gradient(45deg, #fff6, #fff6);
}
.znim-box-result {
  text-align: center;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-all;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  line-clamp: 1;
  -webkit-line-clamp: 1;
}
</style>
