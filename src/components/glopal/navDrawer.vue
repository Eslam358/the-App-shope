<template>
  <v-navigation-drawer
    v-model="oppenDrawer"
    location="right"
    :width="windowsize > 600 ? 368 : 300"
    class="pa-0"
  >
    <v-container fluid class="pa-0">
      <v-card elevation="0" class="pa-3" style="text-align: start">
        <div class="text d-flex justify-space-between align-center">
          <v-card-title class="px-0" style="font-weight: bold; font-size: 16px"
            >Shoping Carte</v-card-title
          >
          <v-icon @click="oppenDrawer = false" icon="mdi-close"></v-icon>
        </div>
        <v-card-text
          class="px-0 pt-0"
          style="font-size: 12px; color: rgb(157, 158, 157)"
          ><span>{{ favoriteproduct.length }}</span> items</v-card-text
        >
        <v-card-text
          v-if="favoriteproduct.length == 0"
          class="px-0 pt-0"
          style="font-size: 12px; color: rgb(157, 158, 157)"
          >free shoping for all orders ower $800.00!</v-card-text
        >
        <v-card-text
          v-if="favoriteproduct.length == 0"
          class="px-0 pt-0"
          style="text-align: center; font-size: 10px; color: rgb(157, 158, 157)"
          >Your cart is empty</v-card-text
        >
        <v-card-actions v-if="favoriteproduct.length == 0"
          ><v-btn
            variant="outlined"
            rounded="xl"
            block
            style="
              padding: 24px;
              font-size: 14px;
              text-transform: capitalize;
              width: 70%;
              margin: auto;
              color: rgb(158, 157, 158);
            "
            @click="$router.push('/')"
          >
            <span style="color: #3d3c3c">continue Shoping</span></v-btn
          ></v-card-actions
        >
        <v-card-text
          v-if="favoriteproduct.length > 0"
          class="pa-0"
          style="position: relative"
        >
          <svg
            :fill="
              Math.floor((totalAll / 10000) * 100) <= 30
                ? '#f44336'
                : Math.floor((totalAll / 10000) * 100) <= 70
                ? '#4caf50'
                : '#2196f3'
            "
            class="icon-shipping-truck"
            viewBox="0 0 40.55 24"
            :style="`
              position: absolute;
              top: -11px;
              left: ${
                totalAll < 10000 && Math.floor((totalAll / 10000) * 100) > 5
                  ? Math.floor((totalAll / 10000) * 100)
                  : totalAll < 10000 &&
                    Math.floor((totalAll / 10000) * 100) <= 6
                  ? 5
                  : 100
              }%;
              width: 27px;
              transition: 0.3s;
              margin-left: -27px;
              z-index: 11;
            `"
          >
            <g id="Layer_2" data-name="Layer 2">
              <g id="Layer_1-2" data-name="Layer 1">
                <path
                  class="truck-body"
                  d="M40.43,11a3.86,3.86,0,0,0-3.68-2.65H28a1.25,1.25,0,0,1-1.43-1.43c0-2.18,0-4.35,0-6.53,0-.31-.08-.36-.37-.36H5.11a1.18,1.18,0,0,0-1.3,1.32c0,.74,0,1.48,0,2.22,0,.21-.06.27-.26.26-.36,0-.71,0-1.07,0a1.19,1.19,0,1,0,0,2.37H7.19c.43,0,.85,0,1.27,0a1,1,0,0,1,1.07,1A1.19,1.19,0,0,1,8.24,8.48H1.35a1.83,1.83,0,0,0-.47,0A1.19,1.19,0,0,0,0,9.85a1.18,1.18,0,0,0,1.19,1h9.66c.34,0,.68,0,1,0A1.19,1.19,0,0,1,13,12.47a1.26,1.26,0,0,1-1.26.76H1.24a1.19,1.19,0,1,0,0,2.38c.76,0,1.51,0,2.26,0,.26,0,.33.07.32.32,0,1,0,2.09,0,3.13A1.18,1.18,0,0,0,5.1,20.36c.63,0,1.26,0,1.9,0,.27,0,.39.06.47.36a4.55,4.55,0,0,0,8.78-.11.29.29,0,0,1,.32-.25H28.09a.3.3,0,0,1,.34.27,4.55,4.55,0,0,0,8.8,0,.31.31,0,0,1,.35-.26c.49,0,1,0,1.47,0a1.37,1.37,0,0,0,1.5-.87V11.41C40.41,11.29,40.47,11.12,40.43,11ZM32.84,21.62A2.18,2.18,0,1,1,35,19.45,2.21,2.21,0,0,1,32.84,21.62Zm-21,0A2.18,2.18,0,1,1,14,19.45,2.2,2.2,0,0,1,11.86,21.62Z"
                ></path>
                <path
                  class="truck-body"
                  d="M29.27,6h5.85c.1,0,.2,0,.29,0C33.64,2.72,32,.91,28.91.26V.57c0,1.68,0,3.35,0,5C28.9,5.9,29,6,29.27,6Z"
                ></path>
                <path
                  class="wheel"
                  fill="white"
                  d="M11.87,17.27A2.18,2.18,0,1,0,14,19.45,2.2,2.2,0,0,0,11.87,17.27Z"
                ></path>
                <path
                  class="wheel"
                  fill="white"
                  d="M32.85,17.27A2.18,2.18,0,1,0,35,19.45,2.22,2.22,0,0,0,32.85,17.27Z"
                ></path>
              </g>
            </g>
          </svg>
          <v-progress-linear
            :model-value="
              Math.floor((totalAll / 10000) * 100) > 5
                ? Math.floor((totalAll / 10000) * 100)
                : 5
            "
            height="10"
            striped
            stream
            :color="
              Math.floor((totalAll / 10000) * 100) <= 30
                ? 'red'
                : Math.floor((totalAll / 10000) * 100) <= 70
                ? 'green'
                : 'blue'
            "
          ></v-progress-linear>
        </v-card-text>
        <p v-if="totalAll <= 10000" style="font-size: 12px; color: #888">
          Only <span>${{ 10000 - totalAll }} </span> from Shoping
        </p>
        <p v-if="totalAll > 10000" style="font-size: 12px; color: #888">
          Only
          <span style="color: red"> $ 0 </span>
          from Shoping
        </p>
      </v-card>
      <!-- --------------------------------------------------------------------------------------------- -->
      <v-card
        v-if="favoriteproduct.length > 0"
        class="info-card px-3"
        max-height="350"
        min-height="180"
        elevation="0"
        style="overflow-y: auto; text-align: start"
      >
        <v-row v-for="data in favoriteproduct" :key="data.id">
          <v-col cols="4" class="px-2"
            ><v-card-text class="pa-0">
              <img :src="data.thumbnail" style="width: 100%" /></v-card-text
          ></v-col>
          <v-col cols="8" class="px-2"
            ><v-card-text class="pa-0">{{ data.title }}</v-card-text>
            <v-card-text class="px-0 py-2">
              <strong style="color: #202020ff">
                ${{
                  Math.floor(
                    data.price - (data.price * data.discountPercentage) / 100
                  )
                }}</strong
              >
            </v-card-text>
            <v-card-text
              class="px-0 py-1 d-flex justify-space-between align-center"
            >
              <div
                class="number d-flex justify-space-between align-center"
                style="
                  border: 1px solid #999;
                  border-radius: 30px;
                  width: 70px;

                  overflow: hidden;
                  padding: 8px;
                "
              >
                <v-icon
                  @click="nnn(), data.total > 1 ? data.total-- : ''"
                  style="font-size: 14px"
                  >mdi-minus</v-icon
                >
                <input
                  style="
                    outline: none;
                    width: 100%;
                    text-align: center;
                    font-size: 14px;
                  "
                  :value="data.total"
                  type="number"
                />
                <v-icon @click="data.total++, nnn()" style="font-size: 14px"
                  >mdi-plus</v-icon
                >
              </div>
              <v-icon @click="favoriteproduct_Delet(data.id)">mdi-close</v-icon>
            </v-card-text>
          </v-col>
          <v-col cols="12">
            <v-card-text
              style="color: #202020ff"
              class="pt-0 d-flex justify-space-between align-center"
            >
              <strong>Subtotal</strong>
              <strong>
                ${{
                  Math.floor(
                    (data.price -
                      (data.price * data.discountPercentage) / 100) *
                      data.total
                  )
                }}</strong
              >
            </v-card-text>
            <v-divider></v-divider>
          </v-col>
        </v-row>
      </v-card>
      <v-card elevation="0" class="pt-0" v-if="favoriteproduct.length > 0">
        <v-card-text
          style="color: #202020ff"
          class="pt-0 d-flex justify-space-between align-center"
        >
          <strong>total</strong>
          <strong> ${{ totalAll }}</strong>
        </v-card-text>
        <v-card-text class="pt-0">
          <v-btn
            class="mb-3"
            rounded="xl"
            block
            color="#6CA7EAFF"
            style="text-transform: capitalize; padding: 24px"
            @click="oppenDrawer = false"
            >chickout</v-btn
          >
          <v-btn
            variant="outlined"
            rounded="xl"
            block
            style="text-transform: capitalize; padding: 24px"
            @click="$router.push('/Home/Yourcart')"
            >view cart</v-btn
          >
        </v-card-text>
      </v-card>
    </v-container>
  </v-navigation-drawer>
</template>
<style>
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.info-card::-webkit-scrollbar {
  width: 5px;
  border-radius: 5px;
}
.info-card::-webkit-scrollbar-thumb {
  background-color: rgb(192 192 192);
  border-radius: 5px;
}
</style>

<script>
import { productsAll } from "@/stores/index";
import { mapState, mapActions } from "pinia";
export default {
  data: () => {
    return {
      oppenDrawer: false,
      Arr: [],
      windowsize: 0,
    };
  },
  components: {},
  computed: {
    ...mapState(productsAll, ["favoriteproduct"]),
    totalAll() {
      let A = 0;
      this.favoriteproduct.forEach((el) => {
        A +=
          Math.floor(el.price - (el.price * el.discountPercentage) / 100) *
          el.total;
      });

      return A;
    },
  },
  methods: {
    ...mapActions(productsAll, [
      "favoriteproduct_fAdut",
      "favoriteproduct_Delet",
    ]),
    nnn() {
      console.log(this.favoriteproduct);
      localStorage.setItem(
        "favoriteproduct",
        JSON.stringify(this.favoriteproduct)
      );
    },
  },
  watch: {
    favoriteproduct() {
      console.log("vvvvvvvvv");
    },
  },
  inject: ["emitter"],
  mounted() {
    this.windowsize = window.innerWidth;
    window.onresize = () => {
      this.windowsize = window.innerWidth;
      // console.log(this.windowsize);
      // console.log(window.scrollY);
    };
    this.emitter.on("naveuse", (tru) => {
      if (!tru) {
        this.oppenDrawer = true;
      } else {
        this.oppenDrawer = false;
      }
    });
    this.favoriteproduct_fAdut();
  },
};
</script>
