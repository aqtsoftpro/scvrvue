<template>
  <div>
  <b-form>
  <b-row>
    <b-colxx xxs="12" xs="4" lg="4" class="mb-3">
        <!-- <b-form-input v-model="form.swap_with" :placeholder="$t('forms.vanout.swap_with')"></b-form-input> -->
        <label class="form-group has-top-label">
          <b-form-input v-model="form.name" ></b-form-input>
          <span>{{ $t('forms.role.name') }}</span>
        </label>
    </b-colxx>
  </b-row>
  <b-button v-if="!editing_mode"  @click.stop="save_role"  variant="primary" class="mt-4 mb-4">{{ 'Save' }}</b-button>
  <div v-else>
    <b-button  @click.stop="update_role(form.id)"  variant="secondary" class="mt-4 mb-4">{{ ' Update' }}</b-button>
    <b-button  @click.stop="cancel_update_role()"  variant="info" class="mt-4 mb-4"><i class="simple-icon-close"></i></b-button>
  </div>
</b-form>

<datatable title="Roles" :fields="fields" :data="roles" :edit="edit_role" :del="delete_role" />
<!-- <b-table id="roles-table" :total-rows="rows" :per-page="perPage" :items="roles" :fields="tax_fields">
  <template  #cell(name)="data">

    {{ data.item.name }}
  </template>
  <template  #cell(actions)="data">
    <b-button  @click.stop="edit_role(data.item)"  variant="grey" size="xs" ><i class="simple-icon-pencil"  ></i></b-button>
    <b-button v-if="user.role_id == 1"  @click.stop="delete_role(data.item)"  variant="grey" size="xs" ><i class="simple-icon-trash"></i></b-button>
  </template>
</b-table>

<b-pagination
      align="center"
      size="md"
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      aria-controls="roles-table"
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
      searchColumn: ['id'],
      currentPage: 1,
      perPage: 10,
      user: null,
      editing_mode: false,
      roles: [],
      tax_type_options: [],
      form: {
        name: null
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
        name: "__slot:actions",
          title: "Actions",
          titleClass: "center aligned text-right",
          dataClass: "center aligned text-right",
          width: "15%"
        }]
    }
  },

  computed: {
    ...mapGetters(['currentUser']),
    rows() {
      return this.roles.length
    }
  },

  methods: {
    get_roles() {
      //Tax Records
      axios.get(
        apiUrl + '/role',{
          headers:{
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          }
        }
      ).then(response => {
        {
          //parse json data
          this.roles = response.data
        }
      })
    },
    save_role(){
      if(this.form.name == null){
        this.$notify('error filled', 'Please fill the form!', 'Role name is required!',{ duration: 3000, permanent: false });
      } else{
        axios.post(
          apiUrl + '/role',this.form,{
            headers:{
              'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
          }
        ).then(response => {
          //parse json data
          this.get_roles()
          this.reset_form()
          //update role options in user module
          this.$store.dispatch("get_role_options");
          this.$notify(
              'success filled',
              'Success!',
              'Role Created',
              { duration: 3000, permanent: false });
        })
      }
    },
    edit_role(item){
      this.editing_mode = true
      axios.get(
        apiUrl + '/role/'+item.id,{
          headers:{
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          }
        }
      ).then(response => {
        //parse json data
        this.form = response.data

        //this.reset_form()
      })
    },
    update_role(id){
      axios.put(
        apiUrl + '/role/'+id,this.form,{
          headers:{
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          }
        }
      ).then(response => {
        //parse json data
        this.get_roles()
        this.editing_mode = false
        this.reset_form()
        this.$store.dispatch("get_role_options");
        this.$notify(
            'success filled',
            'Success!',
            'Role Updated',
            { duration: 3000, permanent: false });
      })
    },

    delete_role(item){
      axios.delete(
        apiUrl + '/role/'+item.id,{
          headers:{
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          }
        }
      ).then(response => {
        //parse json data
        this.get_roles()
        this.$store.dispatch("get_role_options");
        this.$notify(
            'success filled',
            'Success!',
            'Role Deleted',
            { duration: 3000, permanent: false });

      })
    },

    cancel_update_role(){
      this.editing_mode = false
      this.reset_form()
    },
    reset_form(){
      this.form = {
        name: ''
      }
    }
  },

  mounted() {

    if(localStorage.getItem('token') !== null) {
      this.$store.commit('setUser', JSON.parse(localStorage.getItem('user')));
    } else{
      this.$router.push('/user/login');
    }
    this.get_roles()
  },

  watch: {
    currentUser(newValue){
      this.user = this.currentUser
    }
  }
}
</script>

