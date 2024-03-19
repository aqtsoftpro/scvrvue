<template>
  <div>
    <b-row>
      <b-colxx xxs="12">
          <b-card class="mb-4"  >
            <datatable :title="$t('menu.reports.profit-and-loss')" :searchColumn="searchColumns" :data="pnl_records" :fields="fields" />
          </b-card>
          <button @click="()=>{$router.push('/app/reports')}" class="btn btn-primary">Back to reports menu</button>
          <button  class="btn btn-outline-success" @click.prevent="exportToExcel">Export to Excel</button>
      </b-colxx>
    </b-row>
  </div>
</template>
<script>
import datatable from './datatable'
import axios from 'axios'
import { apiUrl } from '../../../constants/config'
import { utils, writeFileXLSX } from 'xlsx';

export default ({
  components: {
    'datatable': datatable
  },
  data() {
    return {
      pnl_records: [],
      searchColumns: ['date', 'notes', 'cost', 'sub_total'],
      fields: [
        {
          name: "date",
          sortField: "date",
          title: "Date",
          titleClass: "",
          dataClass: "text-muted",
          width: "20%"
        },
        {
          name: "notes",
          sortField: "notes",
          title: "Notes",
          titleClass: "",
          dataClass: "text-muted",
          width: "20%"
        },
        {
          name: "__slot:cost",
          sortField: "cost",
          title: "Cost",
          titleClass: "",
          dataClass: "text-muted",
          width: "20%"
        },
        {
          name: "__slot:sub_total",
          sortField: "sub_toal",
          title: "Sub Total",
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
        const ws = utils.json_to_sheet(this.pnl_records);
        /* create workbook and append worksheet */
        const wb = utils.book_new();
        utils.book_append_sheet(wb, ws, "Data");
        /* export to XLSX */
        writeFileXLSX(wb, "scvr_profit_and_loss.xlsx");
    },
    get_profilt_and_loss_records(){
      axios.get(apiUrl + '/reports/profit_loss',
      {headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}})
      .then(response => {
        this.pnl_records = response.data
      })
    }
  },
  mounted(){

    this.get_profilt_and_loss_records()

    if(localStorage.getItem('token') !== null) {
      this.$store.commit('setUser', JSON.parse(localStorage.getItem('user')));
    } else{
      this.$router.push('/user/login');
    }
  }
})
</script>


