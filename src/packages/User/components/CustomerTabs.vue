<template>
  <v-container>
    <v-card>
      <v-toolbar
          color="primary"
      >
        <v-toolbar-title>User Profile</v-toolbar-title>
      </v-toolbar>
      <div class="d-flex flex-row">
        <v-tabs
            v-model="tab"
            direction="vertical"
            color="primary"
        >
          <v-tab value="option-1">
            <v-icon start>
              mdi-account
            </v-icon>
            Customer Orders
          </v-tab>
          <v-tab value="option-2">
            <v-icon start>
              mdi-lock
            </v-icon>
            Customer Address
          </v-tab>
        </v-tabs>
        <v-window v-model="tab">
          <v-window-item value="option-1">
            <CustomerOrders/>
          </v-window-item>
          <v-window-item value="option-2">
           <CustomerAddress/>
          </v-window-item>
        </v-window>
      </div>
    </v-card>
  </v-container>
</template>

<script>
import CustomerAddress from "@/packages/User/components/CustomerAddress.vue";
import CustomerOrders from "@/packages/User/components/CustomerOrders.vue";

export default {
  name: "CustomerTabs",
  components: {CustomerOrders, CustomerAddress},
  data: () => ({
    tab: 'option-1',
  }),
}
</script>

<style scoped>

</style>
