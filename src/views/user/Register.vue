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
                <!-- <label>{{$t('forms.customer.first_name')}}
                </label>
                <b-form-input v-model="form.first_name" ></b-form-input> -->

                <b-form class="av-tooltip tooltip-label-right">
                  <label class="form-group has-top-label">
                    <b-form-input v-model="$v.form.first_name.$model"
                      :state="!$v.form.first_name.$error"></b-form-input>
                    <span> {{$t('forms.customer.first_name')}}</span>
                    <b-form-invalid-feedback v-if="$v.form.first_name.$error"> Please enter first name
                    </b-form-invalid-feedback>
                  </label>
                </b-form>


              </b-colxx>
              <b-colxx xxs="12" xs="3" lg="3" class="mb-3">
                <!-- <label>{{$t('forms.customer.last_name')}}</label>
                <b-form-input v-model="form.last_name" ></b-form-input> -->

                <b-form class="av-tooltip tooltip-label-right">
                  <label class="form-group has-top-label">
                    <b-form-input v-model="$v.form.last_name.$model"
                      :state="!$v.form.last_name.$error"></b-form-input>
                    <span> {{$t('forms.customer.last_name')}}</span>
                    <b-form-invalid-feedback v-if="$v.form.last_name.$error"> Please enter last name
                    </b-form-invalid-feedback>
                  </label>
                </b-form>


              </b-colxx>
              <b-colxx xxs="12" xs="3" lg="3" class="mb-3">
                <!-- <label>{{$t('forms.customer.email')}}</label>
                <b-form-input v-model="form.email" ></b-form-input> -->

                <b-form class="av-tooltip tooltip-label-right">
                  <label class="form-group has-top-label">
                    <b-form-input v-model="$v.form.email.$model"
                      :state="!$v.form.email.$error"></b-form-input>
                    <span> {{$t('forms.customer.email')}}</span>
                    <b-form-invalid-feedback v-if="$v.form.email.$error"> Please enter email address
                    </b-form-invalid-feedback>
                  </label>
                </b-form>

              </b-colxx>
              <b-colxx xxs="12" xs="3" lg="3" class="mb-3">
                <!-- <label>{{$t('forms.customer.phone_number')}}</label>
                <b-form-input v-model="form.phone_number" ></b-form-input> -->

                <b-form class="av-tooltip tooltip-label-right">
                  <label class="form-group has-top-label">
                    <b-form-input v-model="$v.form.phone_number.$model"
                      :state="!$v.form.phone_number.$error"></b-form-input>
                    <span> {{$t('forms.customer.phone_number')}}</span>
                    <b-form-invalid-feedback v-if="$v.form.phone_number.$error"> Please enter phone number
                    </b-form-invalid-feedback>
                  </label>
                </b-form>


              </b-colxx>
              <b-colxx xxs="12" xs="3" lg="3" class="mb-3">
                <!-- <label>{{$t('forms.customer.address')}}</label>
                <b-form-input v-model="form.address" ></b-form-input> -->

                <b-form class="av-tooltip tooltip-label-right">
                  <label class="form-group has-top-label">
                    <b-form-input v-model="$v.form.address.$model"
                      :state="!$v.form.address.$error"></b-form-input>
                    <span> {{$t('forms.customer.address')}}</span>
                    <b-form-invalid-feedback v-if="$v.form.address.$error"> Please enter address
                    </b-form-invalid-feedback>
                  </label>
                </b-form>


              </b-colxx>
              <b-colxx xxs="12" xs="3" lg="3" class="mb-3">
                <!-- <label>{{$t('forms.customer.dob')}}</label>
                <datepicker
                    :bootstrap-styling="true"
                    v-model="form.dob"
                  ></datepicker> -->

                <b-form class="av-tooltip tooltip-label-right">
                  <label class="form-group has-top-label">
                      <b-form-input style="display:none" type="date"
                              v-model.trim="$v.form.dob.$model"
                              :state="!$v.form.dob.$error" />

                      <datepicker
                    :bootstrap-styling="true"
                    v-model="$v.form.dob.$model"
                  ></datepicker>
                    <span> {{$t('forms.customer.dob')}}</span>
                    <b-form-invalid-feedback v-if="$v.form.dob.$error"> Please select date of birth
                    </b-form-invalid-feedback>
                  </label>
                </b-form>


              </b-colxx>
              <b-colxx xxs="12" xs="3" lg="3" class="mb-3">
                <!-- <label>{{$t('forms.customer.gender')}}</label>

              <v-select v-model="form.gender"
                    :reduce="role => role.id"
                    label="name"
                    aria-placeholder="Select Gender"
                    :options="[{ id: 1, name: 'Male' }, { id: 2, name: 'Female' }]"
                  ></v-select> -->


                  <b-form class="av-tooltip tooltip-label-right">
                  <label class="form-group has-top-label">
                    <!-- <b-form-input v-model="$v.form.gender.$model"
                      :state="!$v.form.gender.$error"></b-form-input> -->

                      <b-form-input style="display:none" type="text"
                              v-model.trim="$v.form.gender.$model"
                              :state="!$v.form.gender.$error" />

                      <v-select v-model="$v.form.gender.$model"
                        :reduce="gender => gender.id"
                        label="name"
                        aria-placeholder="Select Gender"
                        :options="[{ id: 1, name: 'Male' }, { id: 2, name: 'Female' }]"
                      ></v-select>

                    <span> {{$t('forms.customer.gender')}}</span>
                    <b-form-invalid-feedback v-if="$v.form.gender.$error"> Please select gender
                    </b-form-invalid-feedback>
                  </label>
                </b-form>


              </b-colxx>
              <b-colxx xxs="12" xs="3" lg="3" class="mb-3">
                <!-- <label>{{$t('forms.customer.occupation')}}</label>
                <b-form-input v-model="form.occupation" ></b-form-input> -->

                <b-form class="av-tooltip tooltip-label-right">
                  <label class="form-group has-top-label">
                    <b-form-input v-model="$v.form.occupation.$model"
                      :state="!$v.form.occupation.$error"></b-form-input>
                    <span> {{$t('forms.customer.occupation')}}</span>
                    <b-form-invalid-feedback v-if="$v.form.occupation.$error"> Please enter accupation
                    </b-form-invalid-feedback>
                  </label>
                </b-form>


              </b-colxx>
              <b-colxx xxs="12" xs="3" lg="3" class="mb-3">
                <!-- <label>{{$t('forms.customer.driver_licence_number')}}</label>
                <b-form-input v-model="form.driver_licence_number" ></b-form-input> -->

                <b-form class="av-tooltip tooltip-label-right">
                  <label class="form-group has-top-label">
                    <b-form-input v-model="$v.form.driver_licence_number.$model"
                      :state="!$v.form.driver_licence_number.$error"></b-form-input>
                    <span> {{$t('forms.customer.driver_licence_number')}}</span>
                    <b-form-invalid-feedback v-if="$v.form.driver_licence_number.$error"> Please enter driving licence number
                    </b-form-invalid-feedback>
                  </label>
                </b-form>


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
                  <b-form class="av-tooltip tooltip-label-right">
                    <label class="form-group has-top-label">
                        <b-form-input style="display:none" type="date"
                                v-model.trim="$v.form.driver_licence_expiry.$model"
                                :state="!$v.form.driver_licence_expiry.$error" />

                        <datepicker
                      :bootstrap-styling="true"
                      v-model="$v.form.driver_licence_expiry.$model"
                    ></datepicker>
                      <span> {{$t('forms.customer.driver_licence_expiry')}}</span>
                      <b-form-invalid-feedback v-if="$v.form.driver_licence_expiry.$error"> Please select licence expiry
                      </b-form-invalid-feedback>
                    </label>
                  </b-form>
              </b-colxx>
              <b-colxx xxs="12" xs="3" lg="3" class="mb-3">
                <!-- <label>{{$t('forms.customer.secondary_id_number')}}</label>
                <b-form-input v-model="form.secondary_id_number" ></b-form-input> -->

                <b-form class="av-tooltip tooltip-label-right">
                  <label class="form-group has-top-label">
                    <b-form-input v-model="$v.form.secondary_id_number.$model"
                      :state="!$v.form.secondary_id_number.$error"></b-form-input>
                    <span> {{$t('forms.customer.secondary_id_number')}}</span>
                    <b-form-invalid-feedback v-if="$v.form.secondary_id_number.$error"> Please enter first name
                    </b-form-invalid-feedback>
                  </label>
                </b-form>
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
                <!-- <label>{{$t('forms.customer.secondary_id_expiry')}}</label>
                <datepicker
                    :bootstrap-styling="true"
                    v-model="form.secondary_id_expiry"
                  ></datepicker> -->


                  <b-form class="av-tooltip tooltip-label-right">
                    <label class="form-group has-top-label">
                        <b-form-input style="display:none" type="date"
                                v-model.trim="$v.form.secondary_id_expiry.$model"
                                :state="!$v.form.secondary_id_expiry.$error" />

                        <datepicker
                      :bootstrap-styling="true"
                      v-model="$v.form.secondary_id_expiry.$model"
                    ></datepicker>
                      <span> {{$t('forms.customer.secondary_id_expiry')}}</span>
                      <b-form-invalid-feedback v-if="$v.form.secondary_id_expiry.$error"> Please select id expiry
                      </b-form-invalid-feedback>
                    </label>
                  </b-form>


              </b-colxx>
              <b-colxx xxs="12" xs="3" lg="3" class="mb-3">
                <!-- <label>{{$t('forms.customer.nationality')}}</label>
                <b-form-input v-model="form.nationality" ></b-form-input> -->

                <b-form class="av-tooltip tooltip-label-right">
                  <label class="form-group has-top-label">
                    <b-form-input v-model="$v.form.nationality.$model"
                      :state="!$v.form.nationality.$error"></b-form-input>
                    <span> {{$t('forms.customer.nationality')}}</span>
                    <b-form-invalid-feedback v-if="$v.form.nationality.$error"> Please enter first name
                    </b-form-invalid-feedback>
                  </label>
                </b-form>
              </b-colxx>
              <div v-if="isProcessing">
                <b-spinner variant="primary"></b-spinner>
                <span class="text-primary">{{ processing_text }}</span>
              </div>
            </b-row>
            <b-button  @click.stop="save_customer_record"  variant="primary" class="mt-4 mb-4">{{ 'Save Customer Information' }}</b-button>
          </div>
      </b-card>
    </b-colxx>
  </b-row>
