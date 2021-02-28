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
                  <!-- Wellness Week Card -->
                  <div class="card border-primary mb-3">
                    <div class="card-header" @click="toggleWellnessWeek">
                      This Week's Wellness
                    </div>
                    <div v-if="showWellnessWeek" class="card-body">
                      <WellnessGaugeChart :athleteId="this.$route.params.id" />
                    </div>
                  </div>
                  <!-- Wellness Season Card -->
                  <div class="card border-primary mb-3">
                    <div class="card-header" @click="toggleWellnessSeason">
                      This Season's Wellness
                    </div>
                    <div v-if="showWellnessSeason" class="card-body">
                      <WellnessLineChart :athleteId="this.$route.params.id" />
                    </div>
                  </div>
                  <!-- Loads Card -->
                  <div class="card border-primary mb-3">
                    <div class="card-header" @click="toggleLoads">
                      this Season's Training Loads
                    </div>
                    <div v-if="showLoads" class="card-body">
                      <LoadBarChart :athleteId="this.$route.params.id" />
                    </div>
                  </div>
                  <!-- Comments Card -->
                  <div class="card border-primary mb-3">
                    <div class="card-header" @click="toggleComments">
                      This Season's Comments
                    </div>
                    <div v-if="showComments" class="card-body">
                      <CommentTableChart :athleteId="this.$route.params.id" />
                    </div>
                  </div>
                  <!-- Tests Card -->
                  <div class="card border-primary mb-3">
                    <div class="card-header" @click="toggleTests">
                      This Season's Tests
                    </div>
                    <div v-if="showTests" class="card-body">
                      <TestTableChart :athleteId="this.$route.params.id" />
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
import CommentTableChart from "../../components/Charts/CommentTableChart";
import LoadBarChart from "../../components/Charts/LoadBarChart";
import TestTableChart from "../../components/Charts/TestTableChart";
import WellnessGaugeChart from "../../components/Charts/WellnessGaugeChart";
import WellnessLineChart from "../../components/Charts/WellnessLineChart";
import { GET_ATHLETE_BY_ID } from "../../gql";
import DateFilterMixin from "../../mixins/DateFilter";

export default {
  components: {
    CommentTableChart,
    LoadBarChart,
    TestTableChart,
    WellnessGaugeChart,
    WellnessLineChart,
  },
  mixins: [DateFilterMixin],
  data: () => ({
    athlete: {},
    showWellnessWeek: true,
    showWellnessSeason: false,
    showLoads: false,
    showComments: false,
    showTests: false,
  }),
  methods: {
    async getAthlete() {
      let { data } = await this.$apollo.query({
        query: GET_ATHLETE_BY_ID,
        variables: { id: this.$route.params.id },
      });
      this.athlete = data.getAthleteById;
    },
    toggleWellnessWeek() {
      this.showWellnessWeek = !this.showWellnessWeek;
    },
    toggleWellnessSeason() {
      this.showWellnessSeason = !this.showWellnessSeason;
    },
    toggleLoads() {
      this.showLoads = !this.showLoads;
    },
    toggleComments() {
      this.showComments = !this.showComments;
    },
    toggleTests() {
      this.showTests = !this.showTests;
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