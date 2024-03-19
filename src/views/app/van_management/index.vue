<template>
  <div>
    <b-row>
      <b-colxx xxs="12">
        <h5 class="mb-4 card-title">{{ $t('menu.van_management') }}</h5>
          <divided-table
            :fields="fields"
            :title="title"
            :searchColumn="searchColumns"
            class="mt-4"
          />
      <!-- </b-row> -->
      </b-colxx>
    </b-row>
  </div>
</template>
<script>
import {apiUrl} from "../../../constants/config.js"
import { mapGetters } from "vuex";
import DividedTable from "./DividedTable.vue";

export default ({
  components: {
    "divided-table": DividedTable
  },
  data() {
    return {
      title: "Vehicle Management",
      searchColumns: ["reg_plate_number"],
      user: null,

      fields: [
        {
          name: "__slot:picture",
          title: 'Picture',
          titleClass: "center aligned",
          dataClass: "center aligned",
          width: "15%"
        },
        {
          name: "type",
          title: 'Type',
          sortField: "type",
          titleClass: "center aligned",
          dataClass: "center aligned",
          width: "5%"
        },
        {
          name: "model",
          title: 'Model',
          sortField: "model",
          titleClass: "center aligned",
          dataClass: "center aligned",
          width: "5%"
        },
        // {
        //   name: "make",
        //   title: 'Make',
        //   sortField: "make",
        //   titleClass: "center aligned",
        //   dataClass: "center aligned",
        //   width: "5%"
        // },
        {
          name: "purchase_price",
          title: 'Purchase Price',
          sortField: "purchase_price",
          titleClass: "center aligned",
          dataClass: "center aligned",
          width: "5%"
        },
        {
          name: "reg_plate_number",
          title: 'Reg. Plate #',
          sortField: "reg_plate_number",
          titleClass: "center aligned",
          dataClass: "center aligned",
          width: "5%"
        },
        {
          name: "status",
          title: 'Status',
          sortField: "status",
          titleClass: "center aligned",
          dataClass: "center aligned",
          width: "5%"
        },
        {
          name: "__slot:added",
          title: 'Added / Updated',
          titleClass: "center aligned",
          dataClass: "center aligned",
          width: "20%"
        },
        {
        name: "__slot:actions",
          title: "Actions",
          titleClass: "center aligned text-right",
          dataClass: "center aligned text-right",
          width: "15%"
        }]
    }
  },
  computed: {
    ...mapGetters(['currentUser']),
  },
  mounted() {
    if(localStorage.getItem('token') !== null) {
      this.$store.commit('setUser', JSON.parse(localStorage.getItem('user')));
    } else{
      this.$router.push('/user/login');
    }
    // this.get_vehicles()
  },
  watch: {
    currentUser() {
      this.user = this.currentUser
      this.user
    },

  }
})

</script>


