<template>
  <v-container fluid>
    <v-row style="background-color: #f5f5f5ff">
      <v-col cols="12" sm="6" md="4"
        ><div class="img">
          <img
            src="../../assets/images/playstations.webp"
            style="width: 100%"
            alt=""
          />
        </div>
      </v-col>
      <v-col cols="12" sm="6" md="4"
        ><div class="img">
          <img
            src="../../assets/images/headset.webp"
            style="width: 100%"
            alt=""
          />
        </div>
      </v-col>
      <v-col cols="12" sm="12" md="4"
        ><div class="img">
          <img
            src="../../assets/images/chairs.webp"
            style="width: 100%"
            alt=""
          />
        </div>
      </v-col>
      <v-col cols="12" sm="6"
        ><div class="img">
          <img
            src="../../assets/images/iphones.webp"
            style="width: 100%"
            alt=""
          />
        </div>
      </v-col>
      <v-col cols="12" sm="6"
        ><div class="img">
          <img
            src="../../assets/images/laptops.webp"
            style="width: 100%"
            alt=""
          />
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.img {
  overflow: hidden;
  height: 96%;
  border-radius: 5px;
}
img {
  width: 100%;
  transition: 0.3s;
}
img:hover {
  transform: scale(1.1);
  transition: 0.3s;
}
</style>
