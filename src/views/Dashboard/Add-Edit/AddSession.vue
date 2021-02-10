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
            <div class="col-md-7 col-sm-12">
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
                  type="datetime-local"
                  step="900"
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
              <div class="form-group">
                <button
                  v-if="!editMode"
                  :disabled="isLoading"
                  class="btn btn-primary"
                  @click="addNewSession"
                >
                  Add Session
                </button>
                <button
                  v-else
                  :disabled="isLoading"
                  class="btn btn-primary"
                  @click="updateSession"
                >
                  Edit Session
                </button>
              </div>
            </div>
            <div class="col-md-5 col-sm-12">
              <div class="form-group">
                <input
                  type="file"
                  class="form-control"
                  ref="imageUploader"
                  @change="uploadImage"
                />
              </div>
              <div class="form-group" v-if="newSession.image">
                <img
                  class="img-thumbnail img-fluid mx-auto d-block"
                  :src="newSession.image"
                  alt=""
                />
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
  UPLOAD_FILE,
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
    },
    updatedSession: {},
    isLoading: false,
  }),
  methods: {
    async uploadImage() {
      let { data } = await this.$apollo.mutate({
        mutation: UPLOAD_FILE,
        variables: { file: this.$refs["imageUploader"].files[0] },
      });
      this.newSession.image = data.imageUploader;
      this.$refs["imageUploader"] = null;
    },

    async addNewSession() {
      this.isLoading = true;
      this.newSession.weekNumber = weekNumber(this.newSession.date);
      await this.$apollo.mutate({
        mutation: CREATE_SESSION,
        variables: this.newSession,
      });
      this.isLoading = false;
      toast("success", "Session created");
      this.$router.push("/dashboard/my-sessions");
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
      this.newSession.weekNumber = weekNumber(this.newSession.date);
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
  },
  created() {
    if (this.editMode) {
      // Fetch the session from the backend using GQS
      this.getSession();
    }
  },
};
</script>