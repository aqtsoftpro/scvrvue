<template>
<b-card class="mb-4" no-body>
    <b-card-body class="wizard wizard-default">
        <form-wizard ref="vehicleWiz" :editing_mode="editing_mode"  :done="dataDone" :last-step-end="true">
            <tab :name="$t('wizard.step-name-1')" :validate="validateStep1" :submit="submitStep1" :desc="$t('wizard.step-desc-1')" :selected="true">
                <div class="wizard-basic-step">
                  <!-- one row three colxx -->
                  <b-row class="mb-4">
                    <b-colxx xxs="12" xs="12" lg="12">
                      <img width="200px" ref="vanImage" class="img-fluid " />
                    </b-colxx>
                  </b-row>
                  <b-row>
                    <b-colxx xxs="12" xs="4" lg="4">
                        <b-form class="av-tooltip tooltip-label-right">
                            <b-form-group :label="$t('forms.van_management.picture_of_vehicle')">
                                <b-form-input style="display:none" type="text" v-model.trim="$v.formStep1.picture.$model" :state="!$v.formStep1.picture.$error" />
                                <b-form-file
                                    @change="onFileChange"
                                    v-model.trim="$v.formStep1.picture.$model"
                                    drop-placeholder="Drop file here..."
                                    accept="image/*"
                                >
                                </b-form-file>
                                <b-form-invalid-feedback v-if="$v.formStep1.picture.$error"> Picture is required!</b-form-invalid-feedback>
                            </b-form-group>
                        </b-form>
                    </b-colxx>
                    <b-colxx xxs="12" xs="4" lg="4" class="mb-3">
                        <b-form class="av-tooltip tooltip-label-right">
                            <label class="form-group has-top-label">
                            <!-- <b-form-group :label="$t('forms.van_management.vin')"> -->
                                <b-form-input type="text" v-model.trim="$v.formStep1.vin.$model" :state="!$v.formStep1.vin.$error" />
                                <span>{{ $t('forms.van_management.vin') }}</span>
                                <b-form-invalid-feedback>VIN is required!</b-form-invalid-feedback>
                            <!-- </b-form-group> -->
                            </label>
                      </b-form>
                    </b-colxx>
                    <b-colxx xxs="12" xs="4" lg="4" class="mb-3">
                        <b-form class="av-tooltip tooltip-label-right">
                            <label class="form-group has-top-label">
                            <!-- <b-form-group :label="$t('forms.van_management.rego_plate_number')"> -->
                                <b-form-input type="text" v-model.trim="$v.formStep1.reg_plate_number.$model" :state="!$v.formStep1.reg_plate_number.$error" />
                                <b-form-invalid-feedback>Reg Plate Number is required!</b-form-invalid-feedback>
                                <span>{{ $t('forms.van_management.rego_plate_number') }}</span>
                            <!-- </b-form-group> -->
                            </label>
                        </b-form>
                    </b-colxx>
                  </b-row>
                  <b-row>
                    <b-colxx xxs="12" xs="4" lg="4" class="mb-3">
                        <b-form class="av-tooltip tooltip-label-right">
                          <label class="form-group has-top-label">
                            <!-- <b-form-group :label="$t('forms.van_management.mileage')"> -->
                                <b-form-input type="text" v-model.trim="$v.formStep1.mileage.$model" :state="!$v.formStep1.mileage.$error" />
                                <span>{{  $t('forms.van_management.mileage') }}</span>
                                <b-form-invalid-feedback>Mileage is required!</b-form-invalid-feedback>
                            <!-- </b-form-group> -->
                            </label>
                      </b-form>
                    </b-colxx>
                    <b-colxx xxs="12" xs="4" lg="4" class="mb-3">
                        <b-form class="av-tooltip tooltip-label-right">
                          <label class="form-group has-top-label">
                            <!-- <b-form-group :label="$t('forms.van_management.vehicle_type')"> -->
                                <b-form-input style="display: none" type="text" v-model.trim="$v.formStep1.vehicle_type_id.$model" :state="!$v.formStep1.vehicle_type_id.$error" />
                                <v-select
                                v-model.trim="$v.formStep1.vehicle_type_id.$model"
                                :state="!$v.formStep1.vehicle_type_id.$error"
                                label="name"
                                :reduce="vehicle => vehicle.id"
                                aria-placeholder="Select Vehicle Type"
                                :options="vehicle_type_options"
                                ></v-select>
                                <span>{{ $t('forms.van_management.vehicle_type') }}</span>
                                <b-form-invalid-feedback>Vehicle Type is required!</b-form-invalid-feedback>
                            <!-- </b-form-group> -->
                            </label>
                      </b-form>
                    </b-colxx>
                    <b-colxx xxs="12" xs="4" lg="4" class="mb-3">
                        <b-form class="av-tooltip tooltip-label-right">
                          <label class="form-group has-top-label">
                            <!-- <b-form-group :label="$t('forms.van_management.purchase_date')"> -->
                                <b-form-input style="display:none" type="text" v-model.trim="$v.formStep1.purchase_date.$model" :state="!$v.formStep1.purchase_date.$error" />
                                <datepicker
                                :bootstrap-styling="true"
                                v-model.trim="$v.formStep1.purchase_date.$model"
                                :state="!$v.formStep1.purchase_date.$error"
                                format="dd-MM-yyyy"
                                ></datepicker>
                                <span>{{ $t('forms.van_management.purchase_date') }}</span>
                                <b-form-invalid-feedback>Purchase date is required!</b-form-invalid-feedback>
                            <!-- </b-form-group> -->
                          </label>
                      </b-form>
                    </b-colxx>
                  </b-row>
                  <b-row>
                    <b-colxx xxs="12" xs="4" lg="4" class="mb-3">
                        <b-form class="av-tooltip tooltip-label-right">
                          <label class="form-group has-top-label">
                            <!-- <b-form-group :label="$t('forms.van_management.make')"> -->
                                <b-form-input type="text" v-model.trim="$v.formStep1.make.$model" :state="!$v.formStep1.make.$error" />
                                <span>{{ $t('forms.van_management.make') }}</span>
                                <b-form-invalid-feedback>Make is required!</b-form-invalid-feedback>
                            <!-- </b-form-group> -->
                          </label>
                      </b-form>
                    </b-colxx>
                    <b-colxx xxs="12" xs="4" lg="4" class="mb-3">
                        <b-form class="av-tooltip tooltip-label-right">
                          <label class="form-group has-top-label">
                            <!-- <b-form-group :label="$t('forms.van_management.model')"> -->
                                <b-form-input type="text" v-model.trim="$v.formStep1.model.$model" :state="!$v.formStep1.model.$error" />
                                <span>{{ $t('forms.van_management.model') }}</span>
                                <b-form-invalid-feedback>Model is required!</b-form-invalid-feedback>
                            <!-- </b-form-group> -->
                          </label>
                      </b-form>
                    </b-colxx>
                    <b-colxx xxs="12" xs="4" lg="4" class="mb-3">
                        <b-form class="av-tooltip tooltip-label-right">
                          <label class="form-group has-top-label">
                            <!-- <b-form-group :label="$t('forms.van_management.purchase_price')"> -->
                                <b-form-input type="text" v-model.trim="$v.formStep1.purchase_price.$model" :state="!$v.formStep1.purchase_price.$error" />
                                <span>{{ $t('forms.van_management.purchase_price') }}</span>
                                <b-form-invalid-feedback>Purchase Price is required!</b-form-invalid-feedback>
                            <!-- </b-form-group> -->
                          </label>
                      </b-form>
                    </b-colxx>
                  </b-row>
                  <b-row>
                    <b-colxx xxs="12" xs="4" lg="4" class="mb-3">
                        <b-form class="av-tooltip tooltip-label-right">
                          <label class="form-group has-top-label">
                            <!-- <b-form-group :label="$t('forms.van_management.vehicle_condition')"> -->
                              <b-textarea v-model.trim="$v.formStep1.vehicle_condition.$model" :state="!$v.formStep1.vehicle_condition.$error" ></b-textarea>
                              <span>{{ $t('forms.van_management.vehicle_condition') }}</span>
                              <b-form-invalid-feedback>Vehicle Condition is required!</b-form-invalid-feedback>
                            <!-- </b-form-group> -->
                          </label>
                        </b-form>
                    </b-colxx>
                  </b-row>
                </div>
            </tab>
            <tab :name="$t('wizard.step-name-2')" :validate="validateStep2" :submit="submitStep2" :desc="$t('wizard.step-desc-2')">
                <div class="wizard-basic-step">
                  <b-row>
                    <b-colxx xxs="12" xs="4" lg="4" class="mb-3">
                        <b-form class="av-tooltip tooltip-label-right">
                          <label class="form-group has-top-label">
                            <!-- <b-form-group :label="$t('forms.van_management.sellers_name')"> -->
                                <b-form-input type="text" v-model.trim="$v.formStep2.seller_name.$model" :state="!$v.formStep2.seller_name.$error"   />
                                <span>{{ $t('forms.van_management.sellers_name') }}</span>
                                <b-form-invalid-feedback v-if="$v.formStep2.seller_name.$error"> Seller name is required!</b-form-invalid-feedback>
                            <!-- </b-form-group> -->
                          </label>
                          </b-form>
                      </b-form>
                    </b-colxx>
                    <b-colxx xxs="12" xs="4" lg="4" class="mb-3">
                        <b-form class="av-tooltip tooltip-label-right">
                          <label class="form-group has-top-label">
                            <!-- <b-form-group :label="$t('forms.van_management.sellers_address')"> -->
                                 <b-form-input type="text" v-model.trim="$v.formStep2.seller_address.$model" :state="!$v.formStep2.seller_address.$error" />
                                 <span>{{ $t('forms.van_management.sellers_address') }}</span>
                                 <b-form-invalid-feedback v-if="$v.formStep2.seller_address.$error"> Seller address is required!</b-form-invalid-feedback>
                            <!-- </b-form-group> -->
                          </label>
                      </b-form>
                    </b-colxx>
                    <b-colxx xxs="12" xs="4" lg="4" class="mb-3">
                        <b-form class="av-tooltip tooltip-label-right">
                          <label class="form-group has-top-label">
                            <!-- <b-form-group :label="$t('forms.van_management.sellers_contact_no')"> -->
                                <b-form-input type="text" v-model="$v.formStep2.seller_contact_number.$model" :state="!$v.formStep2.seller_contact_number.$error" />
                                <span>{{ $t('forms.van_management.sellers_contact_no') }}</span>
                                <b-form-invalid-feedback v-if="$v.formStep2.seller_contact_number.$error"> Seller contact number is required!</b-form-invalid-feedback>
                            <!-- </b-form-group> -->
                          </label>
                      </b-form>
                    </b-colxx>
                  </b-row>
                </div>
            </tab>
            <tab :name="$t('wizard.step-name-3')" :validate="validateStep3" :submit="submitStep3" :desc="$t('wizard.step-desc-3')">
                <div class="wizard-basic-step">
                  <b-row>
                    <b-colxx xxs="12" xs="3" lg="3" class="mb-3">
                        <b-form class="av-tooltip tooltip-label-right">
                            <!-- <b-form-group :label="$t('forms.van_management.company_name')"> -->
                              <label class="form-group has-top-label">
                                <b-form-input type="text" v-model.trim="$v.formStep3.company_name.$model" :state="!$v.formStep3.company_name.$error"  />
                                <span>{{ $t('forms.van_management.company_name') }}</span>
                                <b-form-invalid-feedback v-if="$v.formStep3.company_name.$error"> Company name is required!</b-form-invalid-feedback>
                              </label>
                            <!-- </b-form-group> -->
                        </b-form>
                    </b-colxx>
                    <b-colxx xxs="12" xs="3" lg="3" class="mb-3">
                        <b-form class="av-tooltip tooltip-label-right">
                            <!-- <b-form-group :label="$t('forms.van_management.policy_number')"> -->
                              <label class="form-group has-top-label">
                                <b-form-input type="text" v-model.trim="$v.formStep3.policy_number.$model" :state="!$v.formStep3.policy_number.$error"  :placeholder="$t('forms.van_management.policy_number')" />
                                <span>{{ $t('forms.van_management.policy_number') }}</span>
                                <b-form-invalid-feedback v-if="$v.formStep3.policy_number.$error"> Policy Number is required!</b-form-invalid-feedback>
                              </label>
                            <!-- </b-form-group> -->
                        </b-form>
                    </b-colxx>
                    <b-colxx xxs="12" xs="3" lg="3" class="mb-3">
                        <b-form class="av-tooltip tooltip-label-right">
                            <!-- <b-form-group :label="$t('forms.van_management.policy_type')"> -->
                              <label class="form-group has-top-label">
                                <b-form-input style="display:none" type="text" v-model.trim="$v.formStep3.policy_type_id.$model" :state="!$v.formStep3.policy_type_id.$error" />
                                <v-select
                                v-model.trim="$v.formStep3.policy_type_id.$model"
                                :state="!$v.formStep3.policy_type_id.$error"
                                label="name"
                                :reduce="vehicle => vehicle.id"
                                :options="policy_type_options"
                                ></v-select>
                                <span>{{ $t('forms.van_management.policy_type') }}</span>
                                <b-form-invalid-feedback> Policy Type is required!</b-form-invalid-feedback>
                              </label>
                            <!-- </b-form-group> -->
                      </b-form>
                    </b-colxx>
                    <b-colxx xxs="12" xs="3" lg="3" class="mb-3">
                        <b-form class="av-tooltip tooltip-label-right">
                            <!-- <b-form-group :label="$t('forms.van_management.policy_start_date')"> -->
                              <label class="form-group has-top-label">
                                <b-form-input style="display:none" type="text" v-model.trim="$v.formStep3.policy_start_date.$model" :state="!$v.formStep3.policy_start_date.$error" />
                                <datepicker
                                    :bootstrap-styling="true"
                                    v-model.trim="$v.formStep3.policy_start_date.$model"
                                    :state="!$v.formStep3.policy_start_date.$error"
                                    format="dd-MM-yyyy"
                                ></datepicker>
                                <span>{{ $t('forms.van_management.policy_start_date') }}</span>
                                <b-form-invalid-feedback> pick start date!</b-form-invalid-feedback>
                              </label>
                            <!-- </b-form-group> -->
                        </b-form>
                    </b-colxx>
                    <b-colxx xxs="12" xs="3" lg="3" class="mb-3">
                        <b-form class="av-tooltip tooltip-label-right">
                            <!-- <b-form-group :label="$t('forms.van_management.policy_end_date')"> -->
                              <label class="form-group has-top-label">
                                <b-form-input style="display:none" type="text" v-model.trim="$v.formStep3.policy_end_date.$model" :state="!$v.formStep3.policy_end_date.$error" />
                                <datepicker
                                    :bootstrap-styling="true"
                                    v-model.trim="$v.formStep3.policy_end_date.$model"
                                    :state="!$v.formStep3.policy_end_date.$error"
                                    format="dd-MM-yyyy"
                                ></datepicker>
                                <span>{{ $t('forms.van_management.policy_end_date') }}</span>
                                <b-form-invalid-feedback> pick start date!</b-form-invalid-feedback>
                              </label>
                            <!-- </b-form-group> -->
                        </b-form>
                    </b-colxx>
                  </b-row>
                  <b-row>
                    <b-colxx xxs="12" xs="3" lg="3" class="mb-3">
                      <b-form-group label="Road side assistance ?">
                          <b-radio-group>
                              <b-radio v-model="formStep3.road_side_assistance" value='yes' :checked="formStep3.road_side_assistance == 'yes'">Yes</b-radio>
                              <b-radio v-model="formStep3.road_side_assistance" value='no' :checked="formStep3.road_side_assistance == 'no'">No</b-radio>
                          </b-radio-group>
                      </b-form-group>
                    </b-colxx>
                    <b-colxx v-if="formStep3.road_side_assistance == 'no'" xxs="12" xs="3" lg="3" class="mb-3">
                      <b-form>
                          <b-form-input type="text" v-model="formStep3.road_side_assistance_company" :placeholder="$t('forms.van_management.road_side_assistance_company')" />
                      </b-form>
                    </b-colxx>
                    <b-colxx  xxs="12" xs="3" lg="3" class="mb-3">
                      <label class="form-group has-top-label">
                        <b-form-input style="display:none" type="text" v-model.trim="$v.formStep3.road_side_assistance_start_date.$model" :state="!$v.formStep3.road_side_assistance_start_date.$error" />
                        <datepicker
                          :bootstrap-styling="true"
                          v-model.trim="$v.formStep3.road_side_assistance_start_date.$model"
                          :state="!$v.formStep3.road_side_assistance_start_date.$error"
                          format="dd-MM-yyyy"
                        ></datepicker>
                        <span>{{ $t('forms.van_management.road_side_assistance_start_date') }}</span>
                        <b-form-invalid-feedback> Road assistance start date!</b-form-invalid-feedback>
                      </label>
                    </b-colxx>
                    <b-colxx xxs="12" xs="3" lg="3" class="mb-3">
                      <label class="form-group has-top-label">
                      <b-form-input style="display:none" type="text" v-model.trim="$v.formStep3.road_side_assistance_end_date.$model" :state="!$v.formStep3.road_side_assistance_end_date.$error" />
                      <datepicker
                        :bootstrap-styling="true"
                        v-model.trim="$v.formStep3.road_side_assistance_end_date.$model"
                        :state="!$v.formStep3.road_side_assistance_end_date.$error"
                        format="dd-MM-yyyy"
                      ></datepicker>
                      <span>{{ $t('forms.van_management.road_side_assistance_end_date') }}</span>
                      <b-form-invalid-feedback> Road assistance end date</b-form-invalid-feedback>
                      </label>
                    </b-colxx>
                    <!-- <b-colxx xxs="12" xs="3" lg="3" class="mb-3">
                      <b-form>
                        <label class="form-group has-top-label">
                          <b-textarea v-model="formStep3.demage_details" :placeholder="$t('forms.van_management.demage_details')" />
                          <span>{{ $t('forms.van_management.demage_details') }}</span>
                        </label>
                      </b-form>
                    </b-colxx>
                    <b-colxx xxs="12" xs="3" lg="3" class="mb-3">
                      <b-form>
                        <b-form-input style="display:none" type="text" v-model="formStep3.damage_picture" />
                        <b-form-file
                            @change="onFileChange"
                            v-model="formStep3.damage_picture"
                            :placeholder="$t('forms.van_management.damage_picture')"
                            drop-placeholder="Drop file here..."
                            accept="image/*"
                          ></b-form-file>
                      </b-form>
                    </b-colxx>
                    -->
                  </b-row>
                </div>
            </tab>
            <tab :name="$t('wizard.step-name-4')" :desc="$t('wizard.step-desc-4')">
                <div class="wizard-basic-step">
                  <b-card  v-for="(maintenance,index) in formStep4.maintenance_records" :key="index" class="mb-3">
                  <b-row   class="maintenance_row">
                    <b-colxx xxs="12" xs="4" lg="4" class="mb-3">
                      <b-form>
                        <label class="form-group has-top-label">
                          <b-form-input style="display:none" type="text" v-model.trim="formStep4.maintenance_records[index].maintenance_date" />
                          <datepicker
                          :bootstrap-styling="true"
                          :placeholder="$t('forms.van_management.maintenance_date')"
                          v-model="formStep4.maintenance_records[index].maintenance_date"
                          format="dd-MM-yyyy"
                        ></datepicker>
                      <span>{{ $t('forms.van_management.maintenance_date') }}</span>
                      <b-form-invalid-feedback>Maintenance Date Required!</b-form-invalid-feedback>
                      </label>
                       </b-form>
                    </b-colxx>
                    <b-colxx xxs="12" xs="4" lg="4" class="mb-3">
                      <b-form>
                        <label class="form-group has-top-label">
                        <b-form-input v-model="formStep4.maintenance_records[index].maintenance_mileage" type="text" :placeholder="$t('forms.van_management.maintenance_mileage')" />
                        <span>{{ $t('forms.van_management.maintenance_mileage') }}</span>
                      </label>
                      </b-form>
                    </b-colxx>
                    <b-colxx xxs="12" xs="4" lg="4" class="mb-3">
                      <b-form>
                        <label class="form-group has-top-label">
                        <v-select v-model="formStep4.maintenance_records[index].maintenance_type_id"
                          label="name"
                          :reduce="maintenance => maintenance.id"
                          aria-placeholder="Service Type"
                          :options="service_type_options"
                        ></v-select>
                        <span>{{ $t('forms.van_management.maintenance_type') }}</span>
                        </label>
                      </b-form>
                    </b-colxx>
                    <b-colxx xxs="12" xs="2" lg="2" class="mb-3">
                      <b-form>
                        <label class="form-group has-top-label">
                          <b-form-input v-model="formStep4.maintenance_records[index].maintenance_cost" type="text" :placeholder="$t('forms.van_management.maintenance_cost')" />
                          <span>{{ $t('forms.van_management.maintenance_cost') }}</span>
                        </label>
                      </b-form>
                    </b-colxx>
                    <b-colxx xxs="12" xs="2" lg="2" class="mb-3" v-if="formStep4.maintenance_records[index].maintenance_type_id == 1 || formStep4.maintenance_records[index].maintenance_type_id == 2">
                      <b-form>
                        <label class="form-group has-top-label">
                          <b-form-input v-model="formStep4.maintenance_records[index].maintenance_place" type="text" :placeholder="$t('forms.van_management.maintenance_place')" />
                          <span>{{ $t('forms.van_management.maintenance_place') }}</span>
                        </label>
                      </b-form>
                    </b-colxx>
                    <b-colxx xxs="12" xs="2" lg="2" class="mb-3" v-if="formStep4.maintenance_records[index].maintenance_type_id == 1 || formStep4.maintenance_records[index].maintenance_type_id == 2">
                      <b-form>
                        <label class="form-group has-top-label">
                          <b-form-input v-model="formStep4.maintenance_records[index].mechanic_name" type="text" :placeholder="$t('forms.van_management.mechanic_name')" />
                          <span>{{ $t('forms.van_management.mechanic_name') }}</span>
                        </label>
                      </b-form>
                    </b-colxx>
                    <b-colxx xxs="12" xs="2" lg="2" v-if="formStep4.maintenance_records[index].maintenance_type_id == 2" >
                      <b-form>
                          <label class="form-group has-top-label">
                          <b-form-input  v-model="formStep4.maintenance_records[index].part_replaced" type="text" :placeholder="$t('forms.van_management.part_replaced')" />
                          <span>{{ $t('forms.van_management.part_replaced') }}</span>
                          </label>
                      </b-form>
                    </b-colxx>
                    <b-colxx xxs="12" xs="2" lg="2" v-if="formStep4.maintenance_records[index].maintenance_type_id == 2" >
                      <b-form>
                          <label class="form-group has-top-label">
                          <b-form-input  v-model="formStep4.maintenance_records[index].part_repaired" type="text" :placeholder="$t('forms.van_management.part_repaired')" />
                          <span>{{ $t('forms.van_management.part_repaired') }}</span>
                        </label>
                      </b-form>
                    </b-colxx>
                    <b-colxx xxs="12" xs="4" lg="4"  class="mb-3"  v-if="formStep4.maintenance_records[index].maintenance_type_id != 3">
                      <b-form>
                        <label class="form-group has-top-label">
                          <b-form-input v-model="formStep4.maintenance_records[index].comments" type="text" :placeholder="$t('forms.van_management.comments')" />
                          <span>{{ $t('forms.van_management.comments') }}</span>
                        </label>
                      </b-form>
                    </b-colxx>
                    <b-colxx xxs="12" xs="4" lg="4" class="mb-3" v-if="formStep4.maintenance_records[index].maintenance_type_id == 3">
                      <b-form>
                        <label class="form-group has-top-label">
                        <v-select v-model="formStep4.maintenance_records[index].tyre_replaced"
                          label="name"
                          :reduce="maintenance => maintenance.id"
                          aria-placeholder="Tyres"
                          :options="tyres_replaced"
                        ></v-select>
                        <span>{{ $t('forms.van_management.tyre_replaced') }}</span>
                        </label>
                      </b-form>
                    </b-colxx>

                    <b-colxx xxs="12" xs="1" lg="1" >
                      <b-form>

                          <b-button type="button" variant="danger" @click="remove_maintenance_row(index)">Remove</b-button>

                        </b-form>
                    </b-colxx>
                  </b-row>
                  </b-card>
                  <b-button type="button" variant="primary" @click="add_maintenance_row">Add Row</b-button>
                  <b-row class="mt-4">
                    <b-colxx xxs="12" xs="12" lg="12"  class="mb-3">
                        Next Maintenance Due:
                    </b-colxx>
                    <b-colxx xxs="12" xs="4" lg="4"  class="mb-3">
                        <b-form>
                            <label class="form-group has-top-label">
                            <b-form-input v-model="formStep4.next_maintenance_mileage" type="text" :placeholder="$t('forms.van_management.next_maintenance_mileage')" />
                            <span>{{ $t('forms.van_management.next_maintenance_mileage') }}</span>
                            </label>
                        </b-form>
                    </b-colxx>
                    <b-colxx xxs="12" xs="4" lg="4" >
                      <label class="form-group has-top-label">
                        <b-form-input style="display:none" type="text" v-model.trim="formStep4.next_maintenance_due_date" />
                        <datepicker
                        :bootstrap-styling="true"
                        v-model="formStep4.next_maintenance_due_date"
                        format="dd-MM-yyyy"
                        ></datepicker>
                        <span>{{ $t('forms.van_management.next_maintenance_due_date') }}</span>
                        <b-form-invalid-feedback>Next Maintenance Date required</b-form-invalid-feedback>
                      </label>
                    </b-colxx>
                    <b-colxx xxs="12" xs="4" lg="4" class="mb-3" >
                        <b-form>
                          <label class="form-group has-top-label">
                        <v-select v-model="formStep4.next_maintenance_service"
                            label="name"
                            :reduce="maintenance => maintenance.id"
                            aria-placeholder="Maintenance Type"
                            :options="next_maintenance_service_options"
                        ></v-select>
                        <span>{{ $t('forms.van_management.next_maintenance_service_type') }}</span>
                        </label>
                        </b-form>
                    </b-colxx>
                    <b-colxx xxs="12" xs="4" lg="4"  class="mb-3" v-if="formStep4.next_maintenance_service == 'Mechanical'">
                        <b-form>
                          <label class="form-group has-top-label">
                            <b-form-input v-model="formStep4.next_maintenance_comments" type="text" :placeholder="$t('forms.van_management.next_maintenance_comments')" />
                            <span>{{ $t('forms.van_management.next_maintenance_comments') }}</span>
                            </label>
                        </b-form>
                    </b-colxx>
                    </b-row>
                </div>
            </tab>
            <tab type="done">
                <div class="wizard-basic-step text-center">
                    <div class="mt-2">
                        <div v-if="processing">
                            <b-spinner variant="primary" ></b-spinner>
                            <span class="text-primary">{{ processing_text }}</span>
                        </div>
                        <div v-else>
                            <h1 v-if="editing_mode">The Vehicle has been Upadated successfully!</h1>
                            <h1 v-else>The Vehicle has been registered successfully!</h1>
                        </div>
                    </div>
                </div>
            </tab>
        </form-wizard>
    </b-card-body>
