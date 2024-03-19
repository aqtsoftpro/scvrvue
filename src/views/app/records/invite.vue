<template>
  <div>
    <b-modal id="modalbasic" size="lg" ref="modalbasic" :title="customer.first_name + ' ' + customer.last_name">
      <table class="stacked table">
        <tr><td>Last Name:</td><td> {{ customer.last_name }}</td></tr>
        <tr><td>Email:</td><td> {{ customer.email }}</td></tr>
        <tr><td>Phone Number:</td><td> {{ customer.phone_number }}</td></tr>
        <tr><td>Address:</td><td> {{ customer.address }}</td></tr>
        <tr><td>Date of Birth:</td><td> {{ customer.dob }}</td></tr>
        <tr><td>Gender:</td><td> {{ customer.gender }}</td></tr>
        <tr><td>Occupation:</td><td> {{ customer.occupation }}</td></tr>
        <tr><td>Driver Licence Number:</td><td> {{ customer.driver_licence_number }}</td></tr>
        <tr><td>Driver Licence Front Picture:</td><td> <img width="100%" :src="customer.driver_licence_front_picture"/></td></tr>
        <tr><td>Driver Licence Back Picture:</td><td> <img width="100%" :src="customer.driver_licence_back_picture" /></td></tr>
        <tr><td>Driver Licence Expiry:</td><td> {{ customer.driver_licence_expiry }}</td></tr>
        <tr><td>Secondary ID Number Number:</td><td> {{ customer.secondary_id_number }}</td></tr>
        <tr><td>Secondary ID Front Picture:</td><td> <img width="100%" :src="customer.secondary_id_front_picture" /> </td></tr>
        <tr><td>Secondary ID Back Picture:</td><td><img width="100%" :src=" customer.secondary_id_back_picture" /></td></tr>
        <tr><td>Secondary ID Expiry:</td><td> {{ customer.secondary_id_expiry }}</td></tr>
        <tr><td>Secondary ID Nationatlity:</td><td> {{ customer.nationality }}</td></tr>
      </table>
    </b-modal>
  <b-form>
  <b-row>
    <b-colxx xxs="12" xs="3" lg="3" class="mb-3">
      <label>{{$t('forms.customer.first_name')}}</label>
      <b-form-input v-model="form.first_name" ></b-form-input>
    </b-colxx>
    <b-colxx xxs="12" xs="3" lg="3" class="mb-3">
      <label>{{$t('forms.customer.last_name')}}</label>
      <b-form-input v-model="form.last_name" ></b-form-input>
    </b-colxx>
    <b-colxx xxs="12" xs="3" lg="3" class="mb-3">
      <label>{{$t('forms.customer.email')}}</label>
      <b-form-input v-model="form.email" ></b-form-input>
    </b-colxx>
    <b-colxx xxs="12" xs="3" lg="3" class="mb-3">
      <label>{{$t('forms.customer.phone_number')}}</label>
      <b-form-input v-model="form.phone_number" ></b-form-input>
    </b-colxx>
    <b-colxx xxs="12" xs="3" lg="3" class="mb-3">
      <label>{{$t('forms.customer.address')}}</label>
      <b-form-input v-model="form.address" ></b-form-input>
    </b-colxx>
    <b-colxx xxs="12" xs="3" lg="3" class="mb-3">
      <label>{{$t('forms.customer.dob')}}</label>
      <datepicker
          :bootstrap-styling="true"
          v-model="form.dob"
        ></datepicker>
    </b-colxx>
    <b-colxx xxs="12" xs="3" lg="3" class="mb-3">
      <label>{{$t('forms.customer.gender')}}</label>
      <v-select v-model="form.gender"
          :reduce="role => role.id"
          label="name"
          aria-placeholder="Select Gender"
          :options="[{ id: 1, name: 'Male' }, { id: 2, name: 'Female' }]"
        ></v-select>
    </b-colxx>
    <b-colxx xxs="12" xs="3" lg="3" class="mb-3">
      <label>{{$t('forms.customer.occupation')}}</label>
      <b-form-input v-model="form.occupation" ></b-form-input>
    </b-colxx>
    <b-colxx xxs="12" xs="3" lg="3" class="mb-3">
      <label>{{$t('forms.customer.driver_licence_number')}}</label>
      <b-form-input v-model="form.driver_licence_number" ></b-form-input>
    </b-colxx>
    <b-colxx xxs="12" xs="3" lg="3" class="mb-3">
      <label>{{$t('forms.customer.driver_licence_front_picture')}}</label>
      <b-file v-model="form.driver_licence_front_picture" ></b-file>
    </b-colxx>
    <b-colxx xxs="12" xs="3" lg="3" class="mb-3">
      <label>{{$t('forms.customer.driver_licence_back_picture')}}</label>
      <b-file v-model="form.driver_licence_back_picture" ></b-file>
    </b-colxx>
    <b-colxx xxs="12" xs="3" lg="3" class="mb-3">
      <label>{{$t('forms.customer.driver_licence_expiry')}}</label>
      <datepicker
          :bootstrap-styling="true"
          v-model="form.driver_licence_expiry"
        ></datepicker>
    </b-colxx>
    <b-colxx xxs="12" xs="3" lg="3" class="mb-3">
      <label>{{$t('forms.customer.secondary_id_number')}}</label>
      <b-form-input v-model="form.secondary_id_number" ></b-form-input>
    </b-colxx>
    <b-colxx xxs="12" xs="3" lg="3" class="mb-3">
      <label>{{$t('forms.customer.secondary_id_front_picture')}}</label>
      <b-file file v-model="form.secondary_id_front_picture" ></b-file>
    </b-colxx>
    <b-colxx xxs="12" xs="3" lg="3" class="mb-3">
      <label>{{$t('forms.customer.secondary_id_back_picture')}}</label>
      <b-file file v-model="form.secondary_id_back_picture" ></b-file>
    </b-colxx>
    <b-colxx xxs="12" xs="3" lg="3" class="mb-3">
      <label>{{$t('forms.customer.secondary_id_expiry')}}</label>
      <datepicker
          :bootstrap-styling="true"
          v-model="form.secondary_id_expiry"
        ></datepicker>
    </b-colxx>
    <b-colxx xxs="12" xs="3" lg="3" class="mb-3">
      <label>{{$t('forms.customer.nationality')}}</label>
      <b-form-input v-model="form.nationality" ></b-form-input>
    </b-colxx>
  </b-row>
  <b-button v-if="!editing_mode"  @click.stop="save_customer_record"  variant="primary" class="mt-4 mb-4">{{ 'Save' }}</b-button>
  <div v-else>
    <b-button  @click.stop="update_customer_record(customer_id)"  variant="secondary" class="mt-4 mb-4">{{ ' Update' }}</b-button>
    <b-button  @click.stop="cancel_update_customer_record()"  variant="info" class="mt-4 mb-4"><i class="simple-icon-close"></i></b-button>
  </div>
