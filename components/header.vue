<template>
  
  <header id="header">
    
    <div class="inner">
      
      <router-link to="/">
        <div class="logo">
          <img src="~assets/images/logo.svg" alt="Eyewear Market">
        </div>
      </router-link>

      <appMenu></appMenu>
    
    </div>
    
  </header>

</template>

<script>

import appMenu   from '~components/menu.vue'

export default {
  components: {
    appMenu
  }
}

</script>