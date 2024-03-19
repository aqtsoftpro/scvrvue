<template>
  <b-row class="h-100">
    <b-colxx xxs="12" md=10  class="mx-auto my-auto">
      <router-link tag="a" to="/"><span class="logo-single"/></router-link>

      <h6 v-if="registration != 1" class="mb-4">{{ $t('user.register')}}</h6>
      <b-card class="auth-card">
          <!-- <div class="position-relative image-side ">
            <p class=" text-white h2">{{ $t('dashboards.magic-is-in-the-details') }}</p>
              <p class="white mb-0">  Please use this form to register. <br />If you are a member, please
                <router-link tag="a" to="/user/login" class="white">login</router-link>.
              </p>
          </div> -->
          <div v-if="registration == 1">
            <h1 class="text-success">Congratulations!</h1> <h3><br/>You have been registered as a customer in "Super Cheap Van Rentals" Database.</h3>
          </div>
          <div v-else>
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
            <b-button  @click.stop="save_customer_record"  variant="primary" class="mt-4 mb-4">{{ 'Save Customer Information' }}</b-button>
          </div>
      </b-card>
    </b-colxx>
  </b-row>
</template>
<script>
import axios from 'axios'
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import Datepicker from "vuejs-datepicker";
import {apiUrl} from "../../constants/config.js";
import { mapGetters } from 'vuex';

export default {
  components: {
    'v-select': vSelect,
    Datepicker
  },
  data () {
    return {
      registration: 0,
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

      }
    }
  },
  methods: {
    save_customer_record(){
      axios.post(
        apiUrl + '/register-customer',this.form,{
          headers:{
            'content-type': 'multipart/form-data',
          }
        }
      ).then(response => {
        this.registration = 1
        this.$notify('success filled', 'Success!', 'You have successfully completed your registration',{ duration: 3000, permanent: false });
      }).catch(error => {
        this.$notify('error filled', 'Error!', error.response.data.message,{ duration: 3000, permanent: false });
      })
    },
  }
}
</script>
