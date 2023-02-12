<template>
  <v-container fluid>
    <v-card>
      <v-card-title>
        <v-btn class="error"><v-icon>mdi-arrow-left</v-icon>Go Back</v-btn>
        <v-spacer/>
        <v-btn @click="redirectToCard()" class="primary"><v-icon>mdi-plus</v-icon>Add New</v-btn>
      </v-card-title>
      <v-spacer/>
      <v-divider/>
      <v-card-text>
        <v-data-table
            :headers="headers"
            :items="users"
        >
          <template v-slot:item.id="{index}">
            <span>{{index+1}}</span>
          </template>
          <!--start name-->
          <template v-slot:item.user="{item}">
            <span>{{item.user.first_name || 'N/A'}} {{item.user.last_name}}</span>
          </template>
          <!--end name-->
          <!--start username-->
          <template v-slot:item.username="{item}">
            <span>{{item.user.username || 'N/A'}}</span>
          </template>
          <!--end username-->
          <!--start assignee-->
          <template v-slot:item.created_by="{item}">
            <span>{{item.created_by.username}}</span>
          </template>
          <!--end assigned_to-->
          <!--start status-->
          <template v-slot:item.status="{item}">
            <v-btn elevation="0" x-small color="success">{{item.status===0? 'Pending': item.status===1 ? 'Active': 'Assigned' || 'N/A'}}</v-btn>
          </template>
          <!--end status-->
          <!--start action-->
          <template v-slot:item.action="{item}">
            <v-btn @click="redirectToCardInfo(item.id)" class="success" small><v-icon>mdi-eye</v-icon> view</v-btn>
          </template>
          <!--end action-->
        </v-data-table>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { VueEditor } from 'vue2-editor'
import helpers from "../../../../shared/utilities/helpers";
export default {
  name: "User",
  // eslint-disable-next-line vue/no-unused-components
  components: { VueEditor },
  beforeRouteEnter(to,from,next){
    next(v=>{
      v.$store.dispatch('UserManagement/users');
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
        text: 'Full Name',
        align: '',
        sortable: true,
        value: 'user'
      },
      {
        text: 'Username',
        align: '',
        sortable: true,
        value: 'username'
      },
      {
        text: 'Created BY',
        align: '',
        sortable: true,
        value: 'created_by'
      },
      {
        text: 'Staff Number',
        align: '',
        sortable: true,
        value: 'staff_number'
      },
      {
        text: 'ID Number',
        align: '',
        sortable: true,
        value: 'id_number'
      },
      {
        text: 'Mobile Number',
        align: '',
        sortable: true,
        value: 'mobile_number'
      },
      {
        text: 'Email Address',
        align: '',
        sortable: true,
        value: 'email'
      },
      {
        text: 'Department',
        align: '',
        sortable: true,
        value: 'department'
      },
      {
        text: 'Designation',
        align: '',
        sortable: true,
        value: 'designation'
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
    users(){
      return this.$store.getters['UserManagement/UserGetter']("users")
    }
  },
  methods: {
    //
    redirectToCard(){
      this.$router.push({name:"FixedAssetCard"})
    },
    //
    redirectToCardInfo(code){
      this.$router.push({name:"FixedAssetCardInfo",params:{code}})
    },
    //
    save() {
      this.formData.description=helpers.removeTags(this.formData.description);
      if (!this.isValid) {
        this.$refs.publicationForm.validate()
      }
      else{
        this.$store.dispatch('Project/project', { ...this.formData});
        this.dialog=false
      }
    },
  }
}
</script>

<style scoped>

</style>
