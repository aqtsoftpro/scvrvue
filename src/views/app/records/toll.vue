<template>
  <div>
    <b-modal ref="booking_search_modal" id="modallg" size="lg" title="Search Bookings" hide-footer>
      <table class="table">
      <thead>
        <tr>
          <th>Toll Number</th>
          <th>Date </th>
          <th>Registration Number</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{{ current_toll_record.toll_number }}</td>
          <td>{{ current_toll_record.date }}</td>
          <td>{{ current_toll_record.reg_plate_number }}</td>
        </tr>
      </tbody>
    </table>
        <div class="alert alert-info">Do you want to search booking database to indentify which customer had the vehicle on date of toll recipet ?</div>

        <b-button v-on:click="search_booking_records(current_toll_record.date, current_toll_record.reg_plate_number)" type="button" class="btn btn-primary ">Search Bookings Database</b-button>

        <b-card v-if="is_searching">
          <b-spinner  variant="primary" label="Spinning" class="mb-1"></b-spinner>
          Searching Records ...
        </b-card>

        <b-card class="mt-4"  v-if="booking_data.length != 0">
          <table class="table">
            <thead>
              <tr>
                <th>Customer Name</th>
                <th>Van Out Date</th>
                <th>Van Return Date</th>
              </tr>
            </thead>
            <tbody>
              <b-tr v-for="toll_record in toll_records" :key="toll_record.id">
                <b-td>{{ booking_data.customer }}</b-td>
                <b-td>{{ booking_data.van_out_date }}</b-td>
                <b-td>{{ booking_data.return_date }}</b-td>
              </b-tr>
            </tbody>
          </table>
          <b-button v-on:click="assign_toll_to_customer(current_toll_record.id)" type="button" class="btn btn-primary ">Assign Toll to customer</b-button>
        </b-card>

    </b-modal>
    <!-- <div class="alert alert-info">
      <i>Upon pressing the <strong>"save"</strong> button application will check the <strong>"Registration Plate Number"</strong> of vehicle and <strong>"Date"</strong> of toll record, against <strong>"Van Out Records"</strong> if a match is found, the toll ticket will be assigned to that customer, otherwise you have to select customer from dropdown.</i>
    </div> -->
  <b-form>
  <b-row>
    <img width="200" :src="preview" >
  </b-row>
  <!-- <b-row>
    <img width="500" ref="toll_picture" :src="form.toll_image" >
  </b-row> -->

  <b-row class="mt-3">
    <b-colxx xxs="12" xs="3" lg="3" class="mb-3">
      <label class="form-group has-top-label">
      <b-form-input v-model="form.toll_number" ></b-form-input>
      <span>{{ $t('forms.toll.toll_number') }}</span>
      </label>
    </b-colxx>
    <b-colxx xxs="12" xs="3" lg="3" class="mb-3">
      <label class="form-group has-top-label">
        <b-form-input style="display:none" type="text" v-model.trim="form.date" />
      <datepicker
        :bootstrap-styling="true"
        v-model="form.date"
        format="dd-MM-yyyy"
      ></datepicker>
      <span>{{ $t('forms.toll.date') }}</span>
      <b-form-invalid-feedback>Secondary id expiry!</b-form-invalid-feedback>
      </label>
    </b-colxx>
    <b-colxx xxs="12" xs="3" lg="3" class="mb-3">
      <label class="form-group has-top-label">
        <v-select v-model="form.reg_plate_number"
          aria-placeholder="Select Gender"
          label="reg_plate_number"
          :reduce="vehicle => vehicle.reg_plate_number"
          :options="vehicle_options"
      ></v-select>
      <span>{{ $t('forms.toll.vehicle_reg_number') }}</span>
      </label>
    </b-colxx>
    <b-colxx xxs="12" xs="3" lg="3">
      <b-form>                        <!-- IMage uplaod -->
        <div >
          <b-form-file
            v-model="form.toll_image"
            v-on:change="handImageUpload"
            :placeholder="$t('forms.toll.toll_image')"
            drop-placeholder="Drop file here..."
            accept="image/*"
          ></b-form-file>
        </div>
      </b-form>
    </b-colxx>
  </b-row>
  <b-row v-if="customer_drop_visible == true">
    <b-colxx xxs="12" xs="3" lg="3" class="mb-3">
      <label class="form-group has-top-label">
        <v-select v-model="form.customer_id"
          label="name"
          :reduce="customer => customer.id"
          :options="customer_options"
      >
    </v-select>
      <span>{{ $t('forms.toll.customer') }}</span>
      </label>
    </b-colxx>
  </b-row>
  <b-row>
    <b-colxx xxs="12" xs="3" lg="3" class="mb-3">
      <label class="form-group has-top-label">
        <v-select v-model="form.payment_status"
          label="name"
          :reduce="paymentStatus => paymentStatus.id"
          :options="payment_status_options"
      ></v-select>
      <span>{{ $t('forms.toll.payment_status') }}</span>
      </label>
    </b-colxx>
  </b-row>
  <b-button v-if="!editing_mode"  @click.stop="save_toll_record"  variant="primary" class="mt-4 mb-4">{{ 'Save' }}</b-button>
  <div v-else>
    <b-button  @click.stop="update_toll_record(form.id)"  variant="secondary" class="mt-4 mb-4">{{ ' Update' }}</b-button>
    <b-button  @click.stop="cancel_update_toll_record()"  variant="info" class="mt-4 mb-4"><i class="simple-icon-close"></i></b-button>
  </div>
  <div v-if="isProcessing">
    <b-spinner variant="primary" label="Spinning" class="mb-1"></b-spinner>
    <p class="text-primary">{{ processing_text }}</p>
  </div>
