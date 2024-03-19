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

                        <b-img
                          :src="user.img"
                          alt="Image"
                          fluid
                          rounded
                        ></b-img>

                  </b-card-body>
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
  import axios from 'axios'
  import {apiUrl} from '../../constants/config.js'

  export default {
      components: {

      },
      data() {
          return {
              isLoad: false,
              vehicle: []
          }
      },
      methods: {
      //   get_vehicle_data() {
      //       const van_id = this.$route.params.id
      //       axios.get(apiUrl + '/vehicle/' + van_id, {
      //           headers: {
      //               'Authorization': 'Bearer ' + localStorage.getItem('token')
      //           }
      //       }).then(response => {
      //           this.vehicle = response.data
      //       })
      //   }
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
