<template>
  <v-app>
    <!--  Side Bar  -->
    <v-navigation-drawer
        v-model="drawer"
        :permanent="$vuetify.breakpoint.mdAndUp"
        :mini-variant="$vuetify.breakpoint.mdAndUp ? mini : false"
        app
        width="350"
        color="aside"
        dark
        class="fill-height"
    >
      <v-card flat color="aside" class="pa-2" width="100%">
        <div class="d-flex flex-column">
          <v-img
              alt="Logo"
              width="100"
              :src="('https://www.solutech.co.ke/wp-content/uploads/2020/10/Solutech-Official-Logo.svg')"
              transition="scale-transition"
          />
        </div>

        <v-card-subtitle
            v-if="!mini"
            class="overline text-center pa-0 mt-3"
            style="line-height: 1rem"
        >
        </v-card-subtitle>
      </v-card>

      <v-divider></v-divider>

      <v-list>
        <div v-for="(item, i) in links" :key="i">
          <v-list-group
              v-if="item.sublinks.length > 0"
              v-model="item.active"
              active-class="font-weight-bolder white--text"
          >
            <template v-slot:activator>
              <v-list-item-icon>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item-group>
              <v-list-item
                  v-for="(sub, s) in item.sublinks"
                  :key="s"
                  link
                  :to="sub.to"
                  active-class="selectedItem"
              >
                <v-list-item-avatar v-if="!mini"> &nbsp; </v-list-item-avatar>
                <v-list-item-icon class="mr-2">
                  <v-icon v-if="!mini">{{ sub.icon }}</v-icon>

                  <v-badge
                      v-else
                      :content="sub.value || ''"
                      :value="sub.value"
                      color="success"
                      overlap
                      left
                  >
                    <v-icon>{{ sub.icon }}</v-icon>
                  </v-badge>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>
                    {{ sub.title }}
                  </v-list-item-title>
                </v-list-item-content>
                <v-list-item-action v-if="sub.value">
                  <v-chip x-small color="success">
                    {{ sub.value }}
                  </v-chip>
                </v-list-item-action>
              </v-list-item>
            </v-list-item-group>
          </v-list-group>

          <v-list-item-group v-else>
            <v-list-item :to="item.to" active-class="selectedItem">
              <v-list-item-icon>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </div>
      </v-list>
      <template v-slot:append>
        <div class="pa-2">
          <v-btn v-if="user" block text @click="logout">
            <v-icon>mdi-logout</v-icon> Sign Out
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>

    <!--  App Bar  -->
    <v-app-bar app elevation="1" color="error">
      <v-app-bar-nav-icon v-if="$vuetify.breakpoint.smAndDown" @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-app-bar-nav-icon v-if="$vuetify.breakpoint.mdAndUp" @click="mini = !mini"></v-app-bar-nav-icon>
      <v-spacer class="spacer" sm="0" />
      <v-btn class="dark--mode" rounded icon @click="$vuetify.theme.dark = !$vuetify.theme.dark">
        <v-icon>mdi-theme-light-dark</v-icon>
      </v-btn>
      <!--BEGIN profile-->
      <AccountProfileDropdown/>
      <!--END profile dropdown-->
    </v-app-bar>
    <v-divider />

    <v-main class="background">
      <router-view class="py-5" />
    </v-main>

    <loader />

    <confirmation />

    <Footer />
  </v-app>
</template>

<script>
import AccountProfileDropdown from '../components/DashboardProfileDropdown'
import { AuthService } from "../../auth";
export default {
  name: "DashboardLayout",
  components: {
    AccountProfileDropdown,
  },
  data: () => ({
    drawer: null,
    leftDrawer: false,
    mini: false,
    selectedItem: 0,
    fav: true,
    menu: false,
    message: false,
    hints: true,
  }),
  beforeRouteEnter(to, from, next) {
    next(() => {
    });
  },
  computed: {
    user() {
      return AuthService.user;
    },
    links() {
      return this.$store.getters["Dashboard/links"]
          .filter((item) => !item.disabled && item.title !== "Administration")
          .map((link) => {
            link.sublinks = link.sublinks || [];
            return link;
          });
    },
  },
  methods: {
    logout() {
      this.$store.dispatch('Auth/logout');
      AuthService.logout();
    },
  },
};
</script>
