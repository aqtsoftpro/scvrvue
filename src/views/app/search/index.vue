<template>
  <div>
    
    <b-modal id="modalbasic" size="lg" ref="modalbasic" title="customer model">
      <table class="stacked table">
        <!-- <tr>
          <td>First Name:</td>
          <td> {{ customer.first_name }}</td>
        </tr>
        <tr>
          <td>Driver Licence Number:</td>
          <td> {{ customer.driver_licence_number }}</td>
        </tr>
        <tr>
          <td>Driver Licence Front Picture:</td>
          <td> <img width="100%" :src="customer.driver_licence_front_picture" /></td>
        </tr>
        <tr>
          <td>Driver Licence Back Picture:</td>
          <td> <img width="100%" :src="customer.driver_licence_back_picture" /></td>
        </tr>
        <tr>
          <td>Driver Licence Expiry:</td>
          <td> {{ customer.driver_licence_expiry }}</td>
        </tr>
        <tr>
          <td>Nationatlity:</td>
          <td> {{ customer.nationality }}</td>
        </tr> -->
      </table>
    </b-modal>
    <b-row>
      <b-colxx xxs="12">
        <piaf-breadcrumb :heading="`${$t('menu.search')} : ${searchRequest.keyword}`"/>
        <div class="separator mb-5"></div>
      </b-colxx>
    </b-row>
    <b-row>
      <b-colxx xxs="12">
          <b-card class="mb-4" >
            <!-- <datatable /> -->
             <div v-for="(item,index) in results" :key="index" :class="{'mb-3':results.length!=(index+1)}">
               <router-link v-if="searchRequest.mode == 'vehicle'" tag="a" :to="{path: '/app/van_management/vehicle_detail/' + item.id }" class="w-40 w-sm-100">

                  <img width="100" :src="item.picture" />
                  <p class="list-item-heading mb-1 color-theme-1">{{item.reg_plate_number}}</p>
                  <p class="mb-1 text-muted text-small">{{item.vehicle_type}} | {{ item.make }} - {{ item.model }}</p>
                  <p class="mb-4 text-muted text-small">Purchase Date: {{ item.purchase_date }}</p>
               </router-link>
               <router-link v-else tag="a" :to="`#`" class="w-40 w-sm-100">
                  <!-- <img width="100" :src="item.picture" /> -->
                  <p class="list-item-heading mb-1 color-theme-1">{{item.first_name}} {{item.last_name}}</p>
                  <p class="mb-1 text-muted text-small">{{item.phone_number}} | {{ item.email }}</p>
                  <p class="mb-4 text-muted text-small">Joined: {{ item.address }}</p>
                  <b-button @click.stop="bring_fields(data.item)" v-b-modal.modalbasic variant="grey" size="sm"><i
                      class="simple-icon-eye"></i></b-button>
               </router-link>
               <div class="separator mb-5" v-if="results.length!=(index+1)"></div>
             </div>
          </b-card>
      </b-colxx>


    </b-row>
    </div>
  </template>
  <script>
  import {apiUrl} from "../../../constants/config.js"
  import axios from "axios"
  import { mapGetters } from "vuex"
  import datatable from './datatable.vue'
  export default {
    components: {
      'datatable': datatable
    },
    data () {
      return {
        searchRequest: {
          keyword: null,
          mode: null
        },
        results: [],
        currentPage: 1,
        totalPage: 5,
        customer: null
      }
    },
    computed: {
      ...mapGetters(['searchResults', 'searchMode'])
    },
    methods: {
      linkGen (pageNum) {
        return '#page-' + pageNum
      },

      bring_fields(fields) {

        this.customer = fields
      },

    },
    mounted () {
      this.searchRequest.keyword = this.$route.query.keyword
      this.searchRequest.mode = this.$route.query.mode
      this.$store.dispatch('searchVehicle', this.searchRequest)
    },
    watch: {
      searchResults() {
        this.results = this.searchResults
      },
      searchMode() {
        this.searchRequest.mode = this.searchMode
      }
    }
  }
  </script>
