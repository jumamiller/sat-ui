<template>
  <v-app>
    <v-main class="auth">
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import {AuthService} from "../index";

export default {
  name: "authLayout",
  components: {
    // AppFooter,
  },
  computed: {
    auth() {
      return AuthService;
    },
  }
};
</script>

<style scoped>
@import url('../styles/auth.css');
</style>
