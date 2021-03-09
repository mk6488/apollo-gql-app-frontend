<template>
  <div class="card session-card position-relative">
    <div
      class="cancelled position-absolute h-100 w-100 d-flex"
      v-if="session.cancelled"
    >
      <img
        src="../../assets/images/cancelled.png"
        alt="Cancelled"
        class="img-fluid justify-content-center my-auto"
      />
    </div>

    <img :src="session.image" class="card-img-top" alt="session.type" />
    <div class="card-body">
      <h4 class="card-title text-primary">{{ session.type }}</h4>
      <small>
        {{ session.date | dateTimeFilter }}
      </small>
      <p class="text-primary">
        {{ session.author.group }}
      </p>
      <button
        :disabled="session.cancelled"
        class="btn btn-primary mr-2 btn-sm"
        @click="$router.push(`/session/${session.id}`)"
      >
        See More
      </button>
    </div>
  </div>
</template>

<script>
import DateTimeMixin from "../../mixins/DateFilter";
export default {
  mixins: [DateTimeMixin],
  props: {
    session: {
      type: Object,
      required: true,
    },
  },
};
</script>

