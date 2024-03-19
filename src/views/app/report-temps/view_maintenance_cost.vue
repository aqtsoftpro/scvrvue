<template>
  <div>
    <b-row>
      <b-colxx xxs="12">
          <b-card class="mb-4"  >
            <datatable :sum="sum" :title="$t('menu.reports.view-maintenance_cost')" :searchColumn="searchColumns" :data="maintenance_cost" :fields="fields" />
            <!-- <table><tr><td><h1>Total:</h1></td><td><h1 class="text-primary">{{total}}</h1></td></tr></table> -->
          </b-card>

          <button @click="()=>{$router.push('/app/reports')}" class="btn btn-primary">Back to reports menu</button>
          <button  class="btn btn-outline-success" @click.prevent="exportToExcel">Export to Excel</button>
      </b-colxx>
    </b-row>
  </div>
</template>
<script>
import axios from 'axios';
import { apiUrl } from '../../../constants/config';
import datatable from './datatable'
import { utils, writeFileXLSX } from 'xlsx';
export default ({
  components: {
    'datatable': datatable
  },
  data() {
    return {
      maintenance_cost: [],
      searchColumns : ['date', 'vehicle', 'service', 'cost', 'sum'],
      fields: [
        {
          name: "date",
          sortField: "date",
          title: "Date",
          titleClass: "",
          dataClass: "muted-text",
          width: "20%"
        },
        {
          name: "vehicle",
          sortField: "vehicle",
          title: "Vehicle",
          titleClass: "",
          dataClass: "muted-text",
          width: "20%"
        },
        {
          name: "service",
          sortField: "service",
          title: "Service",
          titleClass: "",
          dataClass: "muted-text",
          width: "20%"
        },
        {
          name: "__slot:cost",
          sortField: "cost",
          title: "Cost",
          titleClass: "",
          dataClass: "muted-text",
          width: "20%"
        },
      ]
    }
  },

  methods: {
    exportToExcel(){
        /* generate worksheet from state */
        const ws = utils.json_to_sheet(this.maintenance_cost);
        /* create workbook and append worksheet */
        const wb = utils.book_new();
        utils.book_append_sheet(wb, ws, "Data");
        /* export to XLSX */
        writeFileXLSX(wb, "scvr_maintenance_cost.xlsx");
    },
    get_maintenance_entries(){
      axios.get(apiUrl + '/reports/maintenance_cost', {headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}})
      .then(response => {
        this.maintenance_cost = response.data.maintenance
        this.sum = response.data.total
      })
    }
  },
  mounted(){

    this.get_maintenance_entries();

    if(localStorage.getItem('token') !== null) {
      this.$store.commit('setUser', JSON.parse(localStorage.getItem('user')));
    } else{
      this.$router.push('/user/login');
    }
  }
})
</script>


