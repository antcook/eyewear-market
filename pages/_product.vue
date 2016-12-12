<template>
  
  <div id="product">
    
    <div class="main">
      
      <img v-bind:src="product.images[image.index].url[image.position]">
      
      <div class="images" v-for="(types, key) in product.images[image.index].url">
        <img v-bind:src="types" @click="image.position = key">
      </div>

    </div>
    
    <div class="about">
      
      <h1 class="title">{{product.brand}} {{product.name}}</h1>
      
      <div class="select">
        
        <label for="">Select Style</label>
        <div class="box" @click="toggle = !toggle">{{style}}</div>
        
        <ul class="options" v-if="toggle">
          <li v-for="(types, key) in product.images" @click="updateStyle(types.colour, key)">
            {{types.colour}}
          </li>
        </ul>
      
      </div>

      <p>{{product.description}}</p>
      <h4 class="price">&pound;{{product.price}}.00</h4>
      
      <div class="buttons">
        <button class="button" @click="addToCart(product.slug)">Buy Frame Only</button>
        <button class="button alt" @click="next = !next">Buy With Prescription Lenses</button>
      </div>
    
    </div>

    <div class="prompt" v-if="added">
      
      <div class="confirm">
        
        <h1 class="title">{{product.brand}} {{product.name}} Added</h1>
        
        <button class="button" @click="added = !added">Continue Shopping</button>
        <router-link to="/cart"><button class="button alt">Proceed To Checkout</button></router-link>
      
      </div>

    </div>

    <div class="prompt" v-if="next">
      
      <div class="confirm lenses" v-if="!item.lenses">

          <h2>Choose Your Lens Type</h2>
          
          <div class="lens-box distance">
            <h3>Distance</h3>
            <p>A lens designed to correct your far-vision distance, these lenses correct long and short-sightedness and a perfect for every day use.</p>
          
            <button class="button" @click="item.lenses = 'Distance'">Select</button>
          
          </div>

          <div class="lens-box office">
            <h3>Intermediate</h3>
            <p>These lenses work to improve your vision at approximately arm's length, these lenses are perfect for computing and other mid-range tasks.</p>
          
            <button class="button" @click="item.lenses = 'Intermediate'">Select</button>
          
          </div>

          <div class="lens-box reading">
            <h3>Near</h3>
            <p>Perfect for enhancing your reading and close up vision, ideal for anyone who has a reading prescription and is struggling with close up tasks.</p>
          
            <button class="button" @click="item.lenses = 'Near'">Select</button>
          
          </div>
      
      </div>

      <div class="confirm package" v-if="item.lenses && !item.pack && !item.extras">
        
        <h2>Choose A Package</h2>
        
        <div class="pack-box bronze">
          <h3 @click="pack = 'Bronze'">Bronze</h3>
          <ul>
            <li>Standard Lenses</li>
            <li>Anti-glare coating</li>
            <li></li>
            <li></li>
          </ul>
          <h2>£10.00</h2>
          <button class="button" @click="item.pack = 'Bronze'">Select</button>
        </div>
        
        <div class="pack-box silver">
          <h3 @click="pack = 'Silver'">Silver</h3>
          <ul>
            <li>Thin Lenses (1.6)</li>
            <li>Anti-glare coating</li>
            <li>Anti-scratch coating</li>
            <li>UV Protection</li>
          </ul>
          <h2>£15.00</h2>
          <button class="button" @click="item.pack = 'Silver'">Select</button>
        </div>
        
        <div class="pack-box gold">
          <h3 @click="pack = 'Gold'">Gold</h3>
          <ul>
            <li>Extra Thin Lenses</li>
            <li>Anti-glare coating</li>
            <li>Anti-scratch coating</li>
            <li>UV Protection</li>
          </ul>
          <h2>£25.00</h2>
          <button class="button" @click="item.pack = 'Gold'">Select</button>
        </div>

        <div class="pack-box platinum">
          <h3 @click="pack = 'Platinum'">Platinum</h3>
          <ul>
            <li>super Thin Lenses</li>
            <li>Anti-glare coating</li>
            <li>Anti-scratch coating</li>
            <li>UV Protection</li>
          </ul>
          <h2>£45.00</h2>
          <button class="button" @click="item.pack = 'Platinum'">Select</button>
        </div>
      

      </div>

      <div class="confirm extras" v-if="item.lenses && item.pack && !item.extras">
        
        <h2>Lens Tints</h2>

        <div class="tints">
        <div class="sunglass-tint">
          <h3>Full Sunglass Tints</h3>
          <p>Provided 100% UV Protection.</p>
          <ul>
            <li class="brown"@click="addToCartWithRx(product.slug, 'Brown Sunglass')"><span></span>Brown</li>
            <li class="grey" @click="addToCartWithRx(product.slug, 'Grey Sunglass')"><span></span>Grey</li>
            <li class="green" @click="addToCartWithRx(product.slug, 'Green Sunglass')"><span></span>Green</li>
          </ul>
          <h2>£10.00</h2>
        </div>

        <div class="polarised-tint">
          <h3>Polarised Tints</h3>
          <p>Provided 100% UV Protection and blocks 99.7% of glare from reflected light.</p>
          <ul>
            <li class="brown" @click="addToCartWithRx(product.slug, 'Brown Poloarised')"><span></span>Brown</li>
            <li class="grey" @click="addToCartWithRx(product.slug, 'Grey Poloarised')"><span></span>Grey</li>
          </ul>
          <h2>£40.00</h2>
        </div>

        <div class="transition-tint">
          <h3>Transition Tints</h3>
          <p>Lenses that adapt and go from clear to dark in sun/UV light conditions.</p>
          <ul>
            <li class="brown" @click="addToCartWithRx(product.slug, 'Brown Transition')"><span></span>Brown</li>
            <li class="grey" @click="addToCartWithRx(product.slug, 'Grey Transition')"><span></span>Grey</li>
          </ul>
          <h2>£60.00</h2>
        </div>

      

        </div>

        <div class="no-tints">
          <h3>Don't want a tint?</h3>
          <button class="button" @click="addToCartWithRx(product.slug, 'No Tint')">Continue With No Tints</button>
        </div>
      </div>

   
      <div class="confirm" v-if="item.lenses && item.pack && item.extras">

        <img v-bind:src="product.images[image.index].url[0]">
        
        <h1 class="title">{{product.brand}} {{product.name}} Added</h1>
        
        <button class="button" @click="next = !next">Continue Shopping</button>
        <router-link to="/cart"><button class="button alt">Proceed To Checkout</button></router-link>
      
      </div>

    </div>

    

    </div>

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
          image: {index: 0, position: 0},
          item: {
            slug: '',
            style: '',
            image: '',
            lenses: false,
            pack:   false,
            extras: false
          },
          added:  false,
          next:   false,
          toggle: false
        }
      })
      .catch(() => {
        error({message: 'Product not found', statusCode: 404})
      })
    },
    methods: {
      updateStyle(style, key) {
        this.style       = style
        this.image.index = key
        this.toggle      = false
      },
      addToCart(slug) {
        this.$store.dispatch('addToCart', {
          product: slug,
          style:   this.style,
          lenses:  false,
          pack: false,
          extras:  false,
          imageIndex: this.image.index
        })
        .catch((error) => {
          console.log(error.message)
        })
        this.added = true;
      },
      addToCartWithRx(slug, extras) {

        this.item.extras = extras

        this.$store.dispatch('addToCart', {
          product: slug,
          style:   this.style,
          lenses:  this.item.lenses,
          pack:    this.item.pack,
          extras:  this.item.extras,
          imageIndex: this.image.index
        })
        .catch((error) => {
          console.log(error.message)
        })
        this.next = true;
      }
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

.images {
  margin: 0 auto;
  width: 440px;
}

.images img {
  width: 200px;
  border: solid 5px #ddd;
  height:100px;
  float: left;
  margin: 0 10px;
}

#product button {
  display: inline-block;
  margin: 10px 0;
}

