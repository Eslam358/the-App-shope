<template>
  <v-container fluid class="pt-10 pb-15">
    <v-row>
      <v-col cols="12">
        <div class="d-flex align-center justify-space-between">
          <h3 class="topcat-h3">Top Categories</h3>
          <span
            ><a href="#" style="color: #202020; font-size: 14px"
              >All Shope</a
            ></span
          >
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        v-for="data in getproductarr"
        :key="data.id"
        cols="6"
        sm="4"
        lg="2"
        xl="2"
        xxl="2"
      >
        <div class="product d-flex flex-column justify-center align-center">
          <div
            class="img d-flex justify-center align-center"
            style="
              width: 120px;
              height: 120px;
              border-radius: 50%;
              background-color: #f5f5f5;
              border: 1px solid;
              overflow: hidden;
            "
          >
            <img :src="data.thumbnail" style="width: 70%" />
          </div>
          <p
            style="
              margin: auto;
              font-size: 12px;
              padding: 10px;
              margin-top: 10px;
            "
          >
            {{ data.brand }}
          </p>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
<style>
.topcat-h3 {
  margin: auto;
}
@media screen and (max-width: 600px) {
  .topcat-h3 {
    margin: 0;
  }
}
</style>

<script>
export default {
  props: ["getproductarr"],
};
</script>
