<template>
  <div>
    <b-row>
      <b-modal ref="create_customer_modal" id="modallg" size="lg" title="Create Customer" hide-footer>
        <customer :cc="customer_created" />
      </b-modal>
      <b-modal id="vanoutModal" size="lg" ref="vanoutModal" >
      <table class="stacked table">
        <tr><td>Booking ID:</td><td> {{ vanout.id }}</td></tr>
        <tr><td>Registration Plate Number:</td><td> {{ vanout.reg_number }}</td></tr>
        <tr><td>Customer:</td><td> {{ vanout.customer }}</td></tr>
        <tr><td>Vehicle:</td><td> {{ vanout.vehicle }}</td></tr>
        <tr><td>Mileage:</td><td> {{ vanout.mileage }}</td></tr>
        <tr><td>Location:</td><td> {{ vanout.location }}</td></tr>
        <tr><td>New / Swap:</td><td> {{ vanout.reason_of_renting }}</td></tr>
        <tr><td>Model:</td><td> {{ vanout.model }}</td></tr>
        <tr><td>Accessories:</td><td>
           <span class="badge badge-light mr-2" v-for="accessory in vanout.accessories" :key="accessory.id">
            {{ accessory.name }}
          </span>
        </td></tr>
        <tr v-if="vanout.reason_of_renting != 'New'"><td>Swap with:</td><td> {{ vanout }}</td></tr>
        <tr><td>Rental Period:</td><td> {{ vanout.rental_period }} Days</td></tr>
        <tr><td>Rental Amount:</td><td>$ {{ vanout.rental_amount }} / {{ vanout.amount_frequency }}</td></tr>
        <tr><td>Vehicle out date:</td><td> {{ vanout.van_out_date }}</td></tr>
        <tr><td>Due return date:</td><td> {{ vanout.due_return }}</td></tr>
        <tr><td>Bond/Deposit:</td><td> {{ vanout.bond_deposit }}</td></tr>
        <tr><td>Payment Mode:</td><td> {{ vanout.payment_mode }}</td></tr>

      </table>
    </b-modal>
    <b-modal hide-footer hide-header id="addAcessoryModal" size="xl" ref="addAcessoryModal" >
        <accessories-management :refresh=refresh_accessories_list :accessories=accessory_options />
    </b-modal>
    <b-modal id="vanInModal" size="lg" ref="vanInModal" >
      <table class="stacked table">
        <tr><th>Booking ID:</th><td> {{ vanin.id }}</td></tr>
        <tr><th>Vehicle:</th><td> {{ vanin.vehicle }}</td></tr>
        <tr><th>Customer:</th><td> {{ vanin.customer }}</td></tr>
        <tr><th>Rental Amount:</th><td> {{ vanin.rental_amount }}</td></tr>
        <tr><th>Rental Period:</th><td> {{ vanin.rental_period }}</td></tr>
        <tr><th>Location:</th><td> {{ vanin.location }}</td></tr>
        <tr><th>Mileage:</th><td> {{ vanin.mileage }}</td></tr>
        <tr><th>Fuel Tank:</th><td> {{ vanin.fuel_tank }}</td></tr>
        <tr><th>Condition:</th><td> {{ vanin.condition }}</td></tr>
        <tr><th>Bond Return Amount:</th><td> {{ vanin.bond_return_amount }}</td></tr>
        <tr><th>Damage caused by customer:</th><td> {{ vanin.damage_caused_by_customer }}</td></tr>
        <tr v-if="vanin.damage_caused_by_customer == 'Yes'"><th>Damage Picture:</th><td> <img width="200"  :src="vanin.demage_picture" /></td></tr>
        <tr v-if="vanin.damage_caused_by_customer == 'Yes'"><th>Damage Text:</th><td> {{ vanin.demage_text }}</td></tr>
        <tr><th>Return Date:</th><td> {{ vanin.return_date }}</td></tr>
        <tr><th>Require Maintenance:</th><td> {{ vanin.require_maintenance }}</td></tr>
        <tr><th>Require Maintenance Text:</th><td> {{ vanin.require_maintenance_text }}</td></tr>
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
              <b-tab title="Vehicle Out" active title-item-class="w-50 text-center">
                <b-form>
                  <b-row>
                    <b-colxx xxs="12" xs="4" lg="4" >
                      <b-form class="av-tooltip tooltip-label-right">
                        <!-- <b-form-group :label="$t('forms.vanout.customer')"> -->
                          <label class="form-group has-top-label">
                          <b-form-input style="display:none" type="text" v-model.trim="$v.form.customer_id.$model" :state="!$v.form.customer_id.$error" />
                          <v-select v-model="form.customer_id"
                            label="name"
                            :key="form.customer_id"
                            :reduce="customer => customer.id"
                            :options="customer_options"
                          >
                          <template #list-header>
                            <b-button v-b-modal.modallg  variant="outline-primary btn-xs" class="mr-2 mb-2">Add Customer</b-button>
                            <!-- <button  style="margin: 10px 0" class="btn btn-primary btn-xs">Add Customer</button> -->
                          </template>
                          </v-select>
                          <span>{{ $t('forms.vanout.customer') }}</span>
                          <b-form-invalid-feedback v-if="$v.form.customer_id.$error"> Please select the customer!</b-form-invalid-feedback>
                        <!-- </b-form-group> -->
                        </label>
                      </b-form>
                    </b-colxx>

                    <b-colxx xxs="12" xs="4" lg="4" class="mb-3">
                      <b-form class="av-tooltip tooltip-label-right">
                        <label class="form-group has-top-label">
                        <!-- <b-form-group :label="$t('forms.vanout.vehicle')"> -->
                          <b-form-input style="display:none" type="text" v-model.trim="$v.form.vehicle_id.$model" :state="!$v.form.vehicle_id.$error" />
                          <v-select v-model="form.vehicle_id"
                            v-on:input="onVehicleSelect"
                            label="name"
                            :key="form.vehicle_id"
                            :reduce="vehicle => vehicle.id"
                              :options="vehicle_options"
                            ></v-select>
                            <span>{{ $t('forms.vanout.vehicle') }}</span>
                            <b-form-invalid-feedback v-if="$v.form.customer_id.$error"> Please select the vehicle!</b-form-invalid-feedback>
                          <!-- </b-form-group> -->
                          </label>
                      </b-form>
                    </b-colxx>
                    <b-colxx xxs="12" xs="4" lg="4" class="mb-3">
                      <b-form class="av-tooltip tooltip-label-right">
                        <label class="form-group has-top-label">
                        <!-- <b-form-group :label="$t('forms.vanout.location')"> -->
                          <b-form-input style="display:none" type="text" v-model.trim="$v.form.location_id.$model" :state="!$v.form.location_id.$error" />
                          <v-select v-model="form.location_id"
                              label="name"
                              :key="form.location_id"
                              :reduce="location => location.id"
                              aria-placeholder="Select Customer"
                              :options="location_options"
                          ></v-select>
                          <span>{{ $t('forms.vanout.location') }}</span>
                          <b-form-invalid-feedback v-if="$v.form.location_id.$error"> Please select the location!</b-form-invalid-feedback>
                        <!-- </b-form-group> -->
                        </label>
                      </b-form>
                      <div v-if="form.location_id == '4'">
                        <b-form-input placeholder="Title of location" v-model="new_location" ></b-form-input>
                        <b-button @click.prevent="addNewLocation" class="mt-2 btn btn-xs">Add Location</b-button>
                      </div>
                    </b-colxx>
                  </b-row>
                  <b-row>
                    <b-colxx xxs="12" xs="4" lg="4" class="mb-3">
                      <b-form class="av-tooltip tooltip-label-right">
                        <!-- <b-form-input v-model="form.swap_with" :placeholder="$t('forms.vanout.swap_with')"></b-form-input> -->
                        <label class="form-group has-top-label">
                          <b-form-input style="display:none" type="text" v-model.trim="$v.form.reason_of_renting.$model" :state="!$v.form.reason_of_renting.$error" />
                          <v-select v-model="form.reason_of_renting"
                          aria-placeholder="New / Swap"
                            :options="swap_options"
                          ></v-select>
                          <span>{{ $t('forms.vanout.reason_of_renting') }}</span>
                          <b-form-invalid-feedback v-if="$v.form.reason_of_renting.$error"> Please reason of renting!</b-form-invalid-feedback>
                        </label>
                        <label v-if="form.reason_of_renting == 'Swap'" class="form-group has-top-label">
                          <v-select
                          v-model="form.swap_with"
                          label="name"
                          :reduce="swap_with => swap_with.id"
                          aria-placeholder="Select Vehicle to swap with"
                            :options="available_vehicle_options"
                          ></v-select>
                          <span>{{ $t('forms.vanout.swap_with') }}</span>
                        </label>
                        </b-form>
                    </b-colxx>
                    <!-- <b-colxx xxs="12" xs="4" lg="4" class="mb-3">
                      <label class="form-group has-top-label">
                      <b-form-input v-model="form.rental_period"></b-form-input>
                      <span>{{ $t('forms.vanout.rental_period') }}</span>
                      </label>
                    </b-colxx> -->
                    <b-colxx xxs="12" xs="4" lg="4" class="mb-3">
                      <b-form class="av-tooltip tooltip-label-right">
                      <div >{{ $t('forms.vanout.rental_period') }}</div>
                      <b-form-input style="display:none" type="text" v-model.trim="$v.form.van_out_date.$model" :state="!$v.form.van_out_date.$error" />
                        <datepicker
                          :default-value="today"
                          type="datetime"
                          v-model="$v.form.van_out_date.$model"
                          :state="!$v.form.van_out_date.$error"
                          :placeholder="$t('forms.vanout.rental_period')"
                          value-type="format"
                          format="DD-MM-YYYY h:mm"
                        ></datepicker>
                        <b-form-invalid-feedback v-if="$v.form.van_out_date.$error"> Rental </b-form-invalid-feedback>
                        </b-form>
                    </b-colxx>
                    <b-colxx xxs="12" xs="2" lg="2" class="mb-3">
                      <b-form class="av-tooltip tooltip-label-right">
                      <label class="form-group has-top-label">
                        <b-form-input v-model="$v.form.rental_amount.$model" :state="!$v.form.rental_amount.$error" ></b-form-input>
                        <span>{{ $t('forms.vanout.rental_amount') }}</span>
                        <b-form-invalid-feedback v-if="$v.form.rental_amount.$error"> Please add rental amount! </b-form-invalid-feedback>
                      </label>
                      </b-form>
                    </b-colxx>
                    <b-colxx xxs="12" xs="2" lg="2" class="mb-3">
                      <b-form class="av-tooltip tooltip-label-right">
                            <b-form-radio-group
                              id="amount-frequency"
                              v-model="form.amount_frequency"
                              name="amount-frequency"
                            >
                              <b-form-radio value="Per Day" >Per Day</b-form-radio>
                              <b-form-radio value="Per Week">Per Week</b-form-radio>
                            </b-form-radio-group>
                        </b-form>
                    </b-colxx>

                  </b-row>
                  <b-row>
                    <b-colxx xxs="12" xs="4" lg="4" class="mb-3">
                      <b-form class="av-tooltip tooltip-label-right">
                        <label class="form-group has-top-label">
                        <b-form-input v-model="$v.form.mileage.$model" :state="!$v.form.mileage.$error" ></b-form-input>
                        <span> {{ $t('forms.vanout.mileage') }}</span>
                        <b-form-invalid-feedback v-if="$v.form.mileage.$error"> Please add mileage! </b-form-invalid-feedback>
                        </label>
                    </b-form>
                    </b-colxx>
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
                          <b-checkbox v-model="form.accessories" :value="accessory.id">{{ accessory.name }}</b-checkbox>
                        </b-colxx>
                      </b-row>
                    </b-colxx>
                    <b-colxx xxs="12" xs="4" lg="4" class="mb-3">
                      <button type="button" v-b-modal.addAcessoryModal  class="btn btn-xs btn-secondary"> Add Accessory</button>
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
                    <b-colxx xxs="12" xs="4" lg="4" class="mb-3">
                      <div>{{ $t('forms.vanout.due_return') }}</div>
                      <datepicker
                        type="datetime"
                        v-model="form.due_return"
                        :placeholder="$t('forms.vanout.due_return')"
                        value-type="format"
                        format="DD-MM-YYYY hh:mm"
                      ></datepicker>
                      <!-- <b-form-input v-model="form.due_return" type="date" :placeholder="$t('forms.vanout.due_return')"></b-form-input> -->
                    </b-colxx>
                    <div v-if="isProcessing">
                        <b-spinner variant="primary" ></b-spinner>
                        <span class="text-primary">{{ processing_text }}</span>
                    </div>
                  </b-row>
                  <b-row>
                    <b-colxx xxs="12" xs="3" lg="3" class="mb-3">
                      <label class="form-group has-top-label">
                        <b-form-input
                        v-model="form.bond_deposit"
                          >
                      </b-form-input>
                      <span>{{ $t('forms.toll.bond_deposit') }}</span>
                      </label>
                    </b-colxx>
                    <b-colxx xxs="12" xs="3" lg="3" class="mb-3">
                      <label class="form-group has-top-label">
                        <v-select v-model="form.payment_mode"
                          label="name"
                          :reduce="customer => customer.id"
                          :options="payment_mode_options"
                      ></v-select>
                      <span>{{ $t('forms.toll.payment_mode') }}</span>
                      </label>
                    </b-colxx>
                  </b-row>
                  <b-button v-if="!editing_mode"  @click.stop="save_vanout_form"  variant="primary" class="mt-4 mb-4">{{ 'Save' }}</b-button>
                  <div v-else>
                    <b-button  @click.stop="update_vanout(form.id)"  variant="secondary" class="mt-4 mb-4">{{ ' Update' }}</b-button>
                    <b-button  @click.stop="cancel_update_vanout()"  variant="info" class="mt-4 mb-4"><i class="simple-icon-close"></i></b-button>
                  </div>
                </b-form>
                <datatable title="" :fields="vanout_fields" :data="vanouts" :edit="edit_vanout" :view="bring_fields"  :del="delete_vanout" :searchColumn="VanoutSearchColumns" />
              </b-tab>
              <b-tab title="Vehicle In" title-item-class="w-50 text-center">
                <!-- Content for van out -->
                <b-form >
                  <b-row>
                    <b-colxx xxs="12" xs="4" lg="4" class="mb-3">

                      <b-form class="av-tooltip tooltip-label-right">
                        <label class="form-group has-top-label">
                          <b-form-input style="display:none" type="text" v-model.trim="$v.vanin_form.van_out_id.$model" :state="!$v.vanin_form.van_out_id.$error" />
                          <v-select v-model="$v.vanin_form.van_out_id.$model"
                            label="booking_regnumber"
                            :reduce="booking => booking.id"
                            aria-placeholder="Booking"
                            :options="booking_options"
                            :create-option="booking => ({ booking_regnumber: booking.regnumber, id: booking.id })"
                            taggable
                            v-on:input="onBookingSelect"
                          ></v-select>
                          <span>{{ $t('forms.vanin.van_out') }}</span>
                          <b-form-invalid-feedback v-if="$v.vanin_form.van_out_id.$error"> Please select the Booking!</b-form-invalid-feedback>
                        </label>
                      </b-form>
                    </b-colxx>
                    <b-colxx xxs="12" xs="4" lg="4" class="mb-3">
                      <b-form class="av-tooltip tooltip-label-right">
                        <label class="form-group has-top-label">
                          <b-form-input style="display:none" type="text" v-model.trim="$v.vanin_form.location_id.$model" :state="!$v.vanin_form.location_id.$error" />
                          <v-select v-model="$v.vanin_form.location_id.$model"
                            label="name"
                            taggable
                            :create-option="location => ({ name: location.name, id: location.id })"
                            :reduce="location => location.id"
                              aria-placeholder="Select Location"
                              :options="location_options"
                            ></v-select>
                            <span>{{ $t('forms.vanin.location') }}</span>
                            <b-form-invalid-feedback v-if="$v.vanin_form.location_id.$error"> Please select Location!</b-form-invalid-feedback>
                        </label>
                      </b-form>
                      <div v-if="vanin_form.location_id == '4'">
                        <b-form-input placeholder="Title of location" v-model="new_location" ></b-form-input>
                        <b-button @click.prevent="addNewLocation" class="mt-2 btn btn-xs">Add Location</b-button>
                      </div>
                    </b-colxx>
                    <b-colxx xxs="12" xs="4" lg="3" class="mb-3">
                      <b-form class="av-tooltip tooltip-label-right">
                      <label class="form-group has-top-label">
                        <b-form-input
                        v-model="$v.vanin_form.mileage.$model"
                        :state="!$v.vanin_form.mileage.$error"
                        :placeholder="$t('forms.vanin.mileage')"
                        @change="calculateDriven"></b-form-input>
                        <span>{{ $t('forms.vanin.mileage') }}</span>
                        <b-form-invalid-feedback v-if="$v.vanin_form.mileage.$error"> Please enter vehicle mileage!</b-form-invalid-feedback>
                      </label>
                      </b-form>
                    </b-colxx>
                    <b-colxx xxs="12" xs="4" lg="1" class="mb-3">
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
                    <b-colxx xxs="12" xs="4" lg="4" class="mb-3">
                      <b-form class="av-tooltip tooltip-label-right">
                      <label class="form-group has-top-label">
                        <b-form-input style="display:none" type="text" v-model.trim="$v.vanin_form.fuel_tank.$model" :state="!$v.vanin_form.fuel_tank.$error" />
                        <v-select v-model="vanin_form.fuel_tank"
                          label="name"
                            :options="['Full', 'Half', 'Empty']"
                          ></v-select>
                          <span>{{ $t('forms.vanin.fuel_tank') }}</span>
                          <b-form-invalid-feedback v-if="$v.vanin_form.fuel_tank.$error"> Please enter fuel tank status!</b-form-invalid-feedback>
                        </label>
                        </b-form>
                    </b-colxx>
                    <b-colxx xxs="12" xs="4" lg="4" class="mb-3">
                      <b-form class="av-tooltip tooltip-label-right">
                      <label class="form-group has-top-label">
                        <b-form-input
                        v-model="$v.vanin_form.condition.$model"
                        :state="!$v.vanin_form.condition.$error"
                         >
                        </b-form-input>
                        <span>{{ $t('forms.vanin.condition') }}</span>
                        <b-form-invalid-feedback v-if="$v.vanin_form.condition.$error"> Please enter vehicle condition!</b-form-invalid-feedback>
                      </label>
                      </b-form>
                      </b-colxx>
                    <b-colxx xxs="12" xs="4" lg="3" class="mb-3">
                      <b-form class="av-tooltip tooltip-label-right">
                      <div>{{ $t('forms.vanin.return_date') }}</div>
                          <datepicker
                            :bootstrap-styling="true"
                            :placeholder="$t('forms.vanin.return_date')"
                            v-model="$v.vanin_form.return_date.$model"
                            :state="!$v.vanin_form.return_date.$error"
                            value-type="format"
                            @change="calculateDays"
                          ></datepicker>
                          <!-- format="DD-MM-YYYY h:mm" -->
                          <b-form-invalid-feedback v-if="$v.vanin_form.return_date.$error"> Please select return date!</b-form-invalid-feedback>
                        </b-form>
                      <!-- <b-form-input v-model="form.due_return" type="date" :placeholder="$t('forms.vanout.due_return')"></b-form-input> -->
                    </b-colxx>
                    <b-colxx xxs="12" xs="4" lg="1" class="mb-3">
                      
                      <p>{{ this.vanin_form.bond_return_amount }}</p>
                    </b-colxx>
                    <b-colxx xxs="12" xs="4" lg="4" class="mb-3">
                      <b-form class="av-tooltip tooltip-label-right">
                      <label class="form-group has-top-label">
                        <b-form-input
                        v-model="vanin_form.bond_return_amount"
                        ></b-form-input>
                        <span>{{ $t('forms.vanin.bond_return_amount') }}</span>
                        <!-- <b-form-invalid-feedback v-if="$v.vanin_form.bond_return_amount.$error"> Please enter bond return amount!</b-form-invalid-feedback> -->
                      </label>
                      </b-form>
                    </b-colxx>
                  </b-row>
                  <b-row>
                    <b-colxx xxs="12" xs="4" lg="4" class="mb-3">
                      <b-form class="av-tooltip tooltip-label-right">
                        <b-form-input style="display:none" type="text" v-model.trim="$v.vanin_form.require_maintenance.$model" :state="!$v.vanin_form.require_maintenance.$error" />
                      <!-- <b-form-input v-model="vanin_form.demage_caused_by_customer" :placeholder="$t('forms.vanin.demage_caused_by_customer')"></b-form-input> -->
                      <label class="form-group has-top-label">
                        <v-select v-model="vanin_form.require_maintenance"
                        label="name"
                        :reduce="require_maintenance => require_maintenance.id"
                          aria-placeholder="Require Maintenance"
                          :options="[{id:1, name:'Yes'}, {id:0, name:'No'}]"
                        ></v-select>
                        <span>{{ $t('forms.vanin.require_maintenance') }}</span>
                        </label>
                        <b-form-invalid-feedback v-if="$v.vanin_form.require_maintenance.$error"> Please select if maintenance is required!</b-form-invalid-feedback>
                        </b-form>
                    </b-colxx>
                    <b-colxx v-if="vanin_form.require_maintenance == 1" xxs="12" xs="5" lg="5" class="mb-3" ref="require_maintenance_text_column">
                      <label class="form-group has-top-label">
                        <b-form-textarea v-model="vanin_form.require_maintenance_text"></b-form-textarea>
                        <span>{{ $t('forms.vanin.require_maintenance_text') }}</span>
                      </label>
                    </b-colxx>
                  </b-row>
                  <b-row>
                    <b-colxx xxs="12" xs="4" lg="4" class="mb-3">
                      <b-form class="av-tooltip tooltip-label-right">
                      <!-- <b-form-input v-model="vanin_form.demage_caused_by_customer" :placeholder="$t('forms.vanin.demage_caused_by_customer')"></b-form-input> -->
                      <label class="form-group has-top-label">
                        <b-form-input style="display:none" type="text" v-model.trim="$v.vanin_form.demage_caused_by_customer.$model" :state="!$v.vanin_form.demage_caused_by_customer.$error" />
                      <v-select v-model="$v.vanin_form.demage_caused_by_customer.$model"
                        label="name"
                        :reduce="demage => demage.id"
                          aria-placeholder="Demage Caused By Customer"
                          :options="demage_options"
                        ></v-select>
                        <span>Damage caused by customer ?</span>
                        <b-form-invalid-feedback v-if="$v.vanin_form.demage_caused_by_customer.$error"> Please select if there was damage caused by customer!</b-form-invalid-feedback>
                      </label>
                      </b-form>
                    </b-colxx>
                    <b-colxx v-if="vanin_form.demage_caused_by_customer == '1'" xxs="12" xs="5" lg="5" class="mb-3" ref="demage_picture_column" >
                      <!-- <label class="form-group has-top-label"> -->
                        <!-- <b-form-input v-model="vanin_form.demage_picture" ></b-form-input> -->
                        <span>{{ $t('forms.vanin.demage_picture')  }}</span>
                      <!-- </label> -->
                      <b-form-file
                        v-model="vanin_form.demage_picture"
                        :placeholder="$t('forms.vanin.demage_picture')"
                        drop-placeholder="Drop file here..."
                        accept="image/*"
                      ></b-form-file>
                    </b-colxx>
                    <b-colxx v-if="vanin_form.demage_caused_by_customer == '1'" xxs="12" xs="5" lg="5" class="mb-3" ref="demage_text_column">
                      <label class="form-group has-top-label">
                        <b-form-textarea v-model="vanin_form.demage_text" ></b-form-textarea>
                        <span>{{ $t('forms.vanin.demage_text') }}</span>
                      </label>
                    </b-colxx>

                    <div v-if="isProcessing">
                        <b-spinner variant="primary" ></b-spinner>
                        <span class="text-primary">{{ processing_text }}</span>
                    </div>
                  </b-row>

                  <b-button v-if="!editing_mode"  @click.stop="save_vanin_form"  variant="primary" class="mt-4 mb-4">{{ 'Save' }}</b-button>
                  <div v-else>
                    <b-button  @click.stop="update_vanreturn(vanin_form.id)"  variant="primary" class="mt-4 mb-4">{{ 'Update' }}</b-button>
                    <b-button  @click.stop="$event => cancel_update_vanreturn()"  variant="info" class="mt-4 mb-4"><i class="simple-icon-close"></i></b-button>
                  </div>
                </b-form>
                <datatable title="" :fields="van_return_fields" :data="vanins" :edit="edit_vanin" :view="bring_vanin_fields" :del="delete_vanout" :searchColumn="VanReturnSearchColumns" />
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
import {apiUrl} from "../../../constants/config.js";
import modal from  "../../ui/components/Modal";
import { mapGetters } from 'vuex';
import datatable from './datatable'
import Customer from '../records/customer_form'
import AcessoriesManagement from './accessories_management.vue'

