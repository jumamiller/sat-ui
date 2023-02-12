<template>
  <v-container fluid>
    <v-card>
      <v-card-title>
        <v-btn class="error"><v-icon>mdi-arrow-left</v-icon>Go Back</v-btn>
        <v-spacer/>
        <v-btn class="primary" @click="dialog=true"><v-icon>mdi-plus</v-icon>Add New</v-btn>
      </v-card-title>
      <v-spacer/>
      <v-divider/>
      <v-card-text>
        <v-data-table
            :headers="headers"
            :items="customers"
        >
          <template v-slot:item.id="{index}">
            <span>{{index+1}}</span>
          </template>
          <!--Created On-->
          <template v-slot:item.created_on="{item}">
            <span>{{ helpers().formatDate(item.created_at) }} </span>
          </template>
          <!--Created On-->
          <!--full name-->
          <template v-slot:item.name="{item}">
            <span>{{item.user.first_name}} {{item.user.middle_name}} {{item.user.last_name}}</span>
          </template>
          <!--full name-->
          <!--EMail-->
          <template v-slot:item.email="{item}">
            <span>{{item.user.email}} </span>
          </template>
          <!--email-->
          <!--phone_number-->
          <template v-slot:item.phone_number="{item}">
            <span>{{item.user.phone_number}} </span>
          </template>
          <!--phone_number-->
          <!--nationality-->
          <template v-slot:item.nationality="{item}">
            <span>{{item.user.nationality}} </span>
          </template>
          <!--nationality-->
          <!--document_type-->
          <template v-slot:item.document_type="{item}">
            <span>{{item.user.document_type}} </span>
          </template>
          <!--document_type-->
          <!--document_number-->
          <template v-slot:item.document_number="{item}">
            <span>{{item.user.document_number}} </span>
          </template>
          <!--document_number-->
          <!--Begin roles-->
          <template v-slot:item.status="{item}">
            <span><v-icon size="medium" :color="item.user.status === 'ACTIVE' ? 'success' : 'error'">mdi-circle-double</v-icon>
              {{item.user.status}}
            </span>
          </template>
          <!--END Roles-->
          <!--BEGIN action-->
          <template v-slot:item.action="item">
            <v-btn @click="redirectToCard(item)" small depressed rounded color="success"><v-icon>mdi-eye</v-icon>view</v-btn>
          </template>
          <!--END action-->
        </v-data-table>
      </v-card-text>
    </v-card>
    <!--add customer dialog-->
    <v-dialog
        transition="dialog-bottom-transition"
        max-width="600"
        v-model="dialog"
    >
      <template>
        <v-card>
          <v-toolbar color="primary" dark>Add New Customer</v-toolbar>
          <v-card-text>
            <v-alert>To add new customer, they have to registered as users. If you dont see the customer to add, register them first.</v-alert>
            <v-divider class="mt-3"/>
           <div>
            <v-form v-model="isValid" ref="CustomerForm">
              <v-select
                  label="Select User To Add*"
                  v-model="formData.user_id"
                  prepend-icon="mdi-account"
                  dense
                  required
                  @copy.prevent
                  @paste.prevent
                  :rules="[rules.required]"
                  :items="users"
                  :item-text="item=>item.first_name"
                  :item-value="item=>item.id"
              ></v-select>
            </v-form>
           </div>
          </v-card-text>
          <v-card-actions class="justify-end">
            <v-btn color="error" text @click="dialog = false">Close</v-btn>
            <v-btn color="success" small @click="saveCustomer">Submit</v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
    <!--add customer dialog-->
  </v-container>
</template>

<script>
import { VueEditor } from 'vue2-editor'
import helpers from "../../../../shared/utilities/helpers";
export default {
  name: "Customers",
  // eslint-disable-next-line vue/no-unused-components
  components: { VueEditor },
  beforeRouteEnter(to,from,next){
    next(v=>{
      v.$store.dispatch('UserManagement/getCustomers');
      v.$store.dispatch('UserManagement/users');
    })
  },
  data: () => ({
    dialog: false,
    isValid: false,
    formData:{
      user_id:"",
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
        text: 'Joined On',
        align: '',
        sortable: true,
        value: 'created_on'
      },
      {
        text: 'Full Name',
        align: '',
        sortable: true,
        value: 'name'
      },
      {
        text: 'Email',
        align: '',
        sortable: true,
        value: 'email'
      },
      {
        text: 'Mobile',
        align: '',
        sortable: true,
        value: 'phone_number'
      },
      {
        text: 'Nationality',
        align: '',
        sortable: true,
        value: 'nationality'
      },
      {
        text: 'Document Type',
        align: '',
        sortable: true,
        value: 'document_type'
      },
      {
        text: 'Document No',
        align: '',
        sortable: true,
        value: 'document_number'
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
    customers(){
      return this.$store.getters['UserManagement/UserGetter']("customers")
    },
    users(){
      return this.$store.getters['UserManagement/UserGetter']("users")
          .filter(el=>el.roles[0].name==='CLIENT' && el.customer===null)
    }
  },
  methods: {
    helpers() {
      return helpers
    },
    redirectToCard({item}){
      this.$router.push({name:'UserCard',params:{code:helpers.encrypt(item.id)}})
    },

    //
    saveCustomer() {
      if (!this.isValid) {
        this.$refs.CustomerForm.validate()
      }
      else{
        //confirm
        this.$confirm.show({
          title: "Are you Sure?",
          text: `You're about to add the user as customer`,
          acceptLabel: "Yes, I'm sure",
          onConfirm: ()=>{
            this.$store.dispatch('UserManagement/addCustomer', { ...this.formData});
            this.dialog=false
          },
        })
      }
    },
  }
}
</script>

<style scoped>

</style>
