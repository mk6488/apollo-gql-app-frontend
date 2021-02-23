<template>
  <div class="my-posts">
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-center">
              <h2 class="card-title text-primary align-self-center">
                My Comments
              </h2>
              <button
                class="btn btn-primary align-self-center"
                @click="$router.push('/dashboard/add-comment')"
              >
                Add Comment
              </button>
            </div>
            <ApolloQuery
              :query="query"
              :variables="{ page: currentPage, limit: limit }"
            >
              <template v-slot="{ result: { data, error, commenting }, query }">
                <div v-if="commenting"><p>Commenting...</p></div>
                <div v-else-if="data">
                  <CommentList
                    :comments="data.getMyCommentsWithPagination.comments"
                    @comment-deleted="query.refetch()"
                  />
                  <bPagination
                    v-if="
                      data.getMyCommentsWithPagination.paginator.count >
                      data.getMyCommentsWithPagination.paginator.perPage
                    "
                    v-model="currentPage"
                    align="center"
                    :per-page="
                      data.getMyCommentsWithPagination.paginator.perPage
                    "
                    :total-rows="
                      data.getMyCommentsWithPagination.paginator.count
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
import CommentList from "../../components/Comments/CommentList";
import { GET_MY_COMMENTS_WITH_PAGINATION } from "../../gql";

export default {
  mixins: [Scroller],
  components: { CommentList },
  data: () => ({
    currentPage: 1,
    limit: 12,
    query: GET_MY_COMMENTS_WITH_PAGINATION,
  }),
};
</script>