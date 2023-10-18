<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-breadcrumbs :items="items">
          <template v-slot:divider>
            <v-icon icon="mdi-chevron-right"></v-icon>
          </template>
        </v-breadcrumbs>
        <v-card elevation="0" class="" style="text-align: start">
          <div class="text d-flex justify-space-between align-center">
            <v-card-title
              class="px-0"
              style="font-weight: bold; font-size: 24px"
              >Your Cart</v-card-title
            >
          </div>
          <v-card-text
            class="px-0 pt-0"
            style="font-size: 12px; color: rgb(157, 158, 157)"
            ><span>{{ favoriteproduct.length }}</span> items</v-card-text
          >
          <v-card-text
            v-if="favoriteproduct.length < 1"
            class="px-0 pt-0"
            style="font-size: 12px; color: rgb(157, 158, 157)"
            >free shoping for all orders ower $1000.00!</v-card-text
          >
          <v-card-text
            v-if="favoriteproduct.length < 1"
            class="px-0 pt-0"
            style="
              text-align: center;
              font-size: 10px;
              color: rgb(157, 158, 157);
            "
            >Your cart is empty</v-card-text
          >
          <v-card-actions v-if="favoriteproduct.length < 1"
            ><v-btn
              variant="outlined"
              rounded="xl"
              @click="$router.push('/')"
              style="
                font-size: 14px;
                text-transform: capitalize;
                width: 70%;
                margin: auto;
                color: rgb(158, 157, 158);
              "
            >
              <span style="color: #3d3c3c">continue Shoping</span></v-btn
            ></v-card-actions
          >
          <v-card-text
            v-if="favoriteproduct.length"
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
                totalAll < 10000 && Math.floor((totalAll / 10000) * 100) > 3
                  ? Math.floor((totalAll / 10000) * 100)
                  : totalAll < 10000 &&
                    Math.floor((totalAll / 10000) * 100) <= 3
                  ? 3
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
                Math.floor((totalAll / 10000) * 100) > 3
                  ? Math.floor((totalAll / 10000) * 100)
                  : 3
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
      </v-col>
      <v-col cols="12" sm="12" md="9" class="pt-0 pr-0">
        <table
          style="
            width: 100%;
            -webkit-border-horizontal-spacing: 0;
            -webkit-border-vertical-spacing: 7px;
          "
        >
          <tr>
            <th class="th-table th-table-1">product</th>
            <th class="th-table th-table-2">price</th>
            <th class="th-table th-table-2">quantity</th>
            <th class="th-table th-table-3">total</th>
          </tr>
          <tr
            class="table-tr-td"
            v-for="data in favoriteproduct"
            :key="data.id"
            style="position: relative"
          >
            <td
              class="table-td-img-p"
              style="border: 1px solid #e6e6e6ff; border-right: none"
            >
              <div class="img-table">
                <img :src="data.thumbnail" style="width: 100%" />
              </div>
              <p class="" style="font-size: 16px">
                ({{ data.title }}){{
                  data.description.length + data.title.length < 50
                    ? data.description
                    : data.description
                        .split("")
                        .splice(0, 50 - data.title.length)
                        .join("") + "..."
                }}
              </p>
            </td>
            <td
              style="
                border-bottom: 1px solid #e6e6e6ff;
                border-top: 1px solid #e6e6e6ff;
              "
            >
              <p>
                <strong style="color: #e10600ff">
                  ${{
                    Math.floor(
                      data.price - (data.price * data.discountPercentage) / 100
                    )
                  }}</strong
                >
              </p>
            </td>
            <td
              style="
                border-bottom: 1px solid #e6e6e6ff;
                border-top: 1px solid #e6e6e6ff;
              "
            >
              <div
                class="number-btn-table"
                style="border: 1px solid #e6e6e6ff; border-radius: 30px"
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
            </td>
            <td style="border: 1px solid #e6e6e6ff; border-left: none">
              <div style="color: #202020ff" class="pr-3 d-flex align-center">
                <strong class="">
                  ${{
                    Math.floor(
                      (data.price -
                        (data.price * data.discountPercentage) / 100) *
                        data.total
                    )
                  }}</strong
                >
                <v-icon
                  class="close-icon-table"
                  @click="favoriteproduct_Delet(data.id)"
                  >mdi-close</v-icon
                >
              </div>
            </td>
          </tr>
        </table>
        <v-card-text style="text-align: left">
          <div class="scur d-flex justify-start align-center">
            <svg
              style="width: 25px; margin-right: 15px"
              id="Layer_1"
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 179.94 179.96"
              class="icon icon-shield-check"
            >
              <defs></defs>
              <path
                d="M90,0,5,42.78C13.73,105.26,38.14,154.32,90,180c51.83-25.64,76.25-74.7,85-137.18Z"
              ></path>
              <polygon
                class="cls-1"
                style="fill: #fff !important"
                points="149.83 67.57 134.81 52.55 79.31 108.05 49.74 78.48 34.72 93.5 79.15 137.94 79.31 137.78 79.47 137.94 149.83 67.57"
              ></polygon>
            </svg>
            <p>secure shoping Guarantee</p>
          </div>
        </v-card-text>
        <v-card-text style="text-align: left">
          <div class="img">
            <img
              src="../assets/images/cart-page-cards.webp"
              style="width: 50%"
              alt=""
            />
          </div>
        </v-card-text>
      </v-col>
      <v-col cols="12" sm="12" md="3" class="px-0">
        <v-row class="ma-0 pa-0">
          <v-col cols="12" sm="6" md="12" class="pa-0 pr-sm-3 pr-md-0">
            <v-card elevation="0">
              <v-card-text style="text-align: left; font-weight: bold">
                <div style="border-bottom: 3px solid black">ORDER SUMMARY</div>
              </v-card-text>
              <v-card-text class="py-5">
                <v-select
                  style="margin-bottom: -16px"
                  clearable
                  value="California"
                  rounded="xl"
                  density="compact"
                  :items="[
                    'California',
                    'Colorado',
                    'Florida',
                    'Georgia',
                    'Texas',
                    'Wyoming',
                  ]"
                  variant="outlined"
                ></v-select>
              </v-card-text>
              <v-card-text
                class="py-2 d-flex justify-space-between align-center"
              >
                <v-select
                  style="
                    margin-bottom: -16px;
                    font-size: 12px;
                    text-transform: capitalize;
                  "
                  rounded="xl"
                  density="compact"
                  clearable
                  value="California"
                  :items="[
                    'California',
                    'Colorado',
                    'Florida',
                    'Georgia',
                    'Texas',
                    'Wyoming',
                  ]"
                  variant="outlined"
                ></v-select>
                <v-btn
                  variant="outlined"
                  rounded="xl"
                  style="
                    font-size: 12px;
                    text-transform: capitalize;
                    height: 40px;
                    border-color: #918f8f;
                    margin-left: 10px;
                  "
                  @click="$router.push('/Home/Yourcart')"
                  >view</v-btn
                >
              </v-card-text>
              <v-card-text class="py-2">
                <v-btn
                  class="mb-3"
                  rounded="xl"
                  block
                  color="#6CA7EAFF"
                  style="
                    text-transform: capitalize;
                    padding: 14px;
                    font-size: 12px;
                  "
                  >chickout</v-btn
                >
              </v-card-text>
            </v-card>
          </v-col>

          <v-col
            cols="12"
            sm="6"
            md="12"
            class="pa-0 pl-sm-3 pl-md-0 pt-sm-5 pt-md-0"
          >
            <v-card elevation="0">
              <v-divider></v-divider>
              <v-card-text class="py-2">
                <v-btn
                  variant="outlined"
                  rounded="xl"
                  block
                  style="
                    text-transform: capitalize;
                    padding: 14px;
                    font-size: 12px;
                  "
                  @click="$router.push('/Home/Yourcart')"
                  >view cart</v-btn
                >
              </v-card-text>
              <v-divider></v-divider>
              <v-card-text
                style="color: #202020ff"
                class="py-2 d-flex justify-space-between align-center"
              >
                <strong>total</strong>
                <strong> ${{ totalAll }}</strong>
              </v-card-text>
              <v-divider></v-divider>

              <v-card-text class="py-2">
                <v-btn
                  class="mb-3"
                  block
                  color="#6CA7EAFF"
                  style="text-transform: capitalize; padding: 14px"
                  @click="check()"
                  >proced To checkout</v-btn
                >
              </v-card-text>
              <v-card-text class="py-2">
                <v-btn
                  variant="outlined"
                  block
                  style="text-transform: capitalize; padding: 14px"
                  >Continue shopping</v-btn
                >
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
  <v-snackbar v-model="snackbar" location="left bottom">
    your cart is empty !!
    <template v-slot:actions>
      <v-btn color="pink" variant="text" @click="snackbar = false">
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<style lang="scss">
.table-tr-td td {
  text-align: left;
  @media screen and (max-width: 960px) {
    text-align: center;
  }
  &:last-child div {
    justify-content: space-between;
    @media screen and (max-width: 960px) {
      justify-content: center;
    }
  }
}

