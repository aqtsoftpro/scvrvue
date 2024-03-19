<template>
  <div>
    <b-row>
      <b-colxx xxs="12">
          <b-card class="mb-4" >
            <datatable :title="$t('menu.reports.list-of-maintenance-done')" :searchColumn="searchColumns" :data="maintenance_list"  :fields="fields" />
          </b-card>
          <button @click="()=>{$router.push('/app/reports')}" class="btn btn-primary">Back to reports menu</button>
          <button  class="btn btn-outline-success" @click.prevent="exportToExcel">Export to Excel</button>
      </b-colxx>
    </b-row>
  </div>
</template>
<script>
import datatable from './datatable'
import { apiUrl } from '../../../constants/config'
import axios from 'axios'
import { utils, writeFileXLSX } from 'xlsx';
export default ({
  components: {
    'datatable': datatable
  },
  data() {
    return {
      maintenance_list: [],
      searchColumns : ['vehicle', 'mileage', 'date', 'service_type', 'cost', 'part_replaced'],
      fields: [
        {
          name: "vehicle",
          sortField: "vehicle",
          title: "Vehicle",
          titleClass: "",
          dataClass: "text-muted",
          width: "20%"
        },
        {
          name: "mileage",
          sortField: "mileage",
          title: "Mileage",
          titleClass: "",
          dataClass: "text-muted",
          width: "10%"
        },
        {
          name: "date",
          sortField: "date",
          title: "Date",
          titleClass: "",
          dataClass: "text-muted",
          width: "10%"
        },
        {
          name: "service_type",
          sortField: "service_type",
          title: "Service Type",
          titleClass: "",
          dataClass: "text-muted",
          width: "10%"
        },
        {
          name: "cost",
          sortField: "cost",
          title: "Cost",
          titleClass: "",
          dataClass: "text-muted",
          width: "10%"
        },
        {
          name: "part_replaced",
          sortField: "part_replaced",
          title: "Part Replaced",
          titleClass: "",
          dataClass: "text-muted",
          width: "10%"
        },
        {
          name: "comments",
          sortField: "comments",
          title: "Comments",
          titleClass: "",
          dataClass: "text-muted",
          width: "20%"
        },
      ]
    }
  },

  methods: {

    exportToExcel(){
        /* generate worksheet from state */
        const ws = utils.json_to_sheet(this.maintenance_list);
        /* create workbook and append worksheet */
        const wb = utils.book_new();
        utils.book_append_sheet(wb, ws, "Data");
        /* export to XLSX */
        writeFileXLSX(wb, "scvr_list_of_maintenance_done.xlsx");
    },

    get_maintenance_list(){
      axios.get(apiUrl + '/reports/maintenance_list',
      {headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}})
      .then(response => {
        this.maintenance_list = response.data
      })
    }

  },
  mounted(){

    this.get_maintenance_list()

    if(localStorage.getItem('token') !== null) {
      this.$store.commit('setUser', JSON.parse(localStorage.getItem('user')));
    } else{
      this.$router.push('/user/login');
    }
  }
})
</script>


