<template>
  <v-container>
    <v-card>
      <v-card-title>
        <v-btn class="error"><v-icon>mdi-arrow-left</v-icon>Go Back</v-btn>
        <v-spacer/>
        <v-btn class="primary"><v-icon>mdi-send</v-icon>Submit</v-btn>
      </v-card-title>
      <v-card-text>

      </v-card-text>
    </v-card>
    <v-divider/>
  </v-container>
</template>

<script>
export default {
  name: "FixedAssetCardInfo",
  beforeRouteEnter(to,from,next){
    next(v=>{
      v.$store.dispatch("FixedAsset/getAsset",to.params)
    })
  },
}
</script>

<style scoped>

</style>
