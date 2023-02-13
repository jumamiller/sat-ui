<template>
  <v-container>
    <v-card>
      <v-card-title>
        <v-btn class="error"><v-icon>mdi-arrow-left</v-icon>Go Back</v-btn>
        <v-spacer/>
        <v-btn class="primary" @click="makeOrder"><v-icon>mdi-send</v-icon>
          {{ isView? 'Save' :'Make An Order' }}</v-btn>
      </v-card-title>
      <v-divider/>
      <v-card-text>
        <v-card-subtitle>Make an Order on Behalf of the customer(Demo Purpose)</v-card-subtitle>
        <v-form v-model="isValid" ref="FleetForm">
          <v-row>
            <v-col cols="12" sm="6" md="6">
              <v-select
                  label="Customer*"
                  v-model="formData.customer_id"
                  prepend-icon="mdi-mailbox"
                  dense
                  required
                  @copy.prevent
                  @paste.prevent
                  :rules="[rules.required]"
                  :items="customers"
                  :item-text="item=>item.user.first_name+' '+item.user.last_name"
                  :item-value="item=>item.id"
              ></v-select>
            </v-col>
<!--            <v-col cols="12" sm="6" md="6">-->
<!--              <v-select-->
<!--                  label="Vehicle"-->
<!--                  v-model="formData.fleet_id"-->
<!--                  prepend-icon="mdi-mailbox"-->
<!--                  dense-->
<!--                  required-->
<!--                  :items="fleet"-->
<!--                  :item-text="item=>item.registration_number"-->
<!--                  :item-value="item=>item.id"-->
<!--              ></v-select>-->
<!--            </v-col>-->

            <v-col cols="12" sm="6" md="6" class="mt-n3">
              <v-text-field
                  label="Order Total Amount (Assume customer had selected items)*"
                  required
                  prepend-icon="mdi-currency-usd"
                  :rules="[rules.required]"
                  v-model="formData.total_price"
              ></v-text-field>
            </v-col>

<!--            <v-col cols="12" sm="6" md="6">-->
<!--              <v-select-->
<!--                  label="Status"-->
<!--                  v-model="formData.status"-->
<!--                  prepend-icon="mdi-state-machine"-->
<!--                  dense-->
<!--                  readonly-->
<!--                  :items="statuses"-->
<!--                  :item-text="item=>item.name"-->
<!--                  :item-value="item=>item.value"-->
<!--              ></v-select>-->
<!--            </v-col>-->

          </v-row>
        </v-form>
      </v-card-text>
      <!--fleet order and driver-->
      <div v-if="isView">
        <v-divider/>
        <OrderTab :order="order" />
      </div>
      <!--fleet order and driver-->
    </v-card>
  </v-container>
</template>

<script>

import helpers from "../../../../shared/utilities/helpers";
import OrderTab from "@/packages/Order/components/OrderTab.vue";

export default {
  name: "FleetCard",
  components: {
    OrderTab,
  },
  beforeRouteEnter(to,from,next){
    next(v=>{
      if (to.params.code) {
        v.$store.dispatch('OrderManagement/getOrder',helpers.decrypt(to.params.code))
      }
      v.$store.dispatch('UserManagement/getCustomers')
      v.$store.dispatch('FleetManagement/getFleet')
    })
  },
  data: ()=>({
    isView:false,
    menu: false,
    submitting:false,
    isValid: false,
    isImageSaved: false,
    addAddress:false,
    //
    dialog: false,
    formData: {
      customer_id:"",
      fleet_id:"",
      total_price:"",
      status:"PENDING"
    },
    rules: {
      required: value => !!value || 'Required!',
    },
    statuses:[
      {
        name:"Pending",
        value:"PENDING"
      },
      {
        name:"Loading",
        value:"LOADING"
      },
      {
        name:"Dispatched",
        value:"DISPATCHED"
      },
      {
        name:"Delivered",
        value:"DELIVERED"
      },
    ],
  }),
  mounted() {
    if (this.$route.params.code) {
      this.isView=true
    }
  },
  computed:{
    fleet(){
      return this.$store.getters['FleetManagement/FleetGetter']('fleet')
          .filter(el=>el.status==='AVAILABLE')
    },
    customers(){
      return this.$store.getters['UserManagement/UserGetter']('customers')
    },
    order(){
      return this.$store.getters['OrderManagement/OrderGetter']('order')
    }
  },
  methods: {
    //
    makeOrder() {
      if (!this.isValid) {
        this.$refs.FleetForm.validate()
      }
      else{
        this.$store.dispatch('OrderManagement/makeAnOrder', { ...this.formData});
        this.dialog=false
      }
    },
    closeAddressDialog(val){
      this.addAddress=val
    }
  },
  watch: {
    order: function  (newValue){
      this.formData = newValue
    }
  }
}
</script>

<style scoped>

</style>
