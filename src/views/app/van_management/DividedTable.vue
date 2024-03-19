<template>
  <div>
    <last-step-end :editingMode="editing_mode" :vehicle="vehicle"  :getVehicles="get_vehicles" />

    <datatable-heading
      :changePageSize="changePageSize"
      :searchChange="searchChange"
      :searchColumn="searchColumn"
      :from="from"
      :to="to"
      :total="total"
      :perPage="perPage"
      :title="title"
    ></datatable-heading>
    <b-row>
      <b-colxx xxs="12">
        <vuetable
          :data-manager="dataManager"
          ref="vuetable"
          class="table-divided order-with-arrow"
          :api-mode="false"
          :query-params="makeQueryParams"
          :per-page="perPage"
          :items="records"
          :fields="fields"
          pagination-path="pagination"
          @vuetable:pagination-data="onPaginationData"
        >
          <template slot="picture" slot-scope="props">
            <router-link :to="{path:'/app/van_management/vehicle_detail/'+props.rowData.id}">
              <img
                style="width: 100px !important"
                alt="Thumbnail"
                :src="props.rowData.picture"
                class="list-thumbnail responsive border-0"
              />
            </router-link>
          </template>
          <template slot="added" slot-scope="props">
              <ul>
                  <li>Added: {{ props.rowData.added }}</li>
                  <li>Updated: {{ props.rowData.updated }} </li>
              </ul>
            </template>
          <template slot="actions" slot-scope="props">
                <router-link :to="{path:'/app/van_management/vehicle_detail/'+props.rowData.id}" size="sm" variant="grey">
                  <i class="simple-icon-eye"></i>
                </router-link>
                <b-button @click="edit(props.rowData.id)" size="sm" variant="grey">
                  <i class="simple-icon-pencil"></i>
                </b-button>
                <b-button :v-if="user.role_id == 1" @click="delete_vehicle(props.rowData.id)" size="sm" variant="grey">
                  <i class="simple-icon-trash"></i>
                </b-button>
                <b-button v-if="user.role_id == 1 && props.rowData.status_id == 3" @click="mark_vehicle_active(props.rowData.id)" size="sm" variant="grey">
                  <i class="simple-icon-check"></i>
                </b-button>
          </template>
        </vuetable>
        <vuetable-pagination-bootstrap
          :per-page="perPage"
          class="mt-4"
          ref="pagination"
          @vuetable-pagination:change-page="onChangePage"
        />
      </b-colxx>
    </b-row>

    <v-contextmenu ref="contextmenu">
      <v-contextmenu-item @click="onContextMenuAction('copy')">
        <i class="simple-icon-docs" />
        <span>Copy</span>
      </v-contextmenu-item>
      <v-contextmenu-item @click="onContextMenuAction('move-to-archive')">
        <i class="simple-icon-drawer" />
        <span>Move to archive</span>
      </v-contextmenu-item>
      <v-contextmenu-item @click="onContextMenuAction('delete')">
        <i class="simple-icon-trash" />
        <span>Delete</span>
      </v-contextmenu-item>
    </v-contextmenu>
  </div>
</template>
<script>
import LastStepEnd from "./LastStepEnd.vue";
import Vuetable from "vuetable-2/src/components/Vuetable";
import VuetablePaginationBootstrap from "../../../components/Common/VuetablePaginationBootstrap";
import { apiUrl } from "../../../constants/config";
import DatatableHeading from "../../../containers/datatable/DatatableHeading";
import { mapGetters } from "vuex";
import axios from 'axios'

