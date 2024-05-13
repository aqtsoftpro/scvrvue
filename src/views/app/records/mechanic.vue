<template>
  <div>
    <b-form>
      <b-row>
        <b-colxx xxs="12" xs="3" lg="3" class="mb-3">
          <label class="form-group has-top-label">
            <b-form-input  type="text" style="display: none;" v-model.trim="$v.form.name.$model"
              :state="!$v.form.name.$error" />
            <b-form-input v-model="form.name"></b-form-input>
            <span>{{ $t('forms.mechanic.name') }}</span>
            <b-form-invalid-feedback v-if="$v.form.name.$error">
              Please enter name
            </b-form-invalid-feedback>
          </label>
        </b-colxx>
        <b-colxx xxs="12" xs="3" lg="3" class="mb-3">
          <label class="form-group has-top-label">
            <b-form-input  type="text" style="display: none;" v-model.trim="$v.form.workshop_contact.$model"
              :state="!$v.form.workshop_contact.$error" />
            <b-form-input v-model="form.workshop_contact"></b-form-input>
            <span>{{ $t('forms.mechanic.workshop_contact') }}</span>
            <b-form-invalid-feedback v-if="$v.form.workshop_contact.$error">
              Please enter workshop contact number
            </b-form-invalid-feedback>
          </label>
        </b-colxx>
        <b-colxx xxs="12" xs="3" lg="3" class="mb-3">
          <label class="form-group has-top-label">
            <b-form-input  type="text" style="display: none;" v-model.trim="$v.form.workshop_address.$model"
              :state="!$v.form.workshop_address.$error" />
            <b-form-input v-model="form.workshop_address"></b-form-input>
            <span>{{ $t('forms.mechanic.workshop_address') }}</span>
            <b-form-invalid-feedback v-if="$v.form.workshop_address.$error">
              Please enter workshop address
            </b-form-invalid-feedback>
          </label>
        </b-colxx>
        <b-colxx xxs="12" xs="3" lg="3" class="mb-3">
          <label class="form-group has-top-label">
            <b-form-input  type="text" style="display: none;" v-model.trim="$v.form.expertise.$model"
              :state="!$v.form.expertise.$error" />
            <b-form-input v-model="form.expertise"></b-form-input>
            <span>{{ $t('forms.mechanic.expertise') }}</span>
            <b-form-invalid-feedback v-if="$v.form.expertise.$error">
              Please enter expertise
            </b-form-invalid-feedback>
          </label>
        </b-colxx>
        <b-colxx xxs="12" xs="3" lg="3" class="mb-3">
          <label class="form-group has-top-label">
            <b-form-input  type="text" style="display: none;" v-model.trim="$v.form.comments.$model"
              :state="!$v.form.comments.$error" />
            <b-textarea v-model="form.comments"></b-textarea>
            <span>{{ $t('forms.mechanic.comments') }}</span>
            <b-form-invalid-feedback v-if="$v.form.comments.$error">
              Please enter comments
            </b-form-invalid-feedback>
          </label>
        </b-colxx>
      </b-row>
      <b-button v-if="!editing_mode" @click.stop="save_mechanic_record" variant="primary" class="mt-4 mb-4">{{ 'Save'
        }}</b-button>
      <div v-else>
        <b-button @click.stop="update_mechanic_record(form.id)" variant="secondary" class="mt-4 mb-4">{{ ' Update'
          }}</b-button>
        <b-button @click.stop="cancel_update_mechanic_record()" variant="info" class="mt-4 mb-4"><i
            class="simple-icon-close"></i></b-button>
      </div>
      <div v-if="isProcessing">
        <b-spinner variant="primary" label="Spinning" class="mb-1"></b-spinner>
        <p class="text-primary">{{ processing_text }}</p>
      </div>
      <button type="reset" class="d-none" ref="mechanicReset"> reset form</button>
    </b-form>

    <!-- <b-table id="mechanic_table" :items="mechanic_records" :fields="tax_fields" current-page="currentPage"
      :per-page="perPage">
      <template #cell(added)="data">
        <ul class="menu">
          <li class="menu-item">Added: {{ data.item.added }}</li>
          <li class="menu-item">Updated: {{ data.item.updated }}</li>
        </ul>
      </template>
      <template #cell(actions)="data">
        <b-button @click.stop="edit_mechanic_record(data.item)" variant="grey" size="xs"><i
            class="simple-icon-pencil"></i></b-button>
        <b-button v-if="user.role_id == 1" @click.stop="delete_mechanic_record(data.item)" variant="grey" size="xs"><i
            class="simple-icon-trash"></i></b-button>
      </template>
    </b-table>
    <p class="mt-3">Current Page: {{ currentPage }}</p>
    <b-pagination align="center" size="md" v-model="currentPage" :total-rows="rows" :per-page="perPage"
      aria-controls="mechanic-table"></b-pagination> -->

      <datatable title="" :fields="tax_fields" :data="mechanic_records" :edit="edit_mechanic_record"
                   :del="delete_mechanic_record" />

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
import { apiUrl } from "../../../constants/config.js";
import { mapGetters } from 'vuex';
import datatable from './datatable'

