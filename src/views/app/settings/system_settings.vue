<template>
  <div>
  <b-form>
  <b-row center>

    <b-colxx lg-offset="2" xxs="12" xs="3" lg="3" class="mt-3">
      <label class="form-group has-top-label">
        <b-form-input v-model="form.currency" class="form-control" disabled></b-form-input>
        <span>{{ $t('forms.system_settings.currency') }}</span>
      </label>
    </b-colxx>
    <b-colxx xxs="12" xs="3" lg="3" class="mt-3">
      <label class="form-group has-top-label">
        <b-form-input v-model="form.timezone" class="form-control" disabled></b-form-input>
        <span>{{ $t('forms.system_settings.timezone') }}</span>
      </label>
    </b-colxx>
    <b-colxx xxs="12" xs="3" lg="3" class="mt-3">
      <label class="form-group has-top-label">
        <b-form-input v-model="form.language" class="form-control" disabled></b-form-input>
        <span>{{ $t('forms.system_settings.language') }}</span>
      </label>
    </b-colxx>
  </b-row>
<b-row center>
  <b-colxx offset="2" xxs="12" xs="3" lg="3" class="mt-3">
    <h4>Twilio Settings</h4>

  </b-colxx>
</b-row>
<b-row center>
  <b-colxx lg-offset="2" xxs="12" xs="12" lg="12" class="mt-3">
    <div class="alert alert-info">
      Following are <b>Tiwilio API</b> settings that you need in order to send <b>Whatsapp</b> invitations in customer section,
      You can obtain these credentials from your Twilio <b>"API Keys"</b> section.
  </div>
    <label class="form-group has-top-label">
      <b-form-input v-model="form.twilio_account_sid" class="form-control" ></b-form-input>
      <span>{{ $t('forms.system_settings.twilio_account_sid') }}</span>
    </label>
  </b-colxx>
</b-row>
<b-row center>
  <b-colxx lg-offset="2" xxs="12" xs="9" lg="9" class="mt-3">
    <label class="form-group has-top-label">
      <b-form-input v-model="form.twilio_auth_token" class="form-control" ></b-form-input>
      <span>{{ $t('forms.system_settings.twilio_auth_token') }}</span>
    </label>
  </b-colxx>
</b-row>
<b-row center>
  <b-colxx lg-offset="2" xxs="12" xs="9" lg="9" class="mt-3">
    <label class="form-group has-top-label">
      <b-form-input v-model="form.twilio_whatsapp_from" class="form-control" ></b-form-input>
      <span>{{ $t('forms.system_settings.twilio_from_number') }}</span>
    </label>
  </b-colxx>
</b-row>
<b-row center>
  <b-colxx lg-offset="2" xxs="12" xs="3" lg="3" class="mt-3">
    <b-button @click.stop="update_settings"  variant="primary" class="mt-4 mb-4">{{ 'Save Settings' }}</b-button>
  </b-colxx>
</b-row>

</b-form>


</div>
</template>
<script>

import axios from 'axios'
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import Datepicker from "vuejs-datepicker";
import {apiUrl} from "../../../constants/config.js";
import { mapGetters } from 'vuex';
import NotifyVue from '../../../components/Common/Notification/Notify.vue';

export default {
  components: {
    'v-select': vSelect,
    Datepicker
  },
  data() {
    return {
      user: null,
      editing_mode: false,
      mechanic_records: [],
      form: {
        currency: 'AUD',
        timezone: 'GMT +5',
        language: 'English',
        twilio_account_sid: '',
        twilio_auth_token: '',
        twilio_from_number: ''
      },
      tax_fields: ['name', 'workshop_contact', 'workshop_address', 'expertise', 'actions']
    }
  },

  computed: {
    ...mapGetters(['currentUser'])
  },
  methods: {
    get_mechanic_records() {
      //Tax Records
      axios.get(
        apiUrl + '/mechanic',{
        headers:{
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
        }
      ).then(response => {
        {
          //parse json data
          this.mechanic_records = response.data
        }
      })
    },

    save_mechanic_record(){
      axios.post(
        apiUrl + '/mechanic',this.form,{
          headers:{
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          }
        }
      ).then(response => {
        //parse json data
        this.get_mechanic_records()
        this.reset_form()

      })
    },
    edit_mechanic_record(item){
      this.editing_mode = true
      axios.get(
        apiUrl + '/mechanic/'+item.id,{
          headers:{
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          }
        }
      ).then(response => {
        //parse json data
        this.form = response.data
        // this.reset_form()
      })
    },
    update_mechanic_record(id){
      axios.put(
        apiUrl + '/mechanic/'+id,this.form,{
          headers:{
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          }
        }
      ).then(response => {
        //parse json data
        this.get_mechanic_records()
        this.editing_mode = false
        this.reset_form()
      })
    },

    delete_mechanic_record(item){
      axios.delete(
        apiUrl + '/mechanic/'+item.id,{
          headers:{
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          }
        }
      ).then(response => {
        //parse json data
        this.get_tax_records()
      })
    },

    cancel_update_mechanic_record(){
      this.editing_mode = false
      this.reset_form()
    },
    reset_form(){
      this.form = {
        name: '',
        workshop_contact: '',
        workshop_address: '',
        expertise: '',
      }
    }
  },

  mounted() {
    if(localStorage.getItem('token') !== null) {
      this.$store.commit('setUser', JSON.parse(localStorage.getItem('user')));
    } else{
      this.$router.push('/user/login');
    }
    console.log('hello');
    // this.get_mechanic_records()
    this.get_settings();
  },
  methods: {
    get_settings(){
      axios.get(
        apiUrl + '/settings',{
          headers:{
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          }
        }
      ).then(response => {
        {
          //parse json data
          this.form.twilio_account_sid = response.data.TWILIO_ACCOUNT_SID
          this.form.twilio_auth_token = response.data.TWILIO_AUTH_TOKEN
          this.form.twilio_whatsapp_from = response.data.TWILIO_WHATSAPP_FROM
        }
      })
    },
    update_settings(){
      axios.put(
        apiUrl + '/settings/1',{
          TWILIO_ACCOUNT_SID: this.form.twilio_account_sid,
          TWILIO_AUTH_TOKEN: this.form.twilio_auth_token,
          TWILIO_WHATSAPP_FROM: this.form.twilio_whatsapp_from
        }
      ).then(response => {
        {
          this.$notify('success', 'Success!', 'Settings Updated', 3000, false);
        }
      })
    },
  },
  watch: {
    currentUser() {
      this.user = this.currentUser
    }
  }
}
</script>