</template>
<style scoped>
  .logo-single {
    background: url(/assets/img/Pngs/Transparent.png) no-repeat !important;
    background-size: 18em !important; /* Scale the background image to be as large as possible */
    background-position: center;
    background-repeat: no-repeat; 
  }
</style>
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

      },
      processing_text: '',
      isProcessing: false
    }
  },

  mixins: [validationMixin],
  validations: {
    form: {
        first_name: {
          required
        },
        last_name: {
          required
        },
        email: {
          required
        },
        phone_number: {
          required
        },
        address: {
          required
        },
        dob: {
          required
        },
        gender: {
          required
        },
        occupation: {
          required
        },
        driver_licence_number: {
          required
        },
        // driver_licence_front_picture: {
        //   required
        // },
        // driver_licence_back_picture: {
        //   required
        // },
        driver_licence_expiry: {
          required
        },
        nationality: {
          required
        },
        secondary_id_number: {
          required
        },
        // secondary_id_front_picture: {
        //   required
        // },
        // secondary_id_back_picture: {
        //   required
        // },
        secondary_id_expiry: {
          required
        },
    }
  },


  methods: {
    save_customer_record(){
      this.$v.form.$touch();
      if (this.$v.form.$anyError == true) {
        return false;
      }
      this.processing_text = 'Saving User Data ...'
      this.isProcessing = true
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
