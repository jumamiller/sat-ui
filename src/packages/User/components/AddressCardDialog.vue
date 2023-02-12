<template>
  <v-container>
    <v-dialog
        transition="dialog-bottom-transition"
        max-width="600"
        v-model="dialog"
    >
      <template>
        <v-card>
          <v-toolbar color="primary" dark>Add Customer Address</v-toolbar>
          <v-card-text>
            <v-divider class="mt-3"/>
            <div>
              <v-form v-model="isValid" ref="AddressForm">
                <v-row>
                  <v-col cols="12" sm="6" md="6" class="mt-3">
                    <v-select
                        label="Select Country*"
                        v-model="formData.country"
                        dense
                        required
                        @copy.prevent
                        @paste.prevent
                        :rules="[rules.required]"
                        :items="countries"
                        :item-text="item=>item.name"
                        :item-value="item=>item.value"
                    ></v-select>
                  </v-col>

                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                        label="County*"
                        required
                        :rules="[rules.required]"
                        v-model="formData.county"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6" class="mt-n4">
                    <v-text-field
                        label="Sub County*"
                        required
                        v-model="formData.sub_county"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6" class="mt-n4">
                    <v-text-field
                        label="Location*"
                        required
                        :rules="[rules.required]"
                        v-model="formData.location"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6" class="mt-n4">
                    <v-text-field
                        label="Sub Location*"
                        required
                        :rules="[rules.required]"
                        v-model="formData.sub_location"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6" class="mt-n4">
                    <v-text-field
                        label="Village*"
                        required
                        :rules="[rules.required]"
                        v-model="formData.village"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6" class="mt-n4">
                    <v-text-field
                        label="Building*"
                        required
                        :rules="[rules.required]"
                        v-model="formData.building"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6" class="mt-n4">
                    <v-text-field
                        label="Landmark*"
                        required
                        :rules="[rules.required]"
                        v-model="formData.landmark"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="12" class="mt-n4">
                    <v-select
                        label="Address Status*"
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

                </v-row>
              </v-form>
            </div>
          </v-card-text>
          <v-card-actions class="justify-end">
            <v-btn color="error" text @click="closeDialog">Close</v-btn>
            <v-btn color="success" small @click="saveAddress">Submit</v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  name: "AddressCardDialog",
  props: {
    dialog:{
      type: Boolean,
      default:false
    },
    customer: {}
  },
  data: ()=>({
    isValid:false,
    formData: {
      customer_id:'',
      country:"",
      county:"",
      sub_county:"",
      location:"",
      sub_location:"",
      village:"",
      building:"",
      landmark:"",
      status:""
    },
    rules: {
      required: value => !!value || 'Required!',
    },
    countries:[
      {
        name:"Kenya",
        value:"Kenya"
      },
      {
        name:"Uganda",
        value:"Uganda"
      },
      {
        name:"Ethiopia",
        value:"Ethiopia"
      },
    ],
    statuses: [
      {
        name:"Current",
        value:'ACTIVE'
      },
      {
        name:"Inactive",
        value:"INACTIVE"
      }
    ]

  }),
  methods: {
    closeDialog(){
      this.$emit("CloseAddressDialog",false)
    },
    saveAddress() {
      if (!this.isValid) {
        this.$refs.AddressForm.validate()
      }
      else{
        this.formData.customer_id=this.customer.id
        this.$store.dispatch('UserManagement/addCustomerAddress', { ...this.formData});
        this.dialog=false
      }
    },
  }
}
</script>

<style scoped>

</style>
