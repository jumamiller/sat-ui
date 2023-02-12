<template>
  <v-container>
    <v-card>
      <v-card-title>
        <v-btn class="error"><v-icon>mdi-arrow-left</v-icon>Go Back</v-btn>
        <v-spacer/>
        <v-btn class="primary" @click="save"><v-icon>mdi-send</v-icon>
          {{ isView? 'Save' :'Submit' }}</v-btn>
      </v-card-title>
      <v-divider/>
      <v-card-text>
        <v-form v-model="isValid" ref="FleetForm">
          <v-row>
            <v-col cols="12" sm="6" md="6">
              <v-text-field
                  label="Name*"
                  required
                  :rules="[rules.required]"
                  v-model="formData.name"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-text-field
                  label="Model"
                  required
                  v-model="formData.model"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-text-field
                  label="Registration Number*"
                  required
                  :rules="[rules.required]"
                  v-model="formData.registration_number"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-text-field
                  label="Manufacturer*"
                  required
                  :rules="[rules.required]"
                  v-model="formData.manufacturer"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6" class="mt-n2">
              <v-text-field
                  label="Year of Manufacture*"
                  required
                  :rules="[rules.required]"
                  v-model="formData.year"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6" class="mt-n2">
              <v-text-field
                  label="Capacity*"
                  required
                  :rules="[rules.required]"
                  v-model="formData.capacity"
              ></v-text-field>
            </v-col>

            <v-col cols="12" sm="6" md="6">
              <v-select
                  label="Status*"
                  v-model="formData.status"
                  prepend-icon="mdi-mailbox"
                  dense
                  required
                  @copy.prevent
                  @paste.prevent
                  :rules="[rules.required]"
                  :items="statuses"
                  :item-text="item=>item.name"
                  :item-value="item=>item.value"
              ></v-select>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-select
                  label="Driver"
                  v-model="formData.driver_id"
                  prepend-icon="mdi-mailbox"
                  dense
                  required
                  :items="drivers"
                  :rules="[rules.required]"
                  :item-text="item=>item.user.first_name+' '+item.user.last_name"
                  :item-value="item=>item.id"
              ></v-select>
            </v-col>

          </v-row>
        </v-form>
      </v-card-text>
      <!--fleet order and driver-->
      <div v-if="isView">
        <v-divider/>
        <FleetTab :fleet="fleet" />
      </div>
      <!--fleet order and driver-->
    </v-card>
  </v-container>
</template>

<script>

import helpers from "../../../../shared/utilities/helpers";
import FleetTab from "@/packages/Fleet/components/FleetTab.vue";

export default {
  name: "FleetCard",
  components: {
    FleetTab,
  },
  beforeRouteEnter(to,from,next){
    next(v=>{
      if (to.params.code) {
        v.$store.dispatch('FleetManagement/getFleetDetails',helpers.decrypt(to.params.code))
      }
      v.$store.dispatch('FleetManagement/getDrivers')
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
      driver_id:"",
      name:"",
      registration_number:"",
      model:"",
      manufacturer:"",
      year:"",
      capacity:"",
      status:""
    },
    rules: {
      required: value => !!value || 'Required!',
    },
    statuses:[
      {
        name:"Available",
        value:"AVAILABLE"
      },
      {
        name:"Loading",
        value:"LOADING"
      },
      {
        name:"On Transit",
        value:"oN_TRANSIT"
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
      return this.$store.getters['FleetManagement/FleetGetter']('fleetDetails')
    },
    drivers(){
      return this.$store.getters['FleetManagement/FleetGetter']('drivers')
    }
  },
  methods: {
    //
    save() {
      if (!this.isValid) {
        this.$refs.FleetForm.validate()
      }
      else{
        this.$store.dispatch('FleetManagement/addFleet', { ...this.formData});
        this.dialog=false
      }
    },
    closeAddressDialog(val){
      this.addAddress=val
    }
  },
  watch: {
    fleet: function  (newValue){
      this.formData = newValue
    }
  }
}
</script>

<style scoped>

</style>
