<template>
  <v-layout class="rounded rounded-md">
    <drawerResponsev :Arrmore="Arrmore" :Arr="Arr"></drawerResponsev>
    <navDrawer></navDrawer>
    <mian-app-bar
      :Arr="Arr"
      v-if="$route.name !== 'checkout'"
      :Arrmore="Arrmore"
      :Allpro="getproductarr"
    ></mian-app-bar>
    <AppBar
      v-if="$route.name !== 'checkout'"
      :Arr="Arr"
      :Arrmore="Arrmore"
      :Allpro="getproductarr"
    ></AppBar>

    <v-main
      class="pt-20 px-0 main-layout"
      :style="`min-height: 300px;${
        $route.name == 'checkout'
          ? ' --v-layout-top: 0px !important; padding-top: 0 !important;'
          : ''
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

    <dialogPalestine></dialogPalestine>
  </v-layout>
</template>
<style lang="scss">
.main-layout {
  --v-layout-top: 112px !important;
  @media screen and (max-width: 960px) {
    --v-layout-top: 65px !important;
  }
}
</style>

<script>
import mianAppBar from "./mainAppbar.vue";
import footelay from "./footerBar.vue";
import quickView from "./quickView.vue";
import navDrawer from "./navDrawer.vue";
import AppBar from "./AppBar.vue";
import drawerResponsev from "./drawerResponsev.vue";
import dialogPalestine from "./dialogPalestine.vue";

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
    };
  },
  components: {
    mianAppBar,
    footelay,
    quickView,
    navDrawer,
    AppBar,
    drawerResponsev,
    dialogPalestine,
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
    },
  },
  props: ["loading"],
  inject: ["emitter"],
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
  },
};
</script>
<!-- npm install swiper vue-awesome-swiper -->
