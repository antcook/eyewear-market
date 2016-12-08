<template>
  <div class="inner">

    <h1 class="top">Your Basket</h1>

    <ul class="cart">
      <li v-for="(item, key) in cart" class="item">

        <div class="thumb">
          <img v-bind:src="item.product[0].images[item.imageIndex].url[0]" alt="">
        </div>

        <div class="details">
          <h2>{{item.product[0].brand}} {{item.product[0].name}}</h2>
          <ul class="details-list">
            <li><span class="key">Style:</span> {{item.style}}</li>
            <li><span class="key">Lenses:</span> <span v-if="item.lenses">{{item.lenses}}</span><span v-else>Frame Only</span></li>
            <li><span class="key">Package:</span> <span v-if="item.lenses">{{item.pack}}</span><span v-else>No Package</span></li>
            <li><span class="key">Extras:</span> <span v-if="item.lenses">{{item.extras}} sunglass tint</span><span v-else>No Extras</span></li>
            </ul>
            <span class="remove" @click="remove(key)">X Remove</span>
          </div>

      </li>
    </ul>

    <button class="button bottom">Continue To Checkout</button>

  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      cart: []
    }
  },
  computed: mapState([
    'cart'
  ]),
  created() {
    this.cart = this.$store.state.cart
  },
  methods: {
    remove(key) {
      this.$store.dispatch('removeFromCart', {
        id: key
      })
    }
  }
}
</script>
<style>

.cart, .cart li {
  padding: 0;
  margin: 0;
  list-style: none;
}

.cart li {
  padding:  0 0 20px 0;
  border-bottom: 3px solid #eee;
}

.cart ul li {
  border: none;
}


.item {
  display: flex;
}

.cart li img {
  width: 250px;
}

.cart .remove {
  background: #eee;
  padding: 10px;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 14px;
  float: right;
}

.cart li:before,
.cart li:after {
    content: " ";
    display: table;
}

.cart li:after {
    clear: both;
}

.details {
  width: 100%;
}

.details ul, .details li {
  margin: 0;
  padding: 0;
}

.details li {
  padding: 0 0 10px 0;
}

.cart .key {
  font-weight: bold;
}

.thumb {
  padding-right: 10px;
}

.bottom {
  margin-top: 40px;
  float: right;
}


.top {
  margin: 40px 0;
}
</style>