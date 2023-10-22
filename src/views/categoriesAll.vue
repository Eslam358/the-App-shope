<template>
  <v-container fluid>
    <v-row>
      <v-col cols=" 12">
        <v-card elevation="0">
          <v-card-title class="">
            {{ this.$route.params.categories }}
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>
    <v-row v-if="skeleton">
      <v-col cols="12" sm="6" md="4">
        <v-skeleton-loader
          class="mx-auto border"
          max-width="400"
          type="card-avatar, actions"
        ></v-skeleton-loader>
      </v-col>

      <v-col cols="12" sm="6" md="4">
        <v-skeleton-loader
          class="mx-auto border"
          max-width="300"
          type="image, article"
        ></v-skeleton-loader>
      </v-col>
      <v-col cols="12" sm="6" md="4">
        <v-skeleton-loader
          class="mx-auto border"
          max-width="300"
          type="card-avatar, actions"
        ></v-skeleton-loader>
      </v-col>

      <v-col cols="12" sm="6" md="4">
        <v-skeleton-loader
          class="mx-auto border"
          max-width="300"
          type="image, article"
        ></v-skeleton-loader>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col cols="12" sm="6" md="4" lg="3" v-for="data in Arr" :key="data.id">
        <v-hover v-slot="{ isHovering, props }">
          <v-card
            style="text-align: start; position: relative"
            elevation="0"
            v-bind="props"
            max-width="300"
          >
            <v-card-text style="text-align: center"
              ><div class="img">
                <img
                  :src="imgs[data.id] ? imgs[data.id] : data.thumbnail"
                  style="width: 100%; height: 200px"
                /></div
            ></v-card-text>
            <v-card-text
              class="pt-0 pb-3"
              style="height: 55px; overflow: hidden; font-size: 12px"
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
                      data.price - (data.price * data.discountPercentage) / 100
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
                    min-width: 27px;
                    min-height: 27px;
                  "
                >
                  <div
                    class="img"
                    style="
                      width: 25px;
                      overflow: hidden;
                      height: 25px;
                      border: 1px solid rgb(153, 153, 153);
                      border-radius: 50%;
                    "
                  >
                    <img
                      style="width: 25px; height: 25px; border-radius: 50%"
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
                  min-width: fit-content;
                  text-transform: none;
                  font-size: 12px;
                  font-weight: bold;
                "
              >
                Choose optians</v-btn
              >
            </v-card-text>
            <v-btn
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
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { categories } from "@/stores/categories";
import { productsAll } from "@/stores/index";
import { mapActions, mapState } from "pinia";

import * as components from "vuetify/components";
import * as labsComponents from "vuetify/labs/components";

export default {
  data: () => {
    return {
      imgs: [],
      Arr: [],
      skeleton: false,
    };
  },
  components: {
    ...components,
    ...labsComponents,
  },
  computed: {
    ...mapState(categories, ["getcategory"]),
    ...mapState(productsAll, ["getproductarr"]),
  },
  watch: {
    async $route() {
      this.skeleton = true;
      await this.get_categories(this.$route.params.categories);
      this.Arr = this.getcategory;
      setTimeout(() => {
        this.skeleton = false;
      }, 1000);
    },
  },
  inject: ["emitter"],
  methods: {
    ...mapActions(categories, ["get_categories", "name_categories"]),
    ...mapActions(productsAll, ["getproduct"]),
    oppenoverlay(data) {
      this.emitter.emit("oppenoverlay", data);
    },
  },
  async mounted() {
    this.skeleton = true;
    if (this.$route.params.categories != "Allproduct") {
      await this.get_categories(this.$route.params.categories);
      this.Arr = this.getcategory;
    } else {
      await this.getproduct();
      this.Arr = this.getproductarr;
    }
    setTimeout(() => {
      this.skeleton = false;
    }, 1000);
  },
};
</script>
