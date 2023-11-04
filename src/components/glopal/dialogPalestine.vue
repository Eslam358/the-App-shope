<template>
  <div class="text-center">
    <v-dialog v-model="dialog" activator="parent" fullscreen>
      <v-card color="#3f9d0491" @dblclick="dialog = false">
        <v-card-text style="display: flex; justify-content: center">
          <v-btn color="blue" width="80" height="80" icon>{{ num }} s</v-btn>
        </v-card-text>
        <v-card-text style="position: relative">
          <!-- <v-card max-width="350px"> -->
          <div
            style="
              position: relative;
              max-width: 350px;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
            "
          >
            <div style="height: 60px; background-color: black"></div>
            <div style="height: 60px; background-color: white"></div>
            <div style="height: 60px; background-color: #009137"></div>
            <div
              style="
                border: 90px solid;
                border-color: #e62d3600 #e62d3600 #e62d3600 #e62d36;
                position: absolute;
                left: 0;
                top: 0;
                height: 100%;
              "
            ></div>
          </div>
          <!-- </v-card> -->
        </v-card-text>

        <v-card-actions>
          <v-btn size="x-large" block @click="dialog = false">
            <div style="position: relative">
              <div
                style="width: 150px; height: 20px; background-color: black"
              ></div>
              <div
                style="
                  width: 150px;
                  height: 20px;
                  background-color: white;
                  color: rgb(166, 35, 241);
                  cursor: pointer;
                "
              >
                الله اكبر
              </div>
              <div
                style="width: 150px; height: 20px; background-color: #009137"
              ></div>
              <div
                style="
                  border: 30px solid;
                  border-color: #e62d3600 #e62d3600 #e62d3600 #e62d36;
                  position: absolute;
                  left: 0;
                  top: 0;
                  height: 100%;
                "
              ></div>
            </div>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialog: true,
      num: 3,
    };
  },
  mounted() {
    let AAA = setInterval(() => {
      this.num--;
      if (this.num == 0) {
        clearInterval(AAA);
        this.dialog = false;
      }
    }, 1000);
  },
};
</script>
