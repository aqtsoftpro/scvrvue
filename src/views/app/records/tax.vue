<template>
  <div>
  <b-form>
  <b-row>
    <b-colxx xxs="12" xs="4" lg="4" class="mb-3">
      <label class="form-group has-top-label">
        <v-select v-model="form.tax_type_id"
          label="name"
          :reduce="tax => tax.id"
          :options="tax_type_options"
        ></v-select>
        <span>{{ $t('forms.tax.tax_type') }}</span>
      </label>
    </b-colxx>
    <b-colxx xxs="12" xs="4" lg="4" class="mb-3">
      <label class="form-group has-top-label">
      <b-form-input v-model="form.amount" ></b-form-input>
      <span>{{ $t('forms.tax.amount') }}</span>
      </label>
    </b-colxx>
    <b-colxx xxs="12" xs="4" lg="4" class="mb-3">
      <label class="form-group has-top-label">
        <b-form-input style="display:none" type="text" v-model.trim="form.date" />
          <datepicker
            :bootstrap-styling="true"
            v-model="form.date"
            format="dd-MM-yyyy"
          ></datepicker>
        <span>{{ $t('forms.tax.date') }}</span>
        <b-form-invalid-feedback>Purchase date is required!</b-form-invalid-feedback>
      </label>
    </b-colxx>
  </b-row>
  <b-row>
    <b-colxx xxs="12" xs="4" lg="4" class="mb-3">
        <label class="form-group has-top-label">
        <!-- <b-form-input v-model="form.swap_with" :placeholder="$t('forms.vanout.swap_with')"></b-form-input> -->
        <b-form-input v-model="form.filer_name" ></b-form-input>
        <span>{{ $t('forms.tax.filer_name') }}</span>
        </label>
    </b-colxx>
    <b-colxx xxs="12" xs="4" lg="4" class="mb-3">
      <label class="form-group has-top-label">
        <b-form-input v-model="form.filer_contact" ></b-form-input>
        <span>{{ $t('forms.tax.filer_contact') }}</span>
      </label>
    </b-colxx>
    <b-colxx xxs="12" xs="4" lg="4" class="mb-3">
      <label class="form-group has-top-label">
        <b-form-input v-model="form.accountant_fee" ></b-form-input>
        <span>{{ $t('forms.tax.accountant_fee') }}</span>
      </label>
    </b-colxx>
  </b-row>
  <b-row>
    <b-colxx xxs="12" xs="4" lg="4" class="mb-3">
        <label class="form-group has-top-label">
          <b-form-textarea v-model="form.comments" ></b-form-textarea>
          <span>{{ $t('forms.tax.comments') }}</span>
        </label>
    </b-colxx>
  </b-row>
  <b-button v-if="!editing_mode"  @click.stop="save_tax_record"  variant="primary" class="mt-4 mb-4">{{ 'Save' }}</b-button>
  <div v-else>
    <b-button  @click.stop="update_tax_record(form.id)"  variant="secondary" class="mt-4 mb-4">{{ ' Update' }}</b-button>
    <b-button  @click.stop="cancel_update_tax_record()"  variant="info" class="mt-4 mb-4"><i class="simple-icon-close"></i></b-button>
  </div>
  <div v-if="isProcessing">
    <b-spinner variant="primary" label="Spinning" class="mb-1"></b-spinner>
    <p class="text-primary">{{ processing_text }}</p>
  </div>
</b-form>

<b-table id="tax_table" :items="tax_records" :fields="tax_fields" current-page="currentPage" :per-page="perPage">
  <template #cell(added)="data">
    <ul class="menu">
      <li class="menu-item">Added: {{ data.item.added }}</li>
      <li class="menu-item">Updated: {{ data.item.updated }}</li>
    </ul>
  </template>
  <template  #cell(actions)="data">
    <!-- <b-button  @click.stop="view_vanout(data.item)"  variant="info"  size="xs" ><i class="simple-icon-eye"></i></b-button> -->
    <b-button  @click.stop="edit_tax_record(data.item)"  variant="grey" size="xs" ><i class="simple-icon-pencil"  ></i></b-button>
    <b-button v-if="user.role_id == 1"  @click.stop="delete_tax_record(data.item)"  variant="grey" size="xs" ><i class="simple-icon-trash"></i></b-button>
  </template>
