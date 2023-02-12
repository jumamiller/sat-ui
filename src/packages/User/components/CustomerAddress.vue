<template>
  <v-card>
    <v-card-title>Customer Address</v-card-title>
    <v-card-text>
      <v-data-table
          :headers="headers"
          :items="addresses"
      >
        <template v-slot:item.id="{index}">
          <span>{{index+1}}</span>
        </template>
        <!--Created On-->
        <template v-slot:item.created_at="{item}">
          <span>{{ helpers().formatDate(item.created_at) }} </span>
        </template>
        <!--Created On-->
        <template v-slot:item.status="{item}">
            <span><v-icon size="medium" :color="item.status === 'ACTIVE' ? 'success' : 'error'">mdi-circle-double</v-icon>
              {{item.status}}
            </span>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
import helpers from "../../../../shared/utilities/helpers";

export default {
  name: "CustomerAddress",
  methods: {
    helpers() {
      return helpers
    }
  },
  props:{
    addresses:{
      type: Array
    }
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
        text: 'Created On',
        align: '',
        sortable: true,
        value: 'created_at'
      },
      {
        text: 'Country',
        align: '',
        sortable: true,
        value: 'country'
      },
      {
        text: 'County',
        align: '',
        sortable: true,
        value: 'county'
      },
      // {
      //   text: 'Sub County',
      //   align: '',
      //   sortable: true,
      //   value: 'sub_county'
      // },
      {
        text: 'Location',
        align: '',
        sortable: true,
        value: 'location'
      },
      // {
      //   text: 'Sub Location',
      //   align: '',
      //   sortable: true,
      //   value: 'sub_location'
      // },
      {
        text: 'Village',
        align: '',
        sortable: true,
        value: 'village'
      },
      // {
      //   text: 'Landmark',
      //   align: '',
      //   sortable: true,
      //   value: 'landmark'
      // },
      // {
      //   text: 'Building',
      //   align: '',
      //   sortable: true,
      //   value: 'building'
      // },
      {
        text: 'Status',
        align: '',
        sortable: true,
        value: 'status'
      },
    ]
  })
}
</script>

<style scoped>

</style>
