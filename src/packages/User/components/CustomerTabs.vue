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
                <CustomerOrders :orders="customer.orders"/>
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
                <CustomerAddress :addresses="customer.addresses"/>
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-tabs>
    </v-card>
  </v-container>
</template>

<script>
import CustomerAddress from "@/packages/User/components/CustomerAddress.vue";
import CustomerOrders from "@/packages/User/components/CustomerOrders.vue";

export default {
  name: "CustomerTabs",
  props: {
    customer:{}
  },
  components: {CustomerAddress, CustomerOrders},
  data: () => ({
    tab: 'option-1',
    tabs:[
      {
        id:1,
        name:"Orders",
        icon:"mdi-clipboard-file"
      },
      {
        id:2,
        name:"Address",
        icon:"mdi-clipboard-check-outline"
      },
    ]
  }),
}
</script>

<style scoped>

</style>
