import Vue from "vue";
import VueRouter from "vue-router";
import AuthRequired from "./utils/AuthRequired";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: () => import(/* webpackChunkName: "landing" */ "./views/user"),
    redirect: "/user/",
  },
  {
    path: "/user",
    component: () => import(/* webpackChunkName: "user" */ "./views/user"),
    redirect: "/user/login",
    children: [
      {
        path: "login",
        component: () =>
          import(/* webpackChunkName: "login" */ "./views/user/Login"),
      },
      {
        path: "forgot-password",
        component: () =>
          import(/* webpackChunkName: "forgot-password" */ "./views/user/ForgotPassword"),
      },
      {
        path: "register",
        component: () =>
          import(/* webpackChunkName: "register" */ "./views/user/Register"),
      }
    ]
  },
  {
    path: "/app",
    component: () => import(/* webpackChunkName: "app" */ "./views/app"),
    redirect: "/app/dashboard",
    beforeEnter: AuthRequired,
    children: [
      {
        path: "profile",
        component: () => import(/* webpackChunkName: "profile" */ "./views/user/profile"),
      },
      {
        path: "search",
        component: () =>
          import(/* webpackChunkName: "search" */ "./views/app/search")
      },
      {
        path: "dashboard",
        component: () =>
          import(/* webpackChunkName: "dashboard" */ "./views/app/dashboard")
      },
      {
        path: "bookings",
        component: () =>
          import(/* webpackChunkName: "bookings" */ "./views/app/bookings")
      },
      {
        path: "van_management",
        component: () =>
          import(/* webpackChunkName: "van_management" */ "./views/app/van_management")
      },
      {
        path: "van_management/vehicle_detail/:id",
        component: () =>
          import(/* webpackChunkName: "vehicle-list" */ "./views/app/van_management/VehicleDetail"),
      },
      {
        path: "records",
        component: () =>
          import(/* webpackChunkName: "records" */ "./views/app/records")
      },
      {
        path: "reports",
        component: () =>
          import(/* webpackChunkName: "reports" */ "./views/app/reports"),
      },
      {
        path: "settings",
        component: () =>
          import(/* webpackChunkName: "settings" */ "./views/app/settings"),
      },
      {
        path: "customer-list",
        component: () =>
          import(/* webpackChunkName: "customer-list" */ "./views/app/report-temps/customer_list")
      },
      {
        path: "vans-list",
        component: () =>
          import(/* webpackChunkName: "vans-list" */ "./views/app/report-temps/vans_list")
      },
      {
        path: "view-earnings",
        component: () =>
          import(/* webpackChunkName: "earnings" */ "./views/app/report-temps/view_earnings")
      },
      {
        path: "view-maintenance-cost",
        component: () =>
          import(/* webpackChunkName: "maintenance_cost" */ "./views/app/report-temps/view_maintenance_cost")
      },
      {
        path: "list-of-maintenance-done",
        component: () =>
          import(/* webpackChunkName: "maintenance_done" */ "./views/app/report-temps/list_of_maintenance_done")
      },
      {
        path: "profit-and-loss",
        component: () =>
          import(/* webpackChunkName: "profit_and_loss" */ "./views/app/report-temps/profit_and_loss")
      },
      {
        path: "van-rental-history",
        component: () =>
          import(/* webpackChunkName: "rental_history" */ "./views/app/report-temps/van_rental_history")
      },

    ]
  },


  {
    path: "*",
    component: () => import(/* webpackChunkName: "error" */ "./views/Error")
  }
];

const router = new VueRouter({
  linkActiveClass: "active",
  routes,
  mode: "history"
});

export default router;
