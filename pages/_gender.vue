<template>
  
  <div class="inner">

    <div v-if="gender == 'mens' && type == 'glasses'">
      <div class="mens-glasses">
        <h1>Men's Glasses</h1>
      </div>
    </div>

    <div v-if="gender == 'mens' && type == 'sunglasses'">
      <div class="mens-sunglasses">
        <h1>Men's Sunglasses</h1>
      </div>
    </div>

    <div v-if="gender == 'womens' && type == 'glasses'">
      <div class="womens-glasses">
        <h1>Women's Glasses</h1>
      </div>
    </div>

    <div v-if="gender == 'womens' && type == 'sunglasses'">
      <div class="womens-sunglasses">
        <h1>Women's Sunglasses</h1>
      </div>
    </div>
    
    <ul class="latest">
      
      <li v-for="product in products">
        
        <router-link :to="{name: 'product', params: {name: product.slug}}">
          <img v-bind:src="product.images[0].url[0]" alt="">
        </router-link>
        
        <router-link :to="{name: 'product', params: {name: product.slug}}">
          <h3 class="name">{{product.brand}} {{product.name}}</h3>
          <h4 class="price">£{{product.price}}.00</h4>
        </router-link>
      
      </li>
    
    </ul>
  
  </div>

</template>

<script>

import axios from 'axios'

export default {
  data({params, error}) {
    
    return axios.get('http://localhost:3000/api/gender/' + params.gender + '/' + params.type)
      .then((res) => {
        return { 
          products: res.data,
          gender: params.gender,
          type: params.type
          }
      })
      .catch(() => {
        error({message: 'Products not found', statusCode: 404})
      })
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

.mens-glasses {
  background: url(~assets/images/mens-glasses.jpg) center;
  height: 200px;
}

.mens-sunglasses {
  background: url(~assets/images/mens-sunglasses.jpg) center;
  height: 200px;
}

.womens-sunglasses {
  background: url(~assets/images/womens-sunglasses.jpg) center;
  height: 200px;
}

.womens-glasses {
  background: url(~assets/images/womens-glasses.jpg) center;
  height: 200px;
}


.mens-glasses h1, .mens-sunglasses h1, .womens-sunglasses h1,  .womens-glasses h1 {
  color: #fff;
  font-family: 'Open Sans', sans-serif;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-weight: 600;
  font-size: 24px;
  line-height: 200px;
  padding-left: 40px;
}

.womens-sunglasses h1, .mens-sunglasses h1, .womens-glasses h1 {
  color: #666;
}

</style>
