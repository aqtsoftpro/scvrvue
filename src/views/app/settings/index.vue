<template>
  <div>
    <b-row>
    <b-colxx xxs="12">
      <h5 class="mb-4 card-title">{{ $t('menu.settings') }}</h5>
      <b-row>
        <b-colxx xxs="12" xs="12" lg="12" class="mb-3">
          <b-card class="mb-4" no-body>
            <b-tabs card no-fade>
              <b-tab title="User Magagement" :v-if="($route.query.tab == 'user_management') ? 'active' : ''" title-item-class="w-30 text-center">
                <!-- Content for van out -->
                <user />
                <b-table :items="user_records" />
              </b-tab>
              <b-tab title="Role Management" :v-if="(this.$route.query.tab == 'role_management') ? 'active' : ''" title-item-class="w-30 text-center">
                <role />
                <b-table :items="role_records" />
              </b-tab>
              <b-tab title="System Settings" :v-if="($route.query.tab == 'system_settings') ? 'active' : ''" title-item-class="w-30 text-center">
                <!-- Content for van out -->
                <system_settings />
                <b-table :items="system_settings" />
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
import Role from './role'
import SystemSettings from './system_settings'
import User from './user'
import {apiUrl} from '../../../constants/config.js'

export default {
  components: {
    'role' : Role,
    'user' : User,
    'system_settings' : SystemSettings,
  },
  data() {
    return {
      user_records: [],
      role_records: [],
      system_settings: [],
    }
  },
  methods: {
    get_role_records() {
      //Tax Records
      axios.get(
        apiUrl + '/role',{
        headers:{
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
        }
      ).then(response => {
        {
          //parse json data
          this.role_records = response.data
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
    get_user_records() {
      //Mechanic Workshop Records
      axios.get(
        apiUrl + '/users',{
          headers:{
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          }
        }
      ).then(response => {
        {
          //parse json data
          //this.user_records = response.data
        }
      })
    }
  },
mounted() {


    if(localStorage.getItem('token') !== null) {
      this.$store.commit('setUser', JSON.parse(localStorage.getItem('user')));
    } else{
      this.$router.push('/user/login');
    }
    // this.get_tax_records()
    // this.get_mechanic_workshop_records()
  }
}
</script>

