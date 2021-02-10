<template>
  <table class="table mt-4">
    <thead v-if="sessions.length > 0">
      <tr>
        <th scope="col">#Sno</th>
        <th scope="col">Image</th>
        <th scope="col">Type</th>
        <th scope="col">Date</th>
        <th scope="col">Actions</th>
      </tr>
    </thead>
    <p v-else>You have not created any sessions yet.</p>
    <tbody>
      <SessionItem
        v-for="(session, index) in sessions"
        @session-deleted="$emit('session-deleted')"
        :key="session.id"
        :session="session"
        :sno="index"
      />
    </tbody>
  </table>
</template>

<script>
import SessionItem from "./SessionItem";

export default {
  components: { SessionItem },
  props: {
    sessions: {
      type: Array,
      required: true,
    },
  },
};
</script>