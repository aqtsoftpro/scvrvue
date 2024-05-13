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
      <div class="alert alert-info">Do you want to search booking database to indentify which customer had the vehicle
        on date of toll recipet ?</div>

      <b-button v-on:click="search_booking_records(current_toll_record.date, current_toll_record.reg_plate_number)"
        type="button" class="btn btn-primary ">Search Bookings Database</b-button>

      <b-card v-if="is_searching">
        <b-spinner variant="primary" label="Spinning" class="mb-1"></b-spinner>
        Searching Records ...
      </b-card>

      <b-card class="mt-4" v-if="booking_data.length != 0">
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
        <b-button v-on:click="assign_toll_to_customer(current_toll_record.id)" type="button"
          class="btn btn-primary ">Assign Toll to customer</b-button>
      </b-card>

    </b-modal>
    <!-- <div class="alert alert-info">
      <i>Upon pressing the <strong>"save"</strong> button application will check the <strong>"Registration Plate Number"</strong> of vehicle and <strong>"Date"</strong> of toll record, against <strong>"Van Out Records"</strong> if a match is found, the toll ticket will be assigned to that customer, otherwise you have to select customer from dropdown.</i>
    </div> -->
    <b-form>
      <b-row>
        <img width="200" :src="preview">
      </b-row>
      <!-- <b-row>
    <img width="500" ref="toll_picture" :src="form.toll_image" >
  </b-row> -->

      <b-row class="mt-3">
        <!-- <b-colxx xxs="12" xs="3" lg="3" class="mb-3">
          <label class="form-group has-top-label">
            <b-form-input  type="text" style="display: none;" v-model.trim="$v.form.toll_number.$model"
              :state="!$v.form.toll_number.$error" />
            <b-form-input v-model="form.toll_number"></b-form-input>
            <span>{{ $t('forms.toll.toll_number') }}</span>
            <b-form-invalid-feedback v-if="$v.form.toll_number.$error">
              Please enter toll number
            </b-form-invalid-feedback>
          </label>
        </b-colxx> -->
        <b-colxx xxs="12" xs="3" lg="3" class="mb-3">

          <label class="form-group has-top-label">
            <b-form-input  type="text" style="display: none;" v-model.trim="$v.form.date.$model"
              :state="!$v.form.date.$error" />
            <datepicker :bootstrap-styling="true" v-model="form.date" format="dd-MM-yyyy"></datepicker>
            <span>Start Date</span>
            <b-form-invalid-feedback v-if="$v.form.date.$error">
              Please select start date
            </b-form-invalid-feedback>
          </label>
        </b-colxx>
        <b-colxx xxs="12" xs="3" lg="3" class="mb-3">
          <label class="form-group has-top-label">
            <b-form-input  type="text" style="display: none;" v-model.trim="$v.form.due_date.$model"
              :state="!$v.form.due_date.$error" />
            <datepicker :bootstrap-styling="true" v-model="form.due_date" format="dd-MM-yyyy"></datepicker>
            <span>End Date</span>
            <b-form-invalid-feedback v-if="$v.form.due_date.$error">
              Please select end date
            </b-form-invalid-feedback>
          </label>
        </b-colxx>
        <b-colxx xxs="12" xs="3" lg="3" class="mb-3">
          <label class="form-group has-top-label">
            <b-form-input  type="text" style="display: none;" v-model.trim="$v.form.reg_plate_number.$model"
              :state="!$v.form.reg_plate_number.$error" />
            <v-select v-model="form.reg_plate_number" aria-placeholder="Select Gender" label="reg_plate_number"
              :reduce="vehicle => vehicle.reg_plate_number" :options="vehicle_options" v-on:input="check_customer"></v-select>
            <span>Vehicle Registration Number (LPN)</span>
            <b-form-invalid-feedback v-if="$v.form.reg_plate_number.$error">
              Please select registration
            </b-form-invalid-feedback>
          </label>
        </b-colxx>
        <b-colxx v-if="customer_drop_visible == true" xxs="12" xs="3" lg="3">
          <b-form> <!-- IMage uplaod -->
            <div>
              <b-form-file v-model="form.toll_image" v-on:change="handImageUpload"
                :placeholder="$t('forms.toll.toll_image')" drop-placeholder="Drop file here..."
                accept="image/*"></b-form-file>
            </div>
          </b-form>
        </b-colxx>
      </b-row>
      <b-row v-if="customer_drop_visible == true">
        <b-colxx xxs="12" xs="3" lg="3" class="mb-3">
          <label class="form-group has-top-label">
            <v-select v-model="form.customer_id" label="name" :reduce="customer => customer.id"
              :options="customer_options">
            </v-select>
            <span>{{ $t('forms.toll.customer') }}</span>
          </label>
        </b-colxx>
        <b-colxx xxs="12" xs="3" lg="3" class="mb-3">
          <label class="form-group has-top-label">
            <b-form-input  type="text" style="display: none;" v-model.trim="$v.form.payment_status.$model"
              :state="!$v.form.payment_status.$error" />
            <v-select v-model="form.payment_status" label="name" :reduce="paymentStatus => paymentStatus.id"
              :options="payment_status_options"></v-select>
            <span>{{ $t('forms.toll.payment_status') }}</span>
            <b-form-invalid-feedback v-if="$v.form.payment_status.$error">
              Please select payment status
            </b-form-invalid-feedback>
          </label>
        </b-colxx>
        <b-colxx xxs="12" xs="3" lg="3" class="mb-3">
          <label class="form-group has-top-label">
            <b-form-input  type="text" style="display: none;" v-model.trim="$v.form.trip_cost.$model"
              :state="!$v.form.trip_cost.$error" />
            <b-form-input v-model="form.trip_cost"></b-form-input>
            <span> Toll Cost</span>
            <b-form-invalid-feedback v-if="$v.form.trip_cost.$error">
              Please enter toll cost
            </b-form-invalid-feedback>
          </label>
        </b-colxx>
        <b-colxx xxs="12" xs="3" lg="3" class="mb-3">
          <label class="form-group has-top-label">
            <b-form-input  type="text" style="display: none;" v-model.trim="$v.form.details.$model"
              :state="!$v.form.details.$error" />
            <b-form-textarea v-model="form.details"></b-form-textarea>
            <span> Detail </span>
            <b-form-invalid-feedback v-if="$v.form.details.$error">
              Please enter detail
            </b-form-invalid-feedback>
          </label>
        </b-colxx>
        <div v-if="isProcessing">
          <b-spinner variant="primary" label="Spinning" class="mb-1"></b-spinner>
          <p class="text-primary">{{ processing_text }}</p>
        </div>
      </b-row>
      <b-button v-if="!editing_mode" @click="save_toll_record" variant="primary" class="mt-4 mb-4">Save</b-button>
      <div v-else>
        <b-button @click.stop="update_toll_record(form.id)" variant="secondary" class="mt-4 mb-4">Update</b-button>
        <b-button @click.stop="cancel_update_toll_record()" variant="info" class="mt-4 mb-4"><i
            class="simple-icon-close"></i></b-button>
      </div>
      <button type="reset" ref="tollResetButton" class="d-none">reset</button>
    </b-form>

    <b-colxx xxs="12" xs="6" lg="6" xl="6" class="mb-5">
      <b-form>
        <h2>Import Excel File</h2> <!-- IMage uplaod -->
        <div>
          <b-form-file v-model="toll_import" v-on:change="handleTollImport" placeholder="Select excel file"
            drop-placeholder="Drop file here..."
            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"></b-form-file>
          <div class="row">
            <div class="col-3">
              <b-button @click.stop="import_toll_record" variant="outline-primary" class="mt-4 mb-4">{{ 'Import'
                }}</b-button>
            </div>
            <div class="col-7">
              <b-button @click.stop="download_excel_template" class=" btn btn-outline-info mt-4 mb-4">{{ 'Download Template' }}</b-button>
            </div>
          </div>
        </div>
      </b-form>
    </b-colxx>

    <!-- <b-table id="toll_table" :items="toll_records" :fields="toll_fields" current-page="currentPage" :per-page="perPage">
      <template #cell(toll_image)="data">
        <img widh="100%" :src="data.item.toll_image" class="list-thumbnail responsive border-0" />
      </template>
      <template #cell(added)="data">
        <ul class="menu">
          <li class="menu-item">Added: {{ data.item.added }}</li>
          <li class="menu-item">Updated: {{ data.item.updated }}</li>
        </ul>
      </template>
      <template #cell(actions)="data">
        <b-button @click.stop="edit_toll_record(data.item)" variant="grey" size="xs"><i
            class="simple-icon-pencil"></i></b-button>
        <b-button v-if="user.role_id == 1" @click.stop="delete_toll_record(data.item)" variant="grey" size="xs"><i
            class="simple-icon-trash"></i></b-button>
      </template>
    </b-table>
    <p class="mt-3">Current Page: {{ currentPage }}</p>
    <b-pagination align="center" size="md" v-model="currentPage" :total-rows="rows" :per-page="perPage"
      aria-controls="toll-table"></b-pagination> -->

      <datatable title="" :fields="toll_fields" :data="toll_records" :edit="edit_toll_record"
                   :del="delete_toll_record" />


  </div>
