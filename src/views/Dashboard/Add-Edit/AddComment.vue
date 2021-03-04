<template>
  <div class="row">
    <div class="col-12">
      <div class="card">
        <div class="card-body">
          <h3 class="card-title text-primary">
            {{ editMode ? "Edit Comment" : "Add Comment" }}
          </h3>
          <hr />
          <div class="row">
            <!-- LEFT-HAND SIDE -->
            <div class="col-md-4 col-sm-12">
              <AthleteButtons
                :chosenAthlete="
                  editMode ? newComment.athlete.id : newComment.athlete
                "
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
                  v-model="newComment.date"
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
                  v-model="newComment.type"
                >
                  <option value="General">General</option>
                  <option value="Incident">Incident</option>
                  <option value="Medical">Medical</option>
                  <option value="Training">Training</option>
                </select>
              </div>
              <!-- Comment -->
              <div class="form-group">
                <label for="info" class="text-primary font-weight-bold">
                  Comment
                </label>
                <VueEditor v-model="newComment.comment" />
              </div>
              <!-- Button -->
              <div class="form-group">
                <button
                  v-if="!editMode"
                  :disabled="isLoading"
                  class="btn btn-primary"
                  @click="addNewComment"
                >
                  Add Comment
                </button>
                <button
                  v-else
                  :disabled="isLoading"
                  class="btn btn-primary"
                  @click="updateComment"
                >
                  Edit Comment
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
import {
  CREATE_COMMENT,
  GET_COMMENT_BY_ID,
  UPDATE_COMMENT,
} from "../../../gql";
import { toast, weekNumber } from "../../../helpers";

export default {
  components: { AthleteButtons, VueEditor },
  computed: {
    editMode() {
      return !!this.$route.query.edit;
    },
  },
  data: () => ({
    newComment: {
      date: "",
      weekNumber: "",
      type: "",
      comment: "",
      athlete: "",
    },
    weight: "",
    updatedComment: {},
    isLoading: false,
  }),
  methods: {
    updateAthlete(id) {
      this.newComment.athlete = id;
    },
    updateWeekNumber() {
      this.newComment.weekNumber = weekNumber(this.newComment.date);
    },
    async addNewComment() {
      if (this.validated()) {
        this.isLoading = true;
        await this.$apollo.mutate({
          mutation: CREATE_COMMENT,
          variables: this.newComment,
        });
        this.isLoading = false;
        toast("success", "Comment created");
        this.$router.push("/dashboard/my-comments");
      } else {
        toast("error", "Something is missing!");
      }
    },
    async getComment() {
      this.isLoading = true;
      let { data } = await this.$apollo.query({
        query: GET_COMMENT_BY_ID,
        variables: { id: this.$route.query.edit },
      });
      this.isLoading = false;
      this.newComment = data.getCommentById;
    },
    async updateComment() {
      if (this.validated()) {
        this.isLoading = true;
        this.updatedComment = this.newComment;
        await this.$apollo.mutate({
          mutation: UPDATE_COMMENT,
          variables: {
            ...this.updatedComment,
            id: this.$route.query.edit,
          },
        });
        this.isLoading = false;
        toast("success", "Comment updated");
        this.$router.push("/dashboard/my-comments");
      } else {
        toast("error", "Something is missing!");
      }
    },
    validated() {
      if (
        !this.newComment.date ||
        !this.newComment.type ||
        !this.newComment.comment ||
        !this.newComment.athlete
      ) {
        return false;
      } else {
        return true;
      }
    },
  },
  created() {
    if (this.editMode) {
      // Fetch the comment from the backend using GQS
      this.getComment();
    }
  },
};
</script>