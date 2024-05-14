<template>
  <div>
    <b-modal v-if="customer" id="customer_modal" size="lg" ref="customer_modal" :title="customer.first_name + ' ' + customer.last_name">
      <table class="stacked table">
        <tr>
          <td>First Name:</td>
          <td> {{ customer.first_name }}</td>
        </tr>
        <tr>
          <td>Last Name:</td>
          <td> {{ customer.last_name }}</td>
        </tr>
        <tr>
          <td>Email:</td>
          <td> {{ customer.email }}</td>
        </tr>
        <tr>
          <td>Phone Number:</td>
          <td> {{ customer.phone_number }}</td>
        </tr>
        <tr>
          <td>Address:</td>
          <td> {{ customer.address }}</td>
        </tr>
        <tr>
          <td>Date of Birth:</td>
          <td> {{ customer.dob }}</td>
        </tr>
        <tr>
          <td>Gender:</td>
          <td> {{ customer.gender }}</td>
        </tr>
        <tr>
          <td>Occupation:</td>
          <td> {{ customer.occupation }}</td>
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
        <tr v-if="customer.secondary_id_number">
          <td>Secondary ID Number Number:</td>
          <td> {{ customer.secondary_id_number }}</td>
        </tr>
        <tr v-if="customer.secondary_id_front_picture">
          <td>Secondary ID Front Picture:</td>
          <td> <img width="100%" :src="customer.secondary_id_front_picture" /> </td>
        </tr>
        <tr v-if="customer.secondary_id_back_picture">
          <td>Secondary ID Back Picture:</td>
          <td><img width="100%" :src="customer.secondary_id_back_picture" /></td>
        </tr>
        <tr v-if="customer.secondary_id_expiry">
          <td>Secondary ID Expiry:</td>
          <td> {{ customer.secondary_id_expiry }}</td>
        </tr>
        <tr>
          <td>Nationatlity:</td>
          <td> {{ customer.nationality }}</td>
        </tr>
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
               <div v-if="searchRequest.mode == 'vehicle'"  class="w-100 w-sm-100">
                  <!-- <route-link class="float-right" :to="{path: '/app/van_management/vehicle_detail/' + item.id }">
                    View Customer
                  </route-link> -->
                  <b-button class="float-right"@click.stop="toDetail(item)" v-b-modal.customer_modal variant="grey" size="sm">
                    Vehicle Detail
                  </b-button>

                  <img width="100" :src="item.picture" />
                  <p class="list-item-heading mb-1 color-theme-1">{{item.reg_plate_number}}</p>
                  <p class="mb-1 text-muted text-small">{{item.vehicle_type}} | {{ item.make }} - {{ item.model }}</p>
                  <p class="mb-4 text-muted text-small">Purchase Date: {{ item.purchase_date }}</p>
               </div>
               <div v-else tag="a" :to="`#`" class="w-100 w-sm-100">
                <b-button class="float-right"@click.stop="bring_fields(item)" v-b-modal.customer_modal variant="grey" size="sm">
                View Customer
                </b-button>
                  <!-- <img width="100" :src="item.picture" /> -->
                  <p class="list-item-heading mb-1 color-theme-1">{{item.first_name}} {{item.last_name}}</p>
                  <p class="mb-1 text-muted text-small">{{item.phone_number}} | {{ item.email }}</p>
                  <p class="mb-4 text-muted text-small">Joined: {{ item.address }}</p>
                  
               </div>
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

      toDetail(item) {
        return this.$router.push({ path: '/app/van_management/vehicle_detail/' + item.id });

        // return {path: '/app/van_management/vehicle_detail/' + item.id }
      },

      updateSearchRequestFromRoute() {
        this.searchRequest.keyword = this.$route.query.keyword;
        this.searchRequest.mode = this.$route.query.mode;
        this.$store.dispatch('searchVehicle', this.searchRequest);
      }


    },
    mounted () {
      this.updateSearchRequestFromRoute();


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
      },

      '$route'(to, from) {
          this.updateSearchRequestFromRoute();
      }


      // searchRequest() {
      //   this.searchRequest.keyword = this.$route.query.keyword
      //   this.searchRequest.mode = this.$route.query.mode
      // }

    }
  }
  </script>
