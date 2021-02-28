<template>
  <div>
    <div class="comment-table">
      <table class="table table-responsive">
        <thead>
          <tr>
            <th scope="col">Date</th>
            <th scope="col">Type</th>
            <th scope="col">Comment</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="comment in comments" :key="comment.id">
            <td>{{ comment.date | dateFilter }}</td>
            <td v-if="comment.type === 'General'">
              <span class="badge text-light bg-success">{{
                comment.type
              }}</span>
            </td>
            <td v-else-if="comment.type === 'Incident'">
              <span class="badge text-light bg-danger">{{ comment.type }}</span>
            </td>
            <td v-else-if="comment.type === 'Medical'">
              <span class="badge text-light bg-info">{{ comment.type }}</span>
            </td>
            <td v-else-if="comment.type === 'Training'">
              <span class="badge text-light bg-warning">{{
                comment.type
              }}</span>
            </td>
            <td v-html="comment.comment"></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { ALL_COMMENTS_FOR_ATHLETE } from "../../gql";
import DateTimeMixin from "../../mixins/DateFilter";

export default {
  mixins: [DateTimeMixin],
  props: ["athleteId"],
  data: () => ({
    comments: [],
  }),
  methods: {
    async getComments() {
      let { data } = await this.$apollo.query({
        query: ALL_COMMENTS_FOR_ATHLETE,
        variables: { id: this.athleteId },
      });
      this.comments = data.allCommentsForAthlete;
      // this.comments = this.$_.sortBy(this.comments, "date");
    },
  },
  created() {
    this.getComments();
  },
};
</script>