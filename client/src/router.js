import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      alias: "/lookup",
      name: "lookup",
      component: () => import("./components/Lookup")
    },
    {
      path: "/",
      name: "alerts",
      component: () => import("./components/Alerts")
    },
    {
      path: "/login",
      name: "login",
      component: () => import("./components/Login")
    },
    {
      path: "/home/:data",
      name: "home",
      component: () => import("./components/Home")
    }
  ]
});