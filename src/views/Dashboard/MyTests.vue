<template>
  <div class="my-posts">
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-center">
              <h2 class="card-title text-primary align-self-center">
                My Tests
              </h2>
              <button
                class="btn btn-primary align-self-center"
                @click="$router.push('/dashboard/add-test')"
              >
                Add Test
              </button>
            </div>
            <ApolloQuery
              :query="query"
              :variables="{ page: currentPage, limit: limit }"
            >
              <template v-slot="{ result: { data, error, testing }, query }">
                <div v-if="testing"><p>Testing...</p></div>
                <div v-else-if="data">
                  <TestList
                    :tests="data.getMyTestsWithPagination.tests"
                    @test-deleted="query.refetch()"
                  />
                  <bPagination
                    v-if="
                      data.getMyTestsWithPagination.paginator.count >
                      data.getMyTestsWithPagination.paginator.perPage
                    "
                    v-model="currentPage"
                    align="center"
                    :per-page="data.getMyTestsWithPagination.paginator.perPage"
                    :total-rows="data.getMyTestsWithPagination.paginator.count"
                  />
                </div>
                <div v-else-if="error">
                  Something happened, please try again...
                </div>
                <div v-else>No Result</div>
              </template>
            </ApolloQuery>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Scroller from "../../mixins/Scroller";
import TestList from "../../components/Tests/TestList";
import { GET_MY_TESTS_WITH_PAGINATION } from "../../gql";

export default {
  mixins: [Scroller],
  components: { TestList },
  data: () => ({
    currentPage: 1,
    limit: 12,
    query: GET_MY_TESTS_WITH_PAGINATION,
  }),
};
</script>