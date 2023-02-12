<template>
  <v-dialog v-model="dialog" persistent max-width="350">
    <v-card>
      <v-card-title class="text-h6 text-capitalize">
        {{ params.title }}
      </v-card-title>
      <v-card-text>
        {{ params.text }}
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn color="primary" text @click="close"> Close </v-btn>
        <v-spacer />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import {EventBus} from "../../../shared/utilities/event-bus";

export default {
  name: "appAlert",
  data: function () {
    return {
      dialog: false,
      params: {
        title: "",
        text: "",
        onClose: {},
      },
    };
  },

  mounted() {
    EventBus.$on("show-app-alert", (params) => {
      this.show(params);
    });
  },

  methods: {
    show: function (params) {
      this.params = params;
      this.dialog = true;
    },

    hide: function () {
      this.dialog = false;
    },

    close: function () {
      if (typeof this.params.onClose === "function") {
        this.params.onClose();
      }

      this.hide();
    },
  },
};
</script>

<style scoped></style>