export default {
  components: {
    'v-select': vSelect,
    Datepicker,
    datatable: datatable,
  },
  data() {
    return {
      isProcessing: false,
      processing_text: 'Saving Data ... ',
      user: null,
      perPage: 10,
      currentPage: 1,
      editing_mode: false,
      mechanic_records: [],
      form: {
        name: '',
        workshop_contact: '',
        workshop_address: '',
        expertise: '',
        comments: ''
      },
      // tax_fields: ['name', 'workshop_contact', 'workshop_address', 'expertise', 'comments', 'added', 'actions'],

      tax_fields: [
        {
          name: "name",
          title: 'Name',
          sortField: "name",
          titleClass: "center aligned",
          dataClass: "center aligned",
          width: "5%"
        },
        {
          name: "workshop_contact",
          title: 'Workshop Contact',
          sortField: "workshop_contact",
          titleClass: "center aligned",
          dataClass: "center aligned",
          width: "5%"
        },
        {
          name: "workshop_address",
          title: 'Workshop Address',
          sortField: "workshop_address",
          titleClass: "center aligned",
          dataClass: "center aligned",
          width: "10%"
        },
        {
          name: "expertise",
          title: 'Expertise',
          sortField: "expertise",
          titleClass: "center aligned",
          dataClass: "center aligned",
          width: "10%"
        },
        {
          name: "comments",
          title: 'Comments',
          sortField: "comments",
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
        }
      ],
    }
  },

  mixins: [validationMixin],
  validations: {
    form: {
      name: {
        required
      },
      workshop_contact: {
        required
      },
      workshop_address: {
        required
      },
      expertise: {
        required
      },
      comments: {
        required
      }
    },
  },

  computed: {
    ...mapGetters(['currentUser']),
    rows() {
      return this.mechanic_records.length
    }
  },
  methods: {
    get_mechanic_records() {
      this.processing_text = 'Loading ... '
      this.isProcessing = true
      //Tax Records
      axios.get(
        apiUrl + '/mechanic', {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      }
      ).then(response => {
        {
          //parse json data
          this.mechanic_records = response.data
          this.isProcessing = false
        }
      })
    },

    save_mechanic_record() {

      this.$v.form.$touch();
      if (this.$v.form.$anyError == true) {
        return false;
      }

      this.processing_text = 'Saving Data ...'
      this.isProcessing = true

      axios.post(
        apiUrl + '/mechanic', this.form, {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      }
      ).then(response => {
        //parse json data
        this.get_mechanic_records()
        // this.reset_form()
        this.$refs.mechanicReset.click();
        this.$notify('success filled', 'Success!', response.data.message, { duration: 3000, permanent: false });
        this.isProcessing = false
      }).catch(error => {
        this.$notify('error filled', 'Error!', error.response.data.message, { duration: 3000, permanent: false });
        this.isProcessing = false
      })
    },
    edit_mechanic_record(item) {
      this.processing_text = 'Loading Data .. '
      this.isProcessing = true
      console.log(item);
      this.editing_mode = true
      axios.get(
        apiUrl + '/mechanic/' + item.id, {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      }
      ).then(response => {
        //parse json data
        this.form = response.data
        this.isProcessing = false
        // this.reset_form()
      })
    },
    update_mechanic_record(id) {

      this.processing_text = 'Updating Data ...'
      this.isProcessing = true

      axios.put(
        apiUrl + '/mechanic/' + id, this.form, {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      }
      ).then(response => {
        //parse json data
        this.get_mechanic_records()
        this.editing_mode = false
        // this.reset_form()
        this.$refs.mechanicReset.click();
        this.$notify('success filled', 'Success!', response.data.message, { duration: 3000, permanent: false });
        this.isProcessing = false
      }).catch(error => {
        this.$notify('error filled', 'Error!', error.response.data.message, { duration: 3000, permanent: false });
        this.isProcessing = false
      })
    },

    delete_mechanic_record(item) {

      this.processing_text = 'Deleting Data ...'
      this.isProcessing = true

      axios.delete(
        apiUrl + '/mechanic/' + item.id, {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      }
      ).then(response => {

        this.get_mechanic_records()
        this.$notify('success filled', 'Success!', response.data.message, { duration: 3000, permanent: false });
        this.isProcessing = false
      }).catch(error => {
        this.$notify('error filled', 'Error!', error.response.data.message, { duration: 3000, permanent: false });
        this.isProcessing = false
      })
    },

    cancel_update_mechanic_record() {
      this.editing_mode = false
      this.reset_form()
    },
    reset_form() {
      this.form = {
        name: '',
        workshop_contact: '',
        workshop_address: '',
        expertise: '',
      }
    },
    resetForm() {
      this.cancel_update_mechanic_record(); // Assuming you have a form ref named 'form'
    }
  },

  mounted() {
    if (localStorage.getItem('token') !== null) {
      this.$store.commit('setUser', JSON.parse(localStorage.getItem('user')));
    } else {
      this.$router.push('/user/login');
    }
    this.get_mechanic_records()
  },
  watch: {
    currentUser() {
      this.user = this.currentUser
    }
  }
}
</script>
