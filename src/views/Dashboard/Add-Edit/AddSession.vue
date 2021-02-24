<template>
  <div class="row">
    <div class="col-12">
      <div class="card">
        <div class="card-body">
          <h3 class="card-title text-primary">
            {{ editMode ? "Edit Session" : "Add Session" }}
          </h3>
          <hr />
          <div class="row">
            <!-- LEFT-HAND SIDE -->
            <div class="col-md-10 col-sm-12 mx-auto">
              <div class="form-group">
                <label for="type" class="text-primary font-weight-bold">
                  Type of Session
                </label>
                <select
                  name="types"
                  class="form-control"
                  id="type"
                  v-model="newSession.type"
                >
                  <option value="Water">Water</option>
                  <option value="Erg">Erg</option>
                  <option value="S&C">S&C</option>
                </select>
              </div>
              <div class="form-group">
                <label for="date" class="text-primary font-weight-bold">
                  Date and Time
                </label>
                <input
                  @change="updateWeekNumber"
                  type="datetime-local"
                  class="form-control"
                  placeholder="Type"
                  id="date"
                  v-model="newSession.date"
                />
              </div>
              <div class="form-group">
                <label for="info" class="text-primary font-weight-bold">
                  Info
                </label>
                <VueEditor v-model="newSession.info" />
              </div>
              <div class="form-group">
                <input type="hidden" v-model="newSession.image" />
              </div>
              <!-- Buttons -->
              <div v-if="!editMode" class="form-group">
                <button
                  :disabled="isLoading"
                  class="btn btn-primary float-left"
                  @click="addNewSession"
                >
                  Add Session
                </button>
                <button
                  :disabled="isLoading"
                  class="btn btn-primary float-right"
                  @click="closePage"
                >
                  Finished
                </button>
              </div>
              <div v-else class="form-group">
                <button
                  :disabled="isLoading"
                  class="btn btn-primary float-left"
                  @click="updateSession"
                >
                  Edit Session
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
import {
  CREATE_SESSION,
  GET_SESSION_BY_ID,
  UPDATE_SESSION,
} from "../../../gql";
import { toast, weekNumber } from "../../../helpers";

export default {
  components: { VueEditor },
  computed: {
    editMode() {
      return !!this.$route.query.edit;
    },
  },
  data: () => ({
    newSession: {
      date: "",
      weekNumber: "",
      type: "",
      info: "No info yet.",
      image: "",
      cancelled: false,
    },
    updatedSession: {},
    isLoading: false,
  }),
  methods: {
    updateWeekNumber() {
      this.newSession.weekNumber = weekNumber(this.newSession.date);
    },

    // async uploadImage() {
    //   let { data } = await this.$apollo.mutate({
    //     mutation: UPLOAD_FILE,
    //     variables: { file: this.$refs["imageUploader"].files[0] },
    //   });
    //   this.newSession.image = data.imageUploader;
    //   this.$refs["imageUploader"] = null;
    // },

    closePage() {
      this.$router.push("/dashboard/my-sessions");
    },

    async addNewSession() {
      this.isLoading = true;
      this.updateImage();
      await this.$apollo.mutate({
        mutation: CREATE_SESSION,
        variables: this.newSession,
      });
      this.isLoading = false;
      toast("success", "Session created");
    },

    async getSession() {
      this.isLoading = true;
      let { data } = await this.$apollo.query({
        query: GET_SESSION_BY_ID,
        variables: { id: this.$route.query.edit },
      });
      this.isLoading = false;
      this.newSession = data.getSessionById;
    },

    async updateSession() {
      this.isLoading = true;
      this.updateImage();
      this.updatedSession = this.newSession;
      await this.$apollo.mutate({
        mutation: UPDATE_SESSION,
        variables: {
          ...this.updatedSession,
          id: this.$route.query.edit,
        },
      });
      this.isLoading = false;
      toast("success", "Session updated");
      this.$router.push("/dashboard/my-sessions");
    },

    updateImage() {
      if (this.newSession.type === "Water") {
        this.newSession.image =
          "http://localhost:4000/water-session-1613394334232.png";
      } else if (this.newSession.type === "Erg") {
        this.newSession.image =
          "http://localhost:4000/erg-session-1613394357781.png";
      } else if (this.newSession.type === "S&C") {
        this.newSession.image =
          "http://localhost:4000/s-c-session-1613394382075.png";
      }
    },
  },
  created() {
    if (this.editMode) {
      // Fetch the session from the backend using GQS
      this.getSession();
    }
  },
};
</script>