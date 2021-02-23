<template>
  <div class="home">
    <h2 class="text-primary font-weight-bold mt-3 mb-3">Sessions</h2>
    <ApolloQuery
      :query="allSessions"
      :variables="{ limit: limit, page: currentPage }"
    >
      <template v-slot="{ result: { data, error, loading } }">
        <div v-if="loading"><p>Loading...</p></div>
        <div v-else-if="data">
          <Sessions :sessions="data.getSessionsWithPagination.sessions" />
          <bPagination
            v-if="
              data.getSessionsWithPagination.paginator.count >
              data.getSessionsWithPagination.paginator.perPage
            "
            v-model="currentPage"
            align="center"
            :per-page="data.getSessionsWithPagination.paginator.perPage"
            :total-rows="data.getSessionsWithPagination.paginator.count"
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
import { GET_SESSIONS_WITH_PAGINATION } from "../gql";
import Scroller from "../mixins/Scroller";

export default {
  mixins: [Scroller],
  components: { Sessions },

  data: () => ({
    currentPage: 1,
    limit: 12,
    allSessions: GET_SESSIONS_WITH_PAGINATION,
  }),
};
</script>
