<template>
  <v-dialog v-model="overlay" width="900" height="700">
    <v-card style="position: relative; height: 100%" class="py-10 w-100">
      <v-row>
        <v-col class="pb-0 pb-sm-5" cols="12" sm="6">
          <v-card-text style="text-align: center"
            ><div class="img" style="height: 250px">
              <img
                :src="imgs[data.id] ? imgs[data.id] : data.thumbnail"
                style="width: 100%; height: 100%"
              />
            </div>
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
                    min-width: 37px;
                    min-height: 37px;
                  "
                >
                  <div
                    class="img"
                    style="
                      width: 35px;
                      overflow: hidden;
                      height: 35px;
                      border: 1px solid rgb(153, 153, 153);
                      border-radius: 50%;
                    "
                  >
                    <img
                      style="width: 35px; height: 35px; border-radius: 50%"
                      :src="img"
                      alt=""
                    /></div
                ></v-list-item>
              </v-list>
            </v-card-text>
          </v-card-text>
        </v-col>
        <v-col class="pt-2 pt-sm-5" cols="12" sm="6">
          <v-card-text
            class=""
            style="overflow: hidden; font-size: 14px; font-weight: bold"
          >
            ({{ data.title }}){{
              data.description.length + data.title.length < 300
                ? data.description
                : data.description
                    .split("")
                    .splice(0, 300 - data.title.length)
                    .join("") + "..."
            }}</v-card-text
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
          <v-card-text class="d-none d-sm-flex">
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
                  min-width: 37px;
                  min-height: 37px;
                "
              >
                <div
                  class="img"
                  style="
                    width: 35px;
                    overflow: hidden;
                    height: 35px;
                    border: 1px solid rgb(153, 153, 153);
                    border-radius: 50%;
                  "
                >
                  <img
                    style="width: 35px; height: 35px; border-radius: 50%"
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
              style="
                width: 70%;
                text-transform: none;
                font-size: 14px;
                font-weight: bold;
              "
            >
              Choose optians</v-btn
            >
          </v-card-text>
          <v-card-text>
            <v-btn
              @click="Addproduct(data), (snackbar = true)"
              :loading="LOADING"
              rounded="xl"
              color="black"
              style="
                width: 70%;
                text-transform: none;
                font-size: 14px;
                font-weight: bold;
              "
            >
              Add Cart</v-btn
            >
          </v-card-text>
          <v-btn
            @click="overlay = false"
            color="black"
            class="pa-0"
            style="
              position: fixed;
              top: -8px;
              right: -8px;
              max-height: 24px;
              font-size: 12px;
              min-width: 23px;
            "
            >X</v-btn
          >
        </v-col>
      </v-row>
    </v-card>
  </v-dialog>
  <v-snackbar v-model="snackbar" location="left bottom">
    Add the
    {{ data.title }}

    <template v-slot:actions>
      <v-btn color="pink" variant="text" @click="snackbar = false">
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>
<style lang="scss"></style>

<script>
import { productsAll } from "../../stores/index";
import { mapState, mapActions } from "pinia";
export default {
  data: () => ({
    overlay: false,
    snackbar: false,
    imgs: [],
    data: {},
    LOADING: false,
  }),
  computed: {
    ...mapState(productsAll, ["favoriteproduct"]),
  },
  methods: {
    ...mapActions(productsAll, ["favoriteproduct_fun"]),
    Addproduct(data) {
      (this.LOADING = true),
        setTimeout(() => {
          this.LOADING = false;
        }, 1000);
      this.favoriteproduct_fun(data);
    },
  },
  inject: ["emitter"],
  mounted() {
    this.emitter.on("oppenoverlay", (data) => {
      this.overlay = true;
      this.data = data;
      console.log(data);
    });
  },
};
</script>
