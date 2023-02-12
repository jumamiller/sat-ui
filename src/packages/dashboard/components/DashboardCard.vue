<template>
  <v-container fluid>
    <v-card flat>
      <v-card-text>
        <v-row>
          <v-col cols="12" md="4" sm="6">
            <v-card>
              <v-card-text>
                <div>
                  <h3>Assets</h3>
                </div>
                <p class="pt-5">{{ assets }}</p>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" md="4" sm="6">
            <v-card>
              <v-card-text>
                <div>
                  <h3>Maintenance</h3>
                </div>
                <p class="pt-5">{{assets}}</p>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" md="4" sm="6">
            <v-card>
              <v-card-text>
                <div>
                  <h3>Disposals</h3>
                </div>
                <p class="pt-5">{{assets}}</p>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="4" sm="6">
            <v-card>
              <v-card-text>
                <div>
                  <h3>Due Maintenance</h3>
                </div>
                <p class="pt-5">{{ assets }}</p>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" md="4" sm="6">
            <v-card>
              <v-card-text>
                <div>
                  <h3>Pending Checkouts</h3>
                </div>
                <p class="pt-5">{{assets}}</p>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" md="4" sm="6">
            <v-card>
              <v-card-text>
                <div>
                  <h3>Pending Handovers</h3>
                </div>
                <p class="pt-5">{{assets}}</p>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "DashboardCard",
  beforeRouteEnter(to,from,next){
    next(v=>{
      v.$store.dispatch('FixedAsset/getAssets');
    })
  },
  computed:{
    assets(){
      return this.$store.getters['FixedAsset/FixedAssetGetter']("assets").length
    },
  }
}
</script>
