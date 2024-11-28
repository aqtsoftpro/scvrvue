<template>
  <div>
    <b-row>
      <b-modal ref="create_customer_modal" id="modallg" size="lg" title="Create Customer" hide-footer>
        <customer :cc="customer_created" />
      </b-modal>

      <b-modal ref="create_swap_modal" id="swapModal" size="lg" :title="swap_modal_title" hide-footer>
        <swap-form @swap_submit_data="swap_created" :vehicle_id="checkVehicle" :locations="location_options"
          :payment_options="payment_mode_options" :accessories="accessory_options" :booking="booking"
          :formData="swap_data" />
      </b-modal>

      <b-modal id="vanoutModal" size="lg" ref="vanoutModal">
        <table class="stacked table">
          <tr>
            <td>Booking ID:</td>
            <td> {{ vanout.id }}</td>
          </tr>
          <tr>
            <td>Registration Plate Number:</td>
            <td> {{ vanout.reg_number }}</td>
          </tr>
          <tr>
            <td>Customer:</td>
            <td> {{ vanout.customer }}</td>
          </tr>
          <tr>
            <td>Location:</td>
            <td> {{ vanout.location }}</td>
          </tr>
          <tr>
            <td>Vehicle:</td>
            <td> {{ vanout.vehicle }}</td>
          </tr>
          <tr>
            <td>New / Swap:</td>
            <td> {{ vanout.reason_of_renting }}</td>
          </tr>
          <tr>
            <td>Mileage:</td>
            <td> {{ vanout.mileage }}</td>
          </tr>
          <tr>
            <td>Model:</td>
            <td> {{ vanout.vehicle_model }}</td>
          </tr>
          <tr>
            <td>Accessories:</td>
            <td>
              <span class="badge badge-light mr-2" v-for="accessory in vanout.accessories">
                {{ accessory.name }}
              </span>
            </td>
          </tr>
          <tr v-if="vanout.reason_of_renting != 'New'">
            <td>Swapped with:</td>
            <td> {{ vanout.swapped_name }}</td>
          </tr>
          <tr v-if="vanout.reason_of_renting != 'New'">
            <td>Swapped Model:</td>
            <td> {{ vanout.swapped_model }}</td>
          </tr>
          <tr>
            <td>Rental Period:</td>
            <td> {{ vanout.rental_period }} Days</td>
          </tr>
          <tr>
            <td>Rental Amount:</td>
            <td>$ {{ vanout.rental_amount }} / {{ vanout.amount_frequency }}</td>
          </tr>
          <tr>
            <td>Vehicle out date:</td>
            <td> {{ vanout.van_out_date }}</td>
          </tr>
          <tr>
            <td>Due return date:</td>
            <td> {{ vanout.due_return }}</td>
          </tr>
          <tr>
            <td>Bond/Deposit:</td>
            <td> {{ vanout.bond_deposit }}</td>
          </tr>
          <tr>
            <td>Payment Mode:</td>
            <td> {{ vanout.payment_mode }}</td>
          </tr>

        </table>
      </b-modal>
      <b-modal hide-footer hide-header id="addAcessoryModal" size="xl" ref="addAcessoryModal">
        <accessories-management :refresh=refresh_accessories_list :accessories=accessory_options />
      </b-modal>
      <b-modal id="vanInModal" size="lg" ref="vanInModal">
        <table class="stacked table">
          <tr>
            <th>Booking ID:</th>
            <td> {{ vanin.id }}</td>
          </tr>
          <tr>
            <th>Vehicle:</th>
            <td> {{ vanin.vehicle }}</td>
          </tr>
          <tr>
            <th>Customer:</th>
            <td> {{ vanin.customer }}</td>
          </tr>
          <tr>
            <th>Rental Amount:</th>
            <td> {{ vanin.rental_amount }}</td>
          </tr>
          <tr>
            <th>Rental Period:</th>
            <td> {{ vanin.rental_period }}</td>
          </tr>
          <tr>
            <th>Location:</th>
            <td> {{ vanin.location }}</td>
          </tr>
          <tr>
            <th>Mileage:</th>
            <td> {{ vanin.mileage }}</td>
          </tr>
          <tr>
            <th>Fuel Tank:</th>
            <td> {{ vanin.fuel_tank }}</td>
          </tr>
          <tr>
            <th>Condition:</th>
            <td> {{ vanin.condition }}</td>
          </tr>
          <tr>
            <th>Bond Return Amount:</th>
            <td> {{ vanin.bond_return_amount }}</td>
          </tr>
          <tr>
            <th>Damage caused by customer:</th>
            <td> {{ vanin.damage_caused_by_customer }}</td>
          </tr>
          <tr v-if="vanin.damage_caused_by_customer == 'Yes'">
            <th>Vehicle Condition Picture:</th>
            <td> <img width="200" :src="vanin.demage_picture" /></td>
          </tr>
          <tr v-if="vanin.damage_caused_by_customer == 'Yes'">
            <th>Vehicle Condition Text:</th>
            <td> {{ vanin.demage_text }}</td>
          </tr>
          <tr>
            <th>Return Date:</th>
            <td> {{ vanin.return_date }}</td>
          </tr>
          <tr>
            <th>Require Maintenance:</th>
            <td> {{ vanin.require_maintenance }}</td>
          </tr>
          <tr>
            <th>Require Maintenance Text:</th>
            <td> {{ vanin.require_maintenance_text }}</td>
          </tr>
        </table>
      </b-modal>
    </b-row>
    <b-row>
      <b-colxx xxs="12">
        <h5 class="mb-4 card-title">{{ $t('menu.bookings') }}</h5>
        <b-row>
          <b-colxx xxs="12" xs="12" lg="12" class="mb-3">
            <b-card class="mb-4" no-body>
              <b-tabs card no-fade>
                <b-tab title="Vehicle Out" active title-item-class="w-50 text-center van_out_tab" @click="changeTab(0)">
                  <b-form @click="stopPropagation">
                    <b-row>
                      <b-colxx xxs="12" xs="6" lg="6" xl="4">
                        <b-form class="av-tooltip tooltip-label-right">
                          <label class="form-group has-top-label">
                            <b-form-input style="display:none" type="text" v-model.trim="$v.form.customer_id.$model"
                              :state="!$v.form.customer_id.$error" />
                            <v-select v-model="form.customer_id" label="name" :key="form.customer_id"
                              :reduce="customer => customer.id" :options="customer_options"
                              v-on:input="onCustomerSelect">
                              <template #list-header>
                                <b-button v-b-modal.modallg variant="outline-primary btn-xs" class="mr-2 ms-4 mb-2"
                                  style="margin-left: 7px !important;">Add
                                  Customer</b-button>
                              </template>
                            </v-select>
                            <span>{{ $t('forms.vanout.customer') }}</span>
                            <b-form-invalid-feedback v-if="$v.form.customer_id.$error"> Please select the
                              customer!</b-form-invalid-feedback>
                          </label>
                        </b-form>
                      </b-colxx>
                      <b-colxx xxs="12" xs="6" lg="6" xl="4" class="mb-3">
                        <b-form class="av-tooltip tooltip-label-right">
                          <label class="form-group has-top-label">
                            <b-form-input style="display:none" type="text" v-model.trim="$v.form.vehicle_id.$model"
                              :state="!$v.form.vehicle_id.$error" />
                            <v-select v-model="form.vehicle_id" v-on:input="onVehicleSelect" label="name"
                              :disabled="editing_mode" :key="form.vehicle_id" :reduce="vehicle => vehicle.id"
                              :options="vehicle_options"></v-select>
                            <span>{{ $t('forms.vanout.vehicles') }}</span>
                            <b-form-invalid-feedback v-if="$v.form.customer_id.$error"> Please select the
                              vehicle!</b-form-invalid-feedback>
                          </label>
                        </b-form>
                      </b-colxx>

                      <b-colxx xxs="12" xs="6" lg="6" xl="4" class="mb-3">
                        <b-form class="av-tooltip tooltip-label-right">
                          <label class="form-group has-top-label">
                            <b-form-input style="display:none" type="text" v-model.trim="$v.form.location_id.$model"
                              :state="!$v.form.location_id.$error" />
                            <v-select v-model="form.location_id" label="name" :key="form.location_id"
                              :reduce="location => location.id" aria-placeholder="Select Location"
                              :options="location_options"></v-select>
                            <span>{{ $t('forms.vanout.location') }}</span>
                            <b-form-invalid-feedback v-if="$v.form.location_id.$error"> Please select the
                              location!</b-form-invalid-feedback>
                          </label>
                        </b-form>
                        <div v-if="form.location_id == '4'">
                          <b-form-input placeholder="Title of location" v-model="new_location"></b-form-input>
                          <b-button @click.prevent="addNewLocation" class="mt-2 btn btn-xs">Add Location</b-button>
                        </div>
                      </b-colxx>
                    </b-row>
                    <b-row>

                      <b-colxx xxs="12" xs="6" lg="6" xl="4" class="mb-3">
                        <b-form class="av-tooltip tooltip-label-right">
                          <label class="form-group has-top-label">
                            <b-form-input style="display:none" type="text"
                              v-model.trim="$v.form.reason_of_renting.$model"
                              :state="!$v.form.reason_of_renting.$error" />
                            <v-select v-model="form.reason_of_renting" aria-placeholder="New / Swap"
                              :options="swap_options" :disabled="!swap_status"></v-select>
                            <span>{{ $t('forms.vanout.reason_of_renting') }}</span>
                            <b-form-invalid-feedback v-if="$v.form.reason_of_renting.$error"> Please select reason of
                              renting!</b-form-invalid-feedback>
                          </label>
                          <b-button v-if="form.reason_of_renting == 'Swap'" @click.stop="open_swap_modal"
                            class="btn-sm">
                            Add swapped vehicle data
                          </b-button>
                          <!-- <label v-if="form.reason_of_renting == 'Swap'" class="form-group has-top-label">
                              <select class="form-select custom-select" aria-label="Default select example" @change="onSwapSelect(form.swap_with)" v-model="form.swap_with">
                                <option >Select Vehicle to swap with</option>
                                <option v-for="vehicle in available_vehicle_options" :value="vehicle.id">{{ vehicle.name }}</option>
                              </select>
                            <span>{{ $t('forms.vanout.swap_with') }}</span>
                          </label> -->
                          <!-- v-on:input="onVehicleSelect" -->
                        </b-form>
                      </b-colxx>
                      <b-colxx xxs="12" xs="6" lg="4" class="mb-3">
                        <label class="form-group has-top-label">
                          <b-form-input v-model="form.bond_deposit">
                          </b-form-input>
                          <span>{{ $t('forms.toll.bond_deposit') }}</span>
                        </label>
                      </b-colxx>

                      <b-colxx xxs="12" xs="6" lg="4" class="mb-3">
                        <label class="form-group has-top-label">
                          <v-select v-model="form.payment_mode" label="name" :reduce="customer => customer.id"
                            :options="payment_mode_options"></v-select>
                          <span>{{ $t('forms.toll.payment_mode') }}</span>
                        </label>
                      </b-colxx>

                      <b-colxx xxs="12" xs="6" lg="4" class="mb-3" ref="demage_pics_column">
                        <span>{{ $t('forms.vanin.demage_picture') }}</span>
                        <b-form-file v-model="form.demage_pics" :placeholder="$t('forms.vanin.demage_picture')"
                          drop-placeholder="Drop file here... (Max 2MB)" accept="image/*" multiple
                          @change="handleFileChange"></b-form-file>
                        <span v-if="editing_mode">Vehicle Condition picture already uploaded</span>
                      </b-colxx>
                      <b-colxx xxs="12" xs="6" lg="4" class="mb-3" ref="demage_video_column">
                        <span>Vehicle Condition Video </span>
                        <b-form-file v-model="form.demage_video" placeholder="Upload video (max 5MB)"
                          drop-placeholder="Drop file here..." accept="video/*"></b-form-file>
                        <span v-if="editing_mode">Vehicle Condition Video already uploaded</span>
                      </b-colxx>

                      <b-colxx xxs="12" xs="6" lg="4" class="mb-3" ref="demage_text_column">
                        <label class="form-group has-top-label">
                          <b-form-textarea v-model="form.condition"></b-form-textarea>
                          <span>{{ $t('forms.vanin.demage_text') }}</span>
                        </label>
                      </b-colxx>

                      <b-colxx xxs="12" xs="6" lg="6" xl="4" class="mb-3">
                        <b-form class="av-tooltip tooltip-label-right">
                          <label class="form-group has-top-label">
                            <b-form-input v-model="$v.form.mileage.$model"
                              :state="!$v.form.mileage.$error"></b-form-input>
                            <span> {{ $t('forms.vanout.mileage') }}</span>
                            <b-form-invalid-feedback v-if="$v.form.mileage.$error"> Please add mileage!
                            </b-form-invalid-feedback>
                          </label>
                        </b-form>
                      </b-colxx>

                      <b-colxx xxs="4" xs="4" xl="4" class="mb-3">
                        <b-form class="av-tooltip tooltip-label-right">
                          <label class="form-group has-top-label">
                            <b-form-input v-model="$v.form.rental_amount.$model"
                              :state="!$v.form.rental_amount.$error"></b-form-input>
                            <span>{{ $t('forms.vanout.rental_amount') }}</span>
                            <b-form-invalid-feedback v-if="$v.form.rental_amount.$error"> Please add rental amount!
                            </b-form-invalid-feedback>
                          </label>
                        </b-form>
                      </b-colxx>

                      <b-colxx xxs="12" xs="6" lg="6" xl="4" class="mb-3">
                        <b-form class="av-tooltip tooltip-label-right">
                          <b-form-radio-group id="amount-frequency" v-model="form.amount_frequency"
                            name="amount-frequency">
                            <b-form-radio value="Per Day">Per Day</b-form-radio>
                            <b-form-radio value="Per Week">Per Week</b-form-radio>
                          </b-form-radio-group>
                        </b-form>
                      </b-colxx>

                      <b-colxx xxs="12" xs="6" lg="6" xl="4" class="mb-3">
                        <b-form class="av-tooltip tooltip-label-right">
                          <b-form-checkbox id="checkbox-1" v-model="form.long_term" name="checkbox-1" :value="1"
                            :unchecked-value="0">
                            <span>Is This Long Term Customer?</span>
                          </b-form-checkbox>
                        </b-form>
                      </b-colxx>

                      <b-colxx xxs="12" xs="12" md="6" xxl="4" class="mb-3">
                        <label>Rental Periods
                          <!-- <b-form-input v-model="$v.form.van_out_date.$model"
                              :state="!$v.form.van_out_date.$error"></b-form-input> -->
                        </label>
                        <div class="d-flex">
                          <div style="margin-right: 1em;">
                            <datepicker :default-value="today" type="datetime" v-model="$v.form.van_out_date.$model"
                              :state="!$v.form.van_out_date.$error" :placeholder="$t('forms.vanout.van_out_date_time')"
                              value-type="format" format="DD-MM-YYYY h:mm"></datepicker>
                            <b-form-invalid-feedback v-if="$v.form.van_out_date.$error"> Please select vehicle out date
                            </b-form-invalid-feedback>
                          </div>
                          <div v-if="form.long_term == 0" class="d-flex">
                            <datepicker type="datetime" v-model="form.due_return" placeholder="Vehical Due Back"
                              value-type="format" format="DD-MM-YYYY hh:mm">
                            </datepicker>
                          </div>
                        </div>

                        <!-- <b-form-input style="display:none" type="text" v-model.trim="$v.form.van_out_date.$model"
                            :state="!$v.form.van_out_date.$error" /> -->

                        <!-- </b-colxx>

                      <b-colxx xxs="12" xs="12" lg="2" class="mb-3"> -->

                        <!-- <b-form-input v-model="form.due_return" type="date" :placeholder="$t('forms.vanout.due_return')"></b-form-input> -->
                      </b-colxx>
                    </b-row>
                    <b-row>
                      <!-- <b-colxx xxs="12" xs="6" lg="6" xl="4" class="mb-3">
                        <label class="form-group has-top-label">
                          <b-form-input v-model="form.rental_period"></b-form-input>
                          <span>{{ $t('forms.vanout.rental_period') }}</span>
                        </label>
                      </b-colxx> -->

                    </b-row>
                    <b-row>

                      <b-colxx xxs="12" xs="12" lg="12" class="mb-3">
                        <!-- <label class="form-group has-top-label"> -->
                        <!-- <v-select multiple v-model="form.accessories"
                        label="name"
                        :reduce="accessory => accessory.id"
                          aria-placeholder="Select Accessory"
                          :options="accessory_options"
                      ></v-select> -->
                        <label>{{ $t('forms.vanout.accessories') }}</label>
                        <b-row>

                          <b-colxx v-for="accessory in accessory_options" :key="accessory.id" xxs="2" xs="2" lg="2">
                            <b-checkbox v-model="form.accessories" :value="accessory.id">{{ accessory.name
                              }}</b-checkbox>
                          </b-colxx>
                        </b-row>
                      </b-colxx>
                      <b-colxx v-if="roleName && roleName == 'admin'" xxs="12" xs="6" lg="6" xl="4" class="mb-3">
                        <button type="button" v-b-modal.addAcessoryModal class="btn btn-xs btn-secondary"> Add
                          Accessory</button>
                      </b-colxx>
                    </b-row>
                    <!-- <b-colxx xxs="6" xs="2" lg="2" class="mb-3">
                      <date-picker v-model="form.van_out_date" valueType="format"></date-picker>
                    </b-colxx> -->
                    <b-row>

                      <!-- <b-colxx xxs="12" xs="2" lg="2" class="mb-3">
                      <label>{{ $t('forms.vanout.van_out_time') }}</label>
                      <timepicker
                        v-model="form.van_out_time"
                        style="border:none"
                        class="form-control">
                        </timepicker>
                    </b-colxx> -->

                      <div v-if="isProcessing">
                        <b-spinner variant="primary"></b-spinner>
                        <span class="text-primary">{{ processing_text }}</span>
                      </div>
                    </b-row>
                    <b-row>

                    </b-row>

                    <b-button v-if="!editing_mode" @click.stop="save_vanout_form" variant="primary" class="mt-4 mb-4">{{
                      'Save'
                      }}</b-button>
                    <div v-else>
                      <b-button @click.stop="update_vanout(form.id)" variant="secondary" class="mt-4 mb-4">{{ ' Update'
                        }}</b-button>
                      <b-button @click.stop="cancel_update_vanout()" variant="info" class="mt-4 mb-4"><i
                          class="simple-icon-close"></i></b-button>
                    </div>

                    <button type="reset" ref="outresetButton" class="d-none">reset</button>

                  </b-form>
                  <div v-if="editing_mode">
                    <b-button v-for="swap in swapped_data" :class="visible ? null : 'collapsed'"
                      :aria-expanded="visible ? 'true' : 'false'" aria-controls="collapse-4" @click="get_swapped(swap)">
                      {{ swap.reg_number }}
                    </b-button>
                    <b-collapse v-if="swapped_item" id="collapse-4" v-model="visible" class="mt-2">
                      <b-card>
                        <b-row v-if="swapped_item.status == 1" class="justify-content-end">
                          <b-button size="sm" variant="grey" @click="swapped_modal(swapped_item)">
                            <i class="simple-icon-pencil"></i>
                          </b-button>
                        </b-row>
                        <b-row>
                          <b-colxx xs="12" lg="6">
                            <table class="stacked table">
                              <tr>
                                <th>Registration:</th>
                                <td> {{ swapped_item.reg_number }}</td>
                              </tr>
                              <tr>
                                <th>Vehicle Model:</th>
                                <td> {{ swapped_item.vehicle_model }}</td>
                              </tr>
                              <tr>
                                <th>Vehicle Make:</th>
                                <td> {{ swapped_item.vehicle }}</td>
                              </tr>
                            </table>
                          </b-colxx>

                          <b-colxx xs="12" lg="6">
                            <table class="stacked table">
                              <tr>
                                <th>Vehicle Out Date:</th>
                                <td> {{ swapped_item.van_out_date }}</td>
                              </tr>
                              <tr>
                                <th>Vehicle Accessories:</th>
                                <td>
                                  <b-badge pill v-for="accessory in swapped_item.accessories " class="mx-1">
                                    {{ accessory.name }}
                                  </b-badge>
                                </td>
                              </tr>
                              <tr>
                                <th>Vehicle Return Date:</th>
                                <td> {{ swapped_item.return_date }}</td>
                              </tr>
                            </table>
                          </b-colxx>

                        </b-row>
                      </b-card>
                    </b-collapse>
                  </div>

                  <datatable title="" :fields="vanout_fields" :data="vanouts" :edit="edit_vanout" :view="bring_fields"
                    :role="roleName" :del="delete_vanout" :searchColumn="VanoutSearchColumns" />
                </b-tab>
                <b-tab title="Vehicle In" title-item-class="w-50 text-center" @click="changeTab(1)">
                  <b-form @click="stopPropagation">
                    <b-row>
                      <b-colxx xxs="12" xs="6" lg="6" xl="4" class="mb-3">
                        <b-form class="av-tooltip tooltip-label-right">
                          <label class="form-group has-top-label">
                            <b-form-input style="display:none" type="text"
                              v-model.trim="$v.vanin_form.van_out_id.$model"
                              :state="!$v.vanin_form.van_out_id.$error" />
                            <v-select v-model="$v.vanin_form.van_out_id.$model" label="booking_regnumber"
                              :reduce="booking => booking.id" aria-placeholder="Booking" :options="booking_options"
                              :create-option="booking => ({ booking_regnumber: booking.regnumber, id: booking.id })"
                              taggable v-on:input="onBookingSelect"></v-select>
                            <span>{{ $t('forms.vanin.van_out') }}</span>
                            <b-form-invalid-feedback v-if="$v.vanin_form.van_out_id.$error"> Please select the
                              Booking!</b-form-invalid-feedback>
                          </label>
                        </b-form>
                      </b-colxx>
                      <b-colxx xxs="12" xs="6" lg="6" xl="4" class="mb-3">
                        <b-form class="av-tooltip tooltip-label-right">
                          <!-- <label class="form-group has-top-label">
                            <b-form-input style="display:none" type="text"
                              v-model.trim="$v.vanin_form.location_id.$model"
                              :state="!$v.vanin_form.location_id.$error" />

                            <v-select v-model="vanin_form.location_id" label="name" :key="form.location_id"
                              :reduce="location => location.id" aria-placeholder="Select Location"
                              :options="location_options"></v-select>

                            <span>{{ $t('forms.vanin.location') }}</span>
                            <b-form-invalid-feedback v-if="$v.vanin_form.location_id.$error"> Please select
                              Location!</b-form-invalid-feedback>
                          </label> -->

                          <label class="form-group has-top-label">
                            <!-- <b-form-input style="display:none" type="text" v-model.trim="$v.vanin_form.location_id.$model"
                              :state="!$v.vanin_form.location_id.$error" />
                            <v-select v-model="vanin_form.location_id" label="name" :key="vanin_form.location_id"
                              :reduce="location => location.id" aria-placeholder="Select Location"
                              :options="location_options"></v-select>
                            <span>{{ $t('forms.vanout.location') }}</span>
                            <b-form-invalid-feedback v-if="$v.vanin_form.location_id.$error"> Please select the
                              location!</b-form-invalid-feedback> -->

                            <b-form-select v-model="vanin_form.location_id" aria-placeholder="Select Location"
                              :options="location_options" value-field="id" text-field="name"></b-form-select>
                            <span>{{ $t('forms.vanout.location') }}</span>

                          </label>




                        </b-form>
                        <div v-if="vanin_form.location_id == '4'">
                          <b-form-input placeholder="Title of location" v-model="new_location"></b-form-input>
                          <b-button @click.prevent="addNewLocation" class="mt-2 btn btn-xs">Add Location</b-button>
                        </div>
                      </b-colxx>
                      <b-colxx xxs="12" xs="12" lg="3" class="mb-3">
                        <b-form class="av-tooltip tooltip-label-right">
                          <label class="form-group has-top-label">
                            <b-form-input type="number" v-model="$v.vanin_form.mileage.$model"
                              :state="!$v.vanin_form.mileage.$error" :placeholder="$t('forms.vanin.mileage')"
                              v-on:input="calculateDriven"></b-form-input>
                            <span>{{ $t('forms.vanin.mileage') }}</span>
                            <b-form-invalid-feedback v-if="$v.vanin_form.mileage.$error"> Please enter vehicle
                              mileage!</b-form-invalid-feedback>
                          </label>
                        </b-form>
                      </b-colxx>
                      <b-colxx xxs="12" xs="12" lg="1" class="mb-3">
                        <span>{{ $t('forms.vanin.km_deriven') }}</span>
                        <br>
                        <p>{{ $v.vanin_form.km_deriven.$model }}</p>
                        <!-- <b-form class="av-tooltip tooltip-label-right">
                      <label class="form-group has-top-label">
                        <b-form-input
                        v-model="$v.vanin_form.km_deriven.$model"
                        :state="!$v.vanin_form.km_deriven.$error"
                        :placeholder="$t('forms.vanin.km_deriven')"></b-form-input>
                        <span>{{ $t('forms.vanin.km_deriven') }}</span>
                        <b-form-invalid-feedback v-if="$v.vanin_form.km_deriven.$error"> Please enter vehicle mileage!</b-form-invalid-feedback>
                      </label>
                      </b-form> -->
                      </b-colxx>
                    </b-row>
                    <b-row>
                      <b-colxx xxs="12" xs="6" lg="6" xl="4" class="mb-3">
                        <b-form class="av-tooltip tooltip-label-right">
                          <label class="form-group has-top-label">
                            <b-form-input style="display:none" type="text" v-model.trim="$v.vanin_form.fuel_tank.$model"
                              :state="!$v.vanin_form.fuel_tank.$error" />
                            <v-select v-model="vanin_form.fuel_tank" label="name"
                              :options="['Full', 'Half', 'Empty']"></v-select>
                            <span>{{ $t('forms.vanin.fuel_tank') }}</span>
                            <b-form-invalid-feedback v-if="$v.vanin_form.fuel_tank.$error"> Please enter fuel tank
                              status!</b-form-invalid-feedback>
                          </label>
                        </b-form>
                      </b-colxx>

                      <b-colxx xxs="12" xs="6" lg="6" xl="4" class="mb-3">
                        <b-form class="av-tooltip tooltip-label-right">
                          <label class="form-group has-top-label">
                            <b-form-input v-model="$v.vanin_form.condition.$model"
                              :state="!$v.vanin_form.condition.$error">
                            </b-form-input>
                            <span>{{ $t('forms.vanin.condition') }}</span>
                            <b-form-invalid-feedback v-if="$v.vanin_form.condition.$error"> Please enter vehicle
                              condition!</b-form-invalid-feedback>
                          </label>
                        </b-form>
                      </b-colxx>
                      <b-colxx xxs="12" xs="6" lg="6" xl="4" class="mb-3">
                        <b-form class="av-tooltip tooltip-label-right">
                          <label class="form-group has-top-label">
                            <b-form-input v-model="vanin_form.bond_return_amount" @change="check_bond"></b-form-input>
                            <span>{{ $t('forms.vanin.bond_return_amount') }}</span>
                          </label>
                        </b-form>
                      </b-colxx>

                      <b-colxx v-if="bondComment || vanin_form.bond_diff !== 0" xxs="12" xs="6" lg="6" xl="4"
                        class="mb-3">
                        <b-form class="av-tooltip tooltip-label-right">
                          <label class="form-group has-top-label">
                            <b-form-textarea v-model="vanin_form.bond_comment"></b-form-textarea>
                            <span>
                              <!-- {{ $t('forms.vanin.bond_comment') }} -->
                              Bond return comment
                            </span>
                          </label>
                        </b-form>
                      </b-colxx>

                      <b-colxx xxs="12" xs="6" lg="6" xl="4" class="mb-3">
                        <b-form class="av-tooltip tooltip-label-right">
                          <b-form-input style="display:none" type="text"
                            v-model.trim="$v.vanin_form.require_maintenance.$model"
                            :state="!$v.vanin_form.require_maintenance.$error" />
                          <label class="form-group has-top-label">
                            <v-select v-model="vanin_form.require_maintenance" label="name"
                              :reduce="require_maintenance => require_maintenance.id"
                              aria-placeholder="Require Maintenance"
                              :options="[{ id: 1, name: 'Yes' }, { id: 0, name: 'No' }]"></v-select>
                            <span>{{ $t('forms.vanin.require_maintenance') }}</span>
                          </label>
                          <b-form-invalid-feedback v-if="$v.vanin_form.require_maintenance.$error"> Please select if
                            maintenance is
                            required!</b-form-invalid-feedback>
                        </b-form>
                      </b-colxx>
                      <b-colxx v-if="vanin_form.require_maintenance == 1" xxs="12" xs="6" lg="6" xl="4" class="mb-3"
                        ref="require_maintenance_text_column">
                        <label class="form-group has-top-label">
                          <b-form-textarea v-model="vanin_form.require_maintenance_text"></b-form-textarea>
                          <span>{{ $t('forms.vanin.require_maintenance_text') }}</span>
                        </label>
                      </b-colxx>
                      <b-colxx xxs="12" xs="6" lg="6" xl="4" class="mb-3">
                        <b-form class="av-tooltip tooltip-label-right">
                          <label class="form-group has-top-label">
                            <b-form-input style="display:none" type="text"
                              v-model.trim="$v.vanin_form.demage_caused_by_customer.$model"
                              :state="!$v.vanin_form.demage_caused_by_customer.$error" />
                            <v-select v-model="$v.vanin_form.demage_caused_by_customer.$model" label="name"
                              :reduce="demage => demage.id" aria-placeholder="Demage Caused By Customer"
                              :options="demage_options"></v-select>
                            <span>Damage caused by customer ?</span>
                            <b-form-invalid-feedback v-if="$v.vanin_form.demage_caused_by_customer.$error"> Please
                              select if there was
                              damage caused by customer!</b-form-invalid-feedback>
                          </label>
                        </b-form>
                      </b-colxx>
                      <b-colxx v-if="vanin_form.demage_caused_by_customer == '1'" xxs="12" xs="6" lg="6" xl="4"
                        class="mb-3" ref="demage_picture_column">
                        <!-- <label class="form-group has-top-label"> -->
                        <!-- <b-form-input v-model="vanin_form.demage_picture" ></b-form-input> -->
                        <span>{{ $t('forms.vanin.demage_picture') }}</span>
                        <!-- </label> -->
                        <b-form-file v-model="vanin_form.demage_picture" :placeholder="$t('forms.vanin.demage_picture')"
                          drop-placeholder="Drop file here..." accept="image/*" multiple></b-form-file>
                      </b-colxx>

                      <b-colxx v-if="vanin_form.demage_caused_by_customer == '1'" xxs="12" xs="6" lg="6" xl="4"
                        class="mb-3" ref="demage_vid_column">
                        <span>Upload Demaged Video</span>
                        <!-- </label> -->
                        <b-form-file v-model="vanin_form.demage_vid" placeholder="Upload Demaged Video"
                          drop-placeholder="Drop file here..." accept="video/*"></b-form-file>
                      </b-colxx>


                      <b-colxx v-if="vanin_form.demage_caused_by_customer == '1'" xxs="12" xs="6" lg="6" xl="4"
                        class="mb-3" ref="demage_text_column">
                        <label class="form-group has-top-label">
                          <b-form-textarea v-model="vanin_form.demage_text"></b-form-textarea>
                          <span>{{ $t('forms.vanin.demage_text') }}</span>
                        </label>
                      </b-colxx>

                      <b-colxx xxs="12" xs="12" lg="3" class="mb-3">
                        <b-form class="av-tooltip tooltip-label-right">
                          <div>{{ $t('forms.vanin.return_date') }}</div>
                          <datepicker :bootstrap-styling="true" type="datetime"
                            :placeholder="$t('forms.vanin.return_date')" v-model="vanin_form.return_date"
                            :state="!$v.vanin_form.return_date.$error" value-type="format" @change="calculateDays"
                            format="DD-MM-YYYY h:mm"></datepicker>

                          <b-form-invalid-feedback v-if="$v.vanin_form.return_date.$error"> Please select return
                            date!</b-form-invalid-feedback>
                        </b-form>
                        <!-- <b-form-input v-model="form.due_return" type="date" :placeholder="$t('forms.vanout.due_return')"></b-form-input> -->
                      </b-colxx>
                      <b-colxx xxs="12" xs="12" lg="1" class="mb-3">
                        <span>Total Days</span>
                        <br>
                        <p>{{ vanin_form.total_days }}</p>
                      </b-colxx>
                    </b-row>
                    <b-row>
                      <div v-if="isProcessing">
                        <b-spinner variant="primary"></b-spinner>
                        <span class="text-primary">{{ processing_text }}</span>
                      </div>
                    </b-row>

                    <b-button v-if="!editing_mode" @click.stop="save_vanin_form" variant="primary" class="mt-4 mb-4">{{
                      'Save'
                      }}</b-button>
                    <div v-else>
                      <b-button @click.stop="update_vanreturn(vanin_form.id)" variant="primary" class="mt-4 mb-4">{{
                        'Update'
                        }}</b-button>
                      <b-button @click.stop="$event => cancel_update_vanreturn()" variant="info" class="mt-4 mb-4"><i
                          class="simple-icon-close"></i></b-button>
                    </div>
                  </b-form>
                  <datatable title="" :fields="van_return_fields" :data="vanins" :edit="edit_vanin" :role="roleName"
                    :view="bring_vanin_fields" :del="delete_vanin" :searchColumn="VanReturnSearchColumns" />
                </b-tab>
              </b-tabs>
            </b-card>
          </b-colxx>
        </b-row>
      </b-colxx>
    </b-row>
  </div>
