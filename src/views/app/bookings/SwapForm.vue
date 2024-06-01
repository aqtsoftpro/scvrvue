<template>
    <div>
        <b-form >
            <b-row>
                <b-colxx xxs="12" xs="6" lg="6" class="mb-3">
                    <b-form class="av-tooltip tooltip-label-right">
                        <label class="form-group has-top-label">
                            <b-form-input style="display:none" type="text" v-model.trim="$v.swapForm.vehicle_id.$model"
                                :state="!$v.swapForm.vehicle_id.$error" />
                            <v-select v-model="swapForm.vehicle_id" v-on:input="onSwapSelect" label="name"
                                :key="swapForm.vehicle_id" :reduce="vehicle => vehicle.id"
                                :options="available_vehicles"></v-select>
                            <span>{{ $t('forms.vanout.vehicles') }}</span>
                            <b-form-invalid-feedback v-if="$v.swapForm.vehicle_id.$error"> Please select the
                                vehicle!</b-form-invalid-feedback>
                        </label>
                    </b-form>
                </b-colxx>

                <b-colxx xxs="12" xs="6" lg="6" class="mb-3">
                    <b-form class="av-tooltip tooltip-label-right">
                        <label class="form-group has-top-label">
                            <b-form-input style="display:none" type="text" v-model.trim="$v.swapForm.location_id.$model"
                                :state="!$v.swapForm.location_id.$error" />
                            <v-select v-model="swapForm.location_id" label="name" :key="swapForm.location_id"
                                :reduce="location => location.id" aria-placeholder="Select Customer"
                                :options="locations"></v-select>
                            <span>{{ $t('forms.vanout.location') }}</span>
                            <b-form-invalid-feedback v-if="$v.swapForm.location_id.$error"> Please select the
                                location!</b-form-invalid-feedback>
                        </label>
                    </b-form>
                    <div v-if="swapForm.location_id == '4'">
                        <b-form-input placeholder="Title of location" v-model="new_location"></b-form-input>
                        <b-button @click.prevent="addNewLocation" class="mt-2 btn btn-xs">Add Location</b-button>
                    </div>
                </b-colxx>

                <b-colxx xxs="12" xs="6" lg="6" class="mb-3">
                    <label class="form-group has-top-label">
                        <b-form-input v-model="swapForm.bond_deposit">
                        </b-form-input>
                        <span>{{ $t('forms.toll.bond_deposit') }}</span>
                    </label>
                </b-colxx>

                <b-colxx xxs="12" xs="6" lg="6" class="mb-3">
                    <label class="form-group has-top-label">
                        <v-select v-model="swapForm.payment_mode" label="name" :reduce="customer => customer.id"
                            :options="payment_options"></v-select>
                        <span>{{ $t('forms.toll.payment_mode') }}</span>
                    </label>
                </b-colxx>

                <b-colxx xxs="12" xs="6" lg="6" class="mb-3"
                    ref="images_column">
                    <span>{{ $t('forms.vanin.demage_picture') }}</span>
                    <b-form-file v-model="swapForm.images" :placeholder="$t('forms.vanin.demage_picture')"
                        drop-placeholder="Drop file here..." accept="image/*" multiple @change="handleSwapImages"></b-form-file>
                </b-colxx>

                <b-colxx xxs="12" xs="6" lg="6" class="mb-3" ref="video_column">
                    <span>Vehicle Condition Video </span>
                    <b-form-file v-model="swapForm.video" placeholder="Upload video"
                        drop-placeholder="Drop file here..." accept="video/*"></b-form-file>
                </b-colxx>

                <b-colxx xxs="12" xs="6" lg="6" class="mb-3" ref="demage_text_column">
                    <label class="form-group has-top-label">
                        <b-form-textarea v-model="swapForm.condition"></b-form-textarea>
                        <span>{{ $t('forms.vanin.demage_text') }}</span>
                    </label>
                </b-colxx>

                <b-colxx xxs="12" xs="6" lg="6" class="mb-3">
                    <b-form class="av-tooltip tooltip-label-right">
                        <label class="form-group has-top-label">
                            <b-form-input v-model="$v.swapForm.mileage.$model"
                                :state="!$v.swapForm.mileage.$error"></b-form-input>
                            <span> {{ $t('forms.vanout.mileage') }}</span>
                            <b-form-invalid-feedback v-if="$v.swapForm.mileage.$error"> Please add mileage!
                            </b-form-invalid-feedback>
                        </label>
                    </b-form>
                </b-colxx>

                <b-colxx xxs="12" xs="6" xl="6" class="mb-3">
                    <b-form class="av-tooltip tooltip-label-right">
                        <label class="form-group has-top-label">
                            <b-form-input v-model="$v.swapForm.rental_amount.$model"
                                :state="!$v.swapForm.rental_amount.$error"></b-form-input>
                            <span>{{ $t('forms.vanout.rental_amount') }}</span>
                            <b-form-invalid-feedback v-if="$v.swapForm.rental_amount.$error"> Please add rental amount!
                            </b-form-invalid-feedback>
                        </label>
                    </b-form>
                </b-colxx>

                <b-colxx xxs="12" xs="6" lg="6" class="mb-3">
                    <b-form class="av-tooltip tooltip-label-right">
                        <b-form-radio-group id="amount-frequency" v-model="swapForm.amount_frequency"
                            name="amount-frequency">
                            <b-form-radio value="Per Day">Per Day</b-form-radio>
                            <b-form-radio value="Per Week">Per Week</b-form-radio>
                        </b-form-radio-group>
                    </b-form>
                </b-colxx>
            </b-row>
            <b-row>
                <b-colxx xxs="12" xs="4" lg="4" class="mb-3">
                    <b-form class="av-tooltip tooltip-label-right">
                        <b-form-checkbox id="checkbox-swaped" v-model="swapForm.long_term" name="checkbox-swaped" :value="1"
                            :unchecked-value="0">
                            <span>Is This Long Term Customer?</span>
                        </b-form-checkbox>
                    </b-form>
                </b-colxx>

                <b-colxx xxs="12" xs="12" md="12" xxl="8" class="mb-3">
                    <label>Rental Periods
                    </label>
                    <div class="d-flex">
                        <div style="margin-right: 1em;">
                            <!-- :default-value="today" -->
                            <datepicker  type="datetime" v-model="$v.swapForm.out_date.$model"
                                :state="!$v.swapForm.out_date.$error"
                                :placeholder="$t('forms.vanout.van_out_date_time')" value-type="format"
                                format="DD-MM-YYYY h:mm"></datepicker>
                            <b-form-invalid-feedback v-if="$v.swapForm.out_date.$error"> Please select van out date
                            </b-form-invalid-feedback>
                        </div>
                        <div v-if="swapForm.long_term == 0" class="d-flex">
                            <datepicker type="datetime" v-model="swapForm.due_return" placeholder="Vehical Due Back"
                                value-type="format" format="DD-MM-YYYY hh:mm">
                            </datepicker>
                        </div>
                    </div>

                </b-colxx>
            </b-row>
            <b-row>

            </b-row>
            <b-row>

                <b-colxx xxs="12" xs="12" lg="12" class="mb-3">
                    <label>{{ $t('forms.vanout.accessories') }}</label>
                    <b-row>

                        <b-colxx v-for="accessory in accessories" :key="accessory.id" xxs="3" xs="3" lg="3">
                            <b-checkbox v-model="swapForm.accessories" :value="accessory.id">{{ accessory.name
                                }}</b-checkbox>
                        </b-colxx>
                    </b-row>
                </b-colxx>
            </b-row>

            <b-row>


                <div v-if="isProcessing">
                    <b-spinner variant="primary"></b-spinner>
                    <span class="text-primary">{{ processing_text }}</span>
                </div>
            </b-row>
            <b-row>

            </b-row>

            <b-button v-if="formData" @click.stop="update_swap_record(formData.id)" variant="primary" class="mt-4 mb-4">Update</b-button>

            <b-button v-else @click.stop="save_swap_record" variant="primary" class="mt-4 mb-4">Save</b-button>
            <button type="reset" class="d-none" ref="swapReset" >reset</button>
        </b-form>

    </div>
