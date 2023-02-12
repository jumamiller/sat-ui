<template>
  <v-card>
    <v-card-title>Fleet Driver Details</v-card-title>
    <v-card-text>
     <v-row v-if="driver">
       <v-col cols="12" md="6">Joined On: {{helpers().formatDate(driver.created_at)}}</v-col>
       <v-col cols="12" md="6">Full Name: {{driver.user.first_name}} {{driver.user.last_name}}</v-col>
       <v-col cols="12" md="6">Driver License: {{driver.license_number}}</v-col>
       <v-col cols="12" md="6">License Expiry: {{helpers().formatDate(driver.expiration_date)}}</v-col>
       <v-col cols="12" md="6">License Status: {{(driver.status)}}</v-col>
     </v-row>
      <v-card-text v-else>No Driver Details Found</v-card-text>
    </v-card-text>
  </v-card>
</template>

<script>
import helpers from "../../../../shared/utilities/helpers";

export default {
  name: "FleetDriver",
  methods: {
    helpers() {
      return helpers
    }
  },
  props:{
    driver:{}
  },
  data: ()=>({
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
        text: 'Fleet No.',
        align: '',
        sortable: true,
        value: 'fleet'
      },
      {
        text: 'License Number',
        align: '',
        sortable: true,
        value: 'license_number'
      },
      {
        text: 'License Expiry',
        align: '',
        sortable: true,
        value: 'expiration_date'
      },
      {
        text: 'Status',
        align: '',
        sortable: true,
        value: 'status'
      },
    ],
  })
}
</script>

<style scoped>

</style>