.table-td-img-p {
  display: flex;
  justify-content: start;
  @media screen and (max-width: 960px) {
    flex-direction: column;
  }
  .img-table {
    width: 30%;
    padding: 10px;
    @media screen and (max-width: 960px) {
      width: 150px;
    }
  }
  p {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    max-width: 300px;
    @media screen and (max-width: 960px) {
      justify-content: start;
    }
  }
}

.number-btn-table {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 70px;
  overflow: hidden;
  padding: 8px;
  @media screen and (max-width: 960px) {
    flex-direction: column;
    width: 50px;
    height: 90px;
    margin: auto;
  }
  @media screen and (max-width: 600px) {
    flex-direction: column;
    width: 30px;
    height: 100px;
    margin: auto;
    margin-left: 12px;
    margin-right: 7px;
  }
}
.th-table {
  text-align: left;
  @media screen and (max-width: 960px) {
    text-align: center;
  }
  &.th-table-1 {
    width: 60%;
    @media screen and (max-width: 960px) {
      width: 50%;
    }
  }
  &.th-table-2 {
    width: 12%;
    @media screen and (max-width: 960px) {
      width: 16%;
    }
  }
  &.th-table-3 {
    width: 16%;
  }
}

.close-icon-table {
  @media screen and (max-width: 960px) {
    position: absolute;
    top: 0;
    right: 0;
  }
}
</style>

<script>
import { productsAll } from "@/stores";
import { mapState, mapActions } from "pinia";
export default {
  data: () => ({
    snackbar: false,
    items: [
      {
        title: "Home",
        disabled: false,
      },
      {
        title: "Your Cart",
        disabled: false,
      },
    ],
    Arr: [],
  }),

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
  inject: ["emitter"],
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
    check() {
      if (this.favoriteproduct.length < 1) {
        this.snackbar = true;
      } else {
        this.$router.push({
          name: "checkout",
        });
      }
    },
    drawerclose(fal) {
      if (this.$route.name !== "YourCart") {
        this.emitter.emit("naveuse", fal);
      }
    },
  },

  mounted() {
    this.drawerclose(true);
    this.favoriteproduct_fAdut();
  },
};
</script>
