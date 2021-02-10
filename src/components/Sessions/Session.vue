<template>
  <div class="card session-card">
    <img :src="session.image" class="card-img-top" alt="session.type" />
    <div class="card-body">
      <h4 class="text-primary">{{ session.type }}</h4>
      <p class="card-text">
        {{ session.date | dateTimeFilter }}
      </p>
      <p class="card-text text-primary">
        {{ session.author.group }}
      </p>
      <button
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