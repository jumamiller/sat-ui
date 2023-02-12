<template>
  <v-container fluid>
    <v-row class="mt-4">
      <v-col cols="12" sm="12">
        <v-card
            class="mx-auto rounded-xl"
            color="grey darken-4"
        >
          <v-row>
            <v-col cols="12" sm="12">
              <v-toolbar flat color="rgba(0,0,0,0)" dark>
                <v-toolbar-title>Dashboard</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn outlined class="">
                  <v-icon right class="mr-2">fas fa-sliders-h</v-icon>
                  Filters
                </v-btn>
              </v-toolbar>

            </v-col>
            <v-col cols="12" sm="4">

              <v-card class="cardOr mx-2 rounded-xl mt-n7" elevation="16">
                <v-row>
                  <v-col cols="12" sm="8">
                    <v-list-item three-line>
                      <v-list-item-content>
                        <div class="mb-4">
                          <v-btn tile fab color="#6e0b14" elevation="0">
                            <v-icon color="">fas fa-lira-sign</v-icon>
                          </v-btn>
                        </div>
                        <v-list-item-title class="headline mb-1 white--text">
                          {{statistics.total_pending_orders}}
                        </v-list-item-title>
                        <v-list-item-subtitle class="white--text">Total Pending Orders</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </v-col>
                  <v-col cols="12" sm="4">
                    <v-avatar size="100" class="ml-n10 mt-6" tile>
                      <v-icon x-large>mdi-cart-check</v-icon>
                    </v-avatar>
                  </v-col>
                </v-row>
              </v-card>

            </v-col>
            <v-col cols="12" sm="4">
              <v-card class="cardVr mx-2 rounded-xl mt-n7" elevation="16">
                <v-row>
                  <v-col cols="12" sm="8">
                    <v-list-item three-line>
                      <v-list-item-content>
                        <div class="mb-4">
                          <v-btn tile fab color="teal" elevation="0">
                            <v-icon color="">fas fa-lira-sign</v-icon>
                          </v-btn>
                        </div>
                        <v-list-item-title class="headline mb-1 white--text">
                          {{statistics.available_vehicles}}
                        </v-list-item-title>
                        <v-list-item-subtitle class="white--text">Total Vehicles Available</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </v-col>
                  <v-col cols="12" sm="4">
                    <v-avatar size="100" class="ml-n10 mt-6" tile>
                      <v-icon x-large>mdi-rv-truck</v-icon>
                    </v-avatar>
                  </v-col>
                </v-row>
              </v-card>

            </v-col>
            <v-col cols="12" sm="4">
              <v-card class="cardR mx-2 rounded-xl mt-n7" elevation="16">
                <v-row>
                  <v-col cols="12" sm="8">
                    <v-list-item three-line>
                      <v-list-item-content>
                        <div class="mb-4">
                          <v-btn tile fab color="orange" elevation="0">
                            <v-icon color="">fas fa-lira-sign</v-icon>
                          </v-btn>
                        </div>
                        <v-list-item-title class="headline mb-1 white--text">
                          {{statistics.total_customers}}
                        </v-list-item-title>
                        <v-list-item-subtitle class="white--text">Total Solutech Customers</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </v-col>
                  <v-col cols="12" sm="4">
                    <v-avatar size="100" class="ml-n10 mt-6" tile>
                      <v-icon x-large>mdi-account-multiple-check-outline</v-icon>
                    </v-avatar>
                  </v-col>
                </v-row>
              </v-card>

            </v-col>
            <v-col cols="12" sm="8">

              <v-toolbar flat color="rgba(0,0,0,0)" dark>
                <v-toolbar-title>Orders Overview</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn outlined >As At ({{new Date()}})
                  <v-icon right  class="mr-2" >fas fa-chevron-down</v-icon>
                </v-btn>
              </v-toolbar>
              <v-sparkline
                  :value="value"
                  :smooth="radius || false"
                  :padding="padding"
                  :line-width="width"
                  :stroke-linecap="lineCap"
                  :fill="fill"
                  :type="type"
                  :auto-line-width="autoLineWidth"
                  auto-draw
                  color="white"
              ></v-sparkline>
              <v-divider color="white" class="mx-4"></v-divider>
              <v-toolbar flat color="rgba(0,0,0,0)" dark>
                <v-toolbar-title>Recent Orders</v-toolbar-title>
              </v-toolbar>
              <v-data-table
                  :headers="headers"
                  v-if="recent_orders"
                  :items="recent_orders"
              >
                <template v-slot:item.id="{index}">
                  <span>{{index+1}}</span>
                </template>
                <!--Created On-->
                <template v-slot:item.created_at="{item}">
                  <span>{{ helpers().formatDate(item.created_at) }} </span>
                </template>
                <!--Created On-->
                <!--Begin total_price-->
                <template v-slot:item.total_price="{item}">
            <span>
              {{helpers().formatCurrency(item.total_price|| '')}}
            </span>
                </template>
                <!--END total_price-->
                <!--Begin status-->
                <template v-slot:item.status="{item}">
            <span><v-icon size="medium" :color="item.status === 'DELIVERED' ? 'success' : 'error'">mdi-circle-double</v-icon>
              {{item.status}}
            </span>
                </template>
                <!--END status-->
                <!--BEGIN action-->
