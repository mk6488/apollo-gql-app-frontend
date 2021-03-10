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
                  <p v-if="athlete.dob" class="mb-1">
                    DOB: {{ athlete.dob | birthDateFilter }} ({{
                      currentAge(athlete.dob)
                    }})
                  </p>
                  <p class="mb-1">Squad: {{ athlete.squad }}</p>
                  <p v-if="athlete.weight" class="mb-1">
                    Weight: {{ athlete.weight }} Kg
                  </p>
                  <hr />
                  <p v-if="last2K" class="mb-1">
                    Last 2K:
                    <span id="popover-target-1" class="font-weight-bold">{{
                      last2K
                    }}</span>
                    <b-popover
                      target="popover-target-1"
                      triggers="hover"
                      placement="rightbottom"
                    >
                      <template #title>Training Splits</template>
                      U2: <b>{{ U2 }}</b
                      ><br />
                      U1: <b>{{ U1 }}</b
                      ><br />
                      AT: <b>{{ AT }}</b
                      ><br />
                      TR: <b>{{ TR }}</b
                      ><br />
                      AN: <b>{{ AN }}</b
                      ><br />
                    </b-popover>
                  </p>
                  <p v-if="prev2K" class="mb-1">Previous: {{ prev2K }}</p>
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
import { GET_ATHLETE_BY_ID, ALL_TESTS_FOR_ATHLETE } from "../../gql";
import { calculateSplits } from "../../helpers";
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
    last2K: "",
    prev2K: "",
    U2: "",
    U1: "",
    AT: "",
    TR: "",
    AN: "",
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
    async getLast2K() {
      let { data } = await this.$apollo.query({
        query: ALL_TESTS_FOR_ATHLETE,
        variables: { id: this.$route.params.id },
      });
      const tests = data.allTestsForAthlete;
      const twoKtests = this.$_.where(tests, { test: "2K" });
      if (twoKtests.length > 0) {
        this.last2K = twoKtests[0].result;
        let splits = calculateSplits(this.last2K);
        this.U2 = splits[0];
        this.U1 = splits[1];
        this.AT = splits[2];
        this.TR = splits[3];
        this.AN = splits[4];
        if (twoKtests.length > 1) {
          this.prev2K = twoKtests[1].result;
        }
      } else {
        this.last2K = "";
        this.prev2K = "";
      }
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
    this.getLast2K();
  },
};
</script>

<style lang="scss" scoped>
.post-content {
  overflow: auto !important;
}
</style>