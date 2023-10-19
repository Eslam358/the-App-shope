<template>
  <v-app-bar
    class="d-none d-md-flex d-lg-flex"
    scroll-behavior="hide inverted"
    style="
      background-color: #161880;
      color: white;
      top: 0 !important;
      transform: translateY(0%) !important;
    "
  >
    <v-container fluid class="main-app">
      <v-row>
        <v-col cols="10">
          <ul
            style="
              display: flex;
              align-items: center;
              justify-content: start;
              list-style: none;
              gap: 25px;
            "
          >
            <router-link
              v-for="(category, i) in Arr"
              :key="i"
              style="
                color: white;
                text-decoration: none;
                text-transform: capitalize;
              "
              :to="{ name: 'categories', params: { categories: category } }"
            >
              <li style="font-size: 12px">
                {{ category.replaceAll("-", " ") }}
              </li>
            </router-link>
            <li
              style="
                text-decoration: none;
                text-transform: capitalize;
                font-size: 12px;
              "
            >
              <v-btn id="menu" icon>
                <v-icon v-if="oppen">mdi-chevron-down</v-icon>
                <v-icon v-else>mdi-chevron-up</v-icon>
              </v-btn>
            </li>
            <v-menu activator="#menu" v-model="oppen">
              <v-list>
                <v-list-item v-for="(category, i) in Arrmore" :key="i">
                  <router-link
                    style="
                      color: #161880;
                      text-decoration: none;
                      text-transform: capitalize;
                      font-size: 12px;
                    "
                    :to="{
                      name: 'categories',
                      params: { categories: category },
                    }"
                  >
                    {{ category.replaceAll("-", " ") }}
                  </router-link>
                </v-list-item>
              </v-list>
            </v-menu>
          </ul>
        </v-col>
        <v-col
          cols="2"
          style="display: flex; justify-content: end; align-items: center"
        >
          <div class="text" @click="Alnoor" style="cursor: pointer">
            <v-badge
              :model-value="favoriteproduct.length"
              :content="
                favoriteproduct.length <= 9 ? favoriteproduct.length : '9+'
              "
              :color="favoriteproduct.length <= 9 ? 'info' : 'error'"
              offset-x=""
              offset-y="5"
            >
              <svg
                style="fill: #fcc425ff; width: 30px; padding-top: 10px"
                viewBox="0 0 1024 1024"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  class="path1"
                  d="M409.6 1024c-56.464 0-102.4-45.936-102.4-102.4s45.936-102.4 102.4-102.4S512 865.136 512 921.6 466.064 1024 409.6 1024zm0-153.6c-28.232 0-51.2 22.968-51.2 51.2s22.968 51.2 51.2 51.2 51.2-22.968 51.2-51.2-22.968-51.2-51.2-51.2z"
                ></path>
                <path
                  class="path2"
                  d="M768 1024c-56.464 0-102.4-45.936-102.4-102.4S711.536 819.2 768 819.2s102.4 45.936 102.4 102.4S824.464 1024 768 1024zm0-153.6c-28.232 0-51.2 22.968-51.2 51.2s22.968 51.2 51.2 51.2 51.2-22.968 51.2-51.2-22.968-51.2-51.2-51.2z"
                ></path>
                <path
                  class="path3"
                  d="M898.021 228.688C885.162 213.507 865.763 204.8 844.8 204.8H217.954l-5.085-30.506C206.149 133.979 168.871 102.4 128 102.4H76.8c-14.138 0-25.6 11.462-25.6 25.6s11.462 25.6 25.6 25.6H128c15.722 0 31.781 13.603 34.366 29.112l85.566 513.395C254.65 736.421 291.929 768 332.799 768h512c14.139 0 25.6-11.461 25.6-25.6s-11.461-25.6-25.6-25.6h-512c-15.722 0-31.781-13.603-34.366-29.11l-12.63-75.784 510.206-44.366c39.69-3.451 75.907-36.938 82.458-76.234l34.366-206.194c3.448-20.677-1.952-41.243-14.813-56.424zm-35.69 48.006l-34.366 206.194c-2.699 16.186-20.043 32.221-36.39 33.645l-514.214 44.714-50.874-305.246h618.314c5.968 0 10.995 2.054 14.155 5.782 3.157 3.73 4.357 9.024 3.376 14.912z"
                ></path>
              </svg>
            </v-badge>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-app-bar>
  <v-app-bar
    class="app-bar-tablet d-flex d-md-none d-lg-none"
    scroll-behavior="hide inverted"
    style="top: 0 !important; transform: translateY(0%) !important"
  >
    <template v-slot:prepend>
      <v-app-bar-nav-icon
        style="font-size: 25px"
        @click="oppen_Respons"
      ></v-app-bar-nav-icon>

      <input
        v-model="valueTextRe"
        id="menu-text-1"
        type="text"
        placeholder="cearsh the store"
        :style="`padding: 7px 10px; width: ${
          oppeninput ? 185 : 0
        }px; outline: none; transition:width 0.5s ease 0s;border-radius: 30px; border: ${
          oppeninput ? 1 : 0
        }px solid #999;left: 55px;position: absolute; background-color: white;`"
      />
      <v-menu activator="#menu-text-1" v-model="oppenMenuVa">
        <v-list
          v-if="valueTextRe !== ''"
          height="300"
          @click:select="
            (valueTextRe = ''), (oppeninput = false), (oppenMenuVa = false)
          "
        >
          <v-list-item type="subheader" title="Category"></v-list-item>
          <router-link
            v-for="(category, i) in searshArrCategory"
            :key="i"
            style="
              color: #161880;
              text-decoration: none;
              text-transform: capitalize;
              font-size: 12px;
            "
            :to="{
              name: 'categories',
              params: { categories: category },
            }"
          >
            <v-list-item :value="i">
              {{ category.replaceAll("-", " ") }}
            </v-list-item>
          </router-link>
          <v-list-item
            color="blue"
            type="subheader"
            title="products"
          ></v-list-item>
          <router-link
            v-for="(data, i) in searshArrproducts"
            :key="i"
            style="
              color: #161880;
              text-decoration: none;
              text-transform: capitalize;
              font-size: 12px;
            "
            :to="{
              name: 'detalse',
              params: {
                category: data.category,
                title: data.title,
                id: data.id,
              },
            }"
          >
            <v-list-item :value="i + 'pro'">
              {{ data.title }}
            </v-list-item>
          </router-link>
        </v-list>
      </v-menu>
      <svg
        icon
        @click="oppeninput = !oppeninput"
        data-icon="search"
        viewBox="0 0 512 512"
        width="20"
        fill="#232323FF"
        :style="`left:${
          oppeninput ? 210 : 55
        }px;transition:All 0.5s ease 0s ;position: absolute;
  
    z-index: 999;`"
      >
        <path
          d="M495,466.2L377.2,348.4c29.2-35.6,46.8-81.2,46.8-130.9C424,103.5,331.5,11,217.5,11C103.4,11,11,103.5,11,217.5   S103.4,424,217.5,424c49.7,0,95.2-17.5,130.8-46.7L466.1,495c8,8,20.9,8,28.9,0C503,487.1,503,474.1,495,466.2z M217.5,382.9   C126.2,382.9,52,308.7,52,217.5S126.2,52,217.5,52C308.7,52,383,126.3,383,217.5S308.7,382.9,217.5,382.9z"
        ></path>
      </svg>
    </template>
    <v-app-bar-title>
      <v-avatar class="display-601-none-img" size="55" color="">
        <img
          style="width: 100px; position: relative; top: 25px"
          src="../../assets/images/assmaa1.jpg"
          alt=""
        />
      </v-avatar>

      <img
        class="display-600-none-img"
        style="width: 100px; cursor: pointer"
        src="../../assets/images/footer-logo.webp"
        alt=""
        @click="$router.push('/')"
      />
    </v-app-bar-title>

    <template v-slot:append>
      <v-btn icon>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          width="30"
          aria-hidden="true"
          focusable="false"
          role="presentation"
          class="icon icon-account"
        >
          <path
            d="M 16 3 C 8.832031 3 3 8.832031 3 16 C 3 23.167969 8.832031 29 16 29 C 23.167969 29 29 23.167969 29 16 C 29 8.832031 23.167969 3 16 3 Z M 16 5 C 22.085938 5 27 9.914063 27 16 C 27 22.085938 22.085938 27 16 27 C 9.914063 27 5 22.085938 5 16 C 5 9.914063 9.914063 5 16 5 Z M 16 8 C 13.25 8 11 10.25 11 13 C 11 14.515625 11.707031 15.863281 12.78125 16.78125 C 10.53125 17.949219 9 20.300781 9 23 L 11 23 C 11 20.226563 13.226563 18 16 18 C 18.773438 18 21 20.226563 21 23 L 23 23 C 23 20.300781 21.46875 17.949219 19.21875 16.78125 C 20.292969 15.863281 21 14.515625 21 13 C 21 10.25 18.75 8 16 8 Z M 16 10 C 17.667969 10 19 11.332031 19 13 C 19 14.667969 17.667969 16 16 16 C 14.332031 16 13 14.667969 13 13 C 13 11.332031 14.332031 10 16 10 Z"
          ></path>
        </svg>
      </v-btn>

      <v-btn icon @click="Alnoor">
        <v-badge
          :content="favoriteproduct.length <= 9 ? favoriteproduct.length : '9+'"
          color="#232323FF"
          offset-x=""
          offset-y="-5"
        >
          <svg
            width="25px"
            viewBox="0 0 30 30"
            class="icon icon-cart"
            enable-background="new 0 0 30 30"
          >
            <g>
              <g>
                <path
                  d="M20,6V5c0-2.761-2.239-5-5-5s-5,2.239-5,5v1H4v24h22V6H20z M12,5c0-1.657,1.343-3,3-3s3,1.343,3,3v1h-6V5z M24,28H6V8h4v3    h2V8h6v3h2V8h4V28z"
                ></path>
              </g>
            </g>
          </svg>
        </v-badge>
      </v-btn>
    </template>
  </v-app-bar>
</template>
<style>
.app-bar-tablet .v-toolbar__prepend {
  flex-basis: min-content !important;
  position: relative;
}
</style>

<script>
import { productsAll } from "@/stores/index";
import { mapState } from "pinia";

export default {
  data: () => {
    return {
      oppen: false,
      oppeninput: false,
      valueTextRe: "",
      searshArrCategory: [],
      searshArrproducts: [],
      oppenMenuVa: false,
    };
  },
  inject: ["emitter"],
  components: {},
  computed: {
    ...mapState(productsAll, ["favoriteproduct"]),
  },

  props: ["Arr", "Arrmore", "Allpro"],
  methods: {
    Alnoor() {
      if (this.$route.name !== "YourCart") {
        this.emitter.emit("naveuse");
      }
    },
    oppen_Respons() {
      this.emitter.emit("oppen_Respons");
    },
  },
  watch: {
    valueTextRe() {
      let A = [...this.Arr, ...this.Arrmore];
      let B = this.Allpro;
      this.searshArrCategory = [];
      this.searshArrCategory = A.filter((a) =>
        a.toLowerCase().includes(this.valueTextRe.toLowerCase())
      );
      this.searshArrproducts = B.filter((a) =>
        a.category.toLowerCase().includes(this.valueTextRe.toLowerCase())
      );
      console.log(this.valueTextRe);
      console.log(this.searshArrCategory);
      console.log(this.searshArrproducts);
    },
  },
  mounted() {},
};
</script>
