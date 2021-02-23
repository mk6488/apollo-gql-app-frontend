<template>
  <div class="row">
    <div class="col-12">
      <div class="card">
        <div class="card-body">
          <h3 class="card-title text-primary">
            {{ editMode ? "Edit Test" : "Add Test" }}
          </h3>
          <hr />
          <div class="row">
            <!-- LEFT-HAND SIDE -->
            <div class="col-md-4 col-sm-12">
              <AthleteButtons
                :chosenAthlete="newTest.athlete"
                @selected-athlete="updateAthlete"
              />
            </div>
            <!-- RIGHT-HAND SIDE -->
            <div class="col-md-8 col-sm-12">
              <!-- Date -->
              <div class="form-group">
                <label for="date" class="text-primary font-weight-bold">
                  Date
                </label>
                <input
                  @change="updateWeekNumber"
                  type="date"
                  class="form-control"
                  placeholder="Type"
                  id="date"
                  v-model="newTest.date"
                />
              </div>
              <!-- Test -->
              <div class="form-group">
                <label for="type" class="text-primary font-weight-bold">
                  Training Type
                </label>
                <select
                  name="types"
                  class="form-control"
                  id="type"
                  v-model="newTest.test"
                >
                  <option value="500m">500m Test</option>
                  <option value="2K">2K Test</option>
                  <option value="5K">5K Test</option>
                  <option value="Bleep">Bleep Test</option>
                </select>
              </div>
              <!-- Result -->
              <div class="form-group">
                <label for="info" class="text-primary font-weight-bold">
                  Test
                </label>
                <VueEditor v-model="newTest.result" />
              </div>
              <!-- Button -->
              <div class="form-group">
                <button
                  v-if="!editMode"
                  :disabled="isLoading"
                  class="btn btn-primary"
                  @click="addNewTest"
                >
                  Add Test
                </button>
                <button
                  v-else
                  :disabled="isLoading"
                  class="btn btn-primary"
                  @click="updateTest"
                >
                  Edit Test
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
import AthleteButtons from "../../../components/Athletes/AthleteButtons";
import { CREATE_TEST, GET_TEST_BY_ID, UPDATE_TEST } from "../../../gql";
import { toast, weekNumber } from "../../../helpers";

export default {
  components: { AthleteButtons, VueEditor },
  computed: {
    editMode() {
      return !!this.$route.query.edit;
    },
  },
  data: () => ({
    newTest: {
      date: "",
      weekNumber: "",
      type: "",
      test: "",
      athlete: "",
    },
    weight: "",
    updatedTest: {},
    isLoading: false,
  }),
  methods: {
    updateAthlete(id) {
      this.newTest.athlete = id;
    },
    updateWeekNumber() {
      this.newTest.weekNumber = weekNumber(this.newTest.date);
    },

    async addNewTest() {
      this.isLoading = true;
      await this.$apollo.mutate({
        mutation: CREATE_TEST,
        variables: this.newTest,
      });
      this.isLoading = false;
      toast("success", "Test created");
      this.$router.push("/dashboard/my-tests");
    },
    async getTest() {
      this.isLoading = true;
      let { data } = await this.$apollo.query({
        query: GET_TEST_BY_ID,
        variables: { id: this.$route.query.edit },
      });
      this.isLoading = false;
      this.newTest = data.getTestById;
    },
    async updateTest() {
      this.isLoading = true;
      this.updatedTest = this.newTest;
      await this.$apollo.mutate({
        mutation: UPDATE_TEST,
        variables: {
          ...this.updatedTest,
          id: this.$route.query.edit,
        },
      });
      this.isLoading = false;
      toast("success", "Test updated");
      this.$router.push("/dashboard/my-tests");
    },
  },
  created() {
    if (this.editMode) {
      // Fetch the test from the backend using GQS
      this.getTest();
    }
  },
};
</script>