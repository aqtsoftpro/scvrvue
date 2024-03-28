<template>
    <div>
        <b-row>
            <b-colxx xxs="12">
                <div class="d-flex">
                    <h1 class="w-bold" title="Customer name"> {{ van_out.customer.first_name }} - {{ van_out.customer.last_name }}</h1>
                </div>
                <div class="separator mb-5"></div>
            </b-colxx>
        </b-row>
        <b-row>
            <b-colxx xxs="12" xl="12" class="col-left">
                <b-row>
                    <b-colxx xxs="3" xl="3">
                        <b-card class="mb-4" no-body>
                            <b-card-body>

                                <b-img :src="van_out.vehicle.picture" alt="Image" fluid rounded></b-img>

                            </b-card-body>

                        </b-card>
                        <router-link :to="{ path: '/app/van-rental-history' }" class="btn btn-primary mt-2"
                            variant="primary">Back to Rental History</router-link>
                    </b-colxx>
                    <b-colxx xxs="9" xl="9">
                        <b-card class="mb-4" no-body>
                            <b-tabs card no-fade>
                                <b-tab title="Customer's Info" active>
                                    <b-row>
                                        <b-colxx sm="12">
                                            <table class="table">
                                                <tbody>
                                                    <tr>
                                                        <th>Customer's Name</th>
                                                        <td>{{ van_out.customer.first_name }} - {{ van_out.customer.last_name }}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Customer's Address</th>
                                                        <td>{{ van_out.customer.address }}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Customer's Contact Number</th>
                                                        <td>{{ van_out.customer.phone_number }}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </b-colxx>
                                    </b-row>
                                </b-tab>
                                <b-tab title="Vehicle Detail">
                                    <b-row>
                                        <b-colxx sm="12">
                                            <table class="table">
                                                <tbody>
                                                    <tr>
                                                        <th>Registration / Plate Number</th>
                                                        <td>{{ van_out.vehicle.reg_plate_number }}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Status</th>
                                                        <td>{{ van_out.vehicle.status }}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Type</th>
                                                        <td>{{ van_out.vehicle.type }}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Make</th>
                                                        <td>{{ van_out.vehicle.make }}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Model</th>
                                                        <td>{{ van_out.vehicle.model }}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Mileage</th>
                                                        <td>{{ van_out.vehicle.mileage }}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Purchase Date</th>
                                                        <td>{{ van_out.vehicle.purchase_date }}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Purchase Price</th>
                                                        <td>{{ van_out.vehicle.purchase_price }}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Vehicle Condition</th>
                                                        <td>{{ van_out.vehicle.vehicle_condition }}</td>
                                                    </tr>
                                                </tbody>

                                            </table>
                                        </b-colxx>
                                    </b-row>
                                </b-tab>

                                <b-tab title="Rental Detail">
                                    <b-row>
                                        <b-colxx sm="12">
                                            <table class="table">
                                                <tbody>
                                                    <tr>
                                                        <th class="col-sm-6">Location</th>
                                                        <td>{{ van_out.location.name }}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Reason Of Renting</th>
                                                        <td>{{ van_out.reason_of_renting }}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Rental Periods</th>
                                                        <td>{{ van_out.rental_period }}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Rental Amount</th>
                                                        <td>{{ van_out.rental_amount }}</td>
                                                    </tr>
                                                    
                                                    <tr>
                                                        <th>Rental Mileage</th>
                                                        <td>{{ van_out.mileage }}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Rental Due Return</th>
                                                        <td>{{ van_out.due_return }}</td>
                                                    </tr>
                                                    <!-- <tr v-if="vehicle.insurance.road_side_assistance == 'no'">
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
                                                        <td><img style="width: 100%"
                                                                :src="vehicle.insurance.damage_picture" /></td>
                                                    </tr> -->
                                                </tbody>
                                            </table>
                                        </b-colxx>
                                    </b-row>
                                </b-tab>
                                <!-- <b-tab title="Maintenance">
                                    <b-row>
                                        <b-colxx sm="12">
                                            <b-table hover :fields="fields" :items="vehicle.maintenance"></b-table>
                                        </b-colxx>
                                    </b-row>
                                    <b-row>
                                        <b-colxx sm="12">
                                            <div>Next Maintenance Mileage<span class="badge badge-primary"> {{
                    (vehicle.next_maintenance_mileage) ?
                        vehicle.next_maintenance_mileage : ' Not Set' }}</span> </div>
                                            <div>Next Maintenance Due: <span class="badge badge-primary"> {{
                    (vehicle.next_maintenance_due_date) ?
                        vehicle.next_maintenance_due_date : ' Not Set' }}</span></div>
                                            <div>Next Maintenance Service: <span class="badge badge-primary"> {{
                                                    (vehicle.next_maintenance_service) ?
                                                    vehicle.next_maintenance_service : ' Not Set' }}</span></div>
                                            <div>Next Maintenance Comments: <span class="badge badge-primary"
                                                    v-if="vehicle.next_maintenance_comments"> {{
                                                    (vehicle.next_maintenance_comments) ?
                                                    vehicle.next_maintenance_comments : '' }}</span></div>
                                        </b-colxx>
                                    </b-row>
                                </b-tab> -->
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
import { apiUrl } from '../../../constants/config.js'

export default {
    components: {

    },
    data() {
        return {
            isLoad: false,
            vehicle: [],
            van_out: [],
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
        get_rental_detail() {
            const rental_id = this.$route.params.id
            axios.get(apiUrl + '/rental-detail/' + rental_id, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.vehicle = response.data.vehicle;
                this.van_out = response.data
            })
        }
    },
    mounted() {
        this.get_rental_detail()
    }
}
</script>