</template>
<script>

import {
  validationMixin
} from "vuelidate";
const {
  required
} = require("vuelidate/lib/validators");

import axios from 'axios'
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import Datepicker from "vuejs-datepicker";
// import DatePicker from 'vue2-datepicker';
// import 'vue2-datepicker/index.css';
import { apiUrl } from "../../../constants/config.js";
import moment from 'moment';
import { mapGetters } from 'vuex';
import datatable from './datatable'

export default {
  components: {
    'v-select': vSelect,
    'datepicker': Datepicker,
    datatable: datatable,
  },
  data() {
    return {
      toll_import: [],
      current_toll_record: [],
      booking_data: [],
      is_searching: false,
      customer_drop_visible: true,
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
        'date': '',
        'reg_plate_number': null,
        'toll_image': null,
        'customer_id': null,
        'payment_status': null,
        'details': null,
        'due_date': null,
        'trip_cost': null,
      },
      // toll_fields: ['id', 'date', 'due_date', 'reg_plate_number', 'toll_cost', 'customer', 'payment_status', 'added', 'actions'],

      toll_fields: [
        {
          name: "id",
          title: 'Id',
          sortField: "id",
          titleClass: "center aligned",
          dataClass: "center aligned",
          width: "5%"
        },
        {
          name: "date",
          title: 'Date',
          sortField: "Date",
          titleClass: "center aligned",
          dataClass: "center aligned",
          width: "5%"
        },
        {
          name: "due_date",
          title: 'Due Date',
          sortField: "due_date",
          titleClass: "center aligned",
          dataClass: "center aligned",
          width: "5%"
        },
        {
          name: "reg_plate_number",
          title: 'Reg Plate Number',
          sortField: "reg_plate_number",
          titleClass: "center aligned",
          dataClass: "center aligned",
          width: "10%"
        },
        {
          name: "toll_cost",
          title: 'Toll Cost',
          sortField: "toll_cost",
          titleClass: "center aligned",
          dataClass: "center aligned",
          width: "5%"
        },
        {
          name: "customer",
          title: 'Customer',
          sortField: "customer",
          titleClass: "center aligned",
          dataClass: "center aligned",
          width: "5%"
        },
        {
          name: "payment_status",
          title: 'Payment Status',
          sortField: "payment_status",
          titleClass: "center aligned",
          dataClass: "center aligned",
          width: "8%"
        },
        {
          name: "__slot:added",
          title: 'Added / Updated',
          titleClass: "center aligned",
          dataClass: "center aligned",
          width: "15%"
        },
        {
          name: "__slot:actions",
          title: "Actions",
          titleClass: "center aligned text-right",
          dataClass: "center aligned text-right",
          width: "15%"
        }],
    }
  },

  mixins: [validationMixin],
  validations: {
    form: {
      // 'toll_number': {
      //   required
      // },
      'date': {
        required
      },
      'reg_plate_number': {
        required
      },
      // 'toll_image': {
      //   required
      // },
      // 'customer_id': {
      //   required
      // },
      'payment_status': {
        required
      },
      'details': {
        required
      },
      'due_date': {
        required
      },
      'trip_cost': {
        required
      },
    },
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

    import_toll_record() {
      this.isProcessing = true
      this.processing_text = 'Importing toll record ..'

      console.log(this.toll_import)

      axios.post(
        apiUrl + '/toll_import', { toll: this.toll_import }, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      }
      ).then(response => {
        this.isProcessing = false
        this.$notify('success filled', 'Message!', 'Excel file imported', { duration: 3000, permanent: false });
        this.get_toll_records()
        this.get_customers()
      })
        .catch(error => {
          console.log(error);
          this.isProcessing = false
        })
    },

    download_excel_template() {
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

    get_customers() {
      this.processing_text = 'Loading ..'
      this.isProcessing = true
      //Customers
      axios.get(
        apiUrl + '/all_customer_options', {
        headers: {
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
        apiUrl + '/vehicle', {
        headers: {
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
        apiUrl + '/toll', {
        headers: {
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
    save_toll_record() {
      // console.log('this is just test');
      this.$v.form.$touch();
      if (this.$v.form.$anyError == true) {
        return false;
      }

      this.processing_text = 'Saving Data and checking toll information against rental records..'
      this.isProcessing = true
      axios.post(
        apiUrl + '/toll', this.form, {
        headers: {
          'content-type': 'multipart/form-data',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      }).then(response => {
        this.current_toll_record = response.data.data
        //parse json data
        this.get_toll_records()
        this.$notify('success filled', 'Success!', response.data.message, { duration: 3000, permanent: false });
        this.isProcessing = false
        this.form.toll_image = ''
        // this.customer_drop_visible = true
        this.$refs.tollResetButton.click();
        // this.$refs['booking_search_modal'].show();
        //console.log(response.data.data.date, response.data.data.reg_plate_number);
        //this.search_booking_records(response.data.data.date, response.data.data.reg_plate_number)
        // this.reset_form()
      })
      .catch(error => {
        console.log(error);
        //this.$notify('error filled', 'Error!', error.response.data.message,{ duration: 3000, permanent: false });
        this.isProcessing = false
      })
    },

    check_customer() {
      axios.post( apiUrl + '/customer-check', this.form, {
        headers: {
          'content-type': 'multipart/form-data',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      }).then(response => {
        console.log(response.data);
        this.customer_options.push(response.data);
        this.form.customer_id = response.data.id;

        // this.reset_form()
      })
        .catch(error => {
          console.log(error);
          //this.$notify('error filled', 'Error!', error.response.data.message,{ duration: 3000, permanent: false });
          this.isProcessing = false
      })
    },

    search_booking_records($date, $reg) {
      this.is_searching = true
      //Search booking record for customer
      axios.get(
        apiUrl + '/search_toll_record/' + $date + '/' + $reg, {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      }
      ).then(response2 => {
        this.is_searching = false
        if (response2.data.length != 0) {
          this.booking_data = response2.data[0]
        } else {
          this.$notify('error filled', 'Error!', 'No record found aginst provided Registration and Date', { duration: 6000, permanent: false });
        }
      });
    },

    edit_toll_record(item) {
      this.customer_drop_visible = true
      this.processing_text = 'Loading Data ...'
      this.isProcessing = true
      this.editing_mode = true

      axios.get(
        apiUrl + '/toll/' + item.id, {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      }
      ).then(response => {
        //parse json data
        this.form.toll_image = response.data.toll_image
        this.form.id = response.data.id
        this.form.toll_number = response.data.toll_number

        // let parsedDate = moment(response.data.date).toDate();

        this.form.date = moment(response.data.date, 'DD-MM-YYYY').toDate();
        this.form.due_date = moment(response.data.due_date, 'DD-MM-YYYY').toDate();
        this.form.details = response.data.details

        var tollCostWithDollarSign = response.data.toll_cost
        var tollCostWithoutDollarSign = tollCostWithDollarSign.replace('$', '')

        this.form.trip_cost = parseFloat(tollCostWithoutDollarSign);
        this.form.reg_plate_number = response.data.reg_plate_number
        this.form.customer_id = parseInt(response.data.customer_id)
        this.form.payment_status = response.data.payment_status
        this.preview = response.data.toll_image

        this.isProcessing = false
        //this.reset_form()
      })
    },

    assign_toll_to_customer($id) {
      axios.post(
        apiUrl + '/toll/' + $id, {
        'customer_id': this.booking_data.customer_id, '_method': 'put'
      }, {
        headers: {
          'content-type': 'multipart/form-data',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      }
      ).then(response => {
        this.$refs['booking_search_modal'].hide();
        this.get_toll_records()
      }).catch(error => {
        this.$notify('error filled', 'Error!', error.response.data.message, { duration: 3000, permanent: false });
      })
    },

    async update_toll_record(id) {

      this.processing_text = 'Updating toll record...'
      this.isProcessing = true

      await axios.post(
        apiUrl + '/toll/' + id, { ...this.form, '_method': 'put' }, {
        headers: {
          'content-type': 'multipart/form-data',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      }
      ).then(response => {
        console.log(response.data)
        //parse json data
        this.get_toll_records()
        this.editing_mode = false
        this.$refs.tollResetButton.click();
        // this.reset_form()
        this.$notify('success filled', 'Success!', response.data.message, { duration: 3000, permanent: false });
        this.toll_image = ''
      }).catch(error => {
        this.$notify('error filled', 'Error!', error.response.data.message, { duration: 3000, permanent: false });
      })
    },

    delete_toll_record(item) {
      axios.delete(
        apiUrl + '/toll/' + item.id, {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      }
      ).then(response => {
        //parse json data
        this.get_toll_records()
        this.$notify('success filled', 'Success!', response.data.message, { duration: 3000, permanent: false });
      }).catch(error => {
        this.$notify('error filled', 'Error!', error.response.data.message, { duration: 3000, permanent: false });
      })
    },

    cancel_update_toll_record() {
      this.editing_mode = false
      // this.customer_drop_visible = false
      this.reset_form()
    },
    reset_form() {
      this.form = {
        'toll_number': null,
        'date': null,
        'toll_image': null
      }
    },

    resetForm() {
      this.cancel_update_toll_record(); // Assuming you have a form ref named 'form'
    },

    edit_vanout(item) {
      console.log(item);
      this.processing_text = 'Loading Data ...'
      this.isProcessing = true
      this.van_out_date = ''
      this.get_available_vehicle_options(item.vehicle_id, item.swap_with)
      this.editing_mode = true;
      //get vanout data
      axios.get(apiUrl + '/vanout/' + item.id, {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
        }).then(response => {
          console.log(response.data);
          this.form = response.data
          // this.form.long_term = response.data.long_term
          this.booking_create_option = ({ id: item.id, name: item.reg_number })
          this.isProcessing = false
          var accessories_to_set = [];
          response.data.accessories.map((value, key) => {
            accessories_to_set.push(value.id)
          })
          console.log(accessories_to_set)
          this.form.accessories = accessories_to_set
        })

      this.get_active_vehicle_options(item.vehicle_id)
      this.get_all_customer_options(item.customer_id)
    },

    delete_vanout(item) {

      this.processint_text = 'Deleting Vehicle Out Data...';
      this.isProcessing = true

      axios.delete(apiUrl + '/vanout/' + item.id, {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      }).then(response => {
        //refresh the table data
        this.get_vanouts()
        this.get_active_vehicle_options()
        this.$notify(
          'success filled',
          'Success!',
          response.data.message
        )
        this.isProcessing = false
      })
    },
  },

  mounted() {

    if (localStorage.getItem('token') !== null) {
      this.$store.commit('setUser', JSON.parse(localStorage.getItem('user')));
    } else {
      this.$router.push('/user/login');
    }

    this.get_customers()
    this.get_vehicles()
    this.get_toll_records()



  },

  watch: {
    currentUser(newValue) {
      this.user = this.currentUser
    }
  }
}
</script>
