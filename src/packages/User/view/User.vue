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
          <!--full name-->
          <template v-slot:item.name="{item}">
            <span>{{item.first_name}} {{item.middle_name}} {{item.last_name}}</span>
          </template>
          <!--full name-->
          <!--Begin roles-->
          <template v-slot:item.roles="{item}">
            <span><v-icon size="medium" :color="item.roles[0].name === 'ADMIN' ? 'success' : 'error'">mdi-circle-double</v-icon>
              {{item.roles[0].name}}
            </span>
          </template>
          <!--END Roles-->
          <!--Begin roles-->
          <template v-slot:item.status="{item}">
            <span><v-icon size="medium" :color="item.status === 'ACTIVE' ? 'success' : 'error'">mdi-circle-double</v-icon>
              {{item.status}}
            </span>
          </template>
          <!--END Roles-->
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
        value: 'name'
      },
      {
        text: 'Username',
        align: '',
        sortable: true,
        value: 'username'
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
        text: 'Role',
        align: '',
        sortable: true,
        value: 'roles'
      },
      {
        text: 'Status',
        align: '',
        sortable: true,
        value: 'status'
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
