<template>
  
  <div class="inner">
    
    <div id="checkout">

      <ul class="stages">
        <li>Account</li>
        <li>Shipping &amp; Billing</li>
        <li>Your Perscription</li>
        <li>Confirmation</li>
      </ul>

      <div class="account" v-if="stage == 1">

        <div id="guest">
          <h2>Checkout as a guest</h2>
          <p>You can choose to register for an account later.</p>

          <button class="button" @click="guest()">Continue As guest</button>
        </div>

        <div id="user">
          <h2>Been here before?</h2>
          <p>Exisitng users can login to save time.</p>

          <form action="">
            <label for="email">Email Address</label>
            <input type="text" name="email">

            <label for="password">Password</label>
            <input type="text" name="password">

            <button class="button">Login</button>
          </form>

        </div>

      </div>

      <div class="shipping-billing" v-if="stage == 2">

        <div class="you">

            <h3>About You</h3>

            <div class="group">
              <label for="fname">First Name:</label>
              <input type="text" name="fname" v-model="customer.first_name">
            </div>

            <div class="group">
              <label for="lname">Last Name:</label>
              <input type="text" name="lname" v-model="customer.last_name">
            </div>

            <div class="group">
              <label for="email">Email Address:</label>
              <input type="text" name="email"  v-model="customer.email">
            </div>

          </div>

          <div class="address-billing">

          <div class="address">

            <h3>Your Address</h3>

            <label for="address_one">Address Line 1</label>
            <input type="text" for="address_one" v-model="address.line_one">
            
            <label for="address_two">Address Line 2</label>
            <input type="text" for="address_two" v-model="address.line_two">

            <label for="address_town">Town/City</label>
            <input type="text" for="address_town" v-model="address.town">

            <label for="address_county">County</label>
            <input type="text" for="address_county" v-model="address.county">

            <label for="address_postcode">Postcode</label>
            <input type="text" for="address_postcode" class="postcode" v-model="address.postcode">
            
          </div>

          <div class="billing">
            <h3>Billing Details</h3>

            <form action="/your-charge-code" method="POST" id="payment-form">

              <label for="card-number">Card Number</label>
              <input type="text" v-model="payment.card_number" data-stripe="number">

            
              <label for="csv">CSV (Last 3 digits on the back of your card)</label>
              <input type="text"  class="csv" v-model="payment.csv" data-stripe="cvc">

              <label for="expire-date">Expire Date (Month/Year)</label>

              <div class="expire">
                <input type="text" v-model="payment.expire_month" data-stripe="exp_month">
                <input type="text" v-model="payment.expire_year" data-stripe="exp_year">
              </div>

            </div>

            </form>

          </div>

          <div class="account-create">
            <h3>Create an account?</h3>
            <p>Creating an account allows you to track your order online.</p>


          </div>

          <button class="button" @click="createOrder()">Complete Your Order</button>
          
        </div>

      </div>

  </div>

</template>

<script>

import axios from 'axios'


export default {
  data({error}) {
    
    return {
      stage: 1,
      customer: {
        first_name: '',
        last_name: '',
        email: ''
      },
      address: {
        line_one: '',
        line_two: '',
        town: '',
        county: '',
        postcode: ''
      },
      payment: {
        card_number: '',
        expire_month: '',
        expire_year: '',
        csv: ''
      }
    }
  },
  methods: {
    guest() {
      this.stage = 2
    },
    createOrder() {

      axios.post('http://localhost:3000/api/createorder/', {
        customer: {
          first_name: this.customer.first_name,
          last_name: this.customer.last_name,
          email: this.customer.email
        },
        address: {
          line_one: this.address.line_one,
          line_two: this.address.line_two,
          town: this.address.town,
          county: this.address.county,
          postcode: this.address.postcode
        },
        payment: {
          card_number: this.payment.card_number,
          expire_month: this.payment.expire_month,
          expire_year: this.payment.expire_year,
          csv: this.payment.csv
        },
        order: this.$store.state.cart
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      })
    }
  }
}

</script>
<style>

#checkout {
  width: 100%;
}

#guest, #user {
  width: 49%;
  height: 500px;
  padding: 40px;
  float: left;
  margin: 0 1% 0 0;
  border: solid 3px #ccc;
}

#user {
  margin: 0 0 0 1%;
}

.stages, .stages li {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
}

.stages li {
  display: block;
  float: left;
  background: #eee;
  padding: 20px;
  font-weight: bold;
  width: 25%;
  margin: 40px 1% 40px 0;
}

.stages li:last-child {
  margin-right: 0;
}

.shipping-billing {
  width: 100%;
  border: solid 3px #ccc;
  padding: 40px;
}

.you .group {
  width: 33.33%;
  float: left;
}


.address-billing:before, .you:before,
.address-billing:after, .you:after {
    content: " ";
    display: table;
}

.address-billing:after, .you:after {
    clear: both;
}

.address, .billing {
  margin: 40px 0;
  width: 58%;
  float: left;
  margin-right: 4%;
}

.billing {
  width: 33%;
  margin-right: 0;
}

.address input, .billing input {
  width: 100%;
}

.address .postcode {
  width: 50%;
}


.expire input {
  float: left;
  width: 30%;
  margin-right: 20px;
}

.billing .csv {
  width: 30%;
}

</style>