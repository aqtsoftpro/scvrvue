<template>
  <div>
  <b-form>
  <b-row>
    <b-colxx xxs="12" xs="3" lg="3" class="mb-3">
      <label class="form-group has-top-label">
      <b-form-input v-model="form.name" ></b-form-input>
      <span>{{ $t('forms.user.name') }}</span>
    </label>
    </b-colxx>
    <b-colxx xxs="12" xs="3" lg="3" class="mb-3">
      <label class="form-group has-top-label">
      <b-form-input v-model="form.email" ></b-form-input>
      <span>{{ $t('forms.user.email') }}</span>
      </label>
    </b-colxx>
    <b-colxx xxs="12" xs="3" lg="3" class="mb-3">
      <label class="form-group has-top-label">
        <v-select v-model="form.role_id"
          :reduce="role => role.id"
          label="name"
          :options="role_options"
        ></v-select>
        <span>{{ $t('forms.user.role') }}</span>
      </label>
    </b-colxx>
    <b-colxx xxs="12" xs="3" lg="3" class="mb-3">
      <label class="form-group has-top-label">
        <b-form-input :type="passwordVisibility" ref="passwordField" v-if="user && user.role_id == 1" v-model="form.password" ></b-form-input>
        <span>{{ $t('forms.user.password') }}</span>
      </label>
      <b-button  @click.stop="show_hide_password()"  variant="light" class="mt-4 mb-4">{{ ' Show/Hide Password' }}</b-button>
    </b-colxx>
  </b-row>
  <b-button v-if="!editing_mode"  @click.stop="save_user_record"  variant="primary" class="mt-4 mb-4">{{ 'Save' }}</b-button>
  <div v-else>
    <b-button  @click.stop="update_user_record(user_id)"  variant="info" class="mt-4 mb-4">{{ ' Update' }}</b-button>
    <b-button  @click.stop="cancel_update_user_record()"  variant="danger" class="mt-4 mb-4"><i class="simple-icon-close"></i></b-button>
  </div>
</b-form>
<datatable title="User Records" :fields="fields" :data="user_records" :edit="edit_user_record" :del="delete_user_record" />
<!-- <b-table id="user-table" :items="user_records" :fields="tax_fields" :per-page="perPage" :current-page="currentPage">
  <template  #cell(role_name)="data">
    <div class="badge badge-light">{{data.value}}</div>
  </template>
  <template  #cell(actions)="data">
    <b-button  @click.stop="edit_user_record(data.item)"  variant="grey" size="xs" ><i class="simple-icon-pencil"></i></b-button>
    <b-button v-if="user.role_id == 1"  @click.stop="delete_user_record(data.item)"  variant="grey" size="xs" ><i class="simple-icon-trash"></i></b-button>
  </template>
</b-table>
<p class="mt-3">Current Page: {{ currentPage }}</p>
<b-pagination
      align="center"
      size="md"
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      aria-controls="user-table"
></b-pagination> -->
</div>
</template>
<script>

import axios from 'axios'
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import Datepicker from "vuejs-datepicker";
import {apiUrl} from "../../../constants/config.js";
import { mapGetters } from 'vuex';
import datatable from './datatable.vue';

export default {
  components: {
    'v-select': vSelect,
    Datepicker,
    datatable
  },
  data() {
    return {
      passwordVisibility: 'password',
      user: null,
      perPage: 10,
      currentPage: 1,
      editing_mode: false,
      user_records: [],
      role_options: [],
      role_id: null,
      user_id: null,
      form: {
        name: null,
        email: null,
        role_id: '',
        password: null,
      },
      fields: [
      {
          name: "name",
          title: 'Name',
          sortField: "name",
          titleClass: "center aligned",
          dataClass: "center aligned",
          width: "5%"
        },
        {
          name: "email",
          title: 'E-Mail',
          sortField: "email",
          titleClass: "center aligned",
          dataClass: "center aligned",
          width: "5%"
        },
        {
          name: "role_name",
          title: 'Role Name',
          sortField: "role_name",
          titleClass: "center aligned",
          dataClass: "center aligned",
          width: "5%"
        },
        {
        name: "__slot:actions",
          title: "Actions",
          titleClass: "center aligned text-right",
          dataClass: "center aligned text-right",
          width: "15%"
        }]
    }
  },

  computed: {
    ...mapGetters(['currentUser', 'roleOptions']),
    rows(){
      return  this.user_records.length
    }
  },
  methods: {
    show_hide_password(){
      if(this.passwordVisibility == 'password'){
        this.passwordVisibility = 'text';
      } else {
        this.passwordVisibility = 'password';
      }
    },
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

      if(this.form.name == null){
        this.$notify('error filled', 'Please fill the form!', 'Name is required!',{ duration: 3000, permanent: false });
      }else if(this.form.email == null){
        this.$notify('error filled', 'Please fill the form!', 'Email is required!',{ duration: 3000, permanent: false });
      }else if(this.form.role_id == 'Select Role'){
        this.$notify('error filled', 'Please fill the form!', 'Role is required!',{ duration: 3000, permanent: false });
      }else if (this.form.password == null){
        this.$notify('error filled', 'Please fill the form!', 'Password is required!',{ duration: 3000, permanent: false });
      } else {
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
          this.$notify('success filled', 'Suceess!', 'User has been created!',{ duration: 3000, permanent: false });
        })
      }

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
        this.$notify('success filled', 'Suceess!', 'User has been updated!',{ duration: 3000, permanent: false });
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
        this.$notify('success filled', 'Suceess!', 'User has been deleted!',{ duration: 3000, permanent: false });
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
    // get_role_options() {
    //     axios.get(apiUrl + '/role',{
    //       headers: {
    //         'Authorization': 'Bearer ' + localStorage.getItem('token')
    //       }
    //     })
    //     .then(response => {
    //       this.role_options = response.data;
    //     });
    // },
    // update_role_options(){
    //   console.log('emit-received');
    //   this.get_role_options()
    // }

  },

  mounted() {
    //this.get_role_options()
    this.$store.dispatch("get_role_options");

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
    },
    roleOptions(val){
      this.role_options = val
      console.log('val', this.roleOptions)
    }
  }
}
</script>

