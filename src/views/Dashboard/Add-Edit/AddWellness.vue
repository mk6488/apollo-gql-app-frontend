<template>
  <div class="row">
    <div class="col-12">
      <div class="card">
        <div class="card-body">
          <h3 class="card-title text-primary">
            {{ editMode ? "Edit Wellness" : "Add Wellness" }}
          </h3>
          <hr />
          <div class="row">
            <!-- LEFT-HAND SIDE -->
            <div class="col-md-4 col-sm-12">
              <AthleteButtons
                :chosenAthlete="newWellness.athlete"
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
                  class="form-control w-50"
                  placeholder="Type"
                  id="date"
                  v-model="newWellness.date"
                />
              </div>
              <!-- Wellness Buttons -->
              <div class="row mb-3" v-for="item in array" :key="item.name">
                <label
                  class="col-sm-2 col-form-label text-primary font-weight-bold"
                  >{{ item.label }}</label
                >
                <div v-for="i in 5" :key="i">
                  <input
                    :key="i"
                    type="radio"
                    :name="item.name"
                    :id="[item.name + 'Option' + i]"
                    :value="i"
                    v-model="newWellness[item.name]"
                  />
                  <label
                    v-if="newWellness[item.name] === i"
                    class="btn btn-warning mr-3 btn-wellness"
                    :for="[item.name + 'Option' + i]"
                    >{{ i }}</label
                  >
                  <label
                    v-else
                    class="btn btn-outline-warning mr-3 btn-wellness"
                    :for="[item.name + 'Option' + i]"
                    >{{ i }}</label
                  >
                </div>
              </div>
              <div class="form-group">
                <button
                  v-if="!editMode"
                  :disabled="isLoading"
                  class="btn btn-primary"
                  @click="addNewWellness"
                >
                  Add Wellness
                </button>
                <button
                  v-else
                  :disabled="isLoading"
                  class="btn btn-primary"
                  @click="updateWellness"
                >
                  Edit Wellness
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
import AthleteButtons from "../../../components/Athletes/AthleteButtons";
import {
  CREATE_WELLNESS,
  GET_WELLNESS_BY_ID,
  UPDATE_WELLNESS,
} from "../../../gql";
import { toast, weekNumber } from "../../../helpers";

export default {
  components: { AthleteButtons },
  computed: {
    editMode() {
      return !!this.$route.query.edit;
    },
  },
  data: () => ({
    newWellness: {
      date: "",
      weekNumber: "",
      sleep: "",
      stress: "",
      fatigue: "",
      soreness: "",
      nutrition: "",
      average: "",
      athlete: "",
    },
    array: {
      sleep: { name: "sleep", label: "Sleep" },
      stress: { name: "stress", label: "Stress" },
      fatigue: { name: "fatigue", label: "Fatigue" },
      soreness: { name: "soreness", label: "Soreness" },
      nutrition: { name: "nutrition", label: "Nutrition" },
    },
    updatedWellness: {},
    isLoading: false,
  }),
  methods: {
    updateAthlete(id) {
      this.newWellness.athlete = id;
    },
    updateWeekNumber() {
      this.newWellness.weekNumber = weekNumber(this.newWellness.date);
    },
    calculateAverage() {
      if (
        this.newWellness.sleep &&
        this.newWellness.stress &&
        this.newWellness.fatigue &&
        this.newWellness.soreness &&
        this.newWellness.nutrition
      ) {
        let total =
          parseFloat(this.newWellness.sleep) +
          parseFloat(this.newWellness.stress) +
          parseFloat(this.newWellness.fatigue) +
          parseFloat(this.newWellness.soreness) +
          parseFloat(this.newWellness.nutrition);
        let avrg = total / 5;
        this.newWellness.average = avrg;
      } else {
        toast("error", "Wellness not selected");
      }
    },
    async addNewWellness() {
      if (this.validated()) {
        this.isLoading = true;
        this.calculateAverage();
        await this.$apollo.mutate({
          mutation: CREATE_WELLNESS,
          variables: this.newWellness,
        });
        this.isLoading = false;
        toast("success", "Wellness created");
        this.$router.push("/dashboard/my-wellness");
      } else {
        toast("error", "Something is missing!");
      }
    },
    async getWellness() {
      this.isLoading = true;
      let { data } = await this.$apollo.query({
        query: GET_WELLNESS_BY_ID,
        variables: { id: this.$route.query.edit },
      });
      this.isLoading = false;
      this.newWellness = data.getWellnessById;
      this.newWellness.athlete = data.getWellnessById.athlete.id;
    },
    async updateWellness() {
      if (this.validated()) {
        this.isLoading = true;
        this.calculateAverage();
        this.updatedWellness = this.newWellness;
        await this.$apollo.mutate({
          mutation: UPDATE_WELLNESS,
          variables: {
            ...this.updatedWellness,
            id: this.$route.query.edit,
          },
        });
        this.isLoading = false;
        toast("success", "Wellness updated");
        this.$router.push("/dashboard/my-wellness");
      } else {
        toast("error", "Something is missing!");
      }
    },
    validated() {
      if (
        !this.newWellness.date ||
        !this.newWellness.sleep ||
        !this.newWellness.stress ||
        !this.newWellness.fatigue ||
        !this.newWellness.soreness ||
        !this.newWellness.nutrition ||
        !this.newWellness.athlete
      ) {
        return false;
      } else {
        return true;
      }
    },
  },
  created() {
    if (this.editMode) {
      // Fetch the wellness from the backend using GQS
      this.getWellness();
    }
  },
};
</script>