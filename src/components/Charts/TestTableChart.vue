<template>
  <div>
    <div class="comment-table">
      <table class="table table-responsive">
        <thead>
          <tr>
            <th scope="col">Date</th>
            <th scope="col">Test</th>
            <th scope="col">Result</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="test in tests" :key="test.id">
            <td>{{ test.date | dateFilter }}</td>
            <td>{{ test.test }}</td>
            <td>{{ test.result }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { ALL_TESTS_FOR_ATHLETE } from "../../gql";
import DateTimeMixin from "../../mixins/DateFilter";

export default {
  mixins: [DateTimeMixin],
  props: ["athleteId"],
  data: () => ({
    tests: [],
  }),
  methods: {
    async getTests() {
      let { data } = await this.$apollo.query({
        query: ALL_TESTS_FOR_ATHLETE,
        variables: { id: this.athleteId },
      });
      this.tests = data.allTestsForAthlete;
    },
  },
  created() {
    this.getTests();
  },
};
</script>