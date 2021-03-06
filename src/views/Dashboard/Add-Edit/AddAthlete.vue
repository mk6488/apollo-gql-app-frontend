<template>
  <div class="row">
    <div class="col-12">
      <div class="card">
        <div class="card-body">
          <div class="d-flex">
            <h3 class="card-title text-primary">
              {{ editMode ? "Edit Athlete" : "Add Athlete" }}
            </h3>
          </div>

          <hr />
          <div class="row">
            <div class="col-md-6 col-sm-12">
              <!-- Gender -->
              <b-form-radio-group
                v-model="newAthlete.gender"
                :options="options"
                class="mb-3"
                value-field="item"
                text-field="name"
                disabled-field="notEnabled"
              ></b-form-radio-group>
              <!-- First Name -->
              <div class="form-group">
                <label for="firstName" class="text-primary font-weight-bold">
                  First Name
                </label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="First Name"
                  id="firstName"
                  v-model="newAthlete.firstName"
                />
              </div>
              <!-- Last Name -->
              <div class="form-group">
                <label for="lastName" class="text-primary font-weight-bold">
                  First Name
                </label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Last Name"
                  id="lastName"
                  v-model="newAthlete.lastName"
                />
              </div>
              <!-- Squad -->
              <div class="form-group">
                <label for="squad" class="text-primary font-weight-bold">
                  Squad
                </label>
                <select
                  name="squads"
                  class="form-control"
                  id="squad"
                  v-model="newAthlete.squad"
                >
                  <option value="J15">J15</option>
                  <option value="J16">J16</option>
                  <option value="J17">J17</option>
                  <option value="J18">J18</option>
                </select>
              </div>
              <!-- Weight -->
              <div class="form-group">
                <label for="weight" class="text-primary font-weight-bold">
                  Weight
                </label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Weight"
                  id="weight"
                  v-model="newAthlete.weight"
                />
              </div>
              <!-- D of E -->
              <div class="form-group">
                <label for="doe" class="text-primary font-weight-bold">
                  Duke of Edinburgh ID
                </label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="0000000 X"
                  id="doe"
                  v-model="newAthlete.doe"
                />
              </div>
              <!-- D.O.B -->
              <div class="form-group">
                <label for="weight" class="text-primary font-weight-bold">
                  Date of Birth
                </label>
                <input
                  type="date"
                  class="form-control"
                  placeholder=""
                  id="dob"
                  v-model="newAthlete.dob"
                />
              </div>
              <!-- Button -->
              <div class="form-group">
                <button
                  v-if="!editMode"
                  :disabled="isLoading"
                  class="btn btn-primary"
                  @click="addNewAthlete"
                >
                  Add Athlete
                </button>
                <button
                  v-else
                  :disabled="isLoading"
                  class="btn btn-primary"
                  @click="updateAthlete"
                >
                  Edit Athlete
                </button>
              </div>
            </div>
            <div class="col-md-6 col-sm-12"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  CREATE_ATHLETE,
  GET_ATHLETE_BY_ID,
  UPDATE_ATHLETE,
} from "../../../gql";
import { toast } from "../../../helpers";

export default {
  computed: {
    editMode() {
      return !!this.$route.query.edit;
    },
  },
  data: () => ({
    newAthlete: {
      firstName: "",
      lastName: "",
      gender: "male",
      squad: "",
      weight: "",
      current: true,
      doe: "0000000 X",
      dob: "",
      avatar: "",
    },
    weight: "",
    updatedAthlete: {},
    isLoading: false,
    options: [
      { item: "male", name: "Male" },
      { item: "female", name: "Female" },
    ],
  }),
  methods: {
    async addNewAthlete() {
      if (this.validated()) {
        this.convertWeight();
        this.addAvatar();
        this.isLoading = true;
        await this.$apollo.mutate({
          mutation: CREATE_ATHLETE,
          variables: this.newAthlete,
        });
        this.isLoading = false;
        toast("success", "Athlete created");
        this.$router.push("/dashboard/my-athletes");
      } else {
        toast("error", "Something is missing!");
      }
    },
    async getAthlete() {
      this.isLoading = true;
      let { data } = await this.$apollo.query({
        query: GET_ATHLETE_BY_ID,
        variables: { id: this.$route.query.edit },
      });
      this.isLoading = false;
      this.newAthlete = data.getAthleteById;
    },
    async updateAthlete() {
      if (this.validated()) {
        this.convertWeight();
        this.addAvatar();
        this.updatedAthlete = this.newAthlete;
        this.isLoading = true;
        await this.$apollo.mutate({
          mutation: UPDATE_ATHLETE,
          variables: {
            ...this.updatedAthlete,
            id: this.$route.query.edit,
          },
        });
        this.isLoading = false;
        toast("success", "Athlete updated");
        this.$router.push("/dashboard/my-athletes");
      } else {
        toast("error", "Something is missing!");
      }
    },
    convertWeight() {
      this.newAthlete.weight = parseFloat(this.newAthlete.weight);
    },
    addAvatar() {
      switch (this.newAthlete.gender) {
        case "male":
          this.newAthlete.avatar = "http://localhost:4000/boy-avatar.png";
          break;
        case "female":
          this.newAthlete.avatar = "http://localhost:4000/girl-avatar.png";
          break;
      }
    },
    validated() {
      if (
        !this.newAthlete.firstName ||
        !this.newAthlete.lastName ||
        !this.newAthlete.squad ||
        !this.newAthlete.gender
      ) {
        return false;
      } else {
        return true;
      }
    },
  },
  created() {
    if (this.editMode) {
      // Fetch the athlete from the backend using GQS
      this.getAthlete();
    }
  },
};
</script>