</template>
<script>

import {
    validationMixin
} from "vuelidate";
const {
    required
} = require("vuelidate/lib/validators");

import axios from 'axios'
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import { apiUrl } from "../../../constants/config.js";
import { mapGetters } from 'vuex';

export default {
    props: ['sc', 'vehicle_id', 'locations', 'payment_options', 'accessories', 'booking', 'formData'],
    components: {
        'v-select': vSelect,
        'datepicker': DatePicker
    },
    data() {
        return {
            disableDates: {
                from: new Date()
            },
            isProcessing: false,
            processing_text: 'Loading data please wait ...',
            swapForm: {
                vehicle_id: '',
                location_id: this.booking.location_id,
                rental_priod: '',
                rental_amount: '',
                amount_frequency: 'Per Week',
                mileage: '',
                accessories: [],
                out_date: '',
                due_return: '',
                bond_deposit: this.booking.bond_deposit,
                payment_mode: this.booking.payment_mode,
                images: null,
                video: null,
                condition: '',
                long_term: 0,
                booking_id: this.booking.id
            },

            available_vehicles: [],
            status_options: [
                { id: 'unpaid', name: 'Un Paid' },
                { id: 'fully_paid', name: 'Fully Paid' },
                { id: 'partially_paid', name: 'Partially Paid' },
                { id: 'other', name: 'Other' }

            ],

            newBooking: null
        }
    },

    mixins: [validationMixin],
    validations: {
        swapForm: {
            vehicle_id: {
                required
            },
            location_id: {
                required
            },
            out_date: {
                required
            },
            rental_amount: {
                required
            },
            mileage: {
                required
            },
        },

    },

    computed: {
        vehicle_id(newVal, oldVal) {
            this.get_available_vehicle_options(newVal)
        }
    },
    methods: {
        get_available_vehicle_options(id, swap) {
            this.processing_text = 'Loading Data..'
            this.isProcessing = true

            axios.get(apiUrl + '/available_vehicles_options/' + id + '/' + swap +'/'+ this.booking.vehicle_type_id, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                console.log(response.data);
                this.available_vehicles = response.data;
                this.isProcessing = false
            })
        },

        onSwapSelect(key) {

            this.processing_text = 'Loading Data ... ';
            this.isProcessing = true

            const vehicle_id = key

            axios.get(apiUrl + '/vehicle/' + vehicle_id, {
                headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {

                let maintenanceData = response.data

                if (maintenanceData) {
                this.swapForm.mileage = response.data.mileage
                this.$notify('success filled ', 'Success!', 'The mileage data has been added to field', { duration: 3000, permanent: false });
                this.isProcessing = false
                } else {
                this.swapForm.mileage = ''
                this.$notify('info filled', 'Info!', 'No milage data for this vehicle, please manually fill it', { duration: 3000, permanent: false });
                this.isProcessing = false
                }
            })
        },

        save_swap_record() {
            this.$v.swapForm.$touch();
            if (this.$v.swapForm.$anyError == true) {
                return false;
            }
            this.booking.vehicle_id = this.swapForm.vehicle_id;

            this.processing_text = 'Saving Data ... ';
            this.isProcessing = true

            axios.post(apiUrl + '/swap-store', this.swapForm, {
                headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'content-type': 'multipart/form-data',
                }
            }).then(response => {
                //send success notification
                this.newBooking = response.data.data;

                this.$notify(
                'success filled',
                'Success!',
                response.data.message,
                { duration: 3000, permanent: false });

                this.$v.swapForm.$reset()

                this.$refs.swapReset.click();

                this.swapForm = {
                    vehicle_id: '',
                    location_id: '',
                    rental_priod: '',
                    rental_amount: '',
                    amount_frequency: 'Per Week',
                    mileage: '',
                    accessories: [],
                    out_date: '',
                    due_return: '',
                    bond_deposit: null,
                    payment_mode: null,
                    images: null,
                    video: null,
                    condition: '',
                    long_term: 0,
                    booking_id: null
                }
                this.isProcessing = false
                this.$emit('swap_submit_data', this.newBooking);
            }).catch(error => {
                this.$notify('error filled', 'Error!', error.response.data.message, { duration: 3000, permanent: false });
                this.isProcessing = false
            });

        },

        update_swap_record(swap_id) {
            this.$v.swapForm.$touch();
            if (this.$v.swapForm.$anyError == true) {
                return false;
            }

            this.processing_text = 'Updating Data ... ';
            this.isProcessing = true
            this.booking.vehicle_id = this.swapForm.vehicle_id;
            axios.post(apiUrl + '/swap-update/'+swap_id, this.swapForm, {
                headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'content-type': 'multipart/form-data',
                }
            }).then(response => {
                //send success notification
                this.newBooking = response.data.data;
                this.$notify(
                'success filled',
                'Success!',
                response.data.message,
                { duration: 3000, permanent: false });

                this.$v.swapForm.$reset()

                this.$refs.swapReset.click();

                this.swapForm = {
                    vehicle_id: '',
                    location_id: '',
                    rental_priod: '',
                    rental_amount: '',
                    amount_frequency: 'Per Week',
                    mileage: '',
                    accessories: [],
                    out_date: '',
                    due_return: '',
                    bond_deposit: null,
                    payment_mode: null,
                    images: null,
                    video: null,
                    condition: '',
                    long_term: 0,
                    booking_id: null
                }
                this.isProcessing = false
                this.$emit('swap_submit_data', this.newBooking);
            }).catch(error => {
                this.$notify('error filled', 'Error!', error.response.data.message, { duration: 3000, permanent: false });
                this.isProcessing = false
            });
        },
        reset_form() {
            this.form = {
                name: null,
                email: null,
                role_id: 'Select Role',
            }
        },

        handleSwapImages(event) {
            this.swapForm.images = event.target.files[0];
            console.log(event); // Check the selected files in the console
        },
    },

    mounted() {

        if (localStorage.getItem('token') !== null) {
            this.$store.commit('setUser', JSON.parse(localStorage.getItem('user')));
        } else {
            this.$router.push('/user/login');
        }

        this.get_available_vehicle_options(this.formData.vehicle_id);

        if (this.formData !== null) {
            this.swapForm = this.formData;
            this.swapForm.out_date = this.formData.van_out_date;
            var accessories_to_set = [];
            this.formData.accessories.map((value, key) => {
                accessories_to_set.push(value.id)
            })
            console.log(accessories_to_set)
            this.swapForm.accessories = accessories_to_set
        }

    },
    watch: {
        currentUser() {
            this.user = this.currentUser
        },

        vehicle_id(newVal, oldVal) {
            this.get_available_vehicle_options(newVal, null);
        },

        booking(){
            this.swapForm.booking_id = this.booking.id;
        },

        // available_vehicle_options() {
        //     this.available_vehicle = available_vehicle_options
        // },

    }
}
</script>