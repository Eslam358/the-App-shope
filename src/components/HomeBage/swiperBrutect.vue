<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <div class="d-flex align-center justify-space-between">
          <h2 :style="`color: ${colortitle};margin:${margin};font-size:18px`">
            {{ titlehead }}
          </h2>
          <span
            ><a :href="`/categories/${router}`" :style="`color: ${colorspan}`"
              >All Shope</a
            ></span
          >
        </div>
      </v-col>
    </v-row>
  </v-container>
  <v-container fluid>
    <v-row v-if="getproductarr.length < 1">
      <v-col cols="12" sm="6" lg="4" xl="4" xxl="3">
        <v-skeleton-loader
          class="mx-auto border"
          type="card-avatar, article, actions"
        ></v-skeleton-loader>
      </v-col>

      <v-col cols="12" sm="6" lg="4" xl="4" xxl="3">
        <v-skeleton-loader
          class="mx-auto border"
          type="card-avatar, article, actions"
        ></v-skeleton-loader>
      </v-col>
      <v-col cols="12" sm="6" lg="4" xl="4" xxl="3">
        <v-skeleton-loader
          class="mx-auto border"
          type="card-avatar, article, actions"
        ></v-skeleton-loader>
      </v-col>

      <v-col cols="12" sm="6" lg="4" xl="4" xxl="3">
        <v-skeleton-loader
          class="mx-auto border"
          type="card-avatar, article, actions"
        ></v-skeleton-loader>
      </v-col>
    </v-row>
    <v-row v-else>
      <!-- modules: [FreeMode, Pagination], -->
      <!-- import 'swiper/css/free-mode'; -->
      <!-- :freeMode="true" -->
      <swiper
        class="swiper-main"
        :modules="modules"
        :slides-per-view="3"
        :breakpoints="breakpoints"
        :space-between="35"
        :navigation="{ clickable: true }"
        :pagination="{ clickable: true }"
        :freeMode="true"
        :loop="true"
        :autoplay="{
          delay: 2500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
          stopOnLastSlide: true,
        }"
        @swiper="onSwiper"
        @slideChange="onSlideChange"
      >
        <swiper-slide
          class="mb-10"
          v-for="data in getproductarr"
          :key="data.id"
        >
          <v-hover v-slot="{ isHovering, props }">
            <v-card
              style="text-align: start; position: relative; margin: auto"
              elevation="0"
              max-width="300"
              v-bind="props"
            >
              <v-card-text style="text-align: center"
                ><div class="img">
                  <img
                    :src="imgs[data.id] ? imgs[data.id] : data.thumbnail"
                    style="width: 100%; height: 200px"
                  /></div
              ></v-card-text>
              <v-card-text
                class="pt-0 pb-1"
                style="height: 40px; overflow: hidden; font-size: 12px"
              >
                ({{ data.title }}){{
                  data.description.length + data.title.length < 50
                    ? data.description
                    : data.description
                        .split("")
                        .splice(0, 50 - data.title.length)
                        .join("") + "..."
                }}</v-card-text
              >
              <v-card-text class="pt-0 pb-0" style="text-align: start">
                <v-rating
                  v-model="data.rating"
                  color="yellow-darken-3"
                  size="x-small"
                  density="comfortable"
                  readonly
                  half-increments
                ></v-rating>
                <p>
                  <del>{{ data.price }}</del> from
                  <strong style="color: #e10600ff">
                    ${{
                      Math.floor(
                        data.price -
                          (data.price * data.discountPercentage) / 100
                      )
                    }}</strong
                  >
                </p>
              </v-card-text>
              <v-card-text class="pt-0 pb-0">
                <v-btn-toggle
                  color="info"
                  group
                  mandatory
                  v-model="imgs[data.id]"
                >
                  <v-btn
                    icon=""
                    variant="text"
                    height="35"
                    width="35"
                    density="compact"
                    elevation="0"
                    v-for="(img, i) in data.images"
                    :key="i"
                    :value="img"
                    style="border-radius: 50%"
                  >
                    <v-avatar size="30" :image="img"></v-avatar>
                  </v-btn>
                </v-btn-toggle>
              </v-card-text>
              <v-card-text class>
                <v-btn
                  variant="outlined"
                  rounded="xl"
                  @click="
                    $router.push({
                      name: 'detalse',
                      params: {
                        category: data.category,
                        title: data.title,
                        id: data.id,
                      },
                    })
                  "
                  style="
                    width: 70%;
                    text-transform: none;
                    font-size: 12px;
                    font-weight: bold;
                  "
                >
                  Choose optians
                </v-btn>
              </v-card-text>
              <v-btn
                :loading="lodding"
                :style="`
              position: absolute;
              top: 25%;
              left: 50%;
              transform: translate(-50%, -50%);
              border-radius: 30px;
              transition: 0.3s;
              text-transform: none;
              opacity: ${isHovering ? 1 : 0};`"
                @click="oppenoverlay(data)"
                >Quick view</v-btn
              >
            </v-card>
          </v-hover>
        </swiper-slide>
      </swiper>
    </v-row>
  </v-container>
</template>

<!--------------------------------------------- style --------------------------------------------------->

<style>
.swiper-main .swiper-pagination {
  bottom: 2px;
}
.swiper-main .swiper-button-next,
.swiper-main .swiper-button-prev {
  border: 1px solid #606060ff;
  border-radius: 50%;
  width: 30px;
  height: 30px;
}
.swiper-main .swiper-button-next:after,
.swiper-main .swiper-button-prev:after {
  color: #505050ff;
  font-size: 14px;
}
</style>

<!--------------------------------------------- script --------------------------------------------------->

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

// import { productsAll } from "@/stores/index";
// import { mapActions, mapState } from "pinia";

export default {
  data: () => {
    return {
      imgs: [],
      lodding: false,
      windowsize: 0,
      breakpoints: {
        0: {
          slidesPerView: 1,
        },
        580: {
          slidesPerView: 2,
        },
        767: {
          slidesPerView: 3,
        },
        990: {
          slidesPerView: 4,
        },
      },
    };
  },
  props: [
    "titlehead",
    "colortitle",
    "colorspan",
    "getproductarr",
    "margin",
    "router",
  ],
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
  inject: ["emitter"],
  // computed: {
  //   ...mapState(productsAll, ["count", "getproductarr"]),
  // },
  methods: {
    // ...mapActions(productsAll, ["getproduct"]),
    oppenoverlay(data) {
      (this.lodding = true),
        setTimeout(() => {
          this.lodding = false;
        }, 800);
      this.emitter.emit("oppenoverlay", data);
    },
  },
  mounted() {
    this.windowsize = window.innerWidth;
    window.onresize = () => {
      this.windowsize = window.innerWidth;
      // console.log(window.scrollY);
    };
  },
};
</script>
