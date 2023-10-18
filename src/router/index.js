import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },

  {
    name: "categories",
    path: "/categories/:categories",
    component: () => import("../views/categoriesAll.vue"),
  },
  {
    name: "YourCart",
    path: "/Home/Yourcart",
    component: () => import("../views/uourCart.vue"),
  },
  {
    name: "detalse",
    path: "/detalse/:category/:title/:id",
    component: () => import("../views/detalsBroduct.vue"),
    meta: {
      prduct: "id",
    },
  },
  {
    name: "checkout",
    path: "/home/checkout",
    component: () => import("../views/checkOut.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  // scrollBehavior() {
  //   console.log("toptoptoptop");
  //   return { x: 0, y: 0, behavior: "smooth" };
  // },
});

export default router;
