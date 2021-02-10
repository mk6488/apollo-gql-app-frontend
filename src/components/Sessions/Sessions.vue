<template>
  <div class="sessions">
    <div class="row">
      <div
        class="col-lg-2 col-md-6 col-sm-12 h-100 mb-3"
        v-for="session in sessions"
        :key="session.id"
      >
        <SessionCard :session="session" />
      </div>
    </div>
  </div>
</template>

<script>
import SessionCard from "./Session";
export default {
  components: { SessionCard },
  props: {
    sessions: {
      type: Array,
      required: true,
    },
  },
};
</script>