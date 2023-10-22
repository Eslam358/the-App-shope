<template>
  <v-container fluid>
    <v-row v-if="snackbar">
      <v-col cols="12">
        <v-skeleton-loader
          max-width="250"
          class="mx-auto"
          type="list-item-two-line"
        ></v-skeleton-loader>
      </v-col>

      <v-col cols="12" md="7">
        <v-skeleton-loader
          class="mx-auto border"
          max-width=""
          type="image, table-tfoot"
        ></v-skeleton-loader>
      </v-col>
      <v-col cols="12" md="5">
        <v-skeleton-loader
          class="mx-auto border"
          max-width=""
          type="table-heading,article,table-tfoot"
        ></v-skeleton-loader>
      </v-col>
    </v-row>
    <v-row v-for="data in dataAll" :key="data.id">
      <v-col cols="12">
        <v-card elevation="0">
          <v-card-title>{{ data.title }}</v-card-title>
          <v-card-subtitle
            >{{ data.brand }} ({{ data.category }})</v-card-subtitle
          >
        </v-card>
      </v-col>
      <v-col cols="12" md="7">
        <v-card elevation="0">
          <v-card-text style="text-align: center"
            ><div class="img-detals">
              <img
                :src="imgs[data.id] ? imgs[data.id] : data.thumbnail"
                style="width: 100%; height: 100%"
              />
            </div>
          </v-card-text>

          <v-card-text>
            <swiper
              class="swiper-main-detals"
              :modules="modules"
              :slides-per-view="4"
              :breakpoints="breakpoints"
              :navigation="{ clickable: true }"
              :freeMode="true"
              :loop="true"
              :autoplay="false"
              @swiper="onSwiper"
              @slideChange="onSlideChange"
            >
              <swiper-slide
                v-for="(img, i) in data.images"
                :key="i"
                class="mb-16"
                @click="imgs[data.id] = img"
                style="cursor: pointer"
              >
                <div
                  class="img"
                  style="
                    width: 100px;
                    height: 150px;
                    margin: auto;
                    overflow: hidden;
                  "
                >
                  <img style="width: 100%; height: 100%" :src="img" alt="" />
                </div>
              </swiper-slide>
            </swiper>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="5">
        <v-card elevation="0">
          <v-card-text
            class=""
            style="
              overflow: hidden;
              font-size: 14px;
              font-weight: bold;
              text-align: left;
            "
          >
            {{ data.description }}</v-card-text
          >
          <v-card-text class="" style="text-align: start">
            <v-rating
              v-model="data.rating"
              color="yellow-darken-3"
              size="small"
              density="comfortable"
              readonly
              half-increments
            ></v-rating>
            <p>
              <strong>Discount</strong>
              <strong style="color: #e10600ff">
                ${{ Math.floor(data.discountPercentage) }}%</strong
              >
            </p>
            <p>
              <del>{{ data.price }}</del> from
              <strong style="color: #e10600ff">
                ${{
                  Math.floor(
                    data.price - (data.price * data.discountPercentage) / 100
                  )
                }}</strong
              >
            </p>
          </v-card-text>

          <v-card-text>
            <v-btn
              @click="Addproduct(data), (snackbar = true)"
              rounded="xl"
              color="black"
              style="
                height: 40px;
                width: 70%;
                text-transform: none;
                font-size: 14px;
                font-weight: bold;
              "
            >
              Add Cart</v-btn
            >
          </v-card-text>
        </v-card>
      </v-col>
      <v-snackbar v-model="snackbar" location="left bottom">
        Add the
        {{ data.title }}

        <template v-slot:actions>
          <v-btn color="pink" variant="text" @click="snackbar = false">
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </v-row>
  </v-container>
</template>
<style lang="scss">
.img-detals {
  height: 500px;
  @media screen and (max-width: 600px) {
    height: 300px;
  }
}

.swiper-main-detals.swiper-pagination {
  bottom: 2px;
}
.swiper-main-detals .swiper-button-next,
.swiper-main-detals .swiper-button-prev {
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
}
.swiper-main-detals .swiper-button-next:after,
.swiper-main-detals .swiper-button-prev:after {
  color: #505050ff;
  font-size: 14px;
}
.swiper-main-detals .swiper-button-next {
  right: -10px;
}
.swiper-main-detals .swiper-button-prev {
  left: -10px;
}
</style>

<script>
// import Swiper core and required modules
import { Navigation, Pagination, Autoplay, FreeMode } from "swiper";

// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "vue-awesome-swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "swiper/css/scrollbar";
import "swiper/css/free-mode";

import * as components from "vuetify/components";
import * as labsComponents from "vuetify/labs/components";

import { categories } from "@/stores/categories";
import { productsAll } from "@/stores/index";

import { mapActions, mapState } from "pinia";

export default {
  data: () => ({
    snackbar: false,
    dataAll: [],
    imgs: [],
    breakpoints: {
      0: {
        slidesPerView: 2,
      },
      580: {
        slidesPerView: 2,
      },
      767: {
        slidesPerView: 3,
      },
      990: {
        slidesPerView: 3,
      },
    },
  }),
  components: {
    Swiper,
    SwiperSlide,
    ...components,
    ...labsComponents,
  },
  setup() {
    return {
      modules: [Autoplay, FreeMode, Pagination, Navigation],
    };
  },
  computed: {
    ...mapState(categories, ["getcategory"]),
    ...mapState(productsAll, ["favoriteproduct"]),
  },
  methods: {
    ...mapActions(categories, ["get_categories"]),
    ...mapActions(productsAll, ["favoriteproduct_fun"]),
    Addproduct(data) {
      this.favoriteproduct_fun(data);
    },
  },
  beforeMount() {
    this.snackbar = true;
  },
  async mounted() {
    await this.get_categories(this.$route.params.category);
    this.dataAll = this.getcategory.filter(
      (a) => a.id == this.$route.params.id
    );
    console.log(this.dataAll);
    this.snackbar = false;
  },
};
</script>
