<template>
  <v-card>
    <v-card-title>Order Delivery Vehicle Details</v-card-title>
    <v-divider/>
    <v-card-text>
      <v-row>
        <v-col cols="12" md="6">Name: {{fleet.name}} </v-col>
        <v-col cols="12" md="6">Registration Number: {{fleet.registration_number}} </v-col>
        <v-col cols="12" md="6">Model: {{fleet.model}} </v-col>
        <v-col cols="12" md="6">Manufacturer: {{fleet.manufacturer}} </v-col>
        <v-col cols="12" md="6">Year of Manufacture: {{fleet.year}} </v-col>
        <v-col cols="12" md="6">Capacity: {{fleet.capacity}} </v-col>
        <v-col cols="12" md="6">Status: {{fleet.status}} </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import helpers from "../../../../shared/utilities/helpers";

export default {
  name: "OrderFleet",
  methods: {
    helpers() {
      return helpers
    }
  },
  props:{
    fleet:{ }
  },
  data: ()=>({
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
    ]
  })
}
</script>

<style scoped>

</style>
