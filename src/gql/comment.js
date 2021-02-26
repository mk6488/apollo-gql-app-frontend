import gql from 'graphql-tag'

export const GET_MY_COMMENTS_WITH_PAGINATION = gql `
query GET_MY_COMMENTS_WITH_PAGINATION($page: Int!, $limit: Int!) {
	getMyCommentsWithPagination(page: $page, limit: $limit) {
		comments {
			id
			date
      weekNumber
      type
      comment
      athlete {
        firstName
      }
		}
		paginator {
			hasNextPage
			hasPrevPage
			next
			prev
			slNo
			count
			pageCount
			perPage
			currentPage
		}
	}
}
`

export const GET_COMMENT_BY_ID = gql `
query GET_COMMENT_BY_ID($id: ID!) {
	getCommentById(id: $id) {
		id
    date
    weekNumber
    type
    comment
    athlete { id }
		author { id }
	}
}
`

export const CREATE_COMMENT = gql `
mutation CREATE_COMMENT(
	$date: String!
	$weekNumber: Int!
	$type: String!
	$comment: String!
  $athlete: ID!
) {
	createComment(
		newComment: {
      date: $date
      weekNumber: $weekNumber
      type: $type
      comment: $comment
      athlete: $athlete
    }
	) {
		id
	}
}
`

export const UPDATE_COMMENT = gql `
mutation UPDATE_COMMENT(
	$id: ID!
	$date: String!
	$weekNumber: Int!
	$type: String!
	$comment: String!
  $athlete: ID!
) {
	updateComment(
		id: $id
		updatedComment: {
			date: $date
      weekNumber: $weekNumber
      type: $type
      comment: $comment
      athlete: $athlete
		}
	) {
		id
	}
}
`

export const DELETE_COMMENT = gql `
mutation DELETE_COMMENT($id: ID!) {
	deleteComment(id: $id) {
		id
		message
		success
	}
}
`