export default {
  props: ["title", "fields", "searchColumn"],
  components: {
    vuetable: Vuetable,
    "vuetable-pagination-bootstrap": VuetablePaginationBootstrap,
    "datatable-heading": DatatableHeading,
    "last-step-end": LastStepEnd,
  },
  data() {
    return {
      data: [],
      editing_mode: false,
      vehicles: [],
      vehicle: null,
      user: null,
      isLoad: false,
      sort: "",
      page: 1,
      perPage: 10,
      search: "",
      from: 0,
      to: 0,
      total: 0,
      lastPage: 0,
      selectedItems: [],
      items: [],
      records: [],

      // fields: [
      //   {
      //     name: "title",
      //     sortField: "title",
      //     title: "Name",
      //     titleClass: "",
      //     dataClass: "list-item-heading",
      //     width: "50%"
      //   },
      //   {
      //     name: "sales",
      //     sortField: "sales",
      //     title: "Sales",
      //     titleClass: "",
      //     dataClass: "text-muted",
      //     width: "10%"
      //   },
      //   {
      //     name: "stock",
      //     sortField: "stock",
      //     title: "Stock",
      //     titleClass: "",
      //     dataClass: "text-muted",
      //     width: "10%"
      //   },
      //   {
      //     name: "category",
      //     sortField: "category",
      //     title: "Category",
      //     titleClass: "",
      //     dataClass: "text-muted",
      //     width: "25%"
      //   },
      //   {
      //     name: "__slot:actions",
      //     title: "",
      //     titleClass: "center aligned text-right",
      //     dataClass: "center aligned text-right",
      //     width: "5%"
      //   }
      // ]
    };
  },
  methods: {

    get_vehicles() {
      //Vehicles
      axios.get(
        apiUrl + '/vehicle',{
        headers:{
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      }
      ).then(response => {
        {
          //parse json data
          this.data = response.data
        }
      })
    },

    edit(id){
      this.editing_mode = true

      axios.get(
        apiUrl + '/vehicle/' + id,{
          headers:{
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          }
        }
      ).then(response => {
        this.vehicle = response.data
        window.scrollTo(0,0);
      })
    },


    delete_vehicle(id) {
      axios.delete(
        apiUrl + '/vehicle/' + id,{
          headers:{
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          }
        }
      ).then(response => {
        this.get_vehicles()
        this.$notify('success filled', 'Success!', 'Vehicle has been deleted!',{ duration: 3000, permanent: false })
      }).catch(error => {
        this.$notify('error filled', 'Error!', error.response.data.message,{ duration: 3000, permanent: false });
      })
    },

    mark_vehicle_active(id){
      axios.post(
        apiUrl + '/update_vehicle_status/' + id, {status_id: 1, '_method': 'PUT'}, {
          headers:{
            'content-type': 'multipart/form-data',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          }
        }
      ).then(response => {
        this.get_vehicles()
        this.$notify('success filled', 'Suceess!', 'vehicle status has been updated!',{ duration: 3000, permanent: false })
      }).catch(error => {
        this.$notify('error filled', 'Error!', error.response.data.message,{ duration: 3000, permanent: false });
      })
    },

    dataManager(sortOrder, pagination) {
      if (this.records.length < 1) return;

      let local = this.records;

      // sortOrder can be empty, so we have to check for that as well
      if (sortOrder.length > 0) {
        // console.log("orderBy:", sortOrder[0].sortField, sortOrder[0].direction);
        local = _.orderBy(
          local,
          sortOrder[0].sortField,
          sortOrder[0].direction
        );
      }

      pagination = this.$refs.vuetable.makePagination(
        local.length,
        this.perPage
      );
      // console.log('pagination:', pagination)
      let from = pagination.from - 1;
      let to = from + this.perPage;

      return {
        pagination: pagination,
        data: _.slice(local, from, to)
      };
    },
    makeQueryParams(sortOrder, currentPage, perPage) {
      this.selectedItems = [];
      return sortOrder[0]
        ? {
            sort: sortOrder[0]
              ? sortOrder[0].field + "|" + sortOrder[0].direction
              : "",
            page: currentPage,
            per_page: this.perPage,
            search: this.search
          }
        : {
            page: currentPage,
            per_page: this.perPage,
            search: this.search
          };
    },

    onPaginationData(paginationData) {
      this.from = paginationData.from;
      this.to = paginationData.to;
      this.total = paginationData.total;
      this.lastPage = paginationData.last_page;
      this.items = paginationData.data;
      this.$refs.pagination.setPaginationData(paginationData);
    },
    onChangePage(page) {
      this.$refs.vuetable.changePage(page);
    },

    changePageSize(perPage) {
      this.perPage = perPage;
      this.$refs.vuetable.refresh();
    },

    searchChange(val) {
      this.search = val;
      this.items = this.filteredList
      this.$refs.vuetable.refresh();
    },

    selectAll(isToggle) {
      if (this.selectedItems.length >= this.items.length) {
        if (isToggle) this.selectedItems = [];
      } else {
        this.selectedItems = this.items.map(x => x.id);
      }
    },
    keymap(event) {
      switch (event.srcKey) {
        case "select":
          this.selectAll(false);
          break;
        case "undo":
          this.selectedItems = [];
          break;
      }
    },
    getIndex(value, arr, prop) {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i][prop] === value) {
          return i;
        }
      }
      return -1;
    },

    onContextMenuAction(action) {
      console.log(
        "context menu item clicked - " + action + ": ",
        this.selectedItems
      );
    }
  },
  computed: {
    ...mapGetters(["currentUser"]),
    isSelectedAll() {
      return this.selectedItems.length >= this.items.length;
    },
    isAnyItemSelected() {
      return (
        this.selectedItems.length > 0 &&
        this.selectedItems.length < this.items.length
      );
    },

    filteredList() {
      this.array = this.data
      return this.array.filter((model) => {
        if(this.search == ''){
          return this.data;
        } else {
          return this.search.toLowerCase().split(' ').every(v => model[this.searchColumn].toLowerCase().includes(v));
        }
      });
    }
  },
  mounted(){
    this.get_vehicles()
  },
  watch: {
    currentUser() {
      this.user = this.currentUser;
    },
    // data(newVal, oldVal) {
    //   this.vehicles = this.data
    //   this.$refs.vuetable.refresh();
    // },

    searchColumn(value) {
      this.sColumn = this.searchColumn
    },
    data(value) {
      this.items = this.data
    },
    filteredList(value) {
      this.records = this.filteredList
    },
    items(newVal, oldVal) {
      this.$refs.vuetable.refresh();
    }


  }
};
</script>
