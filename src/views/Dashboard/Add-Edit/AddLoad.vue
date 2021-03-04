<template>
  <div class="row">
    <div class="col-12">
      <div class="card">
        <div class="card-body">
          <h3 class="card-title text-primary">
            {{ editMode ? "Edit Load" : "Add Load" }}
          </h3>
          <hr />
          <div class="row">
            <!-- LEFT-HAND SIDE -->
            <div class="col-md-4 col-sm-12">
              <AthleteButtons
                :chosenAthlete="editMode ? newLoad.athlete.id : newLoad.athlete"
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
                  v-model="newLoad.date"
                />
              </div>
              <!-- Type -->
              <div class="form-group">
                <label for="type" class="text-primary font-weight-bold">
                  Training Type
                </label>
                <select
                  name="types"
                  class="form-control"
                  id="type"
                  v-model="newLoad.type"
                >
                  <option
                    v-for="item in optionsArray"
                    :key="item.name"
                    :value="item.value"
                  >
                    {{ item.name }}
                  </option>
                </select>
              </div>
              <!-- Duration -->
              <label for="duration" class="text-primary font-weight-bold"
                >Duration</label
              >
              <div class="form-group d-flex">
                <input
                  type="range"
                  min="0"
                  max="180"
                  step="5"
                  class="form-range align-self-center"
                  placeholder="Duration in minutes"
                  id="duration"
                  v-model="newLoad.duration"
                />
                <h4
                  class="text-primary font-weight-bold ml-3 align-self-center"
                >
                  {{ newLoad.duration }}
                </h4>
              </div>
              <!-- RPE -->
              <label for="rpe" class="text-primary font-weight-bold">RPE</label>
              <div class="form-group d-flex">
                <input
                  type="range"
                  min="1"
                  max="10"
                  class="form-range align-self-center"
                  id="rpe"
                  v-model="newLoad.rpe"
                />
                <h4
                  class="text-primary font-weight-bold ml-3 align-self-center"
                >
                  {{ newLoad.rpe }}
                </h4>
              </div>
              <!-- Button -->
              <div class="form-group">
                <button
                  v-if="!editMode"
                  :disabled="isLoading"
                  class="btn btn-primary"
                  @click="addNewLoad"
                >
                  Add Load
                </button>
                <button
                  v-else
                  :disabled="isLoading"
                  class="btn btn-primary"
                  @click="updateLoad"
                >
                  Edit Load
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
import { CREATE_LOAD, GET_LOAD_BY_ID, UPDATE_LOAD } from "../../../gql";
import { toast, weekNumber } from "../../../helpers";

export default {
  components: { AthleteButtons },
  computed: {
    editMode() {
      return !!this.$route.query.edit;
    },
  },
  data: () => ({
    optionsArray: [
      { value: "Water", name: "Water" },
      { value: "Erg", name: "Erg" },
      { value: "S&C", name: "S&C" },
      { value: "Walk", name: "Walk" },
      { value: "Run", name: "Run" },
      { value: "Cycle", name: "Cycle" },
    ],
    newLoad: {
      date: "",
      weekNumber: "",
      type: "",
      duration: "60",
      rpe: "3",
      load: "",
      athlete: "",
    },
    weight: "",
    updatedLoad: {},
    isLoading: false,
  }),
  methods: {
    updateAthlete(id) {
      this.newLoad.athlete = id;
    },
    updateWeekNumber() {
      this.newLoad.weekNumber = weekNumber(this.newLoad.date);
    },
    calculateLoad() {
      this.newLoad.load = this.newLoad.duration * this.newLoad.rpe;
    },
    convertNumbers() {
      this.newLoad.duration = parseInt(this.newLoad.duration);
      this.newLoad.rpe = parseInt(this.newLoad.rpe);
      this.newLoad.load = parseInt(this.newLoad.load);
    },
    async addNewLoad() {
      if (this.validated()) {
        this.isLoading = true;
        this.calculateLoad();
        this.convertNumbers();
        await this.$apollo.mutate({
          mutation: CREATE_LOAD,
          variables: this.newLoad,
        });
        this.isLoading = false;
        toast("success", "Load created");
        this.$router.push("/dashboard/my-loads");
      } else {
        toast("error", "Something is missing!");
      }
    },
    async getLoad() {
      this.isLoading = true;
      let { data } = await this.$apollo.query({
        query: GET_LOAD_BY_ID,
        variables: { id: this.$route.query.edit },
      });
      this.isLoading = false;
      this.newLoad = data.getLoadById;
    },
    async updateLoad() {
      if (this.validated()) {
        this.isLoading = true;
        this.calculateLoad();
        this.convertNumbers();
        this.updatedLoad = this.newLoad;
        await this.$apollo.mutate({
          mutation: UPDATE_LOAD,
          variables: {
            ...this.updatedLoad,
            id: this.$route.query.edit,
          },
        });
        this.isLoading = false;
        toast("success", "Load updated");
        this.$router.push("/dashboard/my-loads");
      } else {
        toast("error", "Something is missing!");
      }
    },
    validated() {
      if (
        !this.newLoad.date ||
        !this.newLoad.type ||
        !this.newLoad.duration ||
        !this.newLoad.rpe ||
        !this.newLoad.athlete
      ) {
        return false;
      } else {
        return true;
      }
    },
  },
  created() {
    if (this.editMode) {
      // Fetch the load from the backend using GQS
      this.getLoad();
    }
  },
};
</script>