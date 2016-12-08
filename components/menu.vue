<template>
  
  <nav id="menu">
    <ul>
      <li>Shop Glasses

        <ul>
          <router-link :to="{name: 'gender', params: {gender: 'mens', type: 'glasses'}}"><li>Mens</li></router-link>
          <router-link :to="{name: 'gender', params: {gender: 'womens', type: 'glasses'}}"><li>Womens</li></router-link>
        </ul>

      </li>
      <li>Shop Sunglasses

        <ul>
          <router-link :to="{name: 'gender', params: {gender: 'mens', type: 'sunglasses'}}"><li>Mens</li></router-link>
          <router-link :to="{name: 'gender', params: {gender: 'womens', type: 'sunglasses'}}"><li>Womens</li></router-link>
        </ul>

      </li>
      <li>Search</li>
      <li class="cart-button"><router-link to="/cart">Basket <span v-if="this.$store.state.cart">({{this.$store.state.cart.length}})</span></router-link>
    </ul>
  </div>

</template>

<style>

#menu {
  float: right;
}

#menu ul {
  margin: 0;
  padding: 0;
  list-style: none;
  height: 80px;
  line-height: 80px;
}

#menu ul > li:hover ul {
  opacity: 1;
	display: block;
}


#menu li ul {
  background: #1f262f;
  position: absolute;
  color: #fff;
  display: none;
  line-height: 1;
  padding: 0;
  left: 0;
  height: auto;
  z-index: 1000;
  opacity: 0;
  transition: opacity .3s ease;
  top: 80px;
}

#menu ul ul li:hover {
  background: #252d37;
}

#menu ul ul  li {
  padding: 20px;
  width: 100%;
}

#menu li {
  display: inline-block;
  padding: 0 20px;
  position: relative;
  transition: background .3s ease;
}

#menu li:hover {
    background: #0c0f13;
}


#menu .cart-button {
  padding: 0 0 0 80px;
} 

#menu, #menu a {
  color: #fff;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-size: 14px;
}

</style>
