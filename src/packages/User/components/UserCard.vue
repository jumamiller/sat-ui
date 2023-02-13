<template>
  <v-container>
    <v-card>
      <v-card-title>
        <v-btn class="error"><v-icon>mdi-arrow-left</v-icon>Go Back</v-btn>
        <v-spacer/>
        <v-btn v-if="isView" class="error" @click="removeCustomer"><v-icon>mdi-delete</v-icon> Remove</v-btn>&nbsp;&nbsp;
        <v-btn v-if="isView" class="success" @click="addAddress=true"><v-icon>mdi-plus</v-icon> Add Address</v-btn>
        &nbsp; &nbsp; &nbsp;
        <v-btn class="primary" @click="save"><v-icon>mdi-send</v-icon>
          {{ isView? 'Save' :'Submit' }}</v-btn>
      </v-card-title>
      <v-divider/>
      <v-card-text>
        <v-form v-model="isValid" ref="UserForm">
          <v-row>
            <v-col cols="12" sm="6" md="6">
              <v-text-field
                  label="First Name*"
                  required
                  :rules="[rules.required]"
                  v-model="formData.first_name"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-text-field
                  label="Middle Name"
                  required
                  v-model="formData.middle_name"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-text-field
                  label="Last Name*"
                  required
                  :rules="[rules.required]"
                  v-model="formData.last_name"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-text-field
                  label="Username*"
                  required
                  :rules="[rules.required]"
                  v-model="formData.username"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6" class="mt-n2">
              <v-text-field
                  label="Phone Number*"
                  required
                  :rules="[rules.required]"
                  v-model="formData.phone_number"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6" class="mt-n2">
              <v-text-field
                  label="Email Address*"
                  required
                  :rules="[rules.required]"
                  v-model="formData.email"
              ></v-text-field>
            </v-col>

            <v-col cols="12" sm="6" md="6">
              <v-select
                  label="Document Type*"
                  v-model="formData.document_type"
                  prepend-icon="mdi-mailbox"
                  dense
                  required
                  @copy.prevent
                  @paste.prevent
                  :rules="[rules.required]"
                  :items="documentTypes"
                  :item-text="item=>item.name"
                  :item-value="item=>item.value"
              ></v-select>
            </v-col>

            <v-col cols="12" sm="6" md="6" class="mt-n2">
              <v-text-field
                  label="Document Number*"
                  required
                  :rules="[rules.required]"
                  v-model="formData.document_number"
              ></v-text-field>
            </v-col>

            <v-col cols="12" sm="6" md="6">
              <v-select
                  label="Nationality*"
                  required
                  :rules="[rules.required]"
                  v-model="formData.nationality"
                  dense
                  prepend-icon="mdi-account-check"
                  @copy.prevent
                  @paste.prevent
                  :items="nationalities"
                  :item-text="item=>item.name"
                  :item-value="item=>item.value"
              ></v-select>
            </v-col>

            <v-col cols="12" sm="6" md="6" class="mt-n2" v-if="!isView">
              <v-text-field
                  prepend-icon="mdi-account-lock"
                  label="Temporary Password*"
                  required
                  :rules="[rules.required]"
                  v-model="formData.password"
              ></v-text-field>
            </v-col>

          </v-row>
        </v-form>
      </v-card-text>
      <!--Address card-->
      <AddressCardDialog :customer="customer" :dialog="addAddress" @CloseAddressDialog="closeAddressDialog"/>
      <!--Address card-->
      <!--customer order and addresses-->
      <div v-if="isView">
        <v-divider/>
        <CustomerTabs :customer="customer" />
      </div>
      <!--customer order and addresses-->
    </v-card>
  </v-container>
</template>

<script>

import helpers from "../../../../shared/utilities/helpers";
import AddressCardDialog from "@/packages/User/components/AddressCardDialog.vue";
import CustomerTabs from "@/packages/User/components/CustomerTabs.vue";

export default {
  name: "UserCard",
  components: {
    CustomerTabs,
    AddressCardDialog
  },
  beforeRouteEnter(to,from,next){
    next(v=>{
      if (to.params.code) {
        v.$store.dispatch('UserManagement/getCustomer',helpers.decrypt(to.params.code))
      }
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
      first_name:"",
      middle_name:"",
      last_name:"",
      username:"",
      document_type:"",
      document_number:"",
      email:"",
      phone_number:"",
      password:"",
      nationality:""
    },
    rules: {
      required: value => !!value || 'Required!',
    },
    documentTypes:[
      {
        name:"National ID",
        value:"NATIONAL_ID"
      },
      {
        name:"Passport",
        value:"PASSPORT"
      },
    ],
    nationalities:[
      {
        name:"Kenya",
        value:"KENYAN"
      },
      {
        name:"Uganda",
        value:"UGANDAN"
      },
      {
        name:"Ethiopia",
        value:"ETHIOPIAN"
      },
    ],
  }),
  mounted() {
    if (this.$route.params.code) {
      this.isView=true
    }
  },
  computed:{
    customer(){
      return this.$store.getters['UserManagement/UserGetter']('customer')
    }
  },
  methods: {
    //
    save() {
      if (!this.isValid) {
        this.$refs.UserForm.validate()
      }
      else{
        this.$store.dispatch('UserManagement/addUser', { ...this.formData});
        this.dialog=false
      }
    },
    removeCustomer(){
      this.$confirm.show({
        title:"Are you Sure?",
        text:"You are about to delete this customer. The process is irreversible!",
        onConfirm: ()=>{
          this.$store.dispatch("UserManagement/removeCustomer",helpers.decrypt(this.$route.params.code))
        }
      })
    },
    closeAddressDialog(val){
      this.addAddress=val
    }
  },
  watch: {
    customer: function  (newValue){
      this.formData = newValue.user
    }
  }
}
</script>

<style scoped>

</style>
