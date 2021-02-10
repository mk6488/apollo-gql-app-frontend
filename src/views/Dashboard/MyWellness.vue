<template>
  <div class="my-posts">
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-center">
              <h2 class="card-title text-primary align-self-center">
                My Wellness
              </h2>
              <button
                class="btn btn-primary align-self-center"
                @click="$router.push('/dashboard/add-wellness')"
              >
                Add Wellness
              </button>
            </div>
            <ApolloQuery
              :query="query"
              :variables="{ page: currentPage, limit: limit }"
            >
              <template v-slot="{ result: { data, error, loading }, query }">
                <div v-if="loading"><p>Loading...</p></div>
                <div v-else-if="data">
                  <WellnessList
                    :wellness="data.getMyWellnessWithPagination.wellness"
                    @wellness-deleted="query.refetch()"
                  />
                  <bPagination
                    v-if="
                      data.getMyWellnessWithPagination.paginator.count >
                      data.getMyWellnessWithPagination.paginator.perPage
                    "
                    v-model="currentPage"
                    align="center"
                    :per-page="
                      data.getMyWellnessWithPagination.paginator.perPage
                    "
                    :total-rows="
                      data.getMyWellnessWithPagination.paginator.count
                    "
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
import WellnessList from "../../components/Wellness/WellnessList";
import { GET_MY_WELLNESS_WITH_PAGINATION } from "../../gql";

export default {
  mixins: [Scroller],
  components: { WellnessList },
  data: () => ({
    currentPage: 1,
    limit: 12,
    query: GET_MY_WELLNESS_WITH_PAGINATION,
  }),
};
</script>