module.exports = {
  router: {
    routes: [
      {name: 'product', path: '/product/:name', component: 'pages/_product'},
      {name: 'gender',  path: '/gender/:gender/:type',  component: 'pages/_gender'},
      {path: 'cart',  component: 'pages/cart'},
      {path: 'checkout',  component: 'pages/checkout'}
    ]
  },
  build: {
    vendor: [
      'axios'
    ]
  },
  loading: {
    color: '#e74c3c',
    failedColor: '#bf5050',
    duration: 1500
  },
  css: [
    'assets/css/main.css'
  ]
}