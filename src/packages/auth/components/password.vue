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
            Adventure starts here 🚀
          </p>
          <p class="mb-2">
            Reset password &amp; Make your app management easy and fun!
          </p>
        </v-card-text>

        <!-- login form -->
        <v-card-text>
          <v-form
              ref="setPasswordForm"
              @submit.prevent="setAccountPassword"
          >
            <v-text-field
                ref="password"
                v-model="formData.password"
                outlined
                label="New Password"
                title="Enter a secure password"
                :rules="[rules.password.required,rules.password.min]"
                :type="isPasswordVisible ? 'text' : 'password'"
                :append-icon="isPasswordVisible ? icons.mdiEyeOffOutline : icons.mdiEyeOutline"
                hide-details
                @click:append="isPasswordVisible = !isPasswordVisible"
            />
            <v-text-field
                ref="confirmPassword"
                v-model="formData.confirmPassword"
                outlined
                label="Confirm Password"
                title="Enter Password again"
                :rules="[rules.confirmPassword.required, rules.confirmPassword.matched]"
                class="mt-5"
                hide-details
                :type="isConfirmPasswordVisible ? 'text' : 'password'"
                :append-icon="isConfirmPasswordVisible ? icons.mdiEyeOffOutline : icons.mdiEyeOutline"
                @click:append="isConfirmPasswordVisible = !isConfirmPasswordVisible"
            />

            <v-btn
                v-if="!submitting"
                block
                type="submit"
                class="account-btn"
            >
              Set Password
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
        height="190"
        :src="require(`@/assets/images/misc/mask-${$vuetify.theme.dark ? 'dark':'light'}.png`)"
        alt="">

    <!-- tree -->
    <v-img
        class="auth-tree"
        width="247"
        height="185"
        src="@/assets/images/misc/tree.png"
    ></v-img>

    <!-- tree  -->
    <v-img
        class="auth-tree-3"
        width="377"
        height="289"
        src="@/assets/images/misc/tree-3.png"
    ></v-img>
  </div>
</template>

<script>
import {mdiEyeOffOutline, mdiEyeOutline, mdiFacebook, mdiGithub, mdiGoogle, mdiTwitter} from "@mdi/js";
import {mapActions, mapState} from "vuex";
// import AuthAlert from "@/modules/auth/components/authAlert";

export default {
  name: "password",
  data: function () {
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
    ];
    return {
      isValid: false,
      strengthValue: '',
      strengthColor: '',
      submitting: false,
      disabled: true,
      socialLink,
      formData: {
        password: "",
        confirmPassword: "",
        auth_token: '',
        device_name: 'Falcon'
      },
      icons: {
        mdiEyeOutline,
        mdiEyeOffOutline,
      },
      isPasswordVisible : false,
      isConfirmPasswordVisible : false,
      rules: {
        password: {
          required: (value) => !!value || 'Password is required.',
          min: (v) => v.length >= 8 || 'Min 8 characters'
        },
        confirmPassword: {
          required: (v) => !!v || "Password is required",
          matched: (v) => v === this.formData.password || "Password does not match",
        },
      }
    };
  },
  mounted() {
    this.formData.auth_token = this.$route.params.auth_token;
  },
  computed: {
    ...mapState({
      loading: function (state) {
        return state.loader.loading
      }
    }),
  },
  methods: {
    ...mapActions({
      setAccountPassword: function (dispatch) {
        this.submitting = true;
        /** validate form */
        const { password, confirmPassword } = this.formData
        if (password.length === 0 || password.length < 8) {
          this.$refs.setPasswordForm.validate()
          this.submitting = false;
        } else if (confirmPassword !== password) {
          /** error */
          Event.$emit('ApiError', 'Passwords do not match')
          this.submitting = false;
        } else {
          dispatch('Auth/setPassword', this.formData)
          setTimeout(() => {
            this.submitting = false;
          }, 5000)
        }
      },
    }),
  },
};
</script>

<style scoped>
@import url('../styles/auth.css');
@import '~@/plugins/default-preset/preset/pages/auth.scss';
</style>
