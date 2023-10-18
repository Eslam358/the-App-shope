<template>
  <v-container fluid class="pt-10 pb-15">
    <v-row>
      <v-col cols="12">
        <div class="d-flex align-center justify-space-between">
          <h3 style="margin: auto">Featured Brans</h3>
        </div>
      </v-col>
    </v-row>
    <v-row style="display: flex; justify-content: center; align-items: center">
      <v-col
        v-for="(data, i) in 6"
        :key="i"
        class="d-flex justify-center align-center"
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
            <div
              :style="`color:${
                i == 1
                  ? '#182F76'
                  : i == 3
                  ? '#F7440BFF'
                  : i == 5
                  ? '#563CB4FF'
                  : '#515151FF'
              }`"
              class="text d-flex justify-center align-center flex-column"
            >
              <h3>
                <span
                  :style="`border-top: 2px solid red; position: relative; top: 4px; border-top-color:${
                    i == 1
                      ? '#182F76'
                      : i == 3
                      ? '#F7440BFF'
                      : i == 5
                      ? '#563CB4FF'
                      : '#515151FF'
                  }`"
                >
                  <span style="position: relative; top: -4px" :class="`e`"
                    >e</span
                  ></span
                ><span>ll</span>
                <span
                  :style="`color:${
                    i == 1
                      ? '#126C9EFF'
                      : i == 3
                      ? '#EC791EFF'
                      : i == 5
                      ? '#7E3BC4FF'
                      : '#515151FF'
                  }`"
                  >ade</span
                >
                <span
                  :style="`color:${
                    i == 1
                      ? '#17AEBAFF'
                      : i == 3
                      ? '#F6AC18FF'
                      : i == 5
                      ? '#993DCBFF'
                      : '#515151FF'
                  }`"
                  >mo</span
                >
              </h3>
              <p>
                Bra<span
                  :style="`color:${
                    i == 1
                      ? '#126C9EFF'
                      : i == 3
                      ? '#EC791EFF'
                      : i == 5
                      ? '#7E3BC4FF'
                      : '#515151FF'
                  }`"
                  >nd lo</span
                >
                <span
                  :style="`color:${
                    i == 1
                      ? '#17AEBAFF'
                      : i == 3
                      ? '#F6AC18FF'
                      : i == 5
                      ? '#993DCBFF'
                      : '#515151FF'
                  }`"
                  >go</span
                >
              </p>
            </div>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
