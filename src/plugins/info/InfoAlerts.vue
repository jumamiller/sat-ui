<template>
  <v-menu
    :close-on-content-click="false"
    :max-width="400"
    :nudge-right="5"
    :nudge-top="5"
    transition="slide-x-transition"
    offset-x
    open-on-hover
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn large color="info" icon v-on="on" v-bind="attrs">
        <v-icon>info</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-alert :type="type" dense style="width: 100%" tile>{{ title }}</v-alert>
      <v-card-text>
        <ul>
          <div v-for="(text, i) in displayMessage" :key="i" v-html="text"></div>
        </ul>
      </v-card-text>
    </v-card>
  </v-menu>
</template>
<script>
export default {
  name: "InfoAlerts",
  props: { type: String, message: Array, title: String },
  data: function () {
    return {
      textColor: {
        info: "teal",
        warning: "orange",
        error: "red",
        success: "green",
      },
    };
  },
  computed: {
    displayMessage() {
      return this.message.map((item) => {
        if (typeof item === "string") {
          return `<li style="overflow-wrap: normal" class="${
            this.textColor[this.type]
          }--text py-1">${item}</li>`.toString();
        } else {
          let list = "";
          item.forEach((sub) => {
            list += `<li style="overflow-wrap: normal" class="${
              this.textColor[this.type]
            }--text py-1">${sub}</li>`.toString();
          });
          return `<ul>${list}</ul>`;
        }
      });
    },
  },
};
</script>