</b-form>
<b-table id="customers-table" :items="customer_records" :fields="customer_fields" :per-page="perPage" :current-page="currentPage">
  <template  #cell(role_name)="data">
    <div class="badge badge-light">{{data.value}}</div>
  </template>
  <template  #cell(actions)="data">
    <b-button  @click.stop="bring_fields(data.item)" v-b-modal.modalbasic variant="grey"  size="sm" ><i class="simple-icon-eye"></i></b-button>
    <b-button  @click.stop="edit_customer_record(data.item)"  variant="grey" size="sm" ><i class="simple-icon-pencil"></i></b-button>
    <b-button v-if="user.role_id == 1" @click.stop="delete_customer_record(data.item)"  variant="grey" size="sm" ><i class="simple-icon-trash"></i></b-button>
  </template>
</b-table>
<p class="mt-3">Current Page: {{ currentPage }}</p>
<b-pagination
      align="center"
      size="md"
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      aria-controls="customers-table"
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
      currentPage: 1,
      perPage: 10,
      user: null,
      editing_mode: false,
      customer_records: [],
      role_options: [],
      role_id: null,
      customer_id: null,
      customer: [],
      form: {
        first_name: null,
        last_name: null,
        email: null,
        phone_number: null,
        address: null,
        dob: null,
        gender: null,
        occupation: null,
        driver_licence_number: null,
        driver_licence_front_picture: null,
        driver_licence_back_picture: null,
        driver_licence_expiry: null,
        nationality: null,
        secondary_id_number: null,
        secondary_id_front_picture: null,
        secondary_id_back_picture: null,
        secondary_id_expiry: null,

      },
      customer_fields: ['first_name', 'last_name', 'email', 'phone_number', 'address',  'actions']
    }
  },
  computed: {
    ...mapGetters(['currentUser']),
    rows() {
      return this.customer_records.length
    }
  },
  methods: {
    bring_fields(fields){
      // this.$nextTick().then(()=>{
      //   console.log(this.$refs.modalbasic.content)
      // });

      // Object.keys(fields).forEach(key => {
      //   console.log(this.refs["myTable"])
      // })
      this.customer = fields
    },
    get_customer_records() {
      //Tax Records
      axios.get(
        apiUrl + '/customer',{
        headers:{
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
        }
      ).then(response => {
        {
          //parse json data
          this.customer_records = response.data
        }
      })
    },

    save_customer_record(){
      axios.post(
        apiUrl + '/customer',this.form,{
          headers:{
            'content-type': 'multipart/form-data',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          }
        }
      ).then(response => {
        //parse json data
        this.get_customer_records()
        this.reset_form()
        this.$notify('success filled', 'Success!', response.data.message,{ duration: 3000, permanent: false });
      }).catch(error => {
        this.$notify('error filled', 'Error!', error.response.data.message,{ duration: 3000, permanent: false });
      })
    },
    edit_customer_record(item){
      this.editing_mode = true
      axios.get(
        apiUrl + '/customer/'+item.id,{
          headers:{
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          }
        }
      ).then(response => {
        //parse json data
        this.form.first_name = response.data.first_name
        this.form.last_name = response.data.last_name
        this.form.phone_number = response.data.phone_number
        this.form.email = response.data.email
        this.form.address = response.data.address
        this.customer_id = response.data.id
        this.form.dob = response.data.dob
        this.form.gender = response.data.gender
        this.form.occupation = response.data.occupation
        this.form.driver_licence_number = response.data.driver_licence_number
        this.form.driver_licence_front_picture = response.data.driver_licence_front_picture
        this.form.driver_licence_back_picture = response.data.driver_licence_back_picture
        this.form.driver_licence_expiry = response.data.driver_licence_expiry
        this.form.nationality = response.data.nationality
        this.form.secondary_id_number = response.data.secondary_id_number
        this.form.secondary_id_front_picture = response.data.secondary_id_front_picture
        this.form.secondary_id_back_picture = response.data.secondary_id_back_picture
        this.form.secondary_id_expiry = response.data.secondary_id_expiry

        // this.reset_form()
      })
    },
    update_customer_record(id){
      axios.post(
        apiUrl + '/customer/'+id,{...this.form, '_method': 'put'},{
          headers:{
            'content-type': 'multipart/form-data',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          }
        }
      ).then(response => {
        //parse json data
        this.get_customer_records()
        this.editing_mode = false
        this.reset_form()
        this.$notify('success filled', 'Success!', response.data.message,{ duration: 3000, permanent: false });
      }).catch(error => {
        this.$notify('error filled', 'Error!', error.response.data.message,{ duration: 3000, permanent: false });
      })
    },

    delete_customer_record(item){
      axios.delete(
        apiUrl + '/customer/'+item.id,{
          headers:{
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          }
        }
      ).then(response => {
        //parse json data
        this.get_customer_records()
        this.$notify('success filled', 'Success!', response.data.message,{ duration: 3000, permanent: false });
      }).catch(error => {
        this.$notify('error filled', 'Error!', error.response.data.message,{ duration: 3000, permanent: false });
      })
    },

    cancel_update_customer_record(){
      this.editing_mode = false
      this.reset_form()
    },
    reset_form(){
      this.form = {
        name: null,
        email: null,
        role_id: 'Select Role',
      }
    },
    get_role_options() {
        axios.get(apiUrl + '/role',{
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          }
        })
        .then(response => {
          this.role_options = response.data;
        });
    }
  },

  mounted() {

    this.get_role_options()

    if(localStorage.getItem('token') !== null) {
      this.$store.commit('setUser', JSON.parse(localStorage.getItem('user')));
    } else{
      this.$router.push('/user/login');
    }
    this.get_customer_records()
  },
  watch: {
    currentUser() {
      this.user = this.currentUser
    }
  }
}
</script>

