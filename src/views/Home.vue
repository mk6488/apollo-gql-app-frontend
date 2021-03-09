<template>
  <div class="home">
    <h2 class="text-primary font-weight-bold mt-3 mb-3">Sessions</h2>
    <ApolloQuery
      :query="getSessions"
      :variables="{ limit: limit, page: currentPage }"
    >
      <template v-slot="{ result: { data, error, loading }, query }">
        <button
          class="btn btn-sm btn-outline-primary border-0 mb-3 mr-3"
          @click="getFutureSessions(query)"
        >
          Upcoming
        </button>
        <button
          class="btn btn-sm btn-outline-primary border-0 mb-3 mr-3"
          @click="getAllSessions(query)"
        >
          Show All
        </button>
        <div v-if="loading"><p>Loading...</p></div>
        <div v-else-if="data">
          <Sessions :sessions="data[getter].sessions" />
          <bPagination
            v-if="data[getter].paginator.count > data[getter].paginator.perPage"
            v-model="currentPage"
            align="center"
            :per-page="data[getter].paginator.perPage"
            :total-rows="data[getter].paginator.count"
          />
        </div>
        <div v-else-if="error">Something happened, please try again...</div>
        <div v-else>No Result</div>
      </template>
    </ApolloQuery>
  </div>
</template>

<script>
import Sessions from "../components/Sessions/Sessions";
import {
  GET_SESSIONS_WITH_PAGINATION,
  GET_FUTURE_SESSIONS_WITH_PAGINATION,
} from "../gql";
import Scroller from "../mixins/Scroller";

export default {
  mixins: [Scroller],
  components: { Sessions },
  data: () => ({
    currentPage: 1,
    limit: 12,
    getSessions: GET_FUTURE_SESSIONS_WITH_PAGINATION,
    getter: "getFutureSessionsWithPagination",
  }),
  methods: {
    getAllSessions(query) {
      this.getSessions = GET_SESSIONS_WITH_PAGINATION;
      this.getter = "getSessionsWithPagination";
      query.refresh();
    },
    getFutureSessions(query) {
      this.getSessions = GET_FUTURE_SESSIONS_WITH_PAGINATION;
      this.getter = "getFutureSessionsWithPagination";
      query.refresh();
    },
  },
};
</script>
