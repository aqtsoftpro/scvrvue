<template>
  <div>
    <b-row>
      <b-colxx xxs="12">
          <b-card class="mb-4" >
            <datatable
              :title="$t('menu.reports.customer-list')"
              :searchColumn="searchColumns"
              :data="customer_list"
              :fields="fields"
              ref="childComponent" @dataFromChild="handleDataFromChild"
            />
          </b-card>
          <button @click="()=>{$router.push('/app/reports')}" class="btn btn-primary">Back to reports menu</button>
          <button  class="btn btn-outline-success" @click.prevent="exportToExcel">Export to Excel</button>
      </b-colxx>
    </b-row>
  </div>
</template>
<script>
import Vue from 'vue'
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
      customer_list: [],
      exportables: [],
      searchColumns : ['first_name', 'last_name', 'email', 'phone_number', 'address'],
      fields: [
        {
          name: "first_name",
          sortField: "first_Name",
          title: "First Name",
          titleClass: "",
          dataClass: "muted-text",
          width: "20%"
        },
        {
          name: "last_name",
          sortField: "last_name",
          title: "Last Name",
          titleClass: "",
          dataClass: "muted-text",

        },
        {
          name: "email",
          sortField: "email",
          title: "E-Mail",
          titleClass: "",
          dataClass: "muted-text",

        },
        {
          name: "phone_number",
          sortField: "phone_number",
          title: "Phone Number",
          titleClass: "",
          dataClass: "muted-text",

        },
        {
          name: "address",
          sortField: "address",
          title: "Address",
          titleClass: "",
          dataClass: "muted-text",

        },
        {
          name: "__slot:actions",
          title: "",
          titleClass: "center aligned text-right",
          dataClass: "center aligned text-right",
          width: "5%"
        }
      ]
    }
  },

  methods: {


    exportToExcel(){

      this.$refs.childComponent.getData();
      /* generate worksheet from state */
        const ws = utils.json_to_sheet(this.exportables);
        /* create workbook and append worksheet */
        const wb = utils.book_new();
        utils.book_append_sheet(wb, ws, "Data");
        /* export to XLSX */
        writeFileXLSX(wb, "scvr_customer_list.xlsx");
    },

    handleDataFromChild(data) {
      this.exportables = data;
      console.log('Data from child:', data);
    },

    get_customer_list(){
      axios.get(apiUrl + '/customer', {headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}})
      .then(response => {
        this.customer_list = response.data;
      })
    }
  },

  mounted(){
    this.get_customer_list();

    if(localStorage.getItem('token') !== null) {
      this.$store.commit('setUser', JSON.parse(localStorage.getItem('user')));
    } else{
      this.$router.push('/user/login');
    }
  }
})
</script>


