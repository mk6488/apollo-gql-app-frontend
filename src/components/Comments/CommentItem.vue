<template>
  <tr>
    <th scope="row">{{ sno + 1 }}</th>
    <td>{{ comment.date | dateFilter }}</td>
    <td>{{ comment.weekNumber }}</td>
    <td>{{ comment.athlete.firstName }}</td>
    <td v-if="comment.type === 'General'">
      <span class="badge text-light bg-success">{{ comment.type }}</span>
    </td>
    <td v-else-if="comment.type === 'Incident'">
      <span class="badge text-light bg-danger">{{ comment.type }}</span>
    </td>
    <td v-else-if="comment.type === 'Medical'">
      <span class="badge text-light bg-info">{{ comment.type }}</span>
    </td>
    <td v-else-if="comment.type === 'Training'">
      <span class="badge text-light bg-warning">{{ comment.type }}</span>
    </td>
    <td
      v-html="comment.comment"
      class="text-nowrap overflow-hidden"
      style="max-width: 150px"
    ></td>
    <td>
      <button
        class="btn btn-success mr-2 btn-sm"
        @click="$router.push(`/comment/${comment.id}`)"
      >
        View
      </button>
      <button
        class="btn btn-info mr-2 btn-sm"
        @click="$router.push(`/dashboard/add-comment?edit=${comment.id}`)"
      >
        Edit
      </button>
      <button class="btn btn-danger btn-sm" @click="deleteComment">
        Delete
      </button>
    </td>
  </tr>
</template>

<script>
import moment from "moment";
import { DELETE_COMMENT } from "../../gql";
import { toast } from "../../helpers";
import DateTimeMixin from "../../mixins/DateFilter";

export default {
  mixins: [DateTimeMixin],
  props: {
    comment: {
      type: Object,
      required: true,
    },
    sno: {
      type: Number,
      required: true,
    },
  },
  data: () => ({
    age: "",
  }),
  methods: {
    async deleteComment() {
      let { data } = await this.$apollo.mutate({
        mutation: DELETE_COMMENT,
        variables: { id: this.comment.id },
      });
      toast("success", data.deleteComment.message);
      this.$emit("comment-deleted");
    },

    currentAge(val) {
      return moment(new Date()).diff(val, "years");
    },
  },
};
</script>