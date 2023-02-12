<template>
  <div class="auth-wrapper auth-v1 fadeInDown">
    <div class="auth-inner">
      <v-card class="auth-card">
        <!-- logo -->
        <v-card-title class="d-flex align-center justify-center py-7">
          <router-link
              to="/"
              class="d-flex align-center"
          >
            <v-img
                :src="require('@/assets/images/id4s-logo.png')"
                max-height="100px"
                max-width="100px"
                alt="logo"
                contain
                class="me-3 "
            ></v-img>
          </router-link>
        </v-card-title>

        <!-- title -->
        <v-card-text>
          <p class="text-2xl font-weight-semibold text--primary mb-2">
            Reset Password Adventure starts here 🚀
          </p>
          <p class="mb-2">
            Please enter your registered email address and start the adventure
          </p>
        </v-card-text>

        <!-- login form -->
        <v-card-text>
          <v-form ref="passwordResetForm" @submit.prevent="sendResetPasswordLink">
            <v-text-field
                v-model="email"
                outlined
                label="Email"
                placeholder="john@example.com"
                hide-details
                class="mb-3"
                :rules="[rules.email.required, rules.email.value]"
            ></v-text-field>
            <v-btn
                v-if="!submitting"
                block
                class="primary"
                type="submit"
            >
              Send Reset Link
            </v-btn>
            <v-btn
                v-if="submitting"
                block
                type="submit"
                class="account-btn"
            >
              <i class="fa fa-refresh fa-spin loading-button-spinner"></i>Processing...please wait
            </v-btn>
          </v-form>
        </v-card-text>

        <!-- create new account  -->
        <v-card-text class="d-flex align-center justify-center flex-wrap mt-2">
          <span class="me-2">
            Already have an account?
          </span>
          <router-link :to="{ name:'Login' }">
            Sign in instead
          </router-link>
        </v-card-text>

        <!-- divider -->
        <v-card-text class="d-flex align-center mt-2">
          <v-divider></v-divider>
          <span class="mx-5">or</span>
          <v-divider></v-divider>
        </v-card-text>

        <!-- social link -->
        <v-card-actions class="d-flex justify-center">
          <v-btn
              v-for="link in socialLink"
              :key="link.icon"
              icon
              class="ms-1"
          >
            <v-icon :color="$vuetify.theme.dark ? link.colorInDark:link.color">
              {{ link.icon }}
            </v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </div>

    <!-- background triangle shape  -->
    <img
        class="auth-mask-bg"
        height="173"
        :src="require(`@/assets/images/misc/mask-${$vuetify.theme.dark ? 'dark':'light'}.png`)"
        alt="">

    <!-- tree -->
    <v-img
        class="auth-tree"
        width="247"
        height="185"
        src="@/assets/images/misc/tree-3.png"
    ></v-img>

    <!-- tree  -->
    <v-img
        class="auth-tree-3"
        width="247"
        height="185"
        src="@/assets/images/misc/tree.png"
    ></v-img>
  </div>
</template>

<script>
import { mdiFacebook, mdiTwitter, mdiGithub, mdiGoogle, mdiEyeOutline, mdiEyeOffOutline } from '@mdi/js'
import {mapActions} from "vuex";

export default {
  data() {
    const socialLink = [
      {
        icon: mdiFacebook,
        color: '#4267b2',
        colorInDark: '#4267b2',
      },
      {
        icon: mdiTwitter,
        color: '#1da1f2',
        colorInDark: '#1da1f2',
      },
      {
        icon: mdiGithub,
        color: '#272727',
        colorInDark: '#fff',
      },
      {
        icon: mdiGoogle,
        color: '#db4437',
        colorInDark: '#db4437',
      },
    ]

    return {
      email: '',
      socialLink,
      submitting: false,

      icons: {
        mdiEyeOutline,
        mdiEyeOffOutline,
      },
      rules: {
        email: {
          required: (value) => !!value || 'Email address is Required.',
          value: (value) => /.+@.+/.test(value) || 'E-mail must be valid'
        }
      }
    }
  },
  methods: {
    ...mapActions({
      sendResetPasswordLink: function (dispatch) {
        this.submitting = true;
        if (this.email.length === 0 || !/.+@.+/.test(this.email)) {
          this.$refs.passwordResetForm.validate()
          this.submitting = false;
        } else {
          dispatch('Auth/sendResetPasswordLink', {email: this.email})
          setTimeout(() => {
            this.submitting = false;
          }, 5000)
        }
      }
    })
  }
}
</script>
<style scoped>
@import url('../styles/auth.css');
</style>
<style lang="scss">
//@import '~@/plugins/default-preset/preset/pages/auth.scss';
</style>
