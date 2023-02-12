<template>
  <v-card>
    <v-card-title>Customer Order</v-card-title>
    <v-card-text>
      <v-data-table
          :headers="headers"
          :items="orders"
      >
        <template v-slot:item.id="{index}">
          <span>{{index+1}}</span>
        </template>
        <!--Created On-->
        <template v-slot:item.created_at="{item}">
          <span>{{ helpers().formatDate(item.created_at) }} </span>
        </template>
        <!--Created On-->
        <!--Created On-->
        <template v-slot:item.total_price="{item}">
          <span>{{ helpers().formatCurrency(item.total_price) }} </span>
        </template>
        <!--Created On-->
        <template v-slot:item.status="{item}">
            <span><v-icon size="medium" :color="item.status === 'DISPATCHED' ? 'success' : 'error'">mdi-circle-double</v-icon>
              {{item.status}}
            </span>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
import helpers from "../../../../shared/utilities/helpers";

export default {
  name: "CustomerOrders",
  methods: {
    helpers() {
      return helpers
    }
  },
  props:{
    orders:{
      type: Array
    }
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
