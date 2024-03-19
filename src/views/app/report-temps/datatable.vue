<template>
  <div>
    <datatable-heading
      :searchColumn="searchColumn"
      :changeSearchColumn="changeSearchColumn"
      :changePageSize="changePageSize"
      :searchChange="searchChange"
      :from="from"
      :to="to"
      :total="total"
      :perPage="perPage"
      :title="title"
    ></datatable-heading>

    <b-row>
      <b-colxx xxs="12">
          <h2 v-if="sum" >Total: <span class="text-primary">${{ sum }}</span></h2>
          <vuetable
            class="table-divided order-with-arrow"
            ref="vuetable"
            :api-mode=false
            :items="records"
            :data-manager="dataManager"
            :query-params="makeQueryParams"
            :per-page="perPage"
            :append-params="moreParams"
            :fields="fields"
            pagination-path="pagination"
            @vuetable:pagination-data="onPaginationData"
          >
          <template slot="amount" slot-scope="props">
            ${{props.rowData.amount}}
          </template>
          <template slot="cost" slot-scope="props">
            ${{props.rowData.cost}}
          </template>
          <template slot="sub_total" slot-scope="props">
            ${{props.rowData.sub_total}}
          </template>
          </vuetable>


        <vuetable-pagination-bootstrap
          class="mt-4"
          ref="pagination"
          @vuetable-pagination:change-page="onChangePage"
        />
      </b-colxx>
    </b-row>
  </div>
</template>
<script>
import Vue from 'vue';
import Vuetable from "vuetable-2/src/components/Vuetable";
import VuetablePaginationBootstrap from "../../../components/Common/VuetablePaginationBootstrap";
import { apiUrl } from "../../../constants/config";
import DatatableHeading from "../../../containers/datatable/DatatableHeading";

export default {
  props: ["title", "fields", "data", "searchColumn", "sum"],
  components: {
    vuetable: Vuetable,
    "vuetable-pagination-bootstrap": VuetablePaginationBootstrap,
    "datatable-heading": DatatableHeading
  },
  data() {
    return {
      moreParams: {

      },
      isLoad: false,
      sort: "",
      page: 1,
      perPage: 10,
      search: "",
      from: 0,
      to: 0,
      total: 0,
      lastPage: 0,
      // data: [],
      items: [],
      records: [],
      selectedItems: [],
      sColumn: [],
      selectedSearchColumn: this.searchColumn[0]

    };
  },
  methods: {
    changeSearchColumn(value) {
      this.selectedSearchColumn = value
      console.log('search column changed to : ', value)
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
      console.log(page)
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
  },
  computed: {
    filteredList() {
      this.array = this.data
      return this.array.filter((model) => {
        if(this.search == ''){
          return this.data;
        } else {
          return this.search.toLowerCase().split(' ').every(v => model[this.selectedSearchColumn].toLowerCase().includes(v));
        }
      });
    }
  },
  mounted() {
    // this.items = this.data
  },
  watch: {
    // items(value) {
    //   this.data = value
    // },
    searchColumn(value) {
      this.sColumn = this.searchColumn
    },
    data(value) {
      this.items = value
    },
    filteredList(value) {
      this.records = this.filteredList
    },
    items(newVal, oldVal) {
      this.$refs.vuetable.refresh();
    },
    sum: function (newVal, oldVal) {
      this.sum = newVal
    }
  }
};
</script>
