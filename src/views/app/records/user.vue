<template>
  <div>
  <b-form>
  <b-row>
    <b-colxx xxs="12" xs="3" lg="3" class="mb-3">
      <img :src="form.photo" class="img-fluid" />
    </b-colxx>
    <b-colxx xxs="12" xs="3" lg="3" class="mb-3">
      <b-form-input v-model="form.name" :placeholder="$t('forms.user.name')"></b-form-input>
    </b-colxx>
    <b-colxx xxs="12" xs="3" lg="3" class="mb-3">
      <b-form-input v-model="form.email" :placeholder="$t('forms.user.email')"></b-form-input>
    </b-colxx>
    <b-colxx xxs="12" xs="3" lg="3" class="mb-3">
      <b-form-input v-model="form.password" :placeholder="$t('forms.user.password')"></b-form-input>
    </b-colxx>
    <b-colxx xxs="12" xs="3" lg="3" class="mb-3">
        <v-select v-model="form.role_id"
          :reduce="role => role.id"
          label="name"
          aria-placeholder="Select Role"
          :options="role_options"
        ></v-select>
    </b-colxx>
  </b-row>
  <b-button v-if="!editing_mode"  @click.stop="save_user_record"  variant="primary" class="mt-4 mb-4">{{ 'Save' }}</b-button>
  <div v-else>
    <b-button  @click.stop="update_user_record(user_id)"  variant="secondary" class="mt-4 mb-4">{{ ' Update' }}</b-button>
    <b-button  @click.stop="cancel_update_user_record()"  variant="info" class="mt-4 mb-4"><i class="simple-icon-close"></i></b-button>
  </div>
</b-form>

<b-table :items="user_records" :fields="tax_fields">
  <template  #cell(role_name)="data">
    <div class="badge badge-light">{{data.value}}</div>
  </template>
  <template  #cell(actions)="data">
    <!-- <b-button  @click.stop="view_vanout(data.item)"  variant="info"  size="xs" ><i class="simple-icon-eye"></i></b-button> -->
    <b-button v-if="user.role_id == 1"  @click.stop="edit_user_record(data.item)"  variant="grey" size="xs" ><i class="simple-icon-pencil"></i></b-button>
    <b-button v-if="user.rold_id == 1"  @click.stop="delete_user_record(data.item)"  variant="danger" size="xs" ><i class="simple-icon-trash"></i></b-button>
  </template>
</b-table>
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
      user: null,
      editing_mode: false,
      user_records: [],
      role_options: [],
      role_id: null,
      user_id: null,
      form: {
        photo: '/assets/img/profile-pic-l.jpg',
        name: null,
        email: null,
        role_id: 'Select Role',
        password: null,
      },
      tax_fields: ['name', 'email', 'role_name', 'actions']
    }
  },

  computed: mapGetters(['currentUser']),
  methods: {
    get_user_records() {
      //Tax Records
      axios.get(
        apiUrl + '/users',{
        headers:{
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
        }
      ).then(response => {
        {
          //parse json data
          this.user_records = response.data
        }
      })
    },

    save_user_record(){
      axios.post(
        apiUrl + '/users',this.form,{
          headers:{
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          }
        }
      ).then(response => {
        //parse json data
        this.get_user_records()
        this.reset_form()
      })
    },
    edit_user_record(item){
      this.editing_mode = true
      axios.get(
        apiUrl + '/users/'+item.id,{
          headers:{
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          }
        }
      ).then(response => {
        //parse json data
        this.form.name = response.data.name
        this.form.email = response.data.email
        this.form.role_id = response.data.role_id
        this.user_id = response.data.id
        // this.reset_form()
      })
    },
    update_user_record(id){
      axios.put(
        apiUrl + '/users/'+id,this.form,{
          headers:{
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          }
        }
      ).then(response => {
        //parse json data
        this.get_user_records()
        this.editing_mode = false
        this.reset_form()
      })
    },

    delete_user_record(item){
      axios.delete(
        apiUrl + '/users/'+item.id,{
          headers:{
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          }
        }
      ).then(response => {
        //parse json data
        this.get_user_records()
      })
    },

    cancel_update_user_record(){
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
    this.get_user_records()
  },
  watch: {
    currentUser() {
      this.user = this.currentUser
    }
  }
}
</script>

