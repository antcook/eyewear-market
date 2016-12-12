<template>
  
  <div id="slider">
    <img src="~assets/images/sample.jpg" alt="">
  </div>

</template>

<style>

#slider {
  max-width: 1140px;
  height: 450px;
  overflow: hidden;
  margin: 20px auto;
}

#slider img {
  width: 100%;
}

@media (max-width: 600px) {

  #slider {
    margin: 0;
    padding: 0;
    width: 100%;
    height: auto;
  }

}


</style>