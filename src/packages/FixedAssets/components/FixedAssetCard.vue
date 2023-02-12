<template>
  <v-container>
    <v-card>
      <v-card-title>
        <v-btn class="error"><v-icon>mdi-arrow-left</v-icon>Go Back</v-btn>
        <v-spacer/>
        <v-btn class="primary" @click="save"><v-icon>mdi-send</v-icon>Submit</v-btn>
      </v-card-title>
      <v-card-text>
        <v-form v-model="isValid" ref="AssetForm">
          <v-row>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                  label="Pre-Tag*"
                  required
                  :rules="[rules.required]"
                  v-model="formData.pretag"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                  label="Serial Number*"
                  required
                  :rules="[rules.required]"
                  v-model="formData.serial_no"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                  label="Asset Name*"
                  required
                  :rules="[rules.required]"
                  v-model="formData.name"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-select
                  label="Location*"
                  v-model="formData.location_id"
                  prepend-icon="mdi-map-marker"
                  dense
                  required
                  @copy.prevent
                  @paste.prevent
                  :rules="[rules.required]"
                  :items="locations"
                  :item-text="item=>item.name"
                  :item-value="item=>item.id"
              ></v-select>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-select
                  label="Supplier*"
                  required
                  :rules="[rules.required]"
                  v-model="formData.supplier_id"
                  dense
                  prepend-icon="mdi-account-check"
                  @copy.prevent
                  @paste.prevent
                  :items="suppliers"
                  :item-text="item=>item.name"
                  :item-value="item=>item.id"
              ></v-select>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-select
                  label="Asset Class*"
                  required
                  :rules="[rules.required]"
                  v-model="formData.asset_class_id"
                  prepend-icon="mdi-google-classroom"
                  dense
                  @copy.prevent
                  @paste.prevent
                  :items="classes"
                  :item-text="item=>item.name"
                  :item-value="item=>item.id"
              ></v-select>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-select
                  label="Sub Class*"
                  required
                  :rules="[rules.required]"
                  v-model="formData.sub_class_id"
                  prepend-icon="mdi-subdirectory-arrow-left"
                  dense
                  @copy.prevent
                  @paste.prevent
                  :items="subClasses"
                  :item-text="item=>item.name"
                  :item-value="item=>item.id"
              ></v-select>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                  label="Asset Section*"
                  required
                  dense
                  :rules="[rules.required]"
                  v-model="formData.section"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                  label="Purchase Date*"
                  type="date"
                  required
                  prepend-icon="mdi-calendar"
                  dense
                  :rules="[rules.required]"
                  v-model="formData.purchase_date"
              />
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                  label="Cost*"
                  type="number"
                  required
                  dense
                  prepend-icon="mdi-currency-usd"
                  :rules="[rules.required]"
                  v-model="formData.cost"
              />
            </v-col>

            <v-col cols="12" sm="6" md="4">
              <v-text-field
                  label="Invoice*"
                  dense
                  required
                  :rules="[rules.required]"
                  v-model="formData.invoice_number"
              />
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                  label="GRN Number*"
                  required
                  dense
                  :rules="[rules.required]"
                  v-model="formData.grn_number"
              />
            </v-col>

            <v-col cols="12" sm="6" md="4">
              <v-text-field
                  label="Country Of Manufacture*"
                  required
                  dense
                  :rules="[rules.required]"
                  v-model="formData.country_of_manufacture"
              />
            </v-col>

            <v-col cols="12" sm="6" md="4">
              <v-text-field
                  label="Brand*"
                  required
                  dense
                  :rules="[rules.required]"
                  v-model="formData.brand_id"
              />
            </v-col>

            <v-col cols="12" sm="6" md="4">
              <v-text-field
                  label="Power Rating(watts)*"
                  required
                  dense
                  :rules="[rules.required]"
                  v-model="formData.watts"
              />
            </v-col>

            <v-col cols="12" sm="6" md="4">
              <v-text-field
                  label="Department*"
                  required
                  dense
                  :rules="[rules.required]"
                  v-model="formData.department"
              />
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-select
                  label="Condition*"
                  required
                  dense
                  @copy.prevent
                  @paste.prevent
                  :items="conditions"
                  :item-text="item=>item.name"
                  :item-value="item=>item.id"
                  :rules="[rules.required]"
                  v-model="formData.condition_id"
              />
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-file-input
                  label="Upload Files"
                  dense
                  prepend-icon="mdi-camera"
              ></v-file-input>
            </v-col>

            <v-col cols="12">
              <span>Description*</span>
              <VueEditor :rules="[rules.required]" v-model="formData.description"/>
            </v-col>

            <v-col cols="12" md="4">
              <v-checkbox label="REQUIRES THIRD-PARTY APPROVAL"/>
            </v-col>
            <v-col cols="12" md="4">
              <v-checkbox label="NEEDS MAINTENANCE"/>
            </v-col>
            <v-col cols="12" md="4">
              <v-checkbox label="MARK AS READY TO TRANSFER"/>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
    <v-divider/>
  </v-container>
</template>

<script>
import helpers from "../../../../shared/utilities/helpers";
import {VueEditor} from "vue2-editor";

export default {
  name: "FixedAssetCard",
  components: { VueEditor},
  beforeRouteEnter(to,from,next){
    next(v=>{
      //is view
      to.params.code ?
          v.$store.dispatch("FixedAsset/getAsset",to.params)
          : v.$store.dispatch('FixedAsset/getSuppliers');
      v.$store.dispatch('FixedAsset/getClasses');
      v.$store.dispatch('FixedAsset/getSubClasses');
      v.$store.dispatch('FixedAsset/getLocations');
      v.$store.dispatch('FixedAsset/getConditions');
    })
  },
  data: () => ({
    isView:false,
    menu: false,
    submitting:false,
    isValid: false,
    isImageSaved: false,
    imageError:"",
    dialog: false,
    //
    formData: {
      pretag: "",
      name: "",
      brand_id:"",
      serial_no: "",
      supplier_id: "",
      location_id: "",
      section: "",
      asset_class_id: "",
      sub_class_id: "",
      condition_id: "",
      cost: "",
      invoice_number: "",
      grn_number: "",
      department: "",
      asset_photo: "",
      description: "",
      purchase_date: "",
      watts: "",
      country_of_manufacture:''
    },
    rules: {
      required: value => !!value || 'Required!',
    },
  }),
  computed:{
    asset(){
      return this.$store.getters['FixedAsset/FixedAssetGetter']("asset")
    },
    //get suppliers
    suppliers(){
      return this.$store.getters['FixedAsset/FixedAssetGetter']("suppliers")
    },
    //
    classes() {
      return this.$store.getters['FixedAsset/FixedAssetGetter']('classes')
    },
    //sub classes
    subClasses(){
      return this.$store.getters['FixedAsset/FixedAssetGetter']('subClasses')
    },
    //get locations
    locations(){
      return this.$store.getters['FixedAsset/FixedAssetGetter']('locations')
    },
    //conditions
    conditions(){
      return this.$store.getters['FixedAsset/FixedAssetGetter']('conditions')
    }

  },
  methods: {
    //
    save() {
      this.formData.bio=helpers.removeTags(this.formData.description);
      if (!this.isValid) {
        this.$refs.AssetForm.validate()
      }
      else{
        this.$store.dispatch('FixedAsset/createAsset', { ...this.formData});
      }
    },
  },
  watch: {
    asset: function  (newValue){
      this.formData = newValue
      this.formData.condition_id=newValue.condition.id
    }
  }
}
</script>

<style scoped>

</style>
