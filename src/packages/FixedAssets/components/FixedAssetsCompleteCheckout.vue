<template>
  <v-container fluid>
    <v-card>
      <v-card-title>
        <v-btn class="error"><v-icon>mdi-arrow-left</v-icon>Go Back</v-btn>
        <v-spacer/>
        <!--        <v-btn @click="redirectToCard()" class="primary"><v-icon>mdi-plus</v-icon>Add New</v-btn>-->
      </v-card-title>
      <v-spacer/>
      <v-divider/>
      <v-card-text>
        <v-data-table
            :headers="headers"
            :items="assets"
        >
          <template v-slot:item.id="{index}">
            <span>{{index+1}}</span>
          </template>
          <!--start barcode-->
          <template v-slot:item.barcode="{item}">
            <span>{{item.barcode || 'N/A'}}</span>
          </template>
          <!--end barcode-->
          <!--start class-->
          <template v-slot:item.asset_class="{item}">
            <span>{{item.asset_class.name || 'N/A'}}</span>
          </template>
          <!--end class-->
          <!--start name-->
          <template v-slot:item.name="{item}">
            <span>{{item.name || 'N/A'}}</span>
          </template>
          <!--end name-->
          <!--start assignee-->
          <template v-slot:item.assigned_to="{item}">
            <span>{{item.assigned_to || 'N/A'}}</span>
          </template>
          <!--end assigned_to-->
          <!--start location-->
          <template v-slot:item.location="{item}">
            <span>{{item.location.name || 'N/A'}}</span>
          </template>
          <!--end location-->
          <!--start condition-->
          <template v-slot:item.condition="{item}">
            <span>{{item.condition.name || 'N/A'}}</span>
          </template>
          <!--end condition-->
          <!--start status-->
          <template v-slot:item.status="{item}">
            <v-btn x-small color="success">{{item.status===0? 'Pending': item.status===1 ? 'Ready To Transfer': 'Assigned' || 'N/A'}}</v-btn>
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
  name: "FixedAssetsCompleteCheckout",
  // eslint-disable-next-line vue/no-unused-components
  components: { VueEditor },
  beforeRouteEnter(to,from,next){
    next(v=>{
      v.$store.dispatch('FixedAsset/getAssetsCompleteCheckout');
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
        text: 'Barcode Number',
        align: '',
        sortable: true,
        value: 'barcode'
      },
      {
        text: 'Class',
        align: '',
        sortable: true,
        value: 'asset_class'
      },
      {
        text: 'Asset Name',
        align: '',
        sortable: true,
        value: 'name'
      },
      {
        text: 'Assigned To',
        align: '',
        sortable: true,
        value: 'assigned_to'
      },
      {
        text: 'Location',
        align: '',
        sortable: true,
        value: 'location'
      },
      {
        text: 'Condition',
        align: '',
        sortable: true,
        value: 'condition'
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
    assets(){
      return this.$store.getters['FixedAsset/FixedAssetGetter']("assetsReadyForTransfer")
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