export default ({
  components: {'v-select': vSelect, datepicker: DatePicker, datatable: datatable, Customer, 'accessories-management': AcessoriesManagement},
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
      perPage: 10,
      currentPage: 1,
      editing_mode: false,
      customer_options: [],
      vehicle_options: [],
      location_options: [],
      accessory_options: [],
      swap_with_options: [],
      booking_options: [],
      out_mileage: 0,
      van_out: '',
      form: {
        booking_id: '',
        customer_id: '',
        vehicle_id: '',
        location_id: '',
        reason_of_renting: '',
        swap_with: '',
        rental_priod: '',
        rental_amount: '',
        amount_frequency: 'Per Week',
        mileage: '',
        accessories: [],
        van_out_date: '',
        due_return: '',
        bond_deposit: null,
        payment_mode: null
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
        mileage: '',
        fuel_tank: '',
        condition: '',
        require_maintenance: '',
        require_maintenance_text: '',
        demage_caused_by_customer: '',
        demage_picture: '',
        return_date: '',
        demage_text: '',
        bond_return_amount: '',
        km_deriven: '',
        total_days: '',
      },
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
          sortField: "name",
          titleClass: "center aligned",
          dataClass: "center aligned",
          width: "5%"
        },
        {
          name: "due_return",
          title: 'Due Return',
          sortField: "due_return",
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
        {id: 0, name: 'No'},
        {id: 1, name: 'Yes'},
      ],
      swap_options: ["New", "Swap"],
      vanouts: [],
      vanins: []
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
      due_return: {
        required
      },
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



    customer_created(){
      this.get_customer_options()
      this.$refs['create_customer_modal'].hide()
    },

    addNewLocation(){

      this.processing_text = 'Saving Data ... ';
      this.isProcessing = true

      axios.post(apiUrl + '/location', { name: this.new_location}, {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      }).then(response => {
        this.isProcessing = false
        this.get_location_options()
        this.form.location_id = response.data.id
        this.new_location = ''
        this.$notify('success filled', 'Success!', 'The locaion has been added!',{ duration: 3000 });
      }).catch(error => {
        this.isProcessing = false
        this.$notify('error filled', 'Error', 'Error adding location!',{ duration: 3000 });
      })
    },

    onBookingSelect(id){
      this.processing_text = 'Loading Data ... ';
      this.isProcessing = true
      let booking_id = id
      axios.get(apiUrl + '/vanout/' + booking_id, {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      }).then(response => {
          this.vanin_form.location_id = response.data.location_id
          this.vanin_form.mileage = response.data.mileage
          this.out_mileage = response.data.mileage
          this.van_out = response.data.van_out_date
          this.vanin_form.rental_amount = response.data.rental_amount
          this.$notify('success filled', 'Sucess!', 'The booking data has been autofilled!',{ duration: 3000 });
          this.isProcessing = false
      }).catch(error => {
        this.$notify('info filled', 'Info!', 'The booking data could not be autofilled!',{ duration: 3000});
        this.isProcessing = false
      })
    },

    calculateDriven(){
      // var = toFixed
      var total_driven = this.vanin_form.mileage - this.out_mileage
      this.vanin_form.km_deriven = total_driven.toFixed(2)
    },

    calculateDays(){
      // var = toFixed
      // var timeDiff = this.vanin_form.return_date.getTime() - this.van_out.getTime();
      // var day_count = timeDiff / (1000 * 3600 * 24);

      var returnDateObj = new Date(this.vanin_form.return_date);
      var vanOutDateObj = new Date(this.van_out);

      // Calculate the difference in milliseconds
      var timeDiff = returnDateObj.getTime() - vanOutDateObj.getTime();
      console.log(typeof(timeDiff));
      
      // Convert milliseconds to days
      var day_count = timeDiff / (1000 * 3600 * 24);
      console.log(day_count);
      this.vanin_form.total_days = Math.round(day_count)
      console.log(this.vanin_form.total_days);
    },

    onVehicleSelect(key){

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

          let maintenanceData = response.data.maintenance

          if(maintenanceData.length > 0){
            this.form.mileage = response.data.maintenance[maintenanceData.length -1].mileage
            this.$notify('success filled ', 'Success!', 'The mileage data has been added to field',{ duration: 3000, permanent: false });
            this.isProcessing = false
          } else {
            this.form.mileage = ''
            this.$notify('info filled', 'Info!', 'No milage date for this vehicle, please manually fill it',{ duration: 3000, permanent: false });
            this.isProcessing = false
          }
      })
    },


    bring_fields(data){
      console.log(data)
      this.vanout = data
      this.$refs.vanoutModal.show()
    },

    bring_vanin_fields(data){
      console.log(data)
      this.vanin = data
      this.$refs.vanInModal.show()
    },
    save_vanout_form(){

      this.$v.form.$touch();
      if(this.$v.form.$anyError == true){
        return false;
      }

      this.processing_text = 'Saving Vanout Data ...'
      this.isProcessing = true

      if(this.form.swap_with == "Select Vehicle to swap with"){
        this.form.swap_with = null
      }

      axios.post(apiUrl + '/vanout', this.form, {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token')
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
      }).catch(error => {
        this.$notify('error filled', 'Error!', error.response.data.message,{ duration: 3000, permanent: false });
        this.isProcessing = false
      });
    },

    save_vanin_form(){

      this.$v.vanin_form.$touch();
      if(this.$v.vanin_form.$anyError == true){
        return false;
      }

      // console.log(this.vanin_form)

      // this.processing_text = 'Saving Van-in Data ....'
      // this.isProcessing = true

      (this.vanin_form.fuel_tank == 'Fuel Tank Level') ? '' : this.vanin_form.fuel_tank

      this.processing_text = 'Saving Van-in Data ....'
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
          this.get_vanins()
          this.get_vanouts()
          //send success notification
          this.$notify(
            'success filled',
            'Success!',
            'Van In record has been saved.',
          )
          this.isProcessing = false
      }).catch(error => {
        this.$notify('error filled', 'Error!', error.response.data.message,{ duration: 3000, permanent: false });
        this.isProcessing = false
      })
    },

    edit_vanout(item){

      this.processing_text = 'Loading Data ...'
      this.isProcessing = true

      this.van_out_date = ''
      this.get_active_vehicle_options(item.vehicle_id)
      this.get_all_customer_options(item.customer_id)

      this.editing_mode = true;
      //get vanout data
      axios.get(apiUrl + '/vanout/' + item.id, {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      })
      .then(response => {
        this.form = response.data
        this.booking_create_option = ({ id: item.id, name: item.reg_number })
        this.isProcessing = false



         var accessories_to_set = [];
         response.data.accessories.map((value, key) => {
           accessories_to_set.push(value.id)
         })
         console.log(accessories_to_set)
         this.form.accessories = accessories_to_set

      })
    },

    edit_vanin(item){

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
        this.vanin_form.require_maintenance = parseInt(response.data.require_maintenance)
        this.vanin_form.demage_caused_by_customer = parseInt(response.data.demage_caused_by_customer)
        this.vanin_form.location_id = parseInt(response.data.location_id)
        this.vanin_form.van_out_id = parseInt(response.data.van_out_id)
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

      this.processing_text = 'Updating Van Return Data ....'
      this.isProcessing = true

      axios.post(apiUrl + '/van_return/' + id, {...this.vanin_form, '_method': 'PUT'}, {
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
        this.get_customer_options()
        this.editing_mode = false;
        this.reset_form();
    },

    cancel_update_vanreturn(){
      this.editing_mode = false;
      this.reset_form();
      this.get_vanout_options();
    },

    reset_form(){
      this.form = {
        user_id: '',
        vehicle_id: '',
        location_id: '',
        reason_of_renting: '',
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
        demage_text: ''
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
          this.get_vanouts()
          this.get_active_vehicle_options()
          this.$notify(
            'success filled',
            'Success!',
            response.data.message
          )
          this.isProcessing = false
        })
    },

    delete_vanin(item) {

        this.processint_text = 'Deleting Van In Data...';
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

      axios.get(apiUrl + '/all_customer_options?selected=' + id,{
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      }).then(response => {
        this.customer_options = response.data
        this.isProcessing = false
      })
    },

    get_customer_options(id = null) {

      this.processing_text = 'Loading Data ..'
      this.isProcessing = true

      axios.get(apiUrl + '/customer_options?selected=' + id,{
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      }).then(response => {
        this.customer_options = response.data
        this.isProcessing = false
      })
    },

    get_available_vehicle_options(id){

      this.processing_text = 'Loading Data..'
      this.isProcessing = true

      axios.get(apiUrl + '/available_vehicles_options/' + id,{
        headers:{
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      }).then(response => {
        this.available_vehicle_options = response.data
        this.isProcessing = false
      })
    },
    get_active_vehicle_options(id = null) {

      axios.get(apiUrl + '/vehicle_options?selected=' + id,
        {
          headers:{
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }}).then(response => {

        this.vehicle_options = response.data
      })
    },

    get_all_vehicle_options(id){
      axios.get(apiUrl + '/vehicle_options?selected=' + id,{
        headers:{
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }}).then(response => {
          this.vehicle_options = response.data
        })
    },


    get_location_options() {
      axios.get(apiUrl + '/location_options',{
        headers:{
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      }).then(response => {
        this.location_options = response.data
      })
    },

    get_accessory_options() {
      axios.get(apiUrl + '/accessory',{
        headers:{
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      }).then(response => {
        this.accessory_options = response.data
      })
    },

    refresh_accessories_list(){
      //console.log('function has been called');
      //this.$refs.addAcessoryModal.hide();
      this.get_accessory_options();
    },

    get_vanout_options(id = null) {

      this.processing_text = 'Loading Data ..'
      this.isProcessing = true

      axios.get(apiUrl + '/van_out_options?selected=' + id,{
        headers:{
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      }).then(response => {
        this.booking_options = response.data
        this.isProcessing = false
      })
    },

    get_returned_van_out_options(id){

      this.processing_text = "Loding Data..."
      this.isProcessing = true

      axios.get(apiUrl + '/van_out_options?selected=' + id,{
        headers:{
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      }).then(async response => {
        this.booking_options = await response.data
        this.isProcessing = false
      })
    },

    get_vanouts(){
      //Van Ins
      axios.get(
        apiUrl + '/vanout?mode=active',{
        headers:{
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
          //   'Van Out data loaded.',
          //   { duration: 3000, permanent: false });
        }
      })
    },

    get_vanins(){
      //Van Ins
      axios.get(
        apiUrl + '/van_return',{
        headers:{
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      }
      ).then(response => {
        {
          //parse json data
          this.vanins = response.data
          console.log(response.data);
          // this.$notify(
          //   'info filled',
          //   'Data Loaded!',
          //   'Van Return data loaded.',
          //   { duration: 3000, permanent: false });
        }
      })
    },

    getCurrentDateTime(){
      const today = new Date()
      const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()
      const time = today.getHours() + ":" + today.getMinutes()
      const dateTime = date+' '+time
      return dateTime
    }

  },
  mounted() {

    console.log('Date -> ', new Date().toISOString('dd-MM-yyyy'));
    //this.form.van_out_date = new Date().toISOString()

    if(localStorage.getItem('token') !== null) {
      this.$store.commit('setUser', JSON.parse(localStorage.getItem('user')));
    } else{
      this.$router.push('/user/login');
    }

    this.get_customer_options()
    //this.get_available_vehicle_options()
    this.get_active_vehicle_options()
    this.get_location_options()
    this.get_accessory_options()
    this.get_vanout_options()
    this.get_vanouts()
    this.get_vanins()

  },
  watch: {
    currentUser(){
      this.user = this.currentUser
    }
  }

})
</script>


