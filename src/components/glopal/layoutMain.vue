<template>
  <v-layout class="rounded rounded-md">
    <drawerResponsev :Arrmore="Arrmore" :Arr="Arr"></drawerResponsev>
    <navDrawer></navDrawer>
    <mian-app-bar
      :Arr="Arr"
      :Arrmore="Arrmore"
      :Allpro="getproductarr"
    ></mian-app-bar>
    <AppBar :Arr="Arr" :Arrmore="Arrmore" :Allpro="getproductarr"></AppBar>
    <v-main
      class="pt-20 px-0"
      :style="`min-height: 300px; --v-layout-top:${
        windowsize > 960 ? '112px' : '65px'
      }`"
    >
      <v-progress-linear
        :active="loading"
        :indeterminate="loading"
        color="light-blue"
        style="position: fixed; z-index: 99999"
      ></v-progress-linear>
      <slot></slot>
      <footelay :Arr="Arr" :Arrmore="Arrmore"></footelay>
      <quickView></quickView>
    </v-main>
  </v-layout>
</template>

<script>
import mianAppBar from "./mainAppbar.vue";
import footelay from "./footerBar.vue";
import quickView from "./quickView.vue";
import navDrawer from "./navDrawer.vue";
import AppBar from "./AppBar.vue";
import drawerResponsev from "./drawerResponsev.vue";

import { categories } from "@/stores/categories";
import { productsAll } from "@/stores/index";
import { mapActions, mapState } from "pinia";

export default {
  data: () => {
    return {
      noor: false,
      Arr: [],
      Arr_1: [],
      Arrmore: [],
      windowsize: 0,
    };
  },
  components: {
    mianAppBar,
    footelay,
    quickView,
    navDrawer,
    AppBar,
    drawerResponsev,
  },
  computed: {
    ...mapState(categories, ["namcategories", "Allpro"]),
    ...mapState(productsAll, ["getproductarr"]),
  },
  methods: {
    ...mapActions(categories, ["name_categories", "get_categories"]),
    ...mapActions(productsAll, ["getproduct"]),
    async Allproducts() {
      this.Arr_1 = [];
      for (let i = 0; i < this.namcategories.length; i++) {
        await this.get_categories(this.namcategories[i], true);
        this.Arr_1.push(...this.Allpro);
      }

      console.log(this.Arr_1);
    },
  },
  props: ["loading"],
  inject: ["emitter"],
  beforeMount() {},

  async mounted() {
    this.emitter.on("naveuse", () => {
      this.noor = true;
    });
    await this.getproduct();
    await this.name_categories();

    this.getproductarr.forEach((el) => {
      if (!this.Arr.includes(el.category)) this.Arr.push(el.category);
    });
    this.namcategories.forEach((el) => {
      if (!this.Arr.includes(el)) this.Arrmore.push(el);
    });
    // await this.Allproducts();
    console.log("layout");
    this.windowsize = window.innerWidth;
    window.onresize = () => {
      this.windowsize = window.innerWidth;
      console.log(this.windowsize);
    };
  },
};
</script>
<!-- npm install swiper vue-awesome-swiper -->