</b-card>
</template>

<script>
import axios from "axios";
import FormWizard from "../../../components/Form/Wizard/FormWizard";
import Tab from "../../../components/Form/Wizard/Tab";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import Datepicker from "vuejs-datepicker";
import {apiUrl} from "../../../constants/config.js";
import {
    validationMixin
} from "vuelidate";
const {
    required,
    minLength,
} = require("vuelidate/lib/validators");

export default {
    components: {
        "form-wizard": FormWizard,
        "tab": Tab,
        "v-select": vSelect,
        "datepicker": Datepicker
    }
    ,
    props: {
      topNavDisabled: {
        default: true
      },
      withValidate: {
        default: false
      },
      getVehicles: {
        type: Function,
      },
      vehicle: {
        default: false
      },
      editingMode: {
        default: false
      }
    },
    data() {
        return {
            editing_mode: false,
            processing: false,
            processing_text: "",
            tyres_replaced: [
              {id: 'front', name: 'Front'},
              {id: 'rear', name: 'Rear'},
              {id: 'all', name: 'All'},
            ],
            next_maintenance_service_options: [
              {id: 'Engine Oil', name: 'Engine Oil'},
              {id: 'Transmission Oil', name: 'Transmission Oil'},
              {id: 'Diff Oil', name: 'Diff Oil'},
              {id: 'Tyre Change', name: 'Tyre Change'},
              {id: 'Wash', name: 'Wash'},
              {id: 'Mechanical', name: 'Mechanical'},
            ],
            vehicle_registration_success: false,
            policy_type_options:[],
            service_type_options:[],
            vehicle_type_options:[],
            formStep1: {
              vehicle_type_id: "",
              vin: "",
              reg_plate_number: "",
              mileage: "",
              picture: null,
              purchase_date: "",
              make: "",
              model: "",
              purchase_price: "",
              vehicle_condition: "",
            },
            formStep2: {
              // Seller's Info
              seller_name: "",
              seller_address: "",
              seller_contact_number: "",
            },
            formStep3: {
              // Insurance Info
              company_name: "",
              policy_number: "",
              policy_type_id: "",
              policy_start_date: "",
              policy_end_date: "",
              road_side_assistance: "",
              road_side_assistance_company: "",
              road_side_assistance_start_date: "",
              road_side_assistance_end_date: "",
              demage_details: "",
              damage_picture: "",
            },
            formStep4: {
              maintenance_records: [
                {
                  'maintenance_id': "",
                  'maintenance_mileage' : "",
                  'maintenance_date' : "",
                  'maintenance_type_id': "",
                  'maintenance_cost': "",
                  'maintenance_place': "",
                  'mechanic_name': "",
                  'part_replaced': "",
                  'part_repaired': "",
                  'tyre_replaced': "",
                  'comments': ""
                }
              ],
              next_maintenance_mileage: null,
              next_maintenance_due_date: null,
              next_maintenance_service: "Next maintenance service type",
              next_maintenance_comments: null,
            },
            form: {}
        }
    },
    mixins: [validationMixin],
    validations: {
      formStep1: {
        vehicle_type_id: {
          required
        },
        vin: {
          required
        },
        reg_plate_number: {
          required
        },
        mileage: {
          required
        },
        picture: {
          required
        },
        purchase_date: {
          required
        },
        make: {
          required
        },
        model: {
          required
        },
        purchase_price: {
          required
        },
        vehicle_condition: {
          required
        },
      },
      formStep2: {
        seller_name: {
          required
        },
        seller_address: {
          required
        },
        seller_contact_number: {
          required
        }
      },
      formStep3: {
        company_name: {
          required
        },
        policy_number: {
          required
        },
        policy_type_id: {
          required
        },
        policy_start_date: {
          required
        },
        policy_end_date: {
          required
        },
        // road_side_assistance: {
        //   required
        // },
        // road_side_assistance_company: {
        //   required
        // },
        road_side_assistance_start_date: {
          required
        },
        road_side_assistance_end_date: {
          required
        },
        // demage_details: {
        //   required
        // },
        // damage_picture: {
        //   required
        // },
      }
    },
    methods: {
      validateStep1(){
        this.$v.formStep1.$touch();
        return !this.$v.formStep1.$anyError;
      },
      submitStep1() {
            console.log("step-1-submit")
      },
      validateStep2(){
        this.$v.formStep2.$touch()
        return !this.$v.formStep2.$anyError;
      },

      submitStep2() {
            console.log("step-2-submit")
      },

      validateStep3(){
        this.$v.formStep3.$touch()
        return !this.$v.formStep3.$anyError;
      },

      submitStep3() {
            console.log("step-3-submit")
      },


      onFileChange(e) {
          const file = e.target.files[0];
          this.$refs.vanImage.setAttribute('src', URL.createObjectURL(file));
      },
      remove_maintenance_row(index) {
        this.formStep4.maintenance_records.splice(index, 1);
      },
      add_maintenance_row() {
        //create clone of mainteance record row
        this.formStep4.maintenance_records.push({
          'maintenance_type_id': 'Maintenance Type',
          'maintenance_cost': null,
          'maintenance_place': null,
          'mechanic_name': null,
          'comments': null
        });
      },
      get_vehicle_type_options() {
        axios.get(apiUrl + '/vehicle_type',{
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          }
        })
        .then(response => {
          this.vehicle_type_options = response.data;
        });
      },
      get_policy_type_options() {
      axios.get(apiUrl + '/policy_type',{
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
        }).then(response => {
          this.policy_type_options = response.data;
        })
      },
      get_service_type_options() {
        axios.get(apiUrl + '/service_type_options',{
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          }
          }).then(response => {
              this.service_type_options = response.data;
          })
      },
      register_vehicle() {

        this.processing_text = 'Saving vehicle data..'
        this.processing = true
        axios.post(apiUrl + '/vehicle', {...this.formStep1, ...this.formStep2, ...this.formStep3, ...this.formStep4}, {
          headers: {
            'content-type': 'multipart/form-data',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          }
        }).then(response => {

          this.$notify(
            'success filled',
            'Success!',
            'Vehicle Registered Successfully!',
            { duration: 3000, permanent: false });

            this.vehicle_registration_success = true;
            this.getVehicles();
            this.processing = false
            this.$refs.vehicleWiz.reset()

        }).catch(error => {
          this.$notify(
            'error filled',
            'Error!',
            error.response.data.message,
            { duration: 3000, permanent: false });
            this.processing = false
        })
      },

      update_vehicle(id) {


        this.processing_text = "Updating Vehicle Data.."
        this.processing = true
        axios.post(apiUrl + '/vehicle' + '/' + id,
        {...this.formStep1, ...this.formStep2, ...this.formStep3, ...this.formStep4, '_method': 'PUT'},
        {
            headers: {
                'content-type': 'multipart/form-data',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(response => {

        this.$notify(
            'success filled',
            'Success!',
            'Vehicle updated Successfully!',
            { duration: 3000, permanent: false });

            this.vehicle_registration_success = true;
            this.getVehicles();
            this.processing = false
            this.editing_Mode = false
            this.editingMode = false
            this.$forceUpdate();

        }).catch(error => {
        this.$notify(
            'error filled',
            'Error!',
            error.response.data.message,
            { duration: 3000, permanent: false });
            this.processing = false
        })
        },

      dataDone() {
        if(this.editingMode == true){
            this.update_vehicle(this.vehicle.id);
        } else {
            this.register_vehicle();
        }
      }
    },
    mounted() {
        this.getVehicles()
        // console.log(this.vehicleWiz.tabs)
        // console.log({...this.formStep1, ...this.formStep2, ...this.formStep3, ...this.formStep4});
      this.get_service_type_options();
      this.get_policy_type_options();
      this.get_vehicle_type_options();
    },
    watch: {
        editingMode(){
            this.editing_mode = this.editingMode
        },
        vehicle(data){
            this.formStep1.vehicle_type_id = this.vehicle.type_id
            this.formStep1.vin = this.vehicle.vin
            this.formStep1.reg_plate_number = this.vehicle.reg_plate_number
            this.formStep1.mileage = this.vehicle.mileage
            this.formStep1.picture = this.vehicle.picture
            this.formStep1.purchase_date = this.vehicle.purchase_date
            this.formStep1.make = this.vehicle.make
            this.formStep1.model = this.vehicle.model
            this.formStep1.purchase_price = this.vehicle.purchase_price
            this.formStep1.vehicle_condition = this.vehicle.vehicle_condition
            //Step 2 Values
            this.formStep2.seller_name = this.vehicle.seller_name
            this.formStep2.seller_address = this.vehicle.seller_address
            this.formStep2.seller_contact_number = this.vehicle.seller_contact_number
            //Step 3 Values
            this.formStep3.company_name = this.vehicle.insurance.company_name
            this.formStep3.policy_number = this.vehicle.insurance.policy_number
            this.formStep3.policy_type_id = this.vehicle.insurance.policy_type_id
            this.formStep3.policy_start_date = this.vehicle.insurance.policy_start_date
            this.formStep3.policy_end_date = this.vehicle.insurance.policy_end_date
            this.formStep3.road_side_assistance = this.vehicle.insurance.road_side_assistance
            this.formStep3.road_side_assistance_company = this.vehicle.insurance.road_side_assistance_company
            this.formStep3.road_side_assistance_start_date = this.vehicle.insurance.road_side_assistance_start_date
            this.formStep3.road_side_assistance_end_date = this.vehicle.insurance.road_side_assistance_end_date
            this.formStep3.demage_details = this.vehicle.insurance.demage_details
            this.formStep3.damage_picture = this.vehicle.insurance.damage_picture
            this.vehicle.maintenance.forEach((currentValue, index) => {
              this.formStep4.maintenance_records.unshift({
                'maintenance_id': currentValue.id,
                'maintenance_type_id': currentValue.service_type_id,
                'maintenance_mileage': currentValue.mileage,
                'maintenance_date': currentValue.date,
                'maintenance_cost': currentValue.cost,
                'maintenance_place': currentValue.place,
                'mechanic_name': currentValue.mechanic_name,
                'part_repaired': currentValue.part_repaired,
                'part_replaced': currentValue.part_replaced,
                'tyre_replaced': currentValue.tyre_replaced,
                'comments': currentValue.comments

              })
            })
            //Step 4 Values
            // this.formStep4.maintenance_records.forEach(index, item => {

              // this.formStep4.maintenance_records[index].comments = this.vehicle.maintenance[index].comments;
              // this.formStep4.maintenance_records[index].maintenance_mileage = this.vehicle.maintenance[index].maintenance_mileage;
              // this.formStep4.maintenance_records[index].maintenance_date = this.vehicle.maintenance[index].maintenance_date;
              // this.formStep4.maintenance_records[index].maintenance_type_id = this.vehicle.maintenance[index].maintenance_type_id;
              // this.formStep4.maintenance_records[index].maintenance_cost = this.vehicle.maintenance[index].maintenance_cost;
              // this.formStep4.maintenance_records[index].maintenance_place = this.vehicle.maintenance[index].maintenance_place;
              // this.formStep4.maintenance_records[index].mechanic_name = this.vehicle.maintenance[index].mechanic_name;
              // this.formStep4.maintenance_records[index].part_repaired = this.vehicle.maintenance[index].part_repaired;
              // this.formStep4.maintenance_records[index].part_replaced = this.vehicle.maintenance[index].part_replaced;
              // this.formStep4.maintenance_records[index].tyre_replaced = this.vehicle.maintenance[index].tyre_replaced;

            // })



            if(data.next_maintenance_mileage != null){
              this.formStep4.next_maintenance_mileage = data.next_maintenance_mileage
            }
            if(data.next_maintenance_due_date != null){
              this.formStep4.next_maintenance_due_date = data.next_maintenance_due_date
            }

            if(data.next_maintenance_service != null){
              this.formStep4.next_maintenance_service = data.next_maintenance_service
            }
            if(data.next_maintenance_comments != null){
              this.formStep4.next_maintenance_comments = data.next_maintenance_comments
            }

            // this.formStep4.next_maintenance_due_date = this.vehicle.next_maintenance_due_date
            // this.formStep4.next_maintenance_service = this.vehicle.next_maintenance_service
            // this.formStep4.next_maintenance_comments = this.vehicle.next_maintenance_comments


        }
    }

};
</script>
