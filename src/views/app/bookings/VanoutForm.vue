<template>
                  <b-form >
                  <b-row>
                    <b-colxx xxs="12" xs="4" lg="4" class="mb-3">
                      <b-form class="av-tooltip tooltip-label-right">
                        <!-- <b-form-group :label="$t('forms.vanout.customer')"> -->
                            <b-form-input style="display:none" type="text"  v-model.trim="$v.form.customer_id.$model" :state="!$v.form.customer_id.$error" />
                            <v-select v-model.trim="$v.form.customer_id.$model"
                              label="name"
                              :reduce="user => user.id"
                              :state="!$v.form.customer_id.$error"
                              aria-placeholder="Select Customer"
                              :options="customer_options"
                            ></v-select>
                            <b-form-invalid-feedback v-if="$v.form.customer_id.$error">VIN is required!</b-form-invalid-feedback>
                        <!-- </b-form-group> -->
                      </b-form>
                    </b-colxx>
                    <b-colxx xxs="12" xs="4" lg="4" class="mb-3">
                      <v-select v-model="form.vehicle_id"
                        label="make"
                        :reduce="vehicle => vehicle.id"
                          aria-placeholder="Select Vehicle"
                          :options="vehicle_options"
                        ></v-select>
                    </b-colxx>
                    <b-colxx xxs="12" xs="4" lg="4" class="mb-3">
                      <v-select v-model="form.location_id"
                          label="name"
                          :reduce="location => location.id"
                          aria-placeholder="Select Customer"
                          :options="location_options"
                      ></v-select>
                    </b-colxx>
                  </b-row>
                  <b-row>
                    <b-colxx xxs="12" xs="4" lg="4" class="mb-3">
                        <!-- <b-form-input v-model="form.swap_with" :placeholder="$t('forms.vanout.swap_with')"></b-form-input> -->
                        <v-select v-model="form.swap_with"
                        label="make"
                        :reduce="swap_with => swap_with.id"
                          aria-placeholder="Select Vehicle"
                          :options="vehicle_options"
                        ></v-select>
                    </b-colxx>
                    <b-colxx xxs="12" xs="4" lg="4" class="mb-3">
                      <b-form-input v-model="form.rental_priod" :placeholder="$t('forms.vanout.rental_period')"></b-form-input>
                    </b-colxx>
                    <b-colxx xxs="12" xs="4" lg="4" class="mb-3">
                      <b-form-input v-model="form.rental_amount" :placeholder="$t('forms.vanout.rental_amount')"></b-form-input>
                    </b-colxx>
                  </b-row>
                  <b-row>
                    <b-colxx xxs="12" xs="4" lg="4" class="mb-3">
                      <b-form-input v-model="form.mileage" :placeholder="$t('forms.vanout.mileage')"></b-form-input>
                    </b-colxx>
                    <b-colxx xxs="12" xs="4" lg="4" class="mb-3">
                      <v-select v-model="form.accessory_id"
                        label="name"
                        :reduce="accessory => accessory.id"
                          aria-placeholder="Select Accessory"
                          :options="accessory_options"
                        ></v-select>
                    </b-colxx>
                    <b-colxx xxs="12" xs="4" lg="4" class="mb-3">
                      <datepicker
                        :bootstrap-styling="true"
                        :placeholder="$t('forms.vanout.due_return')"
                        v-model="form.due_return"
                      ></datepicker>
                      <!-- <b-form-input v-model="form.due_return" type="date" :placeholder="$t('forms.vanout.due_return')"></b-form-input> -->
                    </b-colxx>
                  </b-row>
                  <b-row>
                    <b-colxx xxs="12" xs="4" lg="4" class="mb-3">
                        <b-form-textarea v-model="form.reason_of_renting" :placeholder="$t('forms.vanout.reason_of_renting')"></b-form-textarea>
                    </b-colxx>
                  </b-row>
                  <b-row>
                    <b-colxx xxs="12" xs="3" lg="3" class="mb-3">
                      <label class="form-group has-top-label">
                        <b-form-input
                        v-model="vanin_form.bond_deposit"
                          >
                      </b-form-input>
                      <span>{{ $t('forms.toll.bond_deposit') }}</span>
                      </label>
                    </b-colxx>
                    <b-colxx xxs="12" xs="3" lg="3" class="mb-3">
                      <label class="form-group has-top-label">
                        <v-select v-model="vanin_form.payment_mode"
                          label="name"
                          :reduce="customer => customer.id"
                          :options="payment_mode_options"
                      ></v-select>
                      <span>{{ $t('forms.toll.payment_mode') }}</span>
                      </label>
                    </b-colxx>
                  </b-row>
                  <b-button  @click.stop="save"  variant="primary" class="mt-4 mb-4">{{ 'Save' }}</b-button>
                  <div v-if="isProcessing">
                    <b-spinner variant="primary" label="Spinning" class="mb-1"></b-spinner>
                    <p class="text-primary">{{ processing_text }}</p>
                  </div>
                </b-form>
</template>
<script>

export default ({
  name: 'vanout-form',
  props: [
    'form',
    'save'
  ],
  components: {

  },
  data() {
    return {
      isProcessing : true,
      processing_text: "Loading ..."
    }
  },
})
</script>