.prompt {
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

.prompt .button {
  width: 100%;
}

.confirm {
  max-width: 980px;
  background: #fff;
  padding: 40px 20px;
}

.lens-box {
  width: 250px;
  float: left;
  border: solid 3px #333;
  margin: 20px;
  padding: 15px;
}

.lens-box p {
  font-size: 14px;
  font-weight: 600;
  text-align: left;
}

.lens-box ul {
  font-size: 14px;
  font-weight: bold;
  margin: 0;
  padding: 0 0 0 20px;
  text-align: left;
}


.lens-box li {
  padding: 5px 0;
}

.pack-box {
  width: 200px;
  float: left;
  border: solid 3px #333;
  margin: 10px;
  padding: 15px;
}

.pack-box p {
  font-size: 14px;
  font-weight: 600;
  text-align: left;
}

.pack-box ul {
  font-size: 14px;
  font-weight: bold;
  margin: 0;
  padding: 0 0 0 20px;
  text-align: left;
}

.pack-box li {
  padding: 5px 0;
}

#final h1 {
  text-align: center;
  margin: 0;
  padding: 0;
  line-height: 1;
}


.confirm-img {
  width: 400px;
  margin: 0 auto;
}

.sunglass-tint, .polarised-tint, .transition-tint {
  width: 250px;
  float: left;
  border: solid 3px #333;
  margin: 20px;
  padding: 15px;
}

.sunglass-tint p, .polarised-tint p, .transition-tint p {
  font-size: 14px;
  line-height: 1.4;
  font-weight: 600;
  text-align: left;
  margin-bottom: 40px;
}

.sunglass-tint ul, .polarised-tint ul, .transition-tint ul {
  list-style: none;
  margin: 0;
  padding: 0;
  text-align: left;
  font-size: 14px;
  font-weight: 600;
}

.brown span, .grey span, .green span  {
  display: inline-block;
  width: 30px;
  height: 30px;
  vertical-align: middle;
  margin: 10px;
  border-radius: 50%;
}

.brown span {
  background: #5C392F;
}

.grey span {
  background: #444;
}

.green span {
  background: #3C5C2F;
}

.no-tints {
    border: solid 3px #333;
    width: 830px;
    margin: 0 20px;
    padding: 0 0 15px 0;
}

.no-tints .button {
  width: 350px;
}

.tints:before,
.tints:after {
    content: " ";
    display: table;
}

.tints:after {
    clear: both;
}

.tints li:hover {
  background: #eee;
}

</style>
