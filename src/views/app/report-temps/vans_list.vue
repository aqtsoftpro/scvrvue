<template>
  <div>
    <b-row>
      <b-colxx xxs="12">
          <b-card class="mb-4"  >
              <datatable :title="$t('menu.reports.vans-list')" :searchColumn="searchColumns" :data="van_list" :fields="fields" />
          </b-card>
          <button @click="()=>{$router.push('/app/reports')}" class="btn btn-primary">Back to reports menu</button>
          <button  class="btn btn-outline-success" @click.prevent="exportToExcel">Export to Excel</button>
      </b-colxx>
    </b-row>
  </div>
</template>
<script>
import { apiUrl } from '../../../constants/config';
import axios from 'axios'
import datatable from './datatable'
import { utils, writeFileXLSX } from 'xlsx';
export default ({
  components: {
    'datatable': datatable
  },
  data() {
    return {
      van_list: [],
      searchColumns : ['type', 'reg_plate_number', 'make', 'model', 'purchase_price'],
      fields: [
        {
          name: "type",
          sortField: "type",
          title: "Type",
          titleClass: "",
          dataClass: "muted-text",
          width: "20%"
        },
        {
          name: "reg_plate_number",
          sortField: "reg_plate_number",
          title: "Reg#",
          titleClass: "",
          dataClass: "muted-text",
          width: "20%"
        },
        {
          name: "make",
          sortField: "make",
          title: "Make",
          titleClass: "",
          dataClass: "muted-text",
          width: "20%"
        },
        {
          name: "model",
          sortField: "model",
          title: "Model",
          titleClass: "",
          dataClass: "muted-text",
          width: "20%"
        },
        {
          name: "purchase_price",
          sortField: "purchase_price",
          title: "Purchase Price",
          titleClass: "",
          dataClass: "muted-text",
          width: "20%"
        },
      ]
    }
  },
  methods: {

    exportToExcel(){

        /* generate workbook and worksheet */

        var filteredList = this.van_list;
        var ws_cols = [];
        filteredList.map(function(value, key){

           ws_cols.push({'wch': 10});

            delete Object.values(filteredList)[key].id;
            delete Object.values(filteredList)[key].type_id;
            delete Object.values(filteredList)[key].status_id;


            filteredList[key].company_name = (filteredList[key].insurance == null) ? '-' : filteredList[key].insurance.company_name;
            filteredList[key].demange_details = (filteredList[key].insurance == null) ? '-' : filteredList[key].insurance.demange_details;
            filteredList[key].policy_start_date = (filteredList[key].insurance == null) ? '-' : filteredList[key].insurance.policy_start_date;
            filteredList[key].policy_end_date = (filteredList[key].insurance == null) ? '-' : filteredList[key].insurance.policy_end_date;
            filteredList[key].road_side_assistance = (filteredList[key].insurance == null) ? '-' : filteredList[key].insurance.road_side_assistance;
            filteredList[key].road_side_assistance_company = (filteredList[key].insurance == null) ? '-' : filteredList[key].insurance.road_side_assistance_company;
            filteredList[key].road_side_assistance_start_date = (filteredList[key].insurance == null) ? '-' : filteredList[key].insurance.road_side_assistance_start_date;
            filteredList[key].road_side_assistance_end_date = (filteredList[key].insurance == null) ? '-' : filteredList[key].insurance.road_side_assistance_end_date;
            filteredList[key].road_side_assistance_company = (filteredList[key].insurance == null) ? '-' : filteredList[key].insurance.road_side_assistance_company;

            delete Object.values(filteredList)[key].insurance;
            delete Object.values(filteredList)[key].maintenance;
        });

        //console.log(filteredList);

        /* generate worksheet from state */
        const ws = utils.json_to_sheet(filteredList);
        /* create workbook and append worksheet */
        const wb = utils.book_new();
        utils.book_append_sheet(wb, ws, "Data");
        ws["!cols"] = ws_cols;
        /* export to XLSX */
        writeFileXLSX(wb, "scvr_vehicles_list.xlsx");
    },
    get_van_list(){
      axios.get(apiUrl + '/vehicle', { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }})
      .then(response => {
        this.van_list = response.data
      })
    }
  },
  mounted(){
    this.get_van_list();
    if(localStorage.getItem('token') !== null) {
      this.$store.commit('setUser', JSON.parse(localStorage.getItem('user')));
    } else{
      this.$router.push('/user/login');
    }
  }
})
</script>


