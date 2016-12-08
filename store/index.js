import Vue  from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

require('whatwg-fetch')

const store = new Vuex.Store({
  
  state: {
    cart: null
  },
  mutations: {
    UPDATE_CART: function (state, cart) {
      state.cart = cart
    }
  },
  actions: {
    nuxtServerInit({commit}, {req}) {
      if (req.session && req.session.cart) {
        commit('UPDATE_CART', req.session.cart)
      }
    },
    addToCart({commit}, {product, style, lenses, pack, extras, imageIndex}) {
      
      return fetch('api/cart/', {
        credentials: 'same-origin',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          product,
          style,
          imageIndex,
          lenses,
          pack,
          extras
        })
      })
      .then((res) => {
        return res.json()
      })
      .then((cart) => {
        commit('UPDATE_CART', cart)
      })
    },
    removeFromCart({commit}, {id}) {
      
      return fetch('api/cart/remove', {
        credentials: 'same-origin',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id
        })
      })
      .then((res) => {
        return res.json()
      })
      .then((cart) => {
        commit('UPDATE_CART', cart)
      })
    }
  }
})

export default store