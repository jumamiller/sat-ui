<template>
  <v-container>
    <v-overlay :value="loading">
      <v-progress-circular
          indeterminate
          size="64"
      ></v-progress-circular>
    </v-overlay>
  </v-container>
</template>

<script>


export default {
  name: "Loader",

  computed: {
    loading() {
      return this.$store.getters['Dashboard/loading'];
    }
  },
};
</script>
