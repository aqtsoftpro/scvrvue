<template>
  <div>
      <b-row>
          <b-colxx xxs="12">
              <h1>{{ user.name }}</h1>

              <div class="separator mb-5"></div>
          </b-colxx>
      </b-row>
      <b-row>
          <b-colxx xxs="12" xl="12" class="col-left">
            <b-row>
              <b-colxx xxs="3" xl="3" >
                <b-card class="mb-4" no-body>
                  <b-card-body>
                    <!-- image -->
                        <b-img v-if="imageUrl == null "
                          :src="user.image"
                          alt="Image"
                          fluid
                          rounded
                        ></b-img>

                        <b-img v-else
                          :src="imageUrl"
                          alt="Image"
                          fluid
                          rounded
                        ></b-img>

                        

                  </b-card-body>
                </b-card>
                <b-card class="mb-4 p-4" no-body>
                  <b-form class="av-tooltip tooltip-label-right">
                      <b-form-group label="Uploade profile image">
                          <!-- <b-form-input style="display:none" type="text" v-model.trim="$v.form.profile_image.$model" :state="!$v.form.profile_image.$error" />                                 -->
                          <b-form-file
                              v-model.trim="$v.form.profile_image.$model"
                              drop-placeholder="Drop file here..."
                              accept="image/*"
                              @change="previewImage"
                          >
                          </b-form-file>
                          <b-form-invalid-feedback v-if="$v.form.profile_image.$error"> Picture is required!</b-form-invalid-feedback>
                      </b-form-group>
                  </b-form>
                  <div v-if="isProcessing">
                    <b-spinner variant="primary"></b-spinner>
                    <span class="text-primary">{{ processing_text }}</span>
                  </div>
                  <b-button  @click.stop="updateImage"  variant="primary" class="mt-4 mb-4">Upload Image</b-button>
                </b-card>
              </b-colxx>
              <b-colxx xxs="9" xl="9" >
                <b-card class="mb-4" no-body>
                  <b-tabs card no-fade>
                      <b-tab title="Details" active>
                          <b-row>
                              <b-colxx sm="12">
                                  <table class="table">
                                    <tbody>
                                      <tr>
                                        <th>Name</th>
                                        <td>{{ user.name }}</td>
                                      </tr>
                                      <tr>
                                        <th>Email</th>
                                        <td>{{ user.email }}</td>
                                      </tr>
                                      <tr>
                                        <th>Role</th>
                                        <td>{{ user.role_name }}</td>
                                      </tr>
                                    </tbody>

                                  </table>
                              </b-colxx>
                          </b-row>
                      </b-tab>
                  </b-tabs>
                </b-card>
              </b-colxx>
            </b-row>
          </b-colxx>
      </b-row>
  </div>
  </template>

  <script>
import {
    mapActions
} from "vuex";

import {
  validationMixin
} from "vuelidate";
const {
  required
} = require("vuelidate/lib/validators");
  import axios from 'axios'
  import {apiUrl} from '../../constants/config.js'

  export default {
      components: {

      },
      data() {
          return {
              isLoad: false,
              vehicle: [],

              form: {
                profile_image: null,
              },
              processing_text: '',
              isProcessing: false,
              imageUrl: null,
          }
      },


      mixins: [validationMixin],
      validations: {
        form: {
            profile_image: {
              required
            },
        }
      },


      methods: {

        ...mapActions(["authGet"]),

        updateImage(){
          this.$v.form.$touch();
          if (this.$v.form.$anyError == true) {
            return false;
          }
          this.processing_text = 'Saving User Data ...'
          this.isProcessing = true
          axios.post(
            apiUrl + '/edit-pic',this.form,{
              headers:{
                'content-type': 'multipart/form-data',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
              }
            }
          ).then(response => {
            this.authGet()
            this.$notify('success filled', 'Success!', 'You have successfully updated your image',{ duration: 3000, permanent: false });
            this.isProcessing = false;
            window.setTimeout(() => {
              window.location.reload();
            }, 3000);
          }).catch(error => {
            this.$notify('error filled', 'Error!', error.response.data.message,{ duration: 3000, permanent: false });
          })
        },

        previewImage(event) {
          const file = event.target.files[0];
          if (file && file.type.startsWith('image/')) {
            // Preview the image
            this.file = file;
            this.imageUrl = URL.createObjectURL(file);
          }
        },

      },
      computed: {
        user(){
          return JSON.parse(localStorage.getItem('user'))
        }
      },
      mounted() {
       console.log(this.user)
      }
  }
  </script>
