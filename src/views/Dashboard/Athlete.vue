<template>
  <div class="athlete-page mt-4">
    <button class="btn btn-primary mb-3" @click="$router.go(-1)">
      Go Back
    </button>
    <div class="row">
      <div class="col-12">
        <div>
          <!-- CARD -->
          <div class="card mb-3">
            <!-- Header -->
            <div class="card-header">
              <h2 class="text-primary font-weight-bold">
                {{ athlete.firstName }}
                {{ athlete.lastName }}
              </h2>
            </div>
            <!-- Body -->
            <div class="row">
              <div class="col-md-2">
                <h2>{{ athlete.squad }}</h2>
              </div>
              <div class="col-md-10">
                <div class="card-body">
                  <div class="card">
                    <div class="card-header">
                      <h6 class="text-secondary">This Week's Wellness</h6>
                    </div>
                    <div class="card-body">
                      <WellnessGaugeChart :athleteId="this.$route.params.id" />
                    </div>
                  </div>
                  <div class="card mt-3">
                    <div class="card-header">
                      <h6 class="text-secondary">This Season's Wellness</h6>
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