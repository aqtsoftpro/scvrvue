<template>
  <div>
    <b-row>
      <b-colxx xxs="12">
          <b-card class="mb-4" :title="$t('menu.reports.van-rental-history')" >
            <b-row>
              <b-colxx>
                <b-form inline class="float-end">
                  <b-form-input style="display:none" type="text" v-model.trim="form.start_date" />
                  <datepicker :default-value="today" type="datetime" placeholder="start date" value-type="format"
                    v-model="form.start_date" format="DD-MM-YYYY h:mm"></datepicker>

                  <b-form-input style="display:none" type="text" v-model.trim="form.end_date" />
                  <datepicker :default-value="today" type="datetime" placeholder="start date" value-type="format"
                    v-model="form.end_date" format="DD-MM-YYYY h:mm"></datepicker>

                  <b-button variant="primary" class="ms-1" @click="filterByDate">Filter</b-button>
                </b-form>
              </b-colxx>
            </b-row>
            <!-- :title="$t('menu.reports.van-rental-history')" -->
            <datatable :searchColumn="searchColumns" :data="rental_history" :fields="fields" />
          </b-card>
          <button @click="()=>{$router.push('/app/reports')}" class="btn btn-primary">Back to reports menu</button>
          <button  class="btn btn-outline-success" @click.prevent="exportToExcel">Export to Excel</button>
      </b-colxx>
    </b-row>
  </div>
</template>
<script>
import datatable from './datatable'
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import { apiUrl } from '../../../constants/config'
import axios from 'axios'
import { utils, writeFileXLSX } from 'xlsx';
export default ({
  components: {
    'datatable': datatable, datepicker: DatePicker
  },
  data() {
    return {
      rental_history: [],
      searchColumns : ['rented_out', 'vehicle', 'customer', 'returned'],
      fields: [
        {
          name: "rented_out",
          sortField: "rented_out",
          title: "Rented Out",
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
          name: "customer",
          sortField: "customer",
          title: "Customer",
          titleClass: "",
          dataClass: "muted-text",
          width: "20%"
        },
        {
          name: "returned",
          sortField: "returned",
          title: "Returned",
          titleClass: "",
          dataClass: "muted-text",
          width: "20%"
        },
      ],
      form: {
        start_date: '',
        end_date: '',
      },
    }
  },
  methods: {
    filterByDate() {
      axios.get(apiUrl + '/reports/rental_history', {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        params: {
          start_date: this.form.start_date, // Corrected reference
          end_date: this.form.end_date
        }
      }).then(response => {
        this.rental_history = response.data
      })
    },

    exportToExcel(){
        /* generate worksheet from state */
        const ws = utils.json_to_sheet(this.rental_history);
        /* create workbook and append worksheet */
        const wb = utils.book_new();
        utils.book_append_sheet(wb, ws, "Data");
        /* export to XLSX */
        writeFileXLSX(wb, "scvr_van_rental_history.xlsx");
    },
    get_rental_history(){
    axios.get(`${apiUrl}/reports/rental_history`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
    .then(response => {
      this.rental_history = response.data
    })
    }
  },

  mounted(){

    this.get_rental_history();

    if(localStorage.getItem('token') !== null) {
      this.$store.commit('setUser', JSON.parse(localStorage.getItem('user')));
    } else{
      this.$router.push('/user/login');
    }
  }
})
</script>


