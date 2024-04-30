<template>
    <div>
        <b-row>
            <b-colxx xxs="12">
              <div class="d-flex">
                <router-link :to="{ path: '/app/bookings' }" class="btn btn-primary mb-4"
                            variant="primary">Back to Booking</router-link>
                            &nbsp; &nbsp;    
                <h1 class="ms-2">   {{ vanout.customer }}</h1>
              </div>
                <!-- <h4>Booking ID: {{  vanout.booking_id }}</h4> -->
                <div class="separator mb-5"></div>
            </b-colxx>
        </b-row>
        <b-row>
            <b-colxx xxs="12" xl="12" class="col-left">
              <b-row>
                <b-colxx xxs="12" xl="12" >
                  <b-card class="mb-4" no-body>
                    <b-tabs card no-fade>
                        <b-tab title="Booking Main Detail" active>
                            <b-row>
                                <b-colxx sm="12">
                                    <table class="table">
                                      <tbody>
                                        <tr>
                                          <th>Booking Status</th>
                                          <td>{{ vanout.status == 1 ? 'Active': 'Inactive' }}</td>
                                        </tr>
                                        <tr>
                                          <th>Vehicle Registration</th>
                                          <td>{{ vanout.reg_number }}</td>
                                        </tr>
                                        <tr>
                                          <th>Vehicle Make</th>
                                          <td>{{ vanout.vehicle }}</td>
                                        </tr>
                                        <tr>
                                          <th>Vehicle Model</th>
                                          <td>{{ vanout.vehicle_model }}</td>
                                        </tr>
                                        <tr>
                                          <th>Location</th>
                                          <td>{{ vanout.location }}</td>
                                        </tr>
                                        <tr>
                                          <th>Mileage</th>
                                          <td>{{ vanout.mileage }}</td>
                                        </tr>
                                        <tr>
                                          <th>Vehicle Out Date</th>
                                          <td>{{ vanout.van_out_date }}</td>
                                        </tr>
                                        <tr>
                                          <th>Vehicle Due Date</th>
                                          <td>{{ vanout.return_date }}</td>
                                        </tr>
                                        <tr>
                                          <th>Vehicle Condition</th>
                                          <td>{{ vanout.condition }}</td>
                                        </tr>

                                        <tr v-if="vanout.vehicle_return_date">
                                          <th>Vehicle Return Date</th>
                                          <td>{{ vanout.vehicle_return_date }}</td>
                                        </tr>
                                      </tbody>
                                    </table>
                                </b-colxx>
                            </b-row>
                            <b-row class="mb-2">
                                <b-colxx xxs="12">
                                  <b-card no-body class="p-3">
                                    <div class="d-flex justify-content-between mb-3">
                                      <h4 class="p-3">
                                        Vehicle condition detail images
                                      </h4>
                                      <b-button size="sm" variant="secondary" @click="viewVid(vanout.video)" >
                                        View Video
                                      </b-button>
                                    </div>
                                  </b-card>
                                </b-colxx>
                              <!-- <span>click here to downlaod video </span> -->
                              <!-- <b-a :href="vanout.video" target="_blank" rel="noopener noreferrer"> Click Me</b-a> -->
                            </b-row>
                            <b-row>
                              <b-colxx v-for="item in vanout.galleries" xxs="12" xl="6" class="mb-3" >
                                <b-card class="mb-4 h-100" no-body>
                                  <b-card-body>
                                      <b-img
                                        :src="item.image"
                                        alt="Image"
                                        fluid
                                        rounded
                                        width="800"
                                        height="750"
                                      ></b-img>
                                  </b-card-body>
                                </b-card>
                              </b-colxx>
                            </b-row>
                        </b-tab>
                        <b-tab v-if="vanout.swaps.length > 0" v-for="(swap, index) in vanout.swaps" :title="'Swaped Detail: '+ (index + 1)">
                            <b-row>
                                <b-colxx sm="12">
                                  <table class="table">
                                    <tbody>
                                          <tr>
                                            <th>Booking Status</th>
                                            <td>{{ swap.status == 1 ? 'Active': 'Inactive' }}</td>
                                          </tr>
                                          <tr>
                                            <th>Vehicle Registration</th>
                                            <td>{{ swap.reg_number }}</td>
                                          </tr>
                                          <tr>
                                            <th>Vehicle Make</th>
                                            <td>{{ swap.vehicle }}</td>
                                          </tr>
                                          <tr>
                                            <th>Vehicle Model</th>
                                            <td>{{ swap.vehicle_model }}</td>
                                          </tr>
                                          <tr>
                                            <th>Location</th>
                                            <td>{{ swap.location }}</td>
                                          </tr>
                                          <tr>
                                            <th>Mileage</th>
                                            <td>{{ swap.mileage }}</td>
                                          </tr>
                                          <tr>
                                            <th>Vehicle Out Date</th>
                                            <td>{{ swap.van_out_date }}</td>
                                          </tr>
                                          <tr>
                                            <th>Vehicle Due Date</th>
                                            <td>{{ swap.return_date }}</td>
                                          </tr>
                                          <tr>
                                            <th>Vehicle Condition</th>
                                            <td>{{ swap.condition }}</td>
                                          </tr>
                                          <tr v-if="swap.vehicle_return_date" >
                                            <th>Vehicle Return Date</th>
                                            <td >{{ swap.vehicle_return_date }}</td>
                                          </tr>
                                    </tbody>
                                  </table>
                                </b-colxx>
                            </b-row>
                            <b-row v-if="swap.images.length > 0" class="mb-2">
                                <b-colxx xxs="12">
                                  <b-card no-body class="p-3">
                                    <div class="d-flex justify-content-between mb-3">
                                      <h4 class="p-3">
                                        Vehicle condition detail images
                                      </h4>
                                      <b-button v-if="swap.video" size="sm" variant="secondary" @click="viewVid(swap.video)" >
                                        View Video
                                      </b-button>
                                    </div>
                                  </b-card>
                                </b-colxx>
                            </b-row>
                            <b-row>
                              <b-colxx v-for="item in swap.images" xxs="12" xl="6" class="mb-3" >
                                <b-card class="mb-4 h-100" no-body>
                                  <b-card-body>
                                      <b-img
                                        :src="item.image"
                                        alt="Image"
                                        fluid
                                        rounded
                                        width="800"
                                        height="750"
                                      ></b-img>
                                  </b-card-body>
                                </b-card>
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
    import {apiUrl} from '../../../constants/config.js'
  
    export default {
        components: {
  
        },
        data() {
            return {
                isLoad: false,
                vanout: [],
            }
        },
        methods: {
          get_vanout_detail() {
              const id = this.$route.params.id
              axios.get(apiUrl + '/vanout/' + id, {
                  headers: {
                      'Authorization': 'Bearer ' + localStorage.getItem('token')
                  }
              }).then(response => {
                  this.vanout = response.data
              })
          },

          viewVid(url) {
            window.open(url, '_blank');
            // return this.$router.push("/app/profile")
            // const routeData = this.$router.resolve({name: 'routeName', query: {data: "someData"}});
            // window.open(routeData.href, '_blank');
          },
  
          formatDate(dateString) {
            const date = new Date(dateString);
            const options = { year: 'numeric', month: 'short', day: '2-digit' };
            return date.toLocaleDateString('en-GB', options);
          },
        },
        mounted() {
            this.get_vanout_detail()
        },
  
        computed: {
          formattedMaintenance() {
            // Loop through maintenance array and format the date
            return this.vanout.map(item => {
              // Convert date string to a Date object
              const date = new Date(item.date);
              // Format the date as "DD MMM YYYY"
              const formattedDate = date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
              // Update the item with the formatted date
              return {
                ...item,
                date: formattedDate
              };
            });
          }
        }
    }
    </script>
  