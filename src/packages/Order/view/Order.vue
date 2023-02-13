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
            <span><v-icon size="medium" :color="item.status === 'DELIVERED' ? 'success' : 'error'">mdi-circle-double</v-icon>
              {{item.status}}
            </span>
          </template>
          <!--END status-->
          <!--BEGIN allocate-->
          <template v-slot:item.allocate="item">
            <v-btn v-if="item.item.fleet==null" @click="openDialog(item)" small depressed color="primary"><v-icon small>mdi-circle-edit-outline</v-icon>Allocate</v-btn>
          </template>
          <!--END allocate-->
          <!--BEGIN action-->
          <template v-slot:item.action="item">
            <v-btn @click="redirectToCard(item)" small depressed rounded color="success"><v-icon>mdi-eye</v-icon>view</v-btn>
          </template>
          <!--END action-->
        </v-data-table>
      </v-card-text>
    </v-card>
    <!--Allocate vehicle dialog-->
    <v-dialog
        transition="dialog-bottom-transition"
        max-width="600"
        v-model="dialog"
    >
      <template>
        <v-card>
          <v-toolbar color="primary" dark>Allocate Vehicle</v-toolbar>
          <v-card-text>
            <v-alert>To allocate vehicle, they have to registered as on the fleets management section.</v-alert>
            <v-divider class="mt-3"/>
            <div>
              <v-form v-model="isValid" ref="CustomerForm">
                <v-select
                    label="Select Vehicle*"
                    v-model="formData.fleet_id"
                    prepend-icon="mdi-account"
                    dense
                    required
                    @copy.prevent
                    @paste.prevent
                    :rules="[rules.required]"
                    :items="fleet"
                    :item-text="item=>item.registration_number"
                    :item-value="item=>item.id"
                ></v-select>
              </v-form>
            </div>
          </v-card-text>
          <v-card-actions class="justify-end">
            <v-btn color="error" text @click="dialog = false">Close</v-btn>
            <v-btn color="success" small @click="updateOrder">Submit</v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
    <!--add allocate vehicle dialog-->
  </v-container>
</template>

<script>
import helpers from "../../../../shared/utilities/helpers";
export default {
  name: "Order",
  beforeRouteEnter(to,from,next){
    next(v=>{
      v.$store.dispatch('OrderManagement/getOrders');
      v.$store.dispatch('FleetManagement/getFleet');
    })
  },
  data: () => ({
    dialog: false,
    isValid: false,
    formData:{
      id:"",
      fleet_id:""
    },
    selectedOrder:{},
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
        text: 'Allocate Vehicle',
        align: '',
        sortable: true,
        value: 'allocate'
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
    },
    fleet(){
      return this.$store.getters['FleetManagement/FleetGetter']("fleet")
    },
  },
  methods: {
    helpers() {
      return helpers
    },
    //
    redirectToCard({item}){
      this.$router.push({name:"OrderCard",params:{code:this.helpers().encrypt(item.id)}})
    },
    updateOrder(){
      this.dialog=true
      this.formData.id=this.selectedOrder.id
      if (this.formData.fleet_id) {
        this.$store.dispatch('OrderManagement/updateOrder', { ...this.formData});
      }
    },
    openDialog({item}){
      this.selectedOrder=item;
      this.dialog=true
    },
  }
}
</script>

<style scoped>

</style>