</b-table>
<p class="mt-3">Current Page: {{ currentPage }}</p>
<b-pagination
      align="center"
      size="md"
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      aria-controls="tax-table"
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
      isProcessing : true,
      processing_text: 'Lading ..',
      currentPage: 1,
      perPage: 10,
      user: null,
      editing_mode: false,
      tax_records: [],
      tax_type_options: [],
      form: {
        tax_type_id: '',
        amount: '',
        date: '',
        filer_name: '',
        filer_contact: '',
        accountant_fee: '',
        comments:  '',
      },
      tax_fields: ['type', 'amount', 'date', 'filer_name', 'filer_contact', 'accountant_fee', 'comments', 'added', 'actions'],
    }
  },

  computed: {
    ...mapGetters(['currentUser']),
    rows() {
      return this.tax_records.length
    }
  },

  methods: {
    get_tax_records() {
      //Tax Records
      this.processing_text = 'Loading ..';
      this.isProcessing = true
      axios.get(
        apiUrl + '/tax_record',{
        headers:{
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
        }
      ).then(response => {
        {
          //parse json data
          this.tax_records = response.data.data
          this.isProcessing = false
        }
      })
    },
    get_tax_type_options(){

      axios.get(
        apiUrl + '/tax_type_options',{
          headers:{
          'Authorization': 'Bearer ' + localStorage.getItem('token')
          }
        }
      ).then(response => {
          //parse json data
          this.tax_type_options = response.data
        })
    },
    save_tax_record(){

      this.processing_text = 'Saving Record ...';
      this.isProcessing = true

      // if(this.form.tax_type_id == 'Tax Type'){
      //   this.$notify('error filled', 'Please fill the form!', 'Tax Type is required!',{ duration: 3000, permanent: false });
      // } else if (this.form.amount == '') {
      //   this.$notify('error filled', 'Please fill the form!', 'Amount is required!',{ duration: 3000, permanent: false });
      // } else if (this.form.date == ''){
      //   this.$notify('error filled', 'Please fill the form!', 'Date is required!',{ duration: 3000, permanent: false });
      // } else if (this.form.filer_name == ''){
      //   this.$notify('error filled', 'Please fill the form!', 'Filer name is required!',{ duration: 3000, permanent: false });
      // } else if (this.form.filer_contact == ''){
      //   this.$notify('error filled', 'Please fill the form!', 'Filer Contact is required!',{ duration: 3000, permanent: false });
      // } else if (this.form.accountant_fee == ''){
      //   this.$notify('error filled', 'Please fill the form!', 'Accountant Fee is required!',{ duration: 3000, permanent: false });
      // } else if (this.form.comments == ''){
      //   this.$notify('error filled', 'Please fill the form!', 'Add some comments!',{ duration: 3000, permanent: false });
      // } else {
          axios.post(
          apiUrl + '/tax_record',this.form,{
            headers:{
              'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
          }
        ).then(response => {
          //parse json data
          this.get_tax_records()
          this.reset_form()
          this.$notify(`${response.data.status} filled`, response.data.status, response.data.message,{ duration: 3000, permanent: false });
          this.isProcessing = false
        }).catch(error => {
          this.$notify('error filled', 'Error', error.response.data.message,{ duration: 3000, permanent: false });
          this.isProcessing = false
        })
      //}
    },
    edit_tax_record(item){
      this.editing_mode = true
      axios.get(
        apiUrl + '/tax_record/'+item.id,{
          headers:{
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          }
        }
      ).then(response => {
        //parse json data
        this.form = response.data
        this.form.tax_type_id = parseInt(response.data.tax_type_id)
        //this.reset_form()
      })
    },
    update_tax_record(id){

      this.processing_text = 'Updating Data ...'
      this.isProcessing = true

      axios.put(
        apiUrl + '/tax_record/'+id,this.form,{
          headers:{
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          }
        }
      ).then(response => {
        //parse json data
        this.get_tax_records()
        this.editing_mode = false
        this.reset_form()
        this.$notify(`success filled`, 'Success', response.data.message,{ duration: 3000, permanent: false });
        this.isProcessing = false
      }).catch(error => {
        this.$notify('error filled', 'Error', error.response.data.message,{ duration: 3000, permanent: false });
        this.isProcessing = false
      })
    },

    delete_tax_record(item){

      this.processing_text = 'Deleting Data ...'
      this.isProcissing = true

      axios.delete(
        apiUrl + '/tax_record/'+item.id,{
          headers:{
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          }
        }
      ).then(response => {
        //parse json data
        this.get_tax_records()
        this.$notify('success filled', 'Success', response.data.message,{ duration: 3000, permanent: false });
        this.isProcissing = false
      }).catch(error => {
        this.$notify('error filled', 'Error', erorr.response.data.message,{ duration: 3000, permanent: false });
        this.isProcessing = false
      })
    },

    cancel_update_tax_record(){
      this.editing_mode = false
      this.reset_form()
    },
    reset_form(){
      this.form = {
        tax_type_id: '',
        amount: '',
        date: '',
        filer_name: '',
        filer_contact: '',
        accountant_fee: '',
        comments:  '',
      }
    }
  },

  mounted() {

    if(localStorage.getItem('token') !== null) {
      this.$store.commit('setUser', JSON.parse(localStorage.getItem('user')));
    } else{
      this.$router.push('/user/login');
    }
    this.get_tax_records()
    this.get_tax_type_options()
  },

  watch: {
    currentUser(newValue){
      this.user = this.currentUser
    }
  }
}
</script>