</template>
<style scoped>
.custom-select {
  word-wrap: normal;
  width: 100%;
  height: 4.5em;
  padding-top: 25px;
  padding-bottom: 0;
  color: #524e4e;
  padding-inline: 10px !important;
  font-size: unset;
}
</style>
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
// import Datepicker from "vuejs-datepicker";
// import VueTimepicker from 'vue2-timepicker/src';
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
// import 'vue2-timepicker/dist/VueTimepicker.css'
import { apiUrl } from "../../../constants/config.js";
import modal from "../../ui/components/Modal";
import { mapGetters } from 'vuex';
import datatable from './datatable'
import Customer from '../records/customer_form'
import SwapForm from './SwapForm'
import AcessoriesManagement from './accessories_management.vue'
import moment from 'moment';


export default ({
  components: {
    'v-select': vSelect,
    datepicker: DatePicker,
    datatable: datatable,
    Customer,
    'accessories-management': AcessoriesManagement,
    'swap-form': SwapForm
  },
  data() {
    return {
      today: new Date(),
      new_location: '',
      available_vehicle_options: [],
      isProcessing: true,
      processing_text: 'Loading data please wait ...',
      vanout: [],
      vanin: [],
      user: null,
      roleName: null,
      perPage: 10,
      currentPage: 1,
      editing_mode: false,
      customer_options: [],
      vehicle_options: [],
      location_options: [],
      custom_locations: [],
      accessory_options: [],
      swap_with_options: [],
      booking_options: [],
      out_mileage: 0,
      pre_km: 0,
      newData: null,
      van_out: '',
      swap_status: false,
      bondComment: false,
      return_bond: 0,
      form: {
        booking_id: '',
        customer_id: '',
        vehicle_id: '',
        location_id: '',
        reason_of_renting: 'new',
        swap_with: '',
        rental_priod: '',
        rental_amount: '',
        amount_frequency: 'Per Week',
        mileage: '',
        accessories: [],
        van_out_date: '',
        due_return: '',
        bond_deposit: null,
        payment_mode: null,
        demage_pics: null,
        demage_video: null,
        condition: '',
        long_term: 0,
      },
      VanoutSearchColumns: ["reg_number"],
      VanReturnSearchColumns: ["vehicle"],
      bond_deposit_options: [
        { id: 'bond', name: 'Bond' },
        { id: 'deposit', name: 'Deposit' }
      ],
      payment_mode_options: [
        { id: 'cash', name: 'Cash' },
        { id: 'account', name: 'Account' }
      ],
      vanin_form: {
        van_out_id: '',
        location_id: '',
        mileage: 0,
        fuel_tank: '',
        condition: '',
        require_maintenance: '',
        require_maintenance_text: '',
        demage_caused_by_customer: '',
        demage_picture: '',
        return_date: '',
        demage_text: '',
        bond_return_amount: '',
        km_deriven: 0,
        total_days: '',
        demage_vid: null,
        bond_comment: '',
        bond_diff: 0,
      },
      checkVehicle: null,
      vanout_fields: [
        {
          name: "reg_number",
          title: 'Reg #',
          sortField: "reg_number",
          titleClass: "center aligned",
          dataClass: "center aligned",
          width: "5%"
        },
        {
          name: "customer",
          title: 'Customer',
          sortField: "customer",
          titleClass: "center aligned",
          dataClass: "center aligned",
          width: "5%"
        },
        {
          name: "rental_amount",
          title: 'Rental Amount',
          sortField: "rental_amount",
          titleClass: "center aligned",
          dataClass: "center aligned",
          width: "5%"
        },
        {
          name: "van_out_date",
          title: 'Vehicle Out Date',
          sortField: "van_out_date",
          titleClass: "center aligned",
          dataClass: "center aligned",
          width: "5%"
        },
        {
          name: "return_date",
          title: 'Due Return',
          sortField: "return_date",
          titleClass: "center aligned",
          dataClass: "center aligned",
          width: "5%"
        },
        {
          name: "__slot:added",
          title: 'Added / Updated',
          titleClass: "center aligned",
          dataClass: "center aligned",
          width: "15%"
        },
        {
          name: "__slot:actions",
          title: "Actions",
          titleClass: "center aligned text-right",
          dataClass: "center aligned text-right",
          width: "15%"
        }],
      van_return_fields: [{
        name: "vehicle",
        title: 'Vehicle',
        sortField: "vehicle",
        titleClass: "center aligned",
        dataClass: "center aligned",
        width: "5%"
      },
      {
        name: "customer",
        title: 'Customer',
        sortField: "customer",
        titleClass: "center aligned",
        dataClass: "center aligned",
        width: "5%"
      },
      {
        name: "rental_amount",
        title: 'Rental Amount',
        sortField: "rental_amount",
        titleClass: "center aligned",
        dataClass: "center aligned",
        width: "5%"
      },
      {
        name: "return_date",
        title: 'Return Date',
        sortField: "return_date",
        titleClass: "center aligned",
        dataClass: "center aligned",
        width: "5%"
      },
      {
        name: "total_driven",
        title: 'Total Driven (KM)',
        sortField: "total_driven",
        titleClass: "center aligned",
        dataClass: "center aligned",
        width: "10%"
      },

      {
        name: "days_count",
        title: 'Total Days',
        sortField: "days_count",
        titleClass: "center aligned",
        dataClass: "center aligned",
        width: "5%"
      },

      {
        name: "bond_return_amount",
        title: 'Bond Return Amount',
        sortField: "bond_return_amount",
        titleClass: "center aligned",
        dataClass: "center aligned",
        width: "5%"
      },
      {
        name: "__slot:added",
        title: 'Added / Updated',
        titleClass: "center aligned",
        dataClass: "center aligned",
        width: "15%"
      },
      {
        name: "__slot:actions",
        title: "Actions",
        titleClass: "center aligned text-right",
        dataClass: "center aligned text-right",
        width: "15%"
      }],
      demage_options: [
        { id: 0, name: 'No' },
        { id: 1, name: 'Yes' },
      ],
      swap_options: ["New", "Swap"],
      vanouts: [],
      vanins: [],
      booking: null,
      visible: false,
      swapped_data: [],
      swapped_item: null,
      swap_data: null,
      swap_modal_title: 'Add New Swapped Vehicle Data'
      // venout_fields: ['reg_number', 'customer', 'rental_amount', {'van_out_date': 'Rental Period'}, 'due_return', 'actions'],
      // van_return_fields: ['vehicle', 'customer', 'rental_amount', 'rental_period', 'return_date', 'actions']
    }
  },
  mixins: [validationMixin],
  validations: {
    form: {
      customer_id: {
        required
      },
      vehicle_id: {
        required
      },
      location_id: {
        required
      },
      reason_of_renting: {
        required
      },
      van_out_date: {
        required
      },
      rental_amount: {
        required
      },
      mileage: {
        required
      },

      // demage_video: {
      //   max_size: function () {
      //     return this.maxSize(this.form.demage_video, 5 * 1024 * 1024); // Limit to 5 MB
      //   }
      // },
    },
    vanin_form: {
      van_out_id: {
        required
      },
      location_id: {
        required
      },
      mileage: {
        required
      },
      fuel_tank: {
        required
      },
      condition: {
        required
      },
      return_date: {
        required
      },
      require_maintenance: {
        required
      },
      demage_caused_by_customer: {
        required
      },

      km_deriven: {
        required
      },
      // total_days: {
      //   required
      // },
    }
  },
  computed: {
    ...mapGetters(['currentUser']),
    rows() {
      return this.vanouts.length
    }
  },
  methods: {

    maxSize(value, size) {
      if (!value || !value.size) return true; // If no file is selected, validation passes
      return value.size <= size || `File size should be less than ${(size / (1024 * 1024)).toFixed(2)} MB`;
    },

    changeTab(index) {
      // Custom functionality when a tab is clicked
      if (index == 0) {
        this.cancel_update_vanreturn();
      }
      if (index == 1) {
        this.cancel_update_vanout();
      }
    },

    stopPropagation(event) {
      event.stopPropagation();
    },

    customer_created() {
      this.all_()
      this.$refs['create_customer_modal'].hide()
    },

    swap_created(newBooking) {
      console.log(newBooking);
      this.get_vanouts()
      this.swap_status = false;
      this.$refs['create_swap_modal'].hide()
      this.edit_vanout(this.booking);
      // this.form.vehicle_id = newBooking.vehicle_id
      // this.form.bond_deposit = newBooking.bond_deposit
      // this.form.payment_mode = newBooking.payment_mode
      // this.swapped_data.push(newBooking);
      this.get_all_vehicle_options(newBooking.vehicle_id)
    },

    open_swap_modal() {
      this.swap_modal_title = 'Add New Swapped Vehicle Data'
      this.$refs['create_swap_modal'].show()
    },

    swapped_modal(data) {
      this.visible = false;
      this.swap_modal_title = 'Edit Swapped Vehicle'
      this.swap_data = data;
      this.$refs['create_swap_modal'].show()
    },

    addNewLocation() {
      this.processing_text = 'Saving Data ... ';
      this.isProcessing = true

      axios.post(apiUrl + '/location', { name: this.new_location }, {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      }).then(response => {
        this.isProcessing = false
        this.get_location_options()
        this.form.location_id = response.data.id
        this.new_location = ''
        this.$notify('success filled', 'Success!', 'The locaion has been added!', { duration: 3000 });
      }).catch(error => {
        this.isProcessing = false
        this.$notify('error filled', 'Error', 'Error adding location!', { duration: 3000 });
      })
    },

    onBookingSelect(id) {
      this.processing_text = 'Loading Data ... ';
      this.isProcessing = true
      let booking_id = id
      axios.get(apiUrl + '/vanout-return/' + booking_id, {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      }).then(response => {
        this.vanin_form.location_id = response.data.location_id
        this.vanin_form.mileage = response.data.mileage
        this.out_mileage = response.data.mileage
        this.van_out = response.data.van_out_date
        this.vanin_form.rental_amount = response.data.rental_amount
        this.vanin_form.bond_return_amount = response.data.bond_deposit;
        this.return_bond = response.data.bond_deposit;
        this.$notify('success filled', 'Sucess!', 'The booking data has been autofilled!', { duration: 3000 });
        this.isProcessing = false
      }).catch(error => {
        this.$notify('info filled', 'Info!', 'The booking data could not be autofilled!', { duration: 3000 });
        this.isProcessing = false
      })
    },

    calculateDriven() {
      // var = toFixed
      const totalDriven = parseFloat(this.vanin_form.mileage) - parseFloat(this.out_mileage);
      console.log(totalDriven, this.vanin_form.mileage, this.out_mileage);
      this.vanin_form.km_deriven = totalDriven + this.pre_km;
      // this.vanin_form.km_deriven = (parseFloat(this.vanin_form.km_deriven) || 0) + totalDriven;
      // this.vanin_form.total_driven = totalDriven;
      this.vanin_form.total_driven = this.vanin_form.km_deriven

    },

    calculateDays() {
      // Assuming this.vanin_form.return_date and this.van_out are date strings in "DD-MM-YYYY h:mm" format
      var returnDateObj = moment(this.vanin_form.return_date, "DD-MM-YYYY h:mm");
      var vanOutDateObj = moment(this.van_out, "DD-MM-YYYY h:mm");

      console.log(returnDateObj, vanOutDateObj);

      // Calculate the difference in days
      var day_count = returnDateObj.diff(vanOutDateObj, 'days');
      console.log(day_count);
      if (!isNaN(day_count)) {
        this.vanin_form.total_days = day_count;
      } else {
        this.vanin_form.total_days = 0;
      }
      this.vanin_form.days_count = this.vanin_form.total_days;
    },

    onVehicleSelect(key) {

      this.processing_text = 'Loading Data ... ';
      this.isProcessing = true

      const vehicle_id = key

      //get avable vehicle options
      this.get_available_vehicle_options(vehicle_id)


      axios.get(apiUrl + '/vehicle/' + vehicle_id, {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      }).then(response => {

        let maintenanceData = response.data

        if (maintenanceData) {
          this.form.mileage = response.data.mileage
          this.$notify('success filled ', 'Success!', 'The mileage data has been added to field', { duration: 3000, permanent: false });
          this.isProcessing = false
        } else {
          this.form.mileage = ''
          this.$notify('info filled', 'Info!', 'No milage data for this vehicle, please manually fill it', { duration: 3000, permanent: false });
          this.isProcessing = false
        }
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

        let maintenanceData = response.data.maintenance

        if (maintenanceData.length > 0) {
          this.form.mileage = response.data.maintenance[maintenanceData.length - 1].mileage
          this.$notify('success filled ', 'Success!', 'The mileage data has been added to field', { duration: 3000, permanent: false });
          this.isProcessing = false
        } else {
          this.form.mileage = ''
          this.$notify('info filled', 'Info!', 'No milage date for this vehicle, please manually fill it', { duration: 3000, permanent: false });
          this.isProcessing = false
        }
      })
    },

    onCustomerSelect(key) {
      axios.get(apiUrl + '/customer_van_out/' + key, {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      }).then(response => {
        console.log(response.data);
        if (response.data) {
          const vanOutId = response.data;
          this.edit_vanout(vanOutId);
        }
      })
    },

    bring_fields(data) {
      return this.$router.push({ path: '/app/bookings/out/' + data.id });
      // this.vanout.swapped_name = data.swaped_detail?.reg_plate_number ?? null;
      // this.vanout.swapped_model = data.swaped_detail?.model ?? null;
      // this.$refs.vanoutModal.show()
    },

    check_bond() {
      console.log("checked data");
      if (this.vanin_form.bond_return_amount !== this.return_bond) {
        this.bondComment = true;
        this.vanin_form.bond_diff = this.return_bond - this.vanin_form.bond_return_amount;
      }
      else {
        this.bondComment = false;
        this.vanin_form.bond_diff = 0;
      }
    },

    bring_vanin_fields(data) {
      return this.$router.push({ path: '/app/bookings/in/' + data.id });
      // console.log(data)
      // this.vanin = data
      // this.$refs.vanInModal.show()
    },

    save_vanout_form() {

      this.$v.form.$touch();
      if (this.$v.form.$anyError == true) {
        return false;
      }

      this.processing_text = 'Saving Vehicle out Data ...'
      this.isProcessing = true

      if (this.form.swap_with == "Select Vehicle to swap with") {
        this.form.swap_with = null
      }

      axios.post(apiUrl + '/vanout', this.form, {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
          'content-type': 'multipart/form-data',
        }
      }).then(response => {
        //refresh the table data
        this.get_vanouts()
        this.get_all_vehicle_options()

        //send success notification
        this.$notify(
          'success filled',
          'Success!',
          response.data.message,
          { duration: 3000, permanent: false });

        this.$v.form.$reset()
        this.$refs.outresetButton.click();
        this.form = {
          user_id: '',
          vehicle_id: '',
          location_id: '',
          reason_of_renting: '',
          swap_with: '',
          rental_priod: '',
          rental_amount: '',
          rental_frequency: '',
          mileage: '',
          accessory_id: '',
          due_return: '',
          bond_deposit: '',
          payment_mode: ''
        }
        this.isProcessing = false
        this.all_()
        this.get_active_vehicle_options()
      }).catch(error => {
        this.$notify('error filled', 'Error!', error.response.data.message, { duration: 3000, permanent: false });
        this.isProcessing = false
      });
    },

    save_vanin_form() {
      this.$v.vanin_form.$touch();
      if (this.$v.vanin_form.$anyError == true) {
        return false;
      }
      // console.log(this.vanin_form)
      // this.processing_text = 'Saving Van-in Data ....'
      // this.isProcessing = true
      (this.vanin_form.fuel_tank == 'Fuel Tank Level') ? '' : this.vanin_form.fuel_tank
      this.processing_text = 'Saving Vehicle Return Data ....'
      this.isProcessing = true

      axios.post(apiUrl + '/van_return', this.vanin_form, {
        headers: {
          'content-type': 'multipart/form-data',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      }).then(response => {
        this.reset_form()
        this.$v.vanin_form.$reset()
        //refresh the table data
        // this.get_vanins()
        // this.get_vanouts()
        //send success notification
        this.$notify(
          'success filled',
          'Success!',
          'Vehicle In record has been saved.',
        )
        this.isProcessing = false
        this.all_()
        this.get_active_vehicle_options()
        this.get_vanins()
        this.get_vanouts()
        this.get_all_customer_options()
      }).catch(error => {
        this.$notify('error filled', 'Error!', error.response.data.message, { duration: 3000, permanent: false });
        this.isProcessing = false
      })
    },

    edit_vanout(item) {
      console.log(item);
      this.booking = item;
      this.processing_text = 'Loading Data ...'
      this.isProcessing = true
      this.van_out_date = ''
      // item.swap_with,
      this.editing_mode = true;
      this.swap_status = true;
      //get vanout data
      this.checkVehicle = item.old_vehicle;
      axios.get(apiUrl + '/vanout/' + item.id, {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      }).then(response => {
        console.log(response.data);
        this.form = response.data;
        this.form.vehicle_id = response.data.old_vehicle_id,
          this.form.demage_pics = response.data.galleries,
          this.swapped_data = response.data.swaps;
        this.form.long_term = response.data.long_term
        if (response.data.reason_of_renting == 'Swap') {
          this.swap_status = false;
        }
        this.booking_create_option = ({ id: item.id, name: item.reg_number })
        this.isProcessing = false
        var accessories_to_set = [];
        response.data.accessories.map((value, key) => {
          accessories_to_set.push(value.id)
        })
        console.log(accessories_to_set)
        this.form.accessories = accessories_to_set
        this.get_active_vehicle_options(this.form.vehicle_id)

        // if (item.swap_with != null) {
        //   axios.get(apiUrl + '/vehicle/' + item.swap_with, {
        //     headers: {
        //       'Authorization': 'Bearer ' + localStorage.getItem('token')
        //     }
        //   }).then(response => {

        //     // this.newData = {
        //     //   id: response.data.id,
        //     //   name: response.data.name
        //     // }
        //     // window.setTimeout(() => {
        //       // this.available_vehicle_options.push(this.newData);
        //     // }, 3000);

        //     console.log(this.available_vehicle_options);
        //     if (response.data) {
        //       this.form.mileage = response.data.mileage
        //       this.$notify('success filled ', 'Success!', 'The mileage data has been added to field', { duration: 3000, permanent: false });
        //       this.isProcessing = false
        //     } else {
        //       this.form.mileage = ''
        //       this.$notify('info filled', 'Info!', 'No milage date for this vehicle, please manually fill it', { duration: 3000, permanent: false });
        //       this.isProcessing = false
        //     }
        //   })
        // }
      })

      this.get_active_vehicle_options(item.old_vehicle_id, item.vehicle_type_id)
      this.get_all_customer_options(item.customer_id)
    },

    get_swapped(swap) {
      this.visible = !this.visible;
      this.swapped_item = swap;
    },

    edit_vanin(item) {
      this.out_mileage = 0
      this.processing_text = 'Loading Data...'
      this.isProcessing = true


      this.editing_mode = true;

      this.get_returned_van_out_options(item.van_out_id)

      //get vanout data
      axios.get(apiUrl + '/van_return/' + item.id, {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      })
        .then(response => {
          this.vanin_form = response.data
          this.vanin_form.km_deriven = response.data.total_driven
          this.pre_km = response.data.total_driven
          this.vanin_form.total_days = response.data.days_count
          this.out_mileage = response.data.mileage
          this.vanin_form.require_maintenance = parseInt(response.data.require_maintenance)
          this.vanin_form.demage_caused_by_customer = parseInt(response.data.demage_caused_by_customer)
          this.vanin_form.location_id = parseInt(response.data.location_id)
          this.vanin_form.van_out_id = parseInt(response.data.van_out_id)
          this.vanin_form.bond_return_amount = Number(response.data.bond_return_amount) + Number(response.data.bond_diff)
          this.isProcessing = false
        })
    },

    update_vanout(id) {

      this.processing_text = 'Updating Vehicle Out Data....'
      this.isProcessing = true

      axios.put(apiUrl + '/vanout/' + id, this.form, {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      }).then(response => {
        //refresh the table data
        this.get_vanouts()
        this.get_vanout_options()
        this.reset_form()
        this.editing_mode = false
        this.$notify(
          'success filled',
          'Success!',
          response.data.message
        )
        this.isProcessing = false
      });
    },

    update_vanreturn(id) {

      this.processing_text = 'Updating Vehicle Return Data ....'
      this.isProcessing = true

      axios.post(apiUrl + '/van_return/' + id, { ...this.vanin_form, '_method': 'PUT' }, {
        headers: {
          'content-type': 'multipart/form-data',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      }).then(response => {

        this.get_vanins()
        this.reset_form()
        this.editing_mode = false
        this.$notify(
          'success filled',
          'Success!',
          response.data.message
        )
        this.isProcessing = false
      })
    },
    cancel_update_vanout() {
      this.get_active_vehicle_options()
      this.all_()
      this.editing_mode = false;
      this.reset_form();
    },

    cancel_update_vanreturn() {
      this.editing_mode = false;
      this.reset_form();
      this.get_vanout_options();
    },

    reset_form() {
      this.form = {
        user_id: '',
        vehicle_id: '',
        location_id: '',
        reason_of_renting: 'new',
        swap_with: '',
        rental_priod: '',
        rental_amount: '',
        amount_frequency: '',
        mileage: '',
        due_return: '',
        bond_deposit: '',
        payment_mode: ''
      }
      this.vanin_form = {
        van_out_id: '',
        location_id: '  ',
        mileage: '',
        fuel_tank: '',
        condition: '',
        require_maintenance: '',
        require_maintenance_text: '',
        damage_caused_by_customer: '',
        demage_picture: '',
        demage_text: '',
        total_driven: 0,
        days_count: '',
      }
    },

    delete_vanout(item) {
      this.processint_text = 'Deleting Vehicle Out Data...';
      this.isProcessing = true

      axios.delete(apiUrl + '/vanout/' + item.id, {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      }).then(response => {
        //refresh the table data
        this.get_active_vehicle_options()
        this.$notify(
          'success filled',
          'Success!',
          response.data.message
        )
        this.isProcessing = false
        window.setTimeout(() => {
          window.location.reload();
        }, 1000);
      })
    },

    delete_vanin(item) {

      this.processint_text = 'Deleting Vehicle In Data...';
      this.isProcessing = true

      axios.delete(apiUrl + '/van_return/' + item.id, {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      }).
        then(response => {
          //refresh the table data
          this.get_vanins()
          this.$notify(
            'success filled',
            'Success!',
            response.data.message
          )
          this.isProcessing = false
        })
    },


    //Get Selection Options form API
    get_all_customer_options(id = null) {

      this.processing_text = 'Loading Data ..'
      this.isProcessing = true

      axios.get(apiUrl + '/all_customer_options?selected=' + id, {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      }).then(response => {
        this.customer_options = response.data
        this.isProcessing = false
      })
    },

    all_(id = null) {

      this.processing_text = 'Loading Data ..'
      this.isProcessing = true

      axios.get(apiUrl + '/customer_options?selected=' + id, {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      }).then(response => {
        this.customer_options = response.data
        this.isProcessing = false
      })
    },
    get_available_vehicle_options(id, swap = null, type = null) {

      this.processing_text = 'Loading Data..'
      this.isProcessing = true

      axios.get(apiUrl + '/available_vehicles_options/' + id + '/' + swap + '/' + type, {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      }).then(response => {
        this.available_vehicle_options = response.data;
        this.isProcessing = false
      })
    },
    get_active_vehicle_options(id = null, type = null) {

      axios.get(apiUrl + '/vehicle_options?selected=' + id + '&type=' + type,
        {
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          }
        }).then(response => {

          this.vehicle_options = response.data
        })
    },

    get_all_vehicle_options(id) {
      console.log('this is all vehicle options');
      axios.get(apiUrl + '/vehicle_options?selected=' + id, {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      }).then(response => {
        this.vehicle_options = response.data
      })
    },

    handleFileChange(event) {
      this.form.demage_pics = event.target.files[0];
      console.log(event); // Check the selected files in the console
    },


    get_location_options() {
      axios.get(apiUrl + '/location_options', {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      }).then(response => {
        this.location_options = response.data
        // this.custom_locations = this.location_options.map(item => {

        // })
      })
    },

    get_accessory_options() {
      axios.get(apiUrl + '/accessory', {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      }).then(response => {
        this.accessory_options = response.data
      })
    },

    refresh_accessories_list() {
      //console.log('function has been called');
      //this.$refs.addAcessoryModal.hide();
      this.get_accessory_options();
    },

    get_vanout_options(id = null) {

      this.processing_text = 'Loading Data ..'
      this.isProcessing = true

      axios.get(apiUrl + '/van_out_options?selected=' + id, {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      }).then(response => {
        this.booking_options = response.data
        this.isProcessing = false
      })
    },

    get_returned_van_out_options(id) {

      this.processing_text = "Loding Data..."
      this.isProcessing = true

      axios.get(apiUrl + '/van_out_options?selected=' + id, {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      }).then(async response => {
        this.booking_options = await response.data
        this.isProcessing = false
      })
    },

    get_vanouts() {
      //Van Ins
      axios.get(
        apiUrl + '/vanout?mode=active', {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      }
      ).then(response => {
        {
          //parse json data
          this.vanouts = response.data

          this.get_vanout_options()
          // this.$notify(
          //   'info filled',
          //   'Data Loaded!',
          //   'Vehicle Out data loaded.',
          //   { duration: 3000, permanent: false });
        }
      })
    },

    get_vanins() {
      //Van Ins
      axios.get(
        apiUrl + '/van_return', {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      }
      ).then(response => {
        {
          //parse json data
          this.vanins = response.data
          console.log(response.data);
        }
      })
    },

    getCurrentDateTime() {
      const today = new Date()
      const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
      const time = today.getHours() + ":" + today.getMinutes()
      const dateTime = date + ' ' + time
      return dateTime
    }

  },
  mounted() {

    this.$nextTick(() => {
      // Add event listener to tab titles
      const tabTitles = document.querySelectorAll('.van_out_tab'); // Adjust the selector as per your HTML structure
      tabTitles.forEach(tabTitle => {
        tabTitle.addEventListener('click', this.handleTabClick);
      });
    });

    console.log('Date -> ', new Date().toISOString('dd-MM-yyyy'));
    //this.form.van_out_date = new Date().toISOString()

    if (localStorage.getItem('token') !== null) {
      this.$store.commit('setUser', JSON.parse(localStorage.getItem('user')));
    } else {
      this.$router.push('/user/login');
    }

    this.get_all_customer_options()
    // this.get_available_vehicle_options()
    this.get_active_vehicle_options()
    this.get_location_options()
    this.get_accessory_options()
    this.get_vanout_options()
    this.get_vanouts()
    this.get_vanins()

  },
  watch: {
    currentUser() {
      this.user = this.currentUser
      this.roleName = this.currentUser.role_name ?? null
    },
  }
})
</script>
