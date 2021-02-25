<template>
  <div class="athlete-page mt-4">
    <button class="btn btn-primary mb-3" @click="$router.go(-1)">
      Go Back
    </button>
    <div class="row">
      <div class="col-12">
        <div>
          <div class="card mb-3">
            <div class="card-header">
              <h1 class="text-primary font-weight-bold">
                {{ athlete.firstName }} {{ athlete.lastName }}
              </h1>
            </div>
            <div class="row">
              <!-- LEFT-HAND SIDE -->
              <div class="col-md-2">
                <div class="card-body">
                  <img
                    class="img-fluid img-thumbnail mb-2"
                    :src="athlete.avatar"
                  />
                  <p class="mb-1">Gender: {{ athlete.gender }}</p>
                  <p class="mb-1">
                    DOB: {{ athlete.dob | birthDateFilter }} ({{
                      currentAge(athlete.dob)
                    }})
                  </p>
                  <p class="mb-1">Squad: {{ athlete.squad }}</p>
                  <p class="mb-1">Weight: {{ athlete.weight }} Kg</p>
                </div>
              </div>

              <!-- RIGHT-HAND SIDE -->
              <div class="col-md-10">
                <div class="card-body">
                  <!-- Week's Card -->
                  <div class="card">
                    <div class="card-header">
                      <h3 class="text-secondary">This Week's Wellness</h3>
                    </div>
                    <div class="card-body">
                      <WellnessGaugeChart :athleteId="this.$route.params.id" />
                    </div>
                  </div>

                  <!-- Season's Card -->
                  <div class="card mt-3">
                    <div class="card-header">
                      <h3 class="text-secondary">This Season's Wellness</h3>
                    </div>
                    <div class="card-body">
                      <WellnessLineChart :athleteId="this.$route.params.id" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import WellnessGaugeChart from "../../components/Charts/WellnessGaugeChart";
import WellnessLineChart from "../../components/Charts/WellnessLineChart";
import { GET_ATHLETE_BY_ID } from "../../gql";
import DateFilterMixin from "../../mixins/DateFilter";

export default {
  components: { WellnessGaugeChart, WellnessLineChart },
  mixins: [DateFilterMixin],
  data: () => ({
    athlete: {},
  }),
  methods: {
    async getAthlete() {
      let { data } = await this.$apollo.query({
        query: GET_ATHLETE_BY_ID,
        variables: { id: this.$route.params.id },
      });
      this.athlete = data.getAthleteById;
    },

    currentAge(val) {
      return moment(new Date()).diff(val, "years");
    },
  },
  mounted() {
    this.getAthlete();
  },
};
</script>

<style lang="scss" scoped>
.post-content {
  overflow: auto !important;
}
</style>