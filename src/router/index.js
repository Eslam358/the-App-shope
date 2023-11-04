import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/HomeView.vue"),
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
});

export default router;
