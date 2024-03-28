<template>
  <div>
    <b-row>
      <b-colxx offset-md="4"  xs="12" md="4">
        <b-card class="van-stats mb-4" >
          <i  class=" iconsminds-arrow-up-2"></i>
          <span>VEHICLES OUT</span>
          <b-badge class="ml-2 mr-2">{{ vanout_count }}</b-badge>
          <i  class=" iconsminds-arrow-down-2"></i>
          <span>VEHICLES IN</span>
          <b-badge class="ml-2 mr-2">{{ vanreturn_count }}</b-badge>
        </b-card>
      </b-colxx>
    </b-row>
    <b-row>
      <b-colxx xs="12" md="4">
        <icon-card
        title="Vans (Available / Total)"
        icon="iconsminds-bus-2"
        :value="`${available_vans} / ${vans}`"
        />
        <icon-card
        title="Cars (Available / Total)"
        icon="iconsminds-car"
        :value="`${available_cars} / ${cars}`"
        />
      </b-colxx>
      <b-colxx xs="12" md="4" v-if="vanouts">
        <b-card v-if="vanouts.length > 0" :title="$t('dashboards.due')">
            <!-- <b-refresh-button @click="refreshButtonClick" /> -->
            <vue-perfect-scrollbar
              class="scroll dashboard-list-with-thumbs"
              :settings="{ suppressScrollX: true, wheelPropagation: false }"
            >
              <recent-order-item
                v-for="order in vanouts.slice(0,6)"
                :order="order"
                :detail-path="'/app/van-rental-detail/'+ order.id"
                :key="order.id"
              />
            </vue-perfect-scrollbar>
          </b-card>
          <b-card class="mb-4" v-else :title="$t('dashboards.due')">
            No Vehicle returning in next 7 days
          </b-card>
      </b-colxx>

      <b-colxx xs="12" md="4">
        <b-card :title="$t('dashboards.recent')">
            <!-- <b-refresh-button @click="refreshButtonClick" /> -->
            <vue-perfect-scrollbar
              class="scroll dashboard-list-with-thumbs"
              :settings="{ suppressScrollX: true, wheelPropagation: false }"
            >
            <div v-for="vehicle in available_vehicles" :key="vehicle.id" class="d-flex flex-row mb-3">
                <router-link tag="a" :to="{ path: 'van_management/vehicle_detail/' + vehicle.vehicle_id }" class="d-block position-relative">
                    <img :src="vehicle.img" style="width: 100px!important" :alt="vehicle.img" class="list-thumbnail border-0" />
                    <b-badge variant="info" pill class="position-absolute badge-top-right">{{ vehicle.vehicle_type }}</b-badge>
                </router-link>
                <div class="pl-3 pt-2 pr-2 pb-2">
                    <router-link tag="a" :to="{'path': '/app/van_management/vehicle_detail/' + vehicle.vehicle_id}">
                        <p class="list-item-heading">{{ vehicle.vehicle_make_model }}</p>
                        <div class="pr-4">
                            <p class="text-muted mb-1 text-small">{{ vehicle.vehicle_reg_number }}</p>
                        </div>
                        <div class="text-primary text-small font-weight-medium d-none d-sm-block">{{ vehicle.condition }}</div>
                    </router-link>
                </div>
            </div>
            </vue-perfect-scrollbar>
          </b-card>
      </b-colxx>
    </b-row>
    </div>
  </template>
<script>

import RecentOrderItem from "../../../components/Listing/RecentOrderItem";
import IconCard from "../../../components/Cards/IconCard";
import axios from "axios";
import { mapGetters, mapActions } from "vuex";
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import {apiUrl} from "../../../constants/config.js";

export default {
  components: {
    "recent-order-item": RecentOrderItem,
    "icon-card": IconCard
  },
  data() {
    return {
      available_cars: null,
      cars: null,
      available_vans: null,
      vans: null,
      vanout_count: null,
      vanreturn_count: null,
      vanouts : [],
      available_vehicles : []
    };
  },
  computed: {
    ...mapGetters(["currentUser", "isLoggedIn", "processing"]),
  },
  methods: {

    refreshButtonClick() {
      console.log("refreshButtonClick");
    },
    get_dashboard_data() {
      this.$store.commit('setProcessing', true)
      axios.get(apiUrl + "/dashboard_data",
        {
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          }
        }
      ).then((response) => {
        this.available_cars = Number(response.data.available_cars);
        this.cars = Number(response.data.cars);
        this.available_vans = Number(response.data.available_vans);
        this.vans = Number(response.data.vans);
        this.vanout_count = Number(response.data.vanout_count);
        this.vanreturn_count = Number(response.data.vanreturn_count);
        this.vanouts = response.data.vanouts;
        this.available_vehicles = response.data.vanins;

        this.$store.commit('setProcessing', false)
      })
    },
  },
  mounted() {
    if(localStorage.getItem('token') !== null) {
      this.$store.commit('setUser', JSON.parse(localStorage.getItem('user')));
    } else{
      this.$router.push('/user/login');
    }
    this.get_dashboard_data();
  }
};
</script>


