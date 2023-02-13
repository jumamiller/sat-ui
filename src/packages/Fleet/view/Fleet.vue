<template>
  <v-container fluid>
    <v-card>
      <v-card-title>
        <v-btn  @click="$router.back()" class="error"><v-icon>mdi-arrow-left</v-icon>Go Back</v-btn>
        <v-spacer/>
        <v-btn @click="$router.push({name:'FleetCard'})" class="primary"><v-icon>mdi-plus</v-icon>Add New</v-btn>
      </v-card-title>
      <v-spacer/>
      <v-divider/>
      <v-card-text>
        <v-data-table
            :headers="headers"
            :items="fleet"
        >
          <template v-slot:item.id="{index}">
            <span>{{index+1}}</span>
          </template>
          <!--Created On-->
          <template v-slot:item.created_at="{item}">
            <span>{{ helpers().formatDate(item.created_at) }} </span>
          </template>
          <!--Created On-->
          <!--Begin roles-->
          <template v-slot:item.driver="{item}">
            <span>
              {{item.driver.user.first_name|| ''}} {{item.driver.user.last_name|| 'N/A'}}
            </span>
          </template>
          <!--END Roles-->
          <!--Begin status-->
          <template v-slot:item.status="{item}">
            <span><v-icon size="medium" :color="item.status === 'IN_TRANSIT' ? 'success' : 'error'">mdi-circle-double</v-icon>
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
import { VueEditor } from 'vue2-editor'
import helpers from "../../../../shared/utilities/helpers";
export default {
  name: "Fleet",
  // eslint-disable-next-line vue/no-unused-components
  components: { VueEditor },
  beforeRouteEnter(to,from,next){
    next(v=>{
      v.$store.dispatch('FleetManagement/getFleet');
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
        text: 'Name',
        align: '',
        sortable: true,
        value: 'name'
      },
      {
        text: 'Registration Number',
        align: '',
        sortable: true,
        value: 'registration_number'
      },
      {
        text: 'Model',
        align: '',
        sortable: true,
        value: 'model'
      },
      {
        text: 'Manufacturer',
        align: '',
        sortable: true,
        value: 'manufacturer'
      },
      {
        text: 'Year',
        align: '',
        sortable: true,
        value: 'year'
      },
      {
        text: 'Capacity',
        align: '',
        sortable: true,
        value: 'capacity'
      },
      {
        text: 'Status',
        align: '',
        sortable: true,
        value: 'status'
      },
      {
        text: 'Driver',
        align: '',
        sortable: true,
        value: 'driver'
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
    fleet(){
      return this.$store.getters['FleetManagement/FleetGetter']("fleet")
    }
  },
  methods: {
    helpers() {
      return helpers
    },
    //
    redirectToCard({item}){
      this.$router.push({name:"FleetCard",params:{code:this.helpers().encrypt(item.id)}})
    },
  }
}
</script>

<style scoped>

</style>
