<template>
  <v-container fluid>
    <v-card>
      <v-card-title>
        <v-btn class="error"><v-icon>mdi-arrow-left</v-icon>Go Back</v-btn>
        <v-spacer/>
        <v-btn @click="$router.push({name:'OrderCard'})" class="primary"><v-icon>mdi-plus</v-icon>Make an Order</v-btn>
      </v-card-title>
      <v-spacer/>
      <v-divider/>
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
          <!--Begin total_price-->
          <template v-slot:item.total_price="{item}">
            <span>
              {{helpers().formatCurrency(item.total_price|| '')}}
            </span>
          </template>
          <!--END total_price-->
          <!--Begin status-->
          <template v-slot:item.status="{item}">
            <span><v-icon size="medium" :color="item.status === 'DISPATCHED' ? 'success' : 'error'">mdi-circle-double</v-icon>
              {{item.status}}
            </span>
          </template>
          <!--END status-->
          <!--BEGIN action-->
          <template v-slot:item.action="item">
            <v-btn @click="redirectToCard(item)" small depressed rounded color="success"><v-icon>mdi-eye</v-icon>view</v-btn>
          </template>
          <!--END action-->
        </v-data-table>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import helpers from "../../../../shared/utilities/helpers";
export default {
  name: "Order",
  beforeRouteEnter(to,from,next){
    next(v=>{
      v.$store.dispatch('OrderManagement/getOrders');
    })
  },
  data: () => ({
    dialog: false,
    isValid: false,
    formData:{
      title:"",
      description:"",
      website_url:"",
      attachment:""
    },
    rules: {
      required: value => !!value || 'Required!',
    },
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
  }),
  computed:{
    orders(){
      return this.$store.getters['OrderManagement/OrderGetter']("orders")
    }
  },
  methods: {
    helpers() {
      return helpers
    },
    //
    redirectToCard({item}){
      this.$router.push({name:"OrderCard",params:{code:this.helpers().encrypt(item.id)}})
    },
  }
}
</script>

<style scoped>

</style>
