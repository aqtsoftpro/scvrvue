<template>
  <div>
    <b-row>
      <b-colxx xxs="12">
        <b-card class="mb-4" :title="$t('menu.reports.view-maintenance_cost')">
          <b-row>
            <b-colxx>
              <b-form inline class="float-end" style="justify-content: flex-end !important;">
                <div style="margin-right: 1em !important;">
                  <b-form-input style="display:none" type="text" v-model.trim="form.start_date" />
                  <datepicker :default-value="today" type="date" placeholder="start date" value-type="format"
                    v-model="form.start_date" format="DD-MM-YYYY"></datepicker>
                </div>

                <div style="margin-right: 1em !important;">
                  <b-form-input style="display:none" type="text" v-model.trim="form.end_date" />
                  <datepicker :default-value="today" type="date" placeholder="start date" value-type="format"
                    v-model="form.end_date" format="DD-MM-YYYY"></datepicker>
                </div>

                <b-button variant="primary" class="ms-1" @click="filterByDate">Filter</b-button>
              </b-form>
            </b-colxx>
          </b-row>
          <!-- :title="$t('menu.reports.view-maintenance_cost')" -->
          <datatable :sum="sum" :searchColumn="searchColumns" :data="maintenance_cost" :fields="fields" />
          <!-- <table><tr><td><h1>Total:</h1></td><td><h1 class="text-primary">{{total}}</h1></td></tr></table> -->
        </b-card>

        <button @click="() => { $router.push('/app/reports') }" class="btn btn-primary">Back to reports menu</button>
        <button class="btn btn-outline-success" @click.prevent="exportToExcel">Export to Excel</button>
      </b-colxx>
    </b-row>
  </div>
</template>
<script>
import axios from 'axios';
import { apiUrl } from '../../../constants/config';
import datatable from './datatable';
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import { utils, writeFileXLSX } from 'xlsx';
export default ({
  components: {
    'datatable': datatable, datepicker: DatePicker
  },
  data() {
    return {
      maintenance_cost: [],
      today: new Date(),
      searchColumns: ['date', 'vehicle', 'service', 'cost', 'sum'],
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
      ],
      form: {
        start_date: '',
        end_date: '',
      },
      sum: 0,
    }
  },

  methods: {
    filterByDate() {
      axios.get(apiUrl + '/reports/maintenance_cost', {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        params: {
          start_date: this.form.start_date, // Corrected reference
          end_date: this.form.end_date
        }
      }).then(response => {
          if (response.data.total > 0) {
            this.maintenance_cost = response.data.maintenance  
          } else {
            this.maintenance_cost = []
          }
          this.sum = response.data.total
      })
    },

    exportToExcel() {
      /* generate worksheet from state */
      const ws = utils.json_to_sheet(this.maintenance_cost);
      /* create workbook and append worksheet */
      const wb = utils.book_new();
      utils.book_append_sheet(wb, ws, "Data");
      /* export to XLSX */
      writeFileXLSX(wb, "scvr_maintenance_cost.xlsx");
    },
    get_maintenance_entries() {
      axios.get(apiUrl + '/reports/maintenance_cost', { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') } })
        .then(response => {
          this.maintenance_cost = response.data.maintenance
          this.sum = response.data.total
        })
    }
  },
  mounted() {

    this.get_maintenance_entries();

    if (localStorage.getItem('token') !== null) {
      this.$store.commit('setUser', JSON.parse(localStorage.getItem('user')));
    } else {
      this.$router.push('/user/login');
    }
  }
})
</script>
