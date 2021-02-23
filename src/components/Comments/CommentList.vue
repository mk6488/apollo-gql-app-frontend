<template>
  <table class="table mt-4">
    <thead v-if="comments.length > 0">
      <tr>
        <th scope="col">#Sno</th>
        <th scope="col">Date</th>
        <th scope="col">Week #</th>
        <th scope="col">Athlete</th>
        <th scope="col">Type</th>
        <th scope="col">Comment</th>
        <th scope="col">Actions</th>
      </tr>
    </thead>
    <p v-else>You have not created any comments yet.</p>
    <tbody>
      <CommentItem
        v-for="(comment, index) in comments"
        @comment-deleted="$emit('comment-deleted')"
        :key="comment.id"
        :comment="comment"
        :sno="index"
      />
    </tbody>
  </table>
</template>

<script>
import CommentItem from "./CommentItem";

export default {
  components: { CommentItem },
  props: {
    comments: {
      type: Array,
      required: true,
    },
  },
};
</script>