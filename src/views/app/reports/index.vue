<template>
  <div>
    <b-row>
      <b-colxx xxs="12">
          <h4> {{ $t('menu.reports.reports') }}</h4>
          <b-card class="mb-4"  >
            <b-row class="mb-4">
              <b-colxx offset="3" xxs="3">
                <button class="btn btn-block btn-primary" @click="getReportPage('customer-list')" >Customer List</button>
              </b-colxx>
              <b-colxx xxs="3">
                <button class="btn btn-block btn-primary" @click="getReportPage('vans-list')">Vehicles List</button>
              </b-colxx>
            </b-row>
            <b-row class="mb-4">
              <b-colxx offset="3" xxs="3">
                <button class="btn btn-block btn-primary" @click="getReportPage('view-earnings')">View Earnings</button>
              </b-colxx>
              <b-colxx xxs="3">
                <button class="btn btn-block btn-primary" @click="getReportPage('view-maintenance-cost')">View Maintenance Cost</button>
              </b-colxx>
            </b-row>
            <b-row class="mb-4">
              <b-colxx offset="3" xxs="3">
                <button class="btn btn-block btn-primary" @click="getReportPage('list-of-maintenance-done')">List of Maintenance Done</button>
              </b-colxx>
              <b-colxx xxs="3">
                <button class="btn btn-block btn-primary" @click="getReportPage('profit-and-loss')">Profit & Loss</button>
              </b-colxx>
            </b-row>
            <b-row class="mb-4">
              <b-colxx offset="4" xxs="4">
                <button class="btn btn-block btn-primary"  @click="getReportPage('van-rental-history')">Vehicle Rental History</button>
              </b-colxx>
            </b-row>
          </b-card>
      </b-colxx>
    </b-row>
  </div>
</template>
<script>

export default ({
  data() {
    return {
      reports: [],
    }
  },
  methods: {
    getReportPage(pageName){
      this.$router.push('/app/' + pageName)
    }
  },
  mounted(){
    if(localStorage.getItem('token') !== null) {
      this.$store.commit('setUser', JSON.parse(localStorage.getItem('user')));
    } else{
      this.$router.push('/user/login');
    }
  }
})
</script>


