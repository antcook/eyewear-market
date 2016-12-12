<template>
  <div>

  <div class="mobile-menu-toggle">MENU</div>

  <nav id="menu">

    <div class="close">X</div>

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
      <li class="search-button"><span class="pe-7s-search" style="font-size: 18px;"></span> Search</li>
      <li class="cart-button"><router-link to="/cart"><span class="pe-7s-cart" style="font-size: 28px;"></span><span v-if="this.$store.state.cart">{{this.$store.state.cart.length}}</span></router-link>
    </ul>

  </nav>
    
  </div>

</template>

<script>


export default {
  data() {
    return {
      toggle: false
    }
  }
}


</script>

<style>

#menu {
  float: right;
}

#menu .close, .mobile-menu-toggle {
  display: none;
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
  padding: 0 0 0 40px;
}

#menu .cart-button a {
  font-weight: normal;
}

#menu .cart-button:hover {
  background: none;
}

#menu .search-button, 
#menu .search-button a {
  font-weight: normal;
}

#menu, #menu a {
  color: #fff;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-size: 14px;
  font-weight: normal;
}

@media (max-width: 600px) {

  #menu {
    position: absolute;
    background: #333;
    margin: 0;
    padding: 0;
    top:0;
    width: 70%;
    left: -70%;
    z-index: 1000;
    height: 100vh;
    transition: transform .3s ease;
  }

  #menu li {
    width: 100%;
    margin: 0 auto;
    text-align: center;
    padding: 0;
    margin: 0;
  }

  #menu .cart-button, #menu .search-button {
    display: none;
  }

  #menu li ul {
    position: static;
    width: 100%;
  }

  #menu ul ul {
    display: block;
    background: #222;
    opacity: 1;
  }

  .toggle {
    transform: translateX(0px);
  }

  .mobile-menu-toggle {
    color: #FFF;
    position: absolute;
    top: 0;
    left: 0;
  }

  #menu .close {
    width: 100%;
    font-weight: bold;
    text-align: right;
    padding: 20px;
    font-size: 20px;
    display: block;
  }

  .mobile-menu-toggle {
    display: block;
  }

}

</style>
