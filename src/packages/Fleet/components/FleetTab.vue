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
              <v-card-text>
                <FleetDriver :driver="fleet.driver"/>
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
                <FleetOrders :orders="fleet.orders"/>
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-tabs>
    </v-card>
  </v-container>
</template>

<script>
import FleetDriver from "@/packages/Fleet/components/FleetDriver.vue";
import FleetOrders from "@/packages/Fleet/components/FleetOrders.vue";

export default {
  name: "FleetTab",
  props: {
    fleet:{}
  },
  components: {FleetOrders, FleetDriver},
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
        name:"Orders",
        icon:"mdi-clipboard-check-outline"
      },
    ]
  }),
}
</script>

<style scoped>

</style>
