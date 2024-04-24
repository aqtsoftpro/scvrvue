<template>
    <div>
        <b-form>
            <b-row>
                <b-colxx xxs="12" xs="6" lg="6" class="mb-3">
                    <b-form class="av-tooltip tooltip-label-right">
                        <label class="form-group has-top-label">
                            <b-form-input style="display:none" type="text" v-model.trim="$v.form.swapped.$model"
                              :state="!$v.form.swapped.$error" />
                            <v-select v-model="form.swapped" v-on:input="onSwapSelect" label="name"
                              :key="form.swapped" :reduce="vehicle => vehicle.id"
                              :options="available_vehicles"></v-select>
                            <span>{{ $t('forms.vanout.vehicles') }}</span>
                            <b-form-invalid-feedback v-if="$v.form.swapped.$error"> Please select swapped
                              vehicle!</b-form-invalid-feedback>
                          </label>
                    </b-form>
                </b-colxx>
                <b-colxx xxs="12" xs="6" lg="6" class="mb-3">
                    <b-form class="av-tooltip tooltip-label-right">
                        <label class="form-group has-top-label">
                            <b-form-input v-model="$v.form.condition.$model" :state="!$v.form.condition.$error"></b-form-input>
                            <span> Add vehicle condition </span>
                            <b-form-invalid-feedback v-if="$v.form.condition.$error">Add Vehicle Condition
                            </b-form-invalid-feedback>
                        </label>                         
                    </b-form>
                </b-colxx>
                <b-colxx xxs="12" xs="6" lg="6" class="mb-3">
                    <b-form class="av-tooltip tooltip-label-right">
                        <b-form-group label="Uplaod video">
                            <!-- <b-form-input style="display:none" type="text" v-model.trim="$v.form.video.$model" :state="!$v.form.video.$error" />                             -->
                            <b-form-file
                                v-model.trim="$v.form.video"
                                drop-placeholder="Drop file here..."
                                accept="video/*"
                            >
                            </b-form-file>
                            <!-- <b-form-invalid-feedback v-if="$v.form.video.$error"> Video is required!</b-form-invalid-feedback> -->
                        </b-form-group>
                    </b-form>
                </b-colxx>
                <b-colxx xxs="12" xs="6" lg="6" class="mb-3">
                    <b-form class="av-tooltip tooltip-label-right">
                        <label class="form-group has-top-label">
                            <b-form-input type="number" step="any" v-model="$v.form.amount.$model" :state="!$v.form.amount.$error"></b-form-input>
                            <span> Add vehicle amount </span>
                            <b-form-invalid-feedback v-if="$v.form.amount.$error">Add Vehicle amount
                            </b-form-invalid-feedback>
                        </label>                         
                    </b-form>
                </b-colxx>
                <b-colxx xxs="12" xs="6" lg="6" class="mb-3">
                    <b-form class="av-tooltip tooltip-label-right">                       
                        <label class="form-group has-top-label">
                            <b-form-input style="display:none" type="text" v-model.trim="$v.form.amount_status.$model"
                              :state="!$v.form.amount_status.$error" />
                            <v-select v-model="form.amount_status"  label="name"  :reduce="item => item.id"
                              :options="status_options"></v-select>
                            <span>Select amount status</span>
                            <b-form-invalid-feedback v-if="$v.form.amount_status.$error"> Please select amount status
                              vehicle!</b-form-invalid-feedback>
                        </label>
                    </b-form>
                </b-colxx>
                <b-colxx xxs="12" xs="6" lg="6" class="mb-3">
                    <b-form class="av-tooltip tooltip-label-right">
                        <label class="form-group has-top-label">
                            <b-form-input type="number" step="any" v-model="$v.form.rem_amount.$model" :state="!$v.form.rem_amount.$error"></b-form-input>
                            <span> Add vehicle remaining amount </span>
                            <b-form-invalid-feedback v-if="$v.form.rem_amount.$error">Add Vehicle amount
                            </b-form-invalid-feedback>
                        </label>                         
                    </b-form>
                </b-colxx>
                <b-colxx xxs="12" xs="6" lg="6" class="mb-3">
                    <b-form class="av-tooltip tooltip-label-right">
                        <label class="form-group has-top-label">
                            <b-form-input v-model="$v.form.amount_tracking_id.$model" :state="!$v.form.amount_tracking_id.$error"></b-form-input>
                            <span> Add vehicle amount tracking </span>
                            <b-form-invalid-feedback v-if="$v.form.amount_tracking_id.$error">Add Vehicle amount_tracking_id
                            </b-form-invalid-feedback>
                        </label>                         
                    </b-form>
                </b-colxx>
                <b-colxx xxs="12" xs="6" lg="6" class="mb-3">
                    <b-form class="av-tooltip tooltip-label-right">
                        <span class="mb-3">Please select vehicle out date</span>
                        <label class="form-group has-top-label">
                            <b-form-input style="display:none" type="text" v-model.trim="$v.form.out_date.$model"
                              :state="!$v.form.out_date.$error" />
                            
                            <datepicker type="datetime" v-model="$v.form.out_date.$model"
                              :state="!$v.form.out_date.$error" placeholder="Select date"
                              value-type="format" format="DD-MM-YYYY h:mm"></datepicker>
                            <b-form-invalid-feedback v-if="$v.form.out_date.$error"> Please select vehicle out date
                            </b-form-invalid-feedback>
                        </label>                         
                    </b-form>
                </b-colxx>

                <b-colxx xxs="12" xs="6" lg="6" class="mb-3">
                    <b-form class="av-tooltip tooltip-label-right">
                        <b-form-group label="Uplaod images">
                            <!-- <b-form-input style="display:none" type="text" v-model.trim="$v.form.images.$model" :state="!$v.form.images.$error" /> -->
                            <b-form-file
                                v-model.trim="$v.form.images"
                                drop-placeholder="Drop file here..."
                                accept="image/*"
                                multiple
                            >
                            </b-form-file>
                            <!-- <b-form-invalid-feedback v-if="$v.form.images.$error"> images is required!</b-form-invalid-feedback> -->
                        </b-form-group>
                    </b-form>
                </b-colxx>

            </b-row>
            <div v-if="isProcessing">
                <b-spinner variant="primary"></b-spinner>
                <span class="text-primary">{{ processing_text }}</span>
            </div>
            <b-button @click.stop="save_swap_record" variant="primary" class="mt-4 mb-4">{{
                                'Save' }}</b-button>
            <!-- <div v-else>
                <b-button @click.stop="cancel_update_customer_record()" variant="info" class="mt-4 mb-4"><i
                        class="simple-icon-close"></i></b-button>
            </div> -->
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
    props: ['sc'],
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
            form: {
                swapped: null,
                condition: null,
                video: null,
                amount: 0.00,
                rem_amount: 0.00,
                out_date: null,
                amount_status: 'unpaid',
                amount_tracking_id: null,
                vehicle_reg: null,
                images: null,
            },

            available_vehicles: [],
            status_options: [
                {id: 'unpaid', name: 'Un Paid'}, 
                {id: 'fully_paid', name: 'Fully Paid'},
                {id: 'partially_paid', name: 'Partially Paid'},
                {id: 'other', name: 'Other'}
                
            ],
        }
    },

    mixins: [validationMixin],
    validations: {
        form: {
            swapped: {
                required
            },// null,
            condition: {
                required
            },// null,
            // video: {
            //     required
            // },// null,
            amount: {
                required
            },// 0.00,
            rem_amount: {
                required
            },// 0.00,
            out_date: {
                required
            },// null,
            amount_status: {
                required
            },// 'unpaid',
            amount_tracking_id: {
                required
            },// null,
            // vehicle_reg: {
            //     required
            // },// null,
            // images: {
            //     required
            // }
        },

    },

    computed: {
        //   ...mapGetters(['currentUser']),
        //   rows() {
        //     return this.customer_records.length
        //   }
    },
    methods: {


        get_available_vehicle_options(id, swap) {

            this.processing_text = 'Loading Data..'
            this.isProcessing = true

            axios.get(apiUrl + '/available_vehicles_options/' + id + '/' + swap, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.available_vehicles = response.data;       
                this.isProcessing = false
            })
        },

        onSwapSelect() {

        },

        save_swap_record() {

            this.$v.form.$touch();
            if (this.$v.form.$anyError == true) {
                return false;
            }
            this.$emit('swap_submit_data', this.form);
            // this.sc(this.form)
        },
        reset_form() {
            this.form = {
                name: null,
                email: null,
                role_id: 'Select Role',
            }
        },
    },

    mounted() {

        if (localStorage.getItem('token') !== null) {
            this.$store.commit('setUser', JSON.parse(localStorage.getItem('user')));
        } else {
            this.$router.push('/user/login');
        }

        this.get_available_vehicle_options();
    },
    watch: {
        currentUser() {
            this.user = this.currentUser
        },

        // available_vehicle_options() {
        //     this.available_vehicle = available_vehicle_options
        // },
        
    }
}
</script>