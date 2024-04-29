<template>
    <div>
        <b-row>
            <b-colxx xxs="12">
                <h1>   {{ van_return.customer }}</h1>
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
                                          <td>{{ van_return.vehicle }}</td>
                                        </tr>
                                        <tr>
                                          <th>Vehicle Make</th>
                                          <td>{{ van_return.van_out.vehicle.make }}</td>
                                        </tr>
                                        <tr>
                                          <th>Vehicle Model</th>
                                          <td>{{ van_return.van_out.vehicle.model }}</td>
                                        </tr>
                                        <tr>
                                          <th>Location</th>
                                          <td>{{ van_return.location }}</td>
                                        </tr>
                                        <tr>
                                          <th>Mileage</th>
                                          <td>{{ van_return.van_out.vehicle.mileage }}</td>
                                        </tr>
                                        <tr>
                                          <th>Vehicle Out Date</th>
                                          <td>{{ van_return.van_out.van_out_date }}</td>
                                        </tr>
                                        <tr>
                                          <th>Vehicle Due Date</th>
                                          <td>{{ van_return.van_out.due_return }}</td>
                                        </tr>
                                        <tr>
                                          <th>Vehicle Condition</th>
                                          <td>{{ van_return.condition }}</td>
                                        </tr>

                                        <tr>
                                          <th>Vehicle Return Date</th>
                                          <td>{{ van_return.van_out.vehicle_return_date }}</td>
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
                                      <b-button size="sm" variant="secondary" @click="viewVid(van_return.video)" >
                                        View Video
                                      </b-button>
                                    </div>
                                  </b-card>
                                </b-colxx>
                              <!-- <span>click here to downlaod video </span> -->
                              <!-- <b-a :href="van_return.video" target="_blank" rel="noopener noreferrer"> Click Me</b-a> -->
                            </b-row>
                            <b-row>
                              <b-colxx v-for="item in van_return.galleries" xxs="12" xl="6" class="mb-3" >
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
                        <b-tab v-if="van_return.swaps.length > 0" v-for="(swap, index) in van_return.swaps" :title="'Swaped Detail: '+ (index + 1)">
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
                                          <tr>
                                            <th>Vehicle Return Date</th>
                                            <td >{{ swap.vehicle_return_date }}</td>
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
                                      <b-button size="sm" variant="secondary" @click="viewVid(swap.video)" >
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
                van_return: [],
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
                  this.van_return = response.data
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
  