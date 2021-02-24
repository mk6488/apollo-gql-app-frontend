<template>
  <div class="session-page mt-4">
    <button class="btn btn-primary mb-3" @click="$router.go(-1)">
      Go Back
    </button>
    <div class="row">
      <div class="col-12">
        <ApolloQuery :query="query" :variables="{ id: $route.params.id }">
          <template v-slot="{ result: { data, error, loading } }">
            <div v-if="loading"><p>Loading...</p></div>
            <div v-else-if="data">
              <div class="card mb-3">
                <img
                  :style="{ height: '150px' }"
                  :src="data.getSessionById.image"
                  class="card-img-top"
                  :alt="data.getSessionById.type"
                />
                <div class="card-body">
                  <h2 class="card-title text-primary">
                    {{ data.getSessionById.type }} Session,
                  </h2>
                  <h5 class="card-title text-primary">
                    {{ data.getSessionById.date | dateTimeFilter }} (Week
                    {{ data.getSessionById.weekNumber }})
                  </h5>
                  <div class="post-content">
                    <p class="card-text" v-html="data.getSessionById.info"></p>
                  </div>
                  <p class="card-text">
                    <small class="text-muted"
                      >Last updated on
                      {{
                        data.getSessionById.updatedAt | dateTimeFilterOptional
                      }}</small
                    >
                  </p>
                </div>
              </div>
            </div>
            <div v-else-if="error">Something happened, please try again...</div>
            <div v-else>No Result</div>
          </template>
        </ApolloQuery>
      </div>
    </div>
  </div>
</template>

<script>
import { GET_SESSION_BY_ID } from "../gql";
import DateFilterMixin from "../mixins/DateFilter";

export default {
  mixins: [DateFilterMixin],
  data: () => ({
    query: GET_SESSION_BY_ID,
  }),
};
</script>

<style lang="scss" scoped>
.post-content {
  overflow: auto !important;
}
</style>