<!--                <template v-slot:item.action="item">-->
<!--                  <v-btn @click="redirectToCard(item)" small depressed rounded color="success"><v-icon>mdi-eye</v-icon>view</v-btn>-->
<!--                </template>-->
                <!--END action-->
              </v-data-table>
            </v-col>
            <v-col cols="12" sm="4">
              <v-card class=" mx-2 rounded-xl" elevation="8" color="teal">
                <v-toolbar flat color="rgba(0,0,0,0)" dark>
                  <v-toolbar-title>Recent Customers</v-toolbar-title>
                  <v-spacer></v-spacer>

                  <v-icon  class="mr-2" small>fas fa-ellipsis-v</v-icon>

                </v-toolbar>
                <v-data-table
                    :headers="customerHeaders"
                    style="background: inherit"
                    :items="recent_customers"
                >
                  <template v-slot:item.id="{index}">
                    <span>{{index+1}}</span>
                  </template>
                  <!--Created On-->
                  <template v-slot:item.created_on="{item}">
                    <span>{{ helpers().formatDate(item.created_at) }} </span>
                  </template>
                  <!--Created On-->
                  <!--full name-->
                  <template v-slot:item.name="{item}">
                    <span>{{item.user.first_name}} {{item.user.middle_name}} {{item.user.last_name}}</span>
                  </template>
                  <!--full name-->
                  <!--EMail-->
                  <template v-slot:item.email="{item}">
                    <span>{{item.user.email}} </span>
                  </template>
                  <!--email-->
                  <!--phone_number-->
                  <template v-slot:item.phone_number="{item}">
                    <span>{{item.user.phone_number}} </span>
                  </template>
                  <!--phone_number-->
                </v-data-table>
              </v-card>

            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import helpers from "../../../../shared/utilities/helpers";

export default {
  name: 'DashboardCard',
  methods: {
    helpers() {
      return helpers
    }
  },
  beforeRouteEnter(to, from, next){
    next(v => {
      v.$store.dispatch("Dashboard/getStatistics");
    })
  },
  data () {
    return {
      width: 2,
      radius: 10,
      padding: 8,
      lineCap: 'round',
      value: [0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 0],
      fill: false,
      type: 'trend',
      autoLineWidth: false,
      orders: [
        {
          price: 89.03,
          amount: 0.15,
        },
        {
          price: 94.03,
          amount: 0.18,
        },
        {
          price: 92.03,
          amount: 0.22,
        },
        {
          price: 94.03,
          amount: 0.18,
        },
        {
          price: 33.03,
          amount: 0.19,
        },
      ],
      breadcrumbs: [
        {
          text: 'Dashboard',
          disabled: false,
          href: 'breadcrumbs_clothing',
        },
      ],
      headers: [
        {
          text: '#S/N',
          align: '',
          sortable: true,
          value: 'id'
        },
        {
          text: 'Created On',
          align: '',
          sortable: true,
          value: 'created_at'
        },
        {
          text: 'Order Number',
          align: '',
          sortable: true,
          value: 'order_number'
        },
        {
          text: 'Total Price',
          align: '',
          sortable: true,
          value: 'total_price'
        },
        {
          text: 'Status',
          align: '',
          sortable: true,
          value: 'status'
        },
        {
          text: 'Actions',
          align: '',
          sortable: true,
          value: 'action'
        },
      ],
      //customer header
      customerHeaders:[
        {
          text: 'Full Name',
          align: '',
          sortable: true,
          value: 'name'
        },
        {
          text: 'Email',
          align: '',
          sortable: true,
          value: 'email'
        },
        {
          text: 'Mobile Number',
          align: '',
          sortable: true,
          value: 'phone_number'
        },
      ]
    }
  },
  computed: {
    statistics() {
      return this.$store.getters['Dashboard/DashboardGetter']('statistics')
    },
    recent_orders() {
      return this.statistics?.recent_orders?.data
    },
    recent_customers() {
      return this.statistics?.recent_customers?.data
    },
  }
}
</script>
<style scoped>
.cardOr{
  background: #113861;
  background: linear-gradient(90deg, #113861 0%, rgba(34,34,29,1) 70%, rgba(135,115,12,1) 100%);
}
.cardVr{
  background: #113861;
  background: linear-gradient(90deg, #113861 0%, rgba(29,34,30,1) 70%, rgba(19,158,112,1) 100%);
}
.cardR{
  background: #113861;
  background: linear-gradient(90deg, #113861 0%, rgba(74,36,36,1) 70%, rgba(158,19,19,1) 100%);
}
</style>
