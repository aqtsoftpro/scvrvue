<template>
  <div>
    <b-row>
      <b-colxx xxs="12">
          <b-card class="mb-4"  >
            <!-- <table><tr><td><h1>Total:</h1></td><td><h1 class="text-primary">{{total}}</h1></td></tr></table> -->
            <datatable :title="$t('menu.reports.view-earnings')" :sum="sum" :searchColumn="searchColumns" :data="earnings" :fields="fields" />
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
      earnings: [],
      sum: 0,
      searchColumns : ['vehicle', 'date', 'amount'],
      fields: [
      {
          name: "vehicle",
          sortField: "vehicle",
          title: "Vehicle",
          titleClass: "",
          dataClass: "muted-text",
          width: "20%"
        },
        {
          name: "date",
          sortField: "date",
          title: "Date",
          titleClass: "",
          dataClass: "muted-text",
          width: "20%"
        },
        {
          name: "__slot:amount",
          sortField: "amount",
          title: "Amount",
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
        const ws = utils.json_to_sheet(this.earnings);
        /* create workbook and append worksheet */
        const wb = utils.book_new();
        utils.book_append_sheet(wb, ws, "Data");
        /* export to XLSX */
        writeFileXLSX(wb, "scvr_earnings.xlsx");
    },
    get_earnings(){
      axios.get(apiUrl + '/reports/earnings', {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      }).then(response => {
          this.earnings = response.data.earnings
          this.sum = response.data.total
      })
    }
  },
  mounted(){
    this.get_earnings();

    if(localStorage.getItem('token') !== null) {
      this.$store.commit('setUser', JSON.parse(localStorage.getItem('user')));
    } else{
      this.$router.push('/user/login');
    }
  }
})
</script>


