import gql from 'graphql-tag'

export const GET_MY_LOADS_WITH_PAGINATION = gql `
query GET_MY_LOADS_WITH_PAGINATION($page: Int!, $limit: Int!) {
	getMyLoadsWithPagination(page: $page, limit: $limit) {
		loads {
			id
			date
      weekNumber
      type
      duration
      rpe
      load
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

export const GET_LOAD_BY_ID = gql `
query GET_LOAD_BY_ID($id: ID!) {
	getLoadById(id: $id) {
		id
    date
    weekNumber
    type
    duration
    rpe
    load
    athlete {
      firstName
      lastName
      squad
    }
		createdAt
		updatedAt
		author {
			group
		}
	}
}
`

export const CREATE_LOAD = gql `
mutation CREATE_LOAD(
	$date: String!
	$weekNumber: Int!
	$type: String!
	$duration: Int!
	$rpe: Int!
  $load: Int!
  $athlete: ID!
) {
	createLoad(
		newLoad: {
      date: $date
      weekNumber: $weekNumber
      type: $type
      duration: $duration
      rpe: $rpe
      load: $load
      athlete: $athlete
    }
	) {
		id
	}
}
`

export const UPDATE_LOAD = gql `
mutation UPDATE_LOAD(
	$id: ID!
	$date: String!
	$weekNumber: Int!
	$type: String!
	$duration: Int!
	$rpe: Int!
  $load: Int!
  $athlete: ID!
) {
	updateLoad(
		id: $id
		updatedLoad: {
			date: $date
      weekNumber: $weekNumber
      type: $type
      duration: $duration
      rpe: $rpe
      load: $load
      athlete: $athlete
		}
	) {
		id
	}
}
`

export const DELETE_LOAD = gql `
mutation DELETE_LOAD($id: ID!) {
	deleteLoad(id: $id) {
		id
		message
		success
	}
}
`