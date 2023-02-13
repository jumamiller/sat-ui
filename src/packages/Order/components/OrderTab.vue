<template>
  <v-container>
    <v-card>
      <v-tabs vertical v-model="tab">
        <v-tab v-bind:key="tab.id" v-for="tab in tabs" class="justify-start">
          <v-icon left>
            {{ tab.icon }}
          </v-icon>
          {{ tab.name }}
        </v-tab>
        <v-tabs-items v-model="tab">
          <v-tab-item key="1"
          >
            <v-card
                color="basil"
                flat
            >
              <v-card-text v-if="order && order.fleet">
                <OrderDriver :driver="order.fleet.driver"/>
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item key="2"
          >
            <v-card
                color="basil"
                flat
            >
              <v-card-text>
                <OrderFleet :fleet="order.fleet"/>
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-tabs>
    </v-card>
  </v-container>
</template>

<script>
import OrderDriver from "@/packages/Order/components/OrderDriver.vue";
import OrderFleet from "@/packages/Order/components/OrderFleet.vue";

export default {
  name: "OrderTab",
  props: {
    order:{}
  },
  components: {OrderFleet, OrderDriver},
  data: () => ({
    tab: 'option-1',
    tabs:[
      {
        id:1,
        name:"Driver",
        icon:"mdi-account"
      },
      {
        id:2,
        name:"Vehicle",
        icon:"mdi-clipboard-check-outline"
      },
    ]
  }),
}
</script>

<style scoped>

</style>
