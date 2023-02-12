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
            <v-avatar size="110">
              <v-img
                  :src="('https://www.solutech.co.ke/wp-content/uploads/2020/10/Solutech-Official-Logo.svg')"
                  alt="logo"
                  contain
                  class="me-3 "
              ></v-img>
            </v-avatar>
          </router-link>
        </v-card-title>

        <!-- title -->
        <v-card-text>
          <p class="text-2xl font-weight-semibold text--primary mb-2">
            Welcome to {{ appName() }}! 👋🏻
          </p>
          <p class="mb-2">
            Please sign-in to your account and start the adventure
          </p>
        </v-card-text>

        <!-- login form -->
        <v-card-text>
          <v-form v-model="isValid" ref="loginForm" @submit.prevent="login">
            <v-text-field
                v-model="formData.username"
                outlined
                label="Username"
                placeholder="johndoe"
                hide-details
                class="mb-3"
                :rules="[rules.username.required]"
            ></v-text-field>

            <v-text-field
                v-model="formData.password"
                outlined
                :type="isPasswordVisible ? 'text' : 'password'"
                label="Password"
                :rules="[rules.password.required, rules.password.min]"
                :append-icon="isPasswordVisible ? icons.mdiEyeOffOutline : icons.mdiEyeOutline"
                hide-details
                @click:append="isPasswordVisible = !isPasswordVisible"
            ></v-text-field>

            <div class="d-flex align-center justify-space-between flex-wrap">
              <v-checkbox
                  label="Remember Me"
                  hide-details
                  class="me-3 mt-1"
              >
              </v-checkbox>

              <!-- forgot link -->
              <router-link
                  :to="{name: 'ForgotPassword'}"
                  class="mt-1"
              >
                Forgot Password?
              </router-link>
            </div>

            <v-btn
                v-if="!submitting"
                block
                type="submit"
                class="primary mt-5"
            >
              <v-icon> mdi-lock-open-outline</v-icon> Sign In
            </v-btn>
            <v-btn
                v-if="submitting"
                block
                type="button"
                class="error"
            >
              <i class="fa fa-refresh fa-spin loading-button-spinner"></i>Signing in...
            </v-btn>
          </v-form>
        </v-card-text>
        <!-- divider -->
        <v-card-text class="d-flex align-center mt-2">
          <v-divider></v-divider>
          <span class="mx-5">or</span>
          <v-divider></v-divider>
        </v-card-text>

        <!-- social links -->
        <v-card-actions class="d-flex justify-center">
          <v-btn
              v-for="link in socialLink"
              :key="link.icon"
              icon
              class="ms-1"
          >
            <v-icon :color="$vuetify.theme.dark ? link.colorInDark : link.color">
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
        src="@/assets/images/misc/tree.png"
    ></v-img>

    <!-- tree  -->
    <v-img
        class="auth-tree-3"
        width="247"
        height="185"
        src="@/assets/images/misc/tree-3.png"
    ></v-img>
  </div>
</template>

<script>
import {
  mdiFacebook,
  mdiTwitter,
  mdiGoogle,
  mdiEyeOutline,
  mdiEyeOffOutline,
  mdiEyeRefresh,
  mdiInstagram
} from '@mdi/js'
import {mapActions} from "vuex";
import {appName} from "../../../environment";

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
        icon: mdiInstagram,
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
      submitting: false,
      isValid: false,
      isPasswordVisible : false,
      email: '',
      password: '',
      socialLink,

      formData: {
        username: '',
        password: '',
      },

      rules: {
        password: {
          required: (value) => !!value || 'Password is Required.',
        },
        username: {
          required: (value) => !!value || 'Email is Required.',
        }
      },

      icons: {
        mdiEyeOutline,
        mdiEyeOffOutline,
        mdiEyeRefresh
      },
    }
  },
  mounted(){
    Event.$on('loggedIn', value=> {
      this.submitting = value;
    })
  },
  methods: {
    appName() {
      return appName
    },
    ...mapActions({
      login: function (dispatch) {
        this.submitting = true;
        if (!this.isValid) {
          this.$refs.loginForm.validate()
          this.submitting = false;
        } else {
          dispatch('Auth/login', {...this.formData})
        }
      }
    })
  }
}
</script>
<style scoped>
.account-btn{
  background: #0E4A29;
}
@import url('../styles/auth.css');
</style>
<style lang="scss" scoped>
@import '../../../plugins/default-preset/preset/pages/auth.scss';
</style>
