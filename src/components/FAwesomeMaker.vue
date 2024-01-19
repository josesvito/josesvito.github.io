<template>
  <router-link v-if="to" :to="to" :target="target">
    <span v-if="icon" :class="`${(variant ? variant : 'fa')} fa-${icon}${(size ? ' fa-' + size : '')}${to ? ' cursor-pointer' : ''}`"></span>
  </router-link>
  <span v-else :class="`${(variant ? variant : 'fa')} fa-${icon}${(size ? ' fa-' + size : '')}${to ? ' cursor-pointer' : ''}`"></span>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "FontAwesomeMaker",
  props: ["icon", "size", "variant", "to", "target"],
  mounted() {
    if (!this.icon) console.error('Missing required prop: "icon"');
  }
})
</script>
