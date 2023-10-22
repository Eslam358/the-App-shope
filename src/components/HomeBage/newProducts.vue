<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <div class="d-flex align-center justify-space-between">
          <h2 style="">New Productes</h2>
          <span>
            <router-link
              :to="{
                name: 'categories',
                params: { categories: router },
              }"
              style="color: #202020"
              >All Shope</router-link
            >
          </span>
        </div>
      </v-col>
    </v-row>

    <v-row>
      <v-col class="swip-newprod" cols="12" md="7" lg="8">
        <v-row v-if="getproductarr.length < 1">
          <v-col cols="12" sm="6" lg="4">
            <v-skeleton-loader
              class="mx-auto border"
              type="card-avatar, actions"
            ></v-skeleton-loader>
          </v-col>

          <v-col cols="12" sm="6" lg="4">
            <v-skeleton-loader
              class="mx-auto border"
              type="image, article"
            ></v-skeleton-loader>
          </v-col>
          <v-col cols="12" sm="6" lg="4">
            <v-skeleton-loader
              class="mx-auto border"
              type="image, article"
            ></v-skeleton-loader>
          </v-col>
        </v-row>
        <v-row v-else>
          <swiper
            class="swiper-main"
            :modules="modules"
            :slides-per-view="3"
            :breakpoints="breakpoints"
            :space-between="25"
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
              class="mb-16"
              v-for="data in getproductarr"
              :key="data.id"
            >
              <v-hover v-slot="{ isHovering, props }">
                <div>
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
                          style="width: 100%; height: 150px"
                        /></div
                    ></v-card-text>
                    <v-card-text
                      class="pt-0 pb-3"
                      style="height: 40px; overflow: hidden; font-size: 12px"
                    >
                      ({{ data.title }}){{
                        data.description.length + data.title.length < 30
                          ? data.description
                          : data.description
                              .split("")
                              .splice(0, 30 - data.title.length)
                              .join("") + "..."
                      }}</v-card-text
                    >
                    <v-card-text class="pt-0 pb-0" style="text-align: start">
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
                    <v-card-text>
                      <v-list
                        v-model:selected="imgs[data.id]"
                        class="d-flex align-center justify-start"
                        style="overflow: hidden"
                      >
                        <v-list-item
                          event-color="warningred lighten-2"
                          elevation="0"
                          class="pa-0 mr-1"
                          v-for="(img, i) in data.images"
                          :key="i"
                          :value="img"
                          style="
                            padding: 0;
                            border-radius: 50%;
                            min-width: 25px;
                            min-height: 25px;
                          "
                        >
                          <div
                            class="img"
                            style="
                              width: 23px;
                              overflow: hidden;
                              height: 23px;
                              border: 1px solid rgb(153, 153, 153);
                              border-radius: 50%;
                            "
                          >
                            <img
                              style="
                                width: 23px;
                                height: 23px;
                                border-radius: 50%;
                              "
                              :src="img"
                              alt=""
                            /></div
                        ></v-list-item>
                      </v-list>
                    </v-card-text>
                    <v-card-text>
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
                        Choose optians</v-btn
                      >
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
                </div>
              </v-hover>
            </swiper-slide>
          </swiper>
        </v-row>
      </v-col>
      <v-col class="img-newprod" cols="12" md="5" lg="4">
        <div class="img" style="height: 90%">
          <img
            style="width: 100%; height: 100%"
            src="../../assets/images/vr-banner.webp"
            alt=""
          />
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<!--------------------------------------------- style --------------------------------------------------->
<style>
@media screen and (max-width: 960px) {
  .img-newprod {
    order: 0;
  }
  .swip-newprod {
    order: 1;
  }
}
</style>

<!--------------------------------------------- script --------------------------------------------------->
<script>
// import Swiper core and required modules
import { Pagination, Autoplay, FreeMode } from "swiper";

// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "vue-awesome-swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "swiper/css/scrollbar";
import "swiper/css/free-mode";

import * as components from "vuetify/components";
import * as labsComponents from "vuetify/labs/components";

export default {
  data: () => {
    return {
      imgs: [],
      lodding: false,
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
        960: {
          slidesPerView: 2,
        },
        1200: {
          slidesPerView: 3,
        },
      },
    };
  },
  props: ["titlehead", "colortitle", "colorspan", "getproductarr", "router"],
  components: {
    Swiper,
    SwiperSlide,
    ...components,
    ...labsComponents,
  },
  inject: ["emitter"],

  methods: {
    oppenoverlay(data) {
      (this.lodding = true),
        setTimeout(() => {
          this.lodding = false;
        }, 800);
      this.emitter.emit("oppenoverlay", data);
    },
  },
  setup() {
    return {
      modules: [Autoplay, FreeMode, Pagination],
    };
  },
};
</script>
