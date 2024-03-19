<template>
  <div>
      <b-row>
          <b-colxx xxs="12">
              <h1>   {{ vehicle.make }} - {{ vehicle.model }}</h1>

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
                          :src="vehicle.picture"
                          alt="Image"
                          fluid
                          rounded
                        ></b-img>

                  </b-card-body>

              </b-card>
              <router-link :to="{ path: '/app/van_management'}" class="btn btn-primary mt-2" variant="primary">Back to Vehicle Listing</router-link>
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
                                        <th>Registration / Plate Number</th>
                                        <td>{{ vehicle.reg_plate_number }}</td>
                                      </tr>
                                      <tr>
                                        <th>Status</th>
                                        <td>{{ vehicle.status }}</td>
                                      </tr>
                                      <tr>
                                        <th>Type</th>
                                        <td>{{ vehicle.type }}</td>
                                      </tr>
                                      <tr>
                                        <th>Make</th>
                                        <td>{{ vehicle.make }}</td>
                                      </tr>
                                      <tr>
                                        <th>Model</th>
                                        <td>{{ vehicle.model }}</td>
                                      </tr>
                                      <tr>
                                        <th>Mileage</th>
                                        <td>{{ vehicle.mileage }}</td>
                                      </tr>
                                      <tr>
                                        <th>Purchase Date</th>
                                        <td>{{ vehicle.purchase_date }}</td>
                                      </tr>
                                      <tr>
                                        <th>Purchase Price</th>
                                        <td>{{ vehicle.purchase_price }}</td>
                                      </tr>
                                      <tr>
                                        <th>Vehicle Condition</th>
                                        <td>{{ vehicle.vehicle_condition }}</td>
                                      </tr>
                                    </tbody>

                                  </table>
                              </b-colxx>
                          </b-row>
                      </b-tab>
                      <b-tab title="Seller's Info">

                          <b-row>
                              <b-colxx sm="12">
                                  <table class="table">
                                    <tbody>
                                        <tr>
                                          <th>Seller's Name</th>
                                          <td>{{ vehicle.seller_name }}</td>
                                        </tr>
                                        <tr>
                                          <th>Seller's Address</th>
                                          <td>{{ vehicle.seller_address }}</td>
                                        </tr>
                                        <tr>
                                          <th>Seller's Contact Number</th>
                                          <td>{{ vehicle.seller_contact_number }}</td>
                                        </tr>
                                    </tbody>
                                  </table>
                              </b-colxx>
                          </b-row>
                      </b-tab>
                      <b-tab title="Insurance Info">
                          <b-row>
                              <b-colxx sm="12">
                                  <table class="table">
                                    <tbody>
                                      <tr>
                                        <th class="col-sm-6">Insurance Company</th>
                                        <td>{{ vehicle.insurance.company_name }}</td>
                                      </tr>
                                      <tr>
                                        <th>Policy Number</th>
                                        <td>{{ vehicle.insurance.policy_number }}</td>
                                      </tr>
                                      <tr>
                                        <th>Policy Type</th>
                                        <td>{{ vehicle.insurance.policy_type }}</td>
                                      </tr>
                                      <tr>
                                        <th>Policy Start Date</th>
                                        <td>{{ vehicle.insurance.policy_start_date }}</td>
                                      </tr>
                                      <tr>
                                        <th>Policy End Date</th>
                                        <td>{{ vehicle.insurance.policy_end_date }}</td>
                                      </tr>
                                      <tr>
                                        <th>Roadside Assistance</th>
                                        <td>{{ vehicle.insurance.road_side_assistance }}</td>
                                      </tr>
                                      <tr v-if="vehicle.insurance.road_side_assistance == 'no'">
                                        <th>Roadside Assistance Company</th>
                                        <td>{{ vehicle.insurance.road_side_assistance_company }}</td>
                                      </tr>
                                      <tr>
                                        <th>Roadside Assistance Start Date</th>
                                        <td>{{ vehicle.insurance.road_side_assistance_start_date }}</td>
                                      </tr>
                                      <tr>
                                        <th>Roadside Assistance End Date</th>
                                        <td>{{ vehicle.insurance.road_side_assistance_end_date }}</td>
                                      </tr>
                                      <tr v-if="vehicle.insurance.demage_details">
                                        <th>Damage Details</th>
                                        <td>{{ vehicle.insurance.demage_details }}</td>
                                      </tr>
                                      <tr v-if="vehicle.insurance.damage_picture">
                                        <th>Damage Picture</th>
                                        <td><img style="width: 100%" :src="vehicle.insurance.damage_picture" /></td>
                                      </tr>
                                    </tbody>
                                  </table>
                              </b-colxx>
                          </b-row>
                      </b-tab>
                      <b-tab title="Maintenance">
                          <b-row>
                              <b-colxx sm="12">
                                <b-table hover :fields="fields"  :items="vehicle.maintenance" ></b-table>
                              </b-colxx>
                          </b-row>
                          <b-row>
                              <b-colxx sm="12">
                                <div>Next Maintenance Mileage<span class="badge badge-primary"> {{ (vehicle.next_maintenance_mileage) ? vehicle.next_maintenance_mileage : ' Not Set' }}</span> </div>
                                <div>Next Maintenance Due: <span class="badge badge-primary"> {{ (vehicle.next_maintenance_due_date) ? vehicle.next_maintenance_due_date : ' Not Set' }}</span></div>
                                <div>Next Maintenance Service: <span class="badge badge-primary"> {{ (vehicle.next_maintenance_service) ? vehicle.next_maintenance_service : ' Not Set' }}</span></div>
                                <div>Next Maintenance Comments: <span class="badge badge-primary" v-if="vehicle.next_maintenance_comments"> {{ (vehicle.next_maintenance_comments) ? vehicle.next_maintenance_comments : '' }}</span></div>
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
              vehicle: [],
              fields: [
                { key: 'vehicle', label: 'Vehicle' },
                { key: 'mileage', label: 'Mileage' },
                { key: 'date', label: 'Date' },
                { key: 'service_type', label: 'Service Type' },
                { key: 'cost', label: 'Cost' },
                { key: 'place', label: 'Place' },
                { key: 'mechanic_name', label: 'Mechanic Name' },
                { key: 'comments', label: 'comments' },
              ],
          }
      },
      methods: {
        get_vehicle_data() {
            const van_id = this.$route.params.id
            axios.get(apiUrl + '/vehicle/' + van_id, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.vehicle = response.data
            })
        }
      },
      mounted() {
          this.get_vehicle_data()
      }
  }
  </script>
