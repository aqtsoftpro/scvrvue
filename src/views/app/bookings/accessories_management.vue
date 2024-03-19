<template>
  <div>
    <b-row>
      <b-colxx xxs="12">
          <b-card class="mb-4" >
            <b-form>
              <b-colxx xxs="12" xs="12" lg="12" class="mb-3">
              <h3>Add Accessory</h3>
            </b-colxx>
              <b-colxx xxs="12" xs="12" lg="12" class="mb-3">
                <label class="form-group has-top-label">
                  <b-form-input v-model="new_accessory_name"></b-form-input>
                  <span>Accessory Name</span>
                </label>
              </b-colxx>
              <b-colxx xxs="12" xs="12" lg="12" class="mb-3">

                <button v-if="editing_mode" @click="update_accessory(selected_accessory)" type="button" class="btn btn-primary">Update</button>
                <button v-else @click="add_new_accessory" type="button" class="btn btn-primary">Add</button>
                <button v-on:click="cancel()" type="button" class="btn btn-secondary">Cancel</button>
              </b-colxx>
              <div v-if="isProcessing">
                  <b-spinner variant="primary" ></b-spinner>
                  <span class="text-primary">{{ processing_text }}</span>
              </div>
            </b-form>
            <datatable
              :title="$t('forms.vanout.accessories')"
              :data="accessories_list"
              :fields="fields"
              :edit="edit"
              :del="delete_accessory"
            />
          </b-card>

      </b-colxx>
    </b-row>
  </div>
</template>
<script>
import Vue from 'vue'
import { apiUrl } from '../../../constants/config';
import axios from 'axios'
import datatable from './datatable2'
import { utils, writeFileXLSX } from 'xlsx';
export default ({
  props: ["accessories", "refresh"],
  components: {
    'datatable': datatable
  },
  data() {
    return {
      selected_accessory: '',
      editing_mode: false,
      accessories_list: [],
      new_accessory_name: '',
      isProcessing: false,
      processing_text: 'Loading data please wait ...',
      fields: [
        {
          name: "name",
          sortField: "name",
          title: "Name",
          titleClass: "",
          dataClass: "muted-text",
          width: "20%"
        },
        {
          name: "__slot:actions",
          title: "",
          titleClass: "center aligned text-right",
          dataClass: "center aligned text-right",
          width: "5%"
        }
      ]
    }
  },

  methods: {
    cancel(){
      // $refs.addAcessoryModal.hide()
      this.editing_mode = false
      this.new_accessory_name = ''
    },
    edit(e){
      this.editing_mode = true;
      this.new_accessory_name = e.name;
      this.selected_accessory = e;

    },
    add_new_accessory(){
      if(this.new_accessory_name != ''){
        this.processing_text = 'Adding New Accessory...'
        this.isProcessing = true
        axios.post(apiUrl + '/accessory', {name:this.new_accessory_name}, {
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          }
        }).then(response => {
            this.$notify('success filled', 'Success!', response.data.message,{ duration: 3000, permanent: false });
            this.new_accessory_name = ''
            this.isProcessing = false
            this.refresh()
        }).catch(error => {
          console.log(error);
          this.$notify('error filled', 'Error!', error.response.data.message,{ duration: 3000, permanent: false });
        })
      }
    },

      update_accessory(record){
      if(this.new_accessory_name != ''){
        this.processing_text = 'Updating Mode...'
        this.isProcessing = true
        axios.put(apiUrl + '/accessory/' + record.id, {name:this.new_accessory_name}, {
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          }
        }).then(response => {
            this.$notify('success filled', 'Success!', 'Accessory Updated successfully',{ duration: 3000, permanent: false });
            this.new_accessory_name = ''
            this.isProcessing = false
            this.refresh()
            this.editing_mode = false
        }).catch(error => {
          console.log(error)
          this.editing_mode = false
          this.$notify('error filled', 'Error!', "Error updating accessory",{ duration: 3000, permanent: false });
        })
      }
    },

    delete_accessory(record){
        this.processing_text = 'Updating Accessory...'
        this.isProcessing = true
        axios.delete(apiUrl + '/accessory/' + record.id, {
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          }
        }).then(response => {
            this.$notify('success filled', 'Success!', 'Accessory Deleted successfully',{ duration: 3000, permanent: false });
            this.new_accessory_name = ''
            this.isProcessing = false
            this.refresh()
        }).catch(error => {
          console.log(error)
          this.editing_mode = false
          this.$notify('error filled', 'Error!', "Error deleting accessory",{ duration: 3000, permanent: false });
        })
      }


  },
  watch:{
    accessories(newValue){
      this.accessories_list = newValue
    }
  },
  mounted(){
    this.accessories_list = this.accessories
  }
})
</script>


