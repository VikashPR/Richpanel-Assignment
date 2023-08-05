import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { auth } from "../firebase";

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: {
      authRequired: true,
    },
  },
  {
    path: "/register",
    name: "register",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Auth/RegisterView.vue"),
  },
  {
    path: "/login",
    name: "login",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Auth/LoginView.vue"),
  },
  {
    path: "/payment/:planDuration/:selectedPlan",
    name: "payment",
    component: () => import("../views/PaymentView.vue"),
    meta: {
      authRequired: true,
    },
  },
  {
    path: "/user-plan",
    name: "user-plan",
    component: () => import("../views/UserPlanView.vue"),
    meta: {
      authRequired: true,
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const authRequired = to.matched.some((route) => route.meta.authRequired);
  const isAuthenticated = auth.currentUser;
  if (!authRequired && !isAuthenticated) {
    next();
  } else if (authRequired && !isAuthenticated) {
    next("/login");
  } else if (authRequired && isAuthenticated) {
    next();
  } else {
    next("/");
  }
});

export default router
