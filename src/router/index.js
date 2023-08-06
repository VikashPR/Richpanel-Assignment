import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import { auth } from "../firebase";

Vue.use(VueRouter);

const routes = [
  {
    path: "/register",
    name: "register",
    meta: {
      requiresGuest: true,
    },
    component: () =>
      import( "../views/Auth/RegisterView.vue"),
  },
  {
    path: "/login",
    name: "login",
    meta: {
      requiresGuest: true,
    },
    component: () =>
      import( "../views/Auth/LoginView.vue"),
  },
  {
    path: '/logout',
    name: 'logout',
    meta: {
      requiresAuth: true,
    },
    component: () =>
      import( "../views/Auth/LogoutView.vue"),
  },
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/payment/:planDuration/:selectedPlan",
    name: "payment",
    meta: {
      requiresAuth: true,
    },
    component: () => import("../views/PaymentView.vue"),
  },
  {
    path: "/user-plan",
    name: "user-plan",
    meta: {
      requiresAuth: true,
    },
    component: () => import("../views/UserPlanView.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});


router.beforeEach((to, from, next) => {
  // Check for requiredAuth guard
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // Check if NOT logged in
    if (!auth.currentUser) {
      // Go to login
      next({
        path: "/login",
        query: {
          redirect: to.fullPath,
        },
      });
    } else {
      // Proceed to route
      next();
    }
  } else if (to.matched.some((record) => record.meta.requiresGuest)) {
    // Check if logged in
    if (auth.currentUser) {
      // Go to login
      next({
        path: "/",
        query: {
          redirect: to.fullPath,
        },
      });
    } else {
      // Proceed to route
      next();
    }
  } else {
    // Proceed to route
    next();
  }
});


export default router;
