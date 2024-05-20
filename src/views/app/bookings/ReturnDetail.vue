<template>
    <div>
        <b-row>
            <b-colxx xxs="12">
              <div class="d-flex justify-content-between">
                  <h1>{{ van_return.customer }}</h1>
                  <router-link :to="{ path: '/app/bookings' }" class="btn btn-primary mb-4"
                  variant="primary">Back to Bookings</router-link>
                </div>
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
                                          <td>{{ van_return.status == 1 ? 'Active': 'Inactive' }}</td>
                                        </tr>
                                        <tr>
                                          <th>Vehicle Registration</th>
                                          <td>{{ van_return.vehicle_name }}</td>
                                        </tr>
                                        <tr>
                                          <th >Vehicle Make</th>
                                          <td>{{ optionCheck(vehicle && vehicle.make) }}</td>
                                        </tr>
                                        <tr>
                                          <th>Vehicle Model</th>
                                          <td>{{ optionCheck(vehicle && vehicle.model) }}</td>
                                        </tr>
                                        <tr>
                                          <th>Location</th>
                                          <td>{{ van_return.location }}</td>
                                        </tr>

                                        <tr>
                                          <th>Rental Amount</th>
                                          <td>{{ van_return.rental_amount }}</td>
                                        </tr>

                                        <tr>
                                          <th>Fuel Tank</th>
                                          <td>{{ van_return.fuel_tank }}</td>
                                        </tr>

                                        <!-- <tr v-if="booking">
                                            <th>Payment Mode</th>
                                            <td>{{ booking.payment_mode }}</td>
                                          </tr>
                                          <tr v-if="booking">
                                            <th>Bond / Deposit</th>
                                            <td>{{ booking.bond_deposit }}</td>
                                          </tr> -->

                                          <tr v-if="van_return">
                                            <th>Bond Return Amount</th>
                                            <td>{{ van_return.bond_return_amount }}</td>
                                          </tr>

                                          <tr v-if="van_return">
                                            <th>Return amount comment</th>
                                            <td>{{ van_return.bond_comment }}</td>
                                          </tr>

                                          <tr v-if="booking && booking.accessories && booking.accessories.length > 0">
                                            <th>Vehicle Accessories:</th>
                                            <td>
                                              <b-badge pill v-for="accessory in booking.accessories " class="mx-1" >
                                                {{ accessory.name }}
                                              </b-badge>
                                            </td>
                                          </tr>


                                        <tr>
                                          <th>Mileage</th>
                                          <td>{{ optionCheck(vehicle && vehicle.mileage) }}</td>
                                        </tr>
                                        <tr>
                                          <th>Vehicle Out Date</th>
                                          <td>{{ optionCheck(booking && booking.van_out_date) }}</td>
                                        </tr>
                                        <tr>
                                          <th>Vehicle Due Date</th>
                                          <td>{{ optionCheck(booking && booking.due_return) }}</td>
                                        </tr>
                                        <tr>
                                          <th>Vehicle Condition</th>
                                          <td>{{ optionCheck(booking && booking.condition) }}</td>
                                        </tr>

                                        <tr v-if="booking && booking.vehicle_return_date" >
                                          <th>Vehicle Return Date</th>
                                          <td>{{ booking.vehicle_return_date }}</td>
                                        </tr>
                                      </tbody>
                                    </table>
                                </b-colxx>
                            </b-row>
                            <b-row class="mb-2">
                              <b-colxx v-if="van_return && van_return.video" xxs="12" xl="4">
                                <b-card class="mb-4">
                                  <h3>video</h3>
                                  <hr>
                                  <b-embed type="video" aspect="4by3" controls poster="poster.png">
                                    <source :src="van_return.video" type="video/webm">
                                  </b-embed>
                                </b-card>
                              </b-colxx>
                              <b-colxx v-if="main_galleries && main_galleries.length > 0 " xxs="12" xl="8">
                                <b-row>
                                  <b-colxx v-for="item in main_galleries" xxs="12" xl="6" >
                                    <b-card class="mb-4" no-body>
                                      <b-card-body>
                                            <b-img
                                              :src="item.image"
                                              alt="Image"
                                              fluid
                                              rounded
                                              height="200"
                                            ></b-img>
                                      </b-card-body>
                                    </b-card>
                                  </b-colxx>
                                </b-row>
                              </b-colxx>
                            </b-row>
                        </b-tab>
                        <b-tab v-if="vanswaps && vanswaps.length > 0" v-for="(swap, index) in van_return.swaps" :title="'Swaped Detail: '+ (index + 1)">
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
                                          <tr v-if="swap">
                                            <th>Payment Mode</th>
                                            <td>{{ swap.payment_mode }}</td>
                                          </tr>
                                          <tr v-if="swap">
                                            <th>Bond / Deposit</th>
                                            <td>{{ swap.bond_deposit }}</td>
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
                                            <td>{{ optionCheck(swap && swap.condition) }}</td>
                                          </tr>
                                          <tr v-if="swap.vehicle_return_date" >
                                            <th>Vehicle Return Date</th>
                                            <td >{{ swap.vehicle_return_date }}</td>
                                          </tr>
                                    </tbody>
                                  </table>
                                </b-colxx>
                            </b-row>
                            <b-row class="mb-2">
                              <b-colxx  xxs="12" xl="4">
                                <b-card v-if="swap && swap.video" class="mb-4">
                                  <h3>video</h3>
                                  <hr>
                                  <b-embed type="video" aspect="4by3" controls poster="poster.png">
                                    <source :src="swap.video" type="video/webm">
                                  </b-embed>
                                </b-card>
                              </b-colxx>
                              <b-colxx v-if="swap && swap.images.length > 0 " xxs="12" xl="8">
                                <b-row>
                                  <b-colxx v-for="item in swap.images" xxs="12" xl="6" >
                                    <b-card class="mb-4" no-body>
                                      <b-card-body>
                                          <b-img
                                            :src="item.image"
                                            alt="Image"
                                            fluid
                                            rounded
                                            height="200"
                                          ></b-img>
                                      </b-card-body>
                                    </b-card>
                                  </b-colxx>
                                </b-row>
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
                van_return: [],
                vehicle: null,
                main_galleries: [],
                vanswaps: [],
                booking : null,
            }
        },
        methods: {
          get_van_return_detail() {
              const id = this.$route.params.id
              axios.get(apiUrl + '/van_return/' + id, {
                  headers: {
                      'Authorization': 'Bearer ' + localStorage.getItem('token')
                  }
              }).then(response => {
                  this.van_return = response.data;
                  this.vehicle = response.data.van_out.vehicle ?? null;
                  this.main_galleries = response.data.galleries ?? [];
                  this.vanswaps = response.data.swaps ?? []; 
                  this.booking = response.data.van_out ?? null
              })
          },

          optionCheck(value) {
            return value !== undefined && value !== null ? value : 'Not found';
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
            this.get_van_return_detail()
        },
  
        computed: {
          formattedMaintenance() {
            // Loop through maintenance array and format the date
            return this.van_return.map(item => {
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
  