<template>
  <div>
    <datatable-heading
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

          <vuetable
            ref="vuetable"
            :api-mode=false
            :items="data"
            :data-manager="dataManager"
            :query-params="makeQueryParams"
            :per-page="perPage"
            :fields="fields"
            pagination-path="pagination"
            @vuetable:pagination-data="onPaginationData"
          >

          <div slot="gender-slot" slot-scope="props">
            {{ props }}
            <!-- <b-button  @click.stop="edit_role(props.rowData.id)"  variant="grey" size="xs" ><i class="simple-icon-pencil"  ></i></b-button>
            <b-button v-if="user.role_id == 1"  @click.stop="delete_role(props.rowData.id)"  variant="grey" size="xs" ><i class="simple-icon-trash"></i></b-button> -->
            <!-- <span v-if="props.rowData.gender === 'M'" class="ui teal label"><i class="large man icon"></i>Male</span>
              <span v-else class="ui pink label"><i class="large woman icon"></i>Female</span> -->
            </div>
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
import Vuetable from "vuetable-2/src/components/Vuetable";
import VuetablePaginationBootstrap from "../../../components/Common/VuetablePaginationBootstrap";
import { apiUrl } from "../../../constants/config";
import DatatableHeading from "../../../containers/datatable/DatatableHeading";

export default {
  props: ["title", "fields", "data"],
  components: {
    vuetable: Vuetable,
    "vuetable-pagination-bootstrap": VuetablePaginationBootstrap,
    "datatable-heading": DatatableHeading
  },
  data() {
    return {
      isLoad: false,
      sort: "",
      page: 1,
      perPage: 12,
      search: "",
      from: 0,
      to: 0,
      total: 0,
      lastPage: 0,
      // data: [],
      items: [],
      selectedItems: [],


    };
  },
  methods: {
    dataManager(sortOrder, pagination) {
      if (this.data.length < 1) return;

      let local = this.data;

      // sortOrder can be empty, so we have to check for that as well
      if (sortOrder.length > 0) {
        console.log("orderBy:", sortOrder[0].sortField, sortOrder[0].direction);
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
      console.log('pagination:', pagination)
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
      this.$refs.vuetable.refresh();
    },
  },
  computed: {

  },
  mounted() {
    // this.data = this.items;
  },
  watch: {
    // items(value) {
    //   this.data = value
    // },
    data(newVal, oldVal) {
      this.$refs.vuetable.refresh();
    }
  }
};
</script>
