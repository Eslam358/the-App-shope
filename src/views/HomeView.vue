<template>
  <div class="home" style="overflow: hidden">
    <headHome></headHome>
    <photoHome></photoHome>
    <swiperBrutect
      :titlehead="title"
      router="Allproduct"
      :colortitle="colortitl"
      :colorspan="colorspan"
      :getproductarr="getproductarr.slice(0, 16)"
    ></swiperBrutect>
    <!-- img -->
    <v-container fluid class="px-0">
      <v-row>
        <img
          style="width: 100%"
          src="../assets/images/cyber-banner.webp"
          alt=""
        />
      </v-row>
    </v-container>
    <TopCategories :getproductarr="getproductarr.slice(7, 19)"></TopCategories>
    <newProducts
      :getproductarr="getproductarr.filter((a) => a.category == 'laptops')"
      router="laptops"
    ></newProducts>
    <broductes></broductes>
    <swiperBrutect
      titlehead="Top Mobile Phones"
      router="smartphones"
      :colortitle="`#522020FF`"
      :colorspan="colorspan"
      :getproductarr="getproductarr.filter((a) => a.category == 'smartphones')"
    ></swiperBrutect>
    <!-- img -->
    <v-container fluid class="px-0">
      <v-row>
        <v-col class="py-0" cols="12" sm="6" lg="6" xl="6" xxl="6">
          <img
            style="width: 100%"
            src="../assets/images/band-left-cover.webp"
            alt=""
        /></v-col>
        <v-col class="py-0" cols="12" sm="6" lg="6" xl="6" xxl="6">
          <img
            style="width: 100%"
            src="../assets/images/band-right-cover.webp"
            alt=""
        /></v-col>
      </v-row>
    </v-container>
    <swiperBrutect
      titlehead="Top Home Decoration"
      router="home-decoration"
      :colortitle="`#522020FF`"
      :colorspan="colorspan"
      :getproductarr="
        getproductarr.filter((a) => a.category == 'home-decoration')
      "
    ></swiperBrutect>
    <!-- img -->
    <v-container fluid class="px-0">
      <v-row style="overflow: hidden">
        <img class="img-tv" src="../assets/images/tv-banner.webp" alt="" />
      </v-row>
    </v-container>
    <swiperBrutect
      titlehead="Top Fragrances"
      :colortitle="`#522020FF`"
      :colorspan="colorspan"
      router="fragrances"
      :getproductarr="getproductarr.filter((a) => a.category == 'fragrances')"
    ></swiperBrutect>
    <featuredBrans></featuredBrans>
    <swiperBrutect
      titlehead="Recommended For You"
      :colortitle="`#202020FF`"
      :colorspan="colorspan"
      router="groceries"
      :getproductarr="getproductarr.filter((a) => a.category == 'groceries')"
      margin="auto"
    ></swiperBrutect>
    <wheShopWithUs></wheShopWithUs>
  </div>
</template>

<style lang="scss">
.swiper-free .swiper-pagination {
  bottom: 2px;
}
.img-tv {
  width: 100%;
  min-height: 200px;
  @media screen and (max-width: 400px) {
    width: 170%;
  }
}
.swiper-free .swiper-button-next:after,
.swiper-free .swiper-button-prev:after {
  color: #505050ff;
  font-size: 14px;
}
</style>

<script>
// @ is an alias to /src
import headHome from "@/components/HomeBage/headHome.vue";
import photoHome from "@/components/HomeBage/photoHome.vue";
import swiperBrutect from "@/components/HomeBage/swiperBrutect.vue";
import TopCategories from "@/components/HomeBage/topCategories.vue";
import newProducts from "@/components/HomeBage/newProducts.vue";
import broductes from "@/components/HomeBage/broDDuctes.vue";
import featuredBrans from "@/components/HomeBage/featuredBrans.vue";
import wheShopWithUs from "@/components/HomeBage/wheShopWithUs.vue";

// pinia
import { productsAll } from "@/stores/index";
import { categories } from "@/stores/categories";
import { mapActions, mapState } from "pinia";

export default {
  data: () => {
    return {
      title: "Flash Deals",
      colortitl: "#E10600",
      colorspan: "#202020",
      Arrmore: [],
      Arr: [],
    };
  },
  name: "HomeView",
  components: {
    headHome,
    photoHome,
    swiperBrutect,
    TopCategories,
    newProducts,
    broductes,
    featuredBrans,
    wheShopWithUs,
  },
  computed: {
    ...mapState(productsAll, ["getproductarr"]),
    ...mapState(categories, ["namcategories"]),
  },
  methods: {
    ...mapActions(productsAll, ["getproduct"]),
    ...mapActions(categories, ["name_categories"]),
    test() {
      let A = [];
      this.getproductarr.forEach((el) => {
        if (!A.includes(el.category)) A.push(el.category);
      });
      console.log(A);
    },
  },
  async mounted() {
    await this.getproduct();
    await this.name_categories();

    this.getproductarr.forEach((el) => {
      if (!this.Arr.includes(el.category)) this.Arr.push(el.category);
    });
    console.log(this.Arr);
    console.log(this.$route);
    console.log(this.$router);
  },
};
</script>
