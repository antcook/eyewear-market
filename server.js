const Nuxt       = require('nuxt')
const bodyParser = require('body-parser')
const session    = require('express-session')
const app        = require('express')()
const config     = require('./nuxt.config.js')
const mongoose   = require('mongoose')
const MongoStore = require('connect-mongo')(session)
const favicon    = require('serve-favicon');

// DATABASE
// ==============================================

mongoose.connect('mongodb://antcook:rageandlove12@ds050539.mlab.com:50539/accounts');

// MODELS
// ==============================================

var Product = require('./models/product');

// CONFIG
// ==============================================

app.use(bodyParser.json())
app.use(favicon(__dirname + '/assets/favicon.ico'));

app.use(session({
    secret: 'IF4jV6tAF1C',
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 86400000 * 7},
    store: new MongoStore({mongooseConnection: mongoose.connection})
}))

app.use(function(req, res, next) {

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();

});

// ROUTES
// ==============================================

app.get('/api/products', function (req, res) {

    Product.find({}, function(error, products) {
        if (error) throw err
        res.json(products)
    });

});

app.get('/api/product/:name', function (req, res) {
    
    Product.find({slug: req.params.name}, function(error, product) {
        if (error) throw err;
        res.json(product);
    });

});

app.get('/api/gender/:gender/:type', function (req, res) {
    
    Product.find({gender: req.params.gender, type: req.params.type}, function(error, product) {
        if (error) throw err;
        res.json(product);
    });

});

app.post('/api/cart', function (req, res) {

  if(!req.session.cart) {
    req.session.cart = []
  }
  
  Product.find({slug: req.body.product}, function(error, product) {
      if (error) throw err;

      var packPrice   = 0;
      var extrasPrice = 0;

      if(req.body.pack && req.body.pack == 'Bronze') {
          var packPrice = 10;
      }
      if(req.body.pack && req.body.pack == 'Silver') {
          var packPrice = 15;
      }
      if(req.body.pack && req.body.pack == 'Gold') {
          var packPrice = 25;
      }
      if(req.body.pack && req.body.pack == 'Platinum') {
          var packPrice = 45;
      }

      if(req.body.extras && req.body.extras.includes('Poloarised')) {
          var extrasPrice = 40;
      }
      if(req.body.extras && req.body.extras.includes('Sunglass')) {
          var extrasPrice = 10;
      }
      if(req.body.extras && req.body.extras.includes('Transition')) {
          var extrasPrice = 60;
      }

     var total = product[0].price + packPrice + extrasPrice;

     var item = {
          product: product,
          style:   req.body.style,
          lenses:  req.body.lenses,
          pack: req.body.pack,
          extras: req.body.extras,
          imageIndex: req.body.imageIndex,
          packPrice: packPrice,
          extrasPrice: extrasPrice,
          total: total
      }


      req.session.cart.push(item)
      return res.json(req.session.cart);
  });

})

app.post('/api/cart/remove', function (req, res) {


    req.session.cart.splice(req.body.id, 1);
    
    return res.json(req.session.cart);

})

app.post('/api/createorder', function (req, res) {

    var order = {
        customer: req.body.customer,
        address:  req.body.address,
        payment:  req.body.payment,
        order:    req.body.order
    }
    
    return res.json(order);

})

// START
// ==============================================

const isProd = process.env.NODE_ENV === 'production'
config.dev = !isProd
const nuxt = new Nuxt(config)

const promise = (isProd ? Promise.resolve() : nuxt.build())

promise.then(() => {
    app.use(nuxt.render)
    app.listen(3000)
    console.log('Server is listening on http://localhost:3000')
})
.catch((error) => {
    console.error(error)
    process.exit(1)
})