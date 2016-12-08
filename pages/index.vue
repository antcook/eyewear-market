<template>
  
  <div class="inner">

    <appSlider></appSlider>
    
    <ul class="latest">
      
      <li v-for="product in products">

         <router-link :to="{name: 'product', params: {name: product.slug}}">
        
            <img v-bind:src="product.images[0].url[0]" alt="">
  
            <h3 class="name">{{product.brand}} {{product.name}}</h3>
            <h4 class="price">£{{product.price}}.00</h4>

        </router-link>

      </li>
    
    </ul>
  
  </div>

</template>

<script>

import axios from 'axios'
import appSlider from '~components/slider.vue'

export default {
  data({error}) {
    
    return axios.get('http://localhost:3000/api/products')
      .then((res) => {
        return {products: res.data}
      })
      .catch(() => {
        error({message: 'Products not found', statusCode: 404})
      })
    },
    components: {
      appSlider
    }
}

</script>

<style>

.latest {
  margin: 0 auto;
  padding: 0;
  list-style: none;
  max-width: 1140px;
  display: flex;
  text-align: center;
}

.latest li {
  margin: 0;
  padding: 0;
  width: 33.33%;
}

.latest img {
  width: 100%;
}

.latest .name {
  font-size: 20px;
  line-height: 1;
  margin: 0;
}

.latest .price {
  margin: 15px 0;
  font-weight: bold;
  line-height: 1;
  color: #e74c3c;
}

</style>