</b-form>

<b-colxx xxs="12" xs="6" lg="6" xl="6" class="mb-5">
      <b-form>
        <h2>Import Excel File</h2>                        <!-- IMage uplaod -->
        <div>
          <b-form-file
            v-model="toll_import"
            v-on:change="handleTollImport"
            placeholder="Select excel file"
            drop-placeholder="Drop file here..."
            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
          ></b-form-file>
          <div class="row">
            <div class="col-3">
              <b-button  @click.stop="import_toll_record"  variant="outline-primary" class="mt-4 mb-4">{{ 'Import' }}</b-button>
            </div>
            <div class="col-7">
              <b-button @click.stop="download_excel_template" class=" btn btn-outline-info mt-4 mb-4" >{{ 'Download Template' }}</b-button>
            </div>
          </div>
        </div>
      </b-form>
</b-colxx>

<b-table id="toll_table" :items="toll_records" :fields="toll_fields" current-page="currentPage" :per-page="perPage">
  <template  #cell(toll_image)="data">
    <img widh="100%" :src="data.item.toll_image" class="list-thumbnail responsive border-0" />
  </template>
  <template #cell(added)="data">
    <ul class="menu">
      <li class="menu-item">Added: {{ data.item.added }}</li>
      <li class="menu-item">Updated: {{ data.item.updated }}</li>
    </ul>
  </template>
  <template  #cell(actions)="data">
    <!-- <b-button  @click.stop="view_vanout(data.item)"  variant="info"  size="xs" ><i class="simple-icon-eye"></i></b-button> -->
    <b-button  @click.stop="edit_toll_record(data.item)"  variant="grey" size="xs" ><i class="simple-icon-pencil"  ></i></b-button>
    <b-button v-if="user.role_id == 1"  @click.stop="delete_toll_record(data.item)"  variant="grey" size="xs" ><i class="simple-icon-trash"></i></b-button>
  </template>
</b-table>
<p class="mt-3">Current Page: {{ currentPage }}</p>
<b-pagination
      align="center"
      size="md"
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      aria-controls="toll-table"
    ></b-pagination>
</div>
</template>
<script>

import axios from 'axios'
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import Datepicker from "vuejs-datepicker";
import {apiUrl} from "../../../constants/config.js";
import { mapGetters } from 'vuex';

export default {
  components: {
    'v-select': vSelect,
    Datepicker
  },
  data() {
    return {
      toll_import: [],
      current_toll_record: [],
      booking_data: [],
      is_searching: false,
      customer_drop_visible: false,
      isProcessing: false,
      processing_text: 'Saving Data ..',
      preview: null,
      currentPage: 1,
      perPage: 10,
      user: null,
      editing_mode: false,
      toll_records: [],
      vehicle_options: [],
      customer_options: [],
      payment_status_options: [
        { id: 'paid', name: 'Paid' },
        { id: 'unpaid', name: 'Unpaid' }
      ],
      form: {
        'toll_number': null,
        'date': null,
        'reg_plate_number': null,
        'toll_image': null,
        'customer_id': null,
        'payment_status': null,
      },
      toll_fields: ['id', 'toll_number', 'date', 'reg_plate_number', 'customer', 'payment_status','added', 'actions'],
    }
  },

  computed: {
    ...mapGetters(['currentUser']),
    rows() {
      return this.toll_records.length
    }
  },

  methods: {

    handImageUpload(event) {
      this.preview = URL.createObjectURL(event.target.files[0]);
      this.form.toll_image = event.target.files[0];
    },

    handleTollImport(event) {
      this.toll_import = event.target.files[0];
    },

    import_toll_record(){
    this.isProcessing = true
    this.processing_text = 'Importing toll record ..'

    console.log(this.toll_import)

    axios.post(
      apiUrl + '/toll_import',{toll: this.toll_import},{
        headers:{
          'Content-Type': 'multipart/form-data',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      }
    ).then(response => {
      this.isProcessing = false
      this.$notify('success filled', 'Message!', 'Excel file imported',{ duration: 3000, permanent: false });
      this.get_toll_records()
      this.get_customers()
    })
    .catch(error => {
      console.log(error);
      this.isProcessing = false
    })
},

download_excel_template(){
    axios.post('/assets/files/toll_template.xlsx', {
      file_name: 'toll_template.xlsx'
  }, {
      responseType: 'blob'
  }).then((response) => {
      const url = URL.createObjectURL(new Blob([response.data], {
          type: 'application/vnd.ms-excel'
      }))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'toll_template.xlsx')
      document.body.appendChild(link)
      link.click()
  });
},

    get_customers(){
      this.processing_text = 'Loading ..'
      this.isProcessing = true
      //Customers
      axios.get(
        apiUrl + '/all_customer_options',{
        headers:{
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
        }
      ).then(response => {
        {
          //parse json data
          this.customer_options = response.data
          this.isProcessing = false
        }
      })
    },

    get_vehicles() {
      this.processing_text = 'Loading ..'
      this.isProcessing = true
      //Vehicles
      axios.get(
        apiUrl + '/vehicle',{
        headers:{
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
        }
      ).then(response => {
        {
          //parse json data
          this.vehicle_options = response.data
          this.isProcessing = false
        }
      })
    },

    get_toll_records() {

      this.processing_text = 'Loading ..'
      this.isProcessing = true
      //Toll Records
      axios.get(
        apiUrl + '/toll',{
        headers:{
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
        }
      ).then(response => {
        {
          //parse json data
          this.toll_records = response.data
          this.isProcessing = false
        }
      })
    },
    save_toll_record(){

      this.processing_text = 'Saving Data and checking toll information against rental records..'
      this.isProcessing = true

      axios.post(
        apiUrl + '/toll',this.form,{
          headers:{
            'content-type': 'multipart/form-data',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          }
        }
      ).then(response => {
        this.current_toll_record = response.data.data
        //parse json data
        this.get_toll_records()
        this.reset_form()
        this.$notify('success filled', 'Success!', response.data.message,{ duration: 3000, permanent: false });
        this.isProcessing = false
        this.form.toll_image = ''
        this.customer_drop_visible = true

        this.$refs['booking_search_modal'].show();
        //console.log(response.data.data.date, response.data.data.reg_plate_number);
        //this.search_booking_records(response.data.data.date, response.data.data.reg_plate_number)

      })
      .catch(error => {
        console.log(error);
        //this.$notify('error filled', 'Error!', error.response.data.message,{ duration: 3000, permanent: false });
        this.isProcessing = false
      })
    },

    search_booking_records($date, $reg){
      this.is_searching = true
      //Search booking record for customer
      axios.get(
        apiUrl + '/search_toll_record/' + $date + '/' + $reg,{
          headers:{
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          }
        }
      ).then(response2 => {
        this.is_searching = false
         if(response2.data.length != 0){
          this.booking_data = response2.data[0]
         } else {
           this.$notify('error filled', 'Error!', 'No record found aginst provided Registration and Date',{ duration: 6000, permanent: false });
         }
      });
    },

    edit_toll_record(item){

      this.customer_drop_visible = true
      this.processing_text = 'Loading Data ...'
      this.isProcessing = true
      this.editing_mode = true

      axios.get(
        apiUrl + '/toll/'+item.id,{
          headers:{
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          }
        }
      ).then(response => {
        //parse json data
        this.form.toll_image = response.data.toll_image
        this.form.id = response.data.id
        this.form.toll_number = response.data.toll_number
        this.form.date = response.data.date
        this.form.reg_plate_number = response.data.reg_plate_number
        this.form.customer_id = parseInt(response.data.customer_id)
        this.form.payment_status = response.data.payment_status
        this.preview = response.data.toll_image

        this.isProcessing = false
        //this.reset_form()
      })
    },

    assign_toll_to_customer($id){
       axios.post(
        apiUrl + '/toll/' + $id, {
          'customer_id': this.booking_data.customer_id,'_method': 'put'},{
          headers:{
            'content-type': 'multipart/form-data',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          }
        }
      ).then(response => {
        this.$refs['booking_search_modal'].hide();
        this.get_toll_records()
      }).catch(error => {
        this.$notify('error filled', 'Error!', error.response.data.message,{ duration: 3000, permanent: false });
      })
    },

    async update_toll_record(id){
      await axios.post(
        apiUrl + '/toll/'+id, {...this.form, '_method': 'put'},{
          headers:{
            'content-type': 'multipart/form-data',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          }
        }
      ).then(response => {
        console.log(response.data)
        //parse json data
        this.get_toll_records()
        this.editing_mode = false
        this.reset_form()
        this.$notify('success filled', 'Success!', response.data.message,{ duration: 3000, permanent: false });
        this.toll_image = ''
      }).catch(error => {
        this.$notify('error filled', 'Error!', error.response.data.message,{ duration: 3000, permanent: false });
      })
    },

    delete_toll_record(item){
      axios.delete(
        apiUrl + '/toll/'+item.id,{
          headers:{
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          }
        }
      ).then(response => {
        //parse json data
        this.get_toll_records()
        this.$notify('success filled', 'Success!', response.data.message,{ duration: 3000, permanent: false });
      }).catch(error => {
        this.$notify('error filled', 'Error!', error.response.data.message,{ duration: 3000, permanent: false });
      })
    },

    cancel_update_toll_record(){
      this.editing_mode = false
      this.customer_drop_visible = false
      this.reset_form()
    },
    reset_form(){
      this.form = {
        'toll_number': null,
        'date': null,
        'toll_image': null
      }
    }
  },

  mounted() {

    if(localStorage.getItem('token') !== null) {
      this.$store.commit('setUser', JSON.parse(localStorage.getItem('user')));
    } else{
      this.$router.push('/user/login');
    }

    this.get_customers()
    this.get_vehicles()
    this.get_toll_records()



  },

  watch: {
    currentUser(newValue){
      this.user = this.currentUser
    }
  }
}
</script>

