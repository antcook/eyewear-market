<template>

  <nuxt-container>

    <appHeader></appHeader>

    <nuxt></nuxt>

  </nuxt-container>

</template>

<script>

import appHeader from '~components/header.vue'

export default {
  components: {
    appHeader
  }
}

</script>