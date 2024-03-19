<template>
  <div>
    <b-row>
    <b-colxx xxs="12">
      <h5 class="mb-4 card-title">{{ $t('menu.records') }}</h5>
      <b-row>
        <b-colxx xxs="12" xs="12" lg="12" class="mb-3">
          <b-card class="mb-4" no-body>
            <b-tabs card no-fade>
              <b-tab title="Tax Records" active title-item-class="w-25 text-center">
                <tax />
                <b-table :items="tax_records" />
              </b-tab>
              <b-tab title="Mechanic Workshop Records" title-item-class="w-25 text-center">
                <!-- Content for van out -->
                <mechanic />
                <b-table :items="mechanic_workshop_records" />
              </b-tab>
              <b-tab title="Customer Records" title-item-class="w-25 text-center">
                <!-- Content for van out -->
                <customer />
                <b-table :items="customer_records" />
              </b-tab>
              <b-tab title="Toll Records" title-item-class="w-25 text-center">
                <!-- Content for van out -->
                <toll />
                <b-table :items="toll_records" />
              </b-tab>
            </b-tabs>
          </b-card>
        </b-colxx>
      </b-row>
    </b-colxx>
  </b-row>
  </div>
</template>
<script>

import axios from 'axios'
import Tax from './tax'
import Mechanic from './mechanic'
import Customer from './customer'
import Toll from './toll'
import {apiUrl} from '../../../constants/config.js'

export default {
  components: {
    'tax' : Tax,
    'mechanic' : Mechanic,
    'customer' : Customer,
    'toll' : Toll
  },
  data() {
    return {
      tax_records: [],
      mechanic_workshop_records: [],
      customer_records: [],
      toll_records: []
    }
  },
  methods: {

    get_toll_records() {
      //Tax Records
      axios.get(
        apiUrl + '/toll',{
        headers:{
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
        }
      ).then(response => {
        {
          //parse json data
          this.toll_records = response.data
        }
      })
    },

    get_tax_records() {
      //Tax Records
      axios.get(
        apiUrl + '/tax_record',{
        headers:{
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
        }
      ).then(response => {
        {
          //parse json data
          this.tax_records = response.data
        }
      })
    },

    get_customer_records() {
      //Tax Records
      axios.get(
        apiUrl + '/customer',{
        headers:{
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
        }
      ).then(response => {
        {
          //parse json data
          this.customer_records = response.data
        }
      })
    },
    get_mechanic_workshop_records() {
      //Mechanic Workshop Records
      axios.get(
        apiUrl + '/mechanic',{
          headers:{
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          }
        }
      ).then(response => {
        {
          //parse json data
          this.mechanic_workshop_records = response.data
        }
      })
    },

  },
  mounted() {
    if(localStorage.getItem('token') !== null) {
      this.$store.commit('setUser', JSON.parse(localStorage.getItem('user')));
    } else{
      this.$router.push('/user/login');
    }
    // this.get_toll_records()
    // this.get_mechanic_workshop_records()
  }
}
</script>

