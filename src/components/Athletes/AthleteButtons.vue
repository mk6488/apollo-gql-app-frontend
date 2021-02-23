<template>
  <ApolloQuery :query="athletes">
    <template v-slot="{ result: { data, error, loading } }">
      <div v-if="loading"><p>Loading...</p></div>
      <div v-else-if="data">
        <div class="form-group d-flex flex-wrap">
          <div
            class="mr-2"
            v-for="athlete in data.allActiveAthletes"
            :key="athlete.id"
          >
            <input
              @click="selectedAthlete(athlete.id)"
              type="radio"
              class="btn-check"
              name="athletes"
              :id="athlete.id"
              autocomplete="off"
            />
            <label
              v-if="chosenAthlete === athlete.id"
              :for="athlete.id"
              class="btn btn btn-primary btn-athlete"
              >{{ athlete.firstName }}</label
            >
            <label
              v-else
              :for="athlete.id"
              class="btn btn btn-outline-primary btn-athlete"
              >{{ athlete.firstName }}</label
            >
          </div>
        </div>
      </div>
      <div v-else-if="error">Something happened, please try again...</div>
      <div v-else>No Result</div>
    </template>
  </ApolloQuery>
</template>

<script>
import { ALL_ACTIVE_ATHLETES } from "../../gql";
export default {
  props: {
    chosenAthlete: {
      type: String,
      required: false,
    },
  },
  data: () => ({
    athletes: ALL_ACTIVE_ATHLETES,
  }),
  methods: {
    selectedAthlete(id) {
      this.$emit("selected-athlete", id);
    },
  },
};
</script>