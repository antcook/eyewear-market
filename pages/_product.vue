<template>
  
  <div id="product">
    
    <div class="main">
      
      <img v-bind:src=" product.images[imageIndex].url[imageAngle]" alt="">
      
      <div class="images">
        <div class="image" v-for="(types, key) in product.images[imageIndex].url">
          <img v-bind:src="types" alt="" @click="updateImg(key, types)">
          </div>
        </div>
    
    </div>
    
    <div class="about">
      
      <h1 class="title">{{product.brand}} {{product.name}}</h1>
      
      <div class="select">
        
        <label for="">Select Style</label>
        <div class="box" @click="toggleStyle()">{{style}}</div>
        
        <ul class="options" v-if="toggle">
          <li v-for="(types, key) in product.images" @click="updateStyle(types.colour, key)">
            {{types.colour}}
            </li>
        </ul>
      
      </div>

      <p>{{product.description}}</p>
      <h4 class="price">&pound;{{product.price}}.00</h4>
      
      <button class="button" @click="addToCart(product.slug)">Buy Frame Only</button>
      <button class="button alt" @click="addedWithRX = true">Buy With Prescription</button>
    
    </div>

    <transition name="fade">
      <div class="confirm" v-if="added">
      
        <div class="model">
          <h1 class="title">{{product.brand}} {{product.name}} Added</h1>
          <button class="button" @click="added = false">Continue Shopping</button>
          <router-link to="/cart"><button class="button alt">Proceed To Checkout</button></router-link>
        </div>
      
      </div>
    </transition>

    <transition name="fade">
      <div class="confirm" v-if="addedWithRX">
      
        <div class="model">
    

          <div id="lens-type" v-show="!lenseType">
            <h2 class="title">Choose Your Lens Type</h2>

            <div class="lens-box distance">
              <h3 @click="lenseType = 'Distance'">Distance</h3>
            </div>

            <div class="lens-box reading">
              <h3 @click="lenseType = 'Reading'">Reading</h3>
            </div>

            <div class="lens-box office">
              <h3 @click="lenseType = 'Office'">Office</h3>
            </div>
          </div>

        <div id="pack" v-show="lenseType && !pack">
            <h2 class="title">Choose A Package</h2>

            <div class="lens-box bronze">
              <h3 @click="pack = 'Bronze'">Bronze</h3>
            </div>

            <div class="lens-box silver">
              <h3 @click="pack = 'Silver'">Silver</h3>
            </div>

            <div class="lens-box gold">
              <h3 @click="pack = 'Gold'">Gold</h3>
            </div>
          </div>

        <div id="extras" v-show="lenseType && pack && !extras">
            <h2 class="title">Lens Extras</h2>

            <div class="lens-box bronze">
              <h3 @click="extras = 'Brown'">Brown Tint</h3>
            </div>

            <div class="lens-box silver">
              <h3 @click="extras = 'Grey'">Grey Tint</h3>
            </div>

            <div class="lens-box gold">
              <h3 @click="extras = 'Reactions'">Reactions</h3>
            </div>
        </div>

        <div id="final" v-show="lenseType && pack && extras && !next">

          <h1>Confirm</h1>
          <img v-bind:src=" product.images[imageIndex].url[imageAngle]" alt="" class="confirm-img">
          <h3>{{product.brand}} {{product.name}}</h3>
          <h4>with a {{lenseType}} lens on the {{pack}} package with a {{extras}} sunglass tint.</h4>
          <button class="button" @click="addToCartWithRx(product.slug)">Add To Basket</button>
          <router-link to="/cart"><button class="button alt">Cancel</button></router-link>
        </div>

        <div id="next" v-show="next">
          <h1>Added To Your Basket</h1>
          <button class="button" @click="added = false">Continue Shopping</button>
          <router-link to="/cart"><button class="button alt">Proceed To Checkout</button></router-link>
        </div>

        </div>
        

        </div>
      
      </div>
    </transition>
  
  </div>

</template>

<script>

import axios from 'axios'

export default {
  data({params, error}) {
    
    return axios.get('http://localhost:3000/api/product/' + params.name)
      .then((res) => {
        return {
          product: res.data[0],
          style: res.data[0].images[0].colour,
          images: [],
          imageIndex: 0,
          imageAngle: 0,
          toggle: false,
          added: false,
          lenseType: false,
          addedWithRX: false,
          pack: false,
          extras: false,
          next: false
        }
      })
      .catch(() => {
        error({message: 'Product not found', statusCode: 404})
      })
    },
    methods: {
      updateImg(key, url) {
        this.imageAngle = key;
      },
      toggleStyle() {
        if(this.toggle) {
          this.toggle = false;
        }
        else {
          this.toggle = true;
        }
      },
      updateStyle(style, key) {
        this.style  = style
        this.toggle = false
        this.imageIndex = key
      },
      addToCart(slug) {
        this.$store.dispatch('addToCart', {
          product: slug,
          style:   this.style,
          lenses:  false,
          pack: false,
          extras:  false,
          imageIndex: this.imageIndex
        })
        .catch((error) => {
          console.log(error.message)
        })
        this.added = true;
      },
      addToCartWithRx(slug) {
        this.$store.dispatch('addToCart', {
          product: slug,
          style:   this.style,
          lenses:  this.lenseType,
          pack: this.pack,
          extras:  this.extras,
          imageIndex: this.imageIndex
        })
        .catch((error) => {
          console.log(error.message)
        })
        this.next = true;
      },
    }
}

</script>
<style>

#product {
  font-size: 18px;
  text-align: center;
  display: flex;
  margin: 40px auto;
  max-width: 1140px;
}

#product img {
  display: block;
  max-width: 600px;
}

#product .title {
  margin: 20px 0;
  text-align: left;
}

.about {
  margin: 0 auto;
  text-align: left;
  max-width: 600px;
  padding: 0 0 0 20px;
}


#product .price {
  font-size: 22px;
  color: #e74c3c;
}

.image img {
  width: 200px;
  border: solid 5px #ddd;
  height:100px;
  margin: 0 10px;
}

#product button {
  display: inline-block;
  margin: 10px 0;
}

.images {
  max-width: 1140px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
}

.confirm {
  background: rgba(0, 0, 0, .8);
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  position: absolute;
  align-items: center;
  justify-content: center;
}

.model {
  width: auto;
  background: #fff;
  padding: 40px;
}

.lens-box {
  width: 250px;
  float: left;
  background: #eee;
  margin: 20px;
}

#final h1 {
  text-align: center;
  margin: 0;
  padding: 0;
  line-height: 1;
}


.lens-box:hover {
  background: #ccc;
}

.confirm-img {
  width: 400px;
  margin: 0 auto;
}

</style>
