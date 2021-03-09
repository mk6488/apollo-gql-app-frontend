import gql from 'graphql-tag'

export const GET_SESSIONS_WITH_PAGINATION = gql `
query GET_SESSIONS_WITH_PAGINATION($page: Int!, $limit: Int!) {
	getSessionsWithPagination(page: $page, limit: $limit) {
		sessions {
			id
			date
			weekNumber
			type
			info
			image
			cancelled
			author {
				group
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

export const GET_FUTURE_SESSIONS_WITH_PAGINATION = gql `
query GET_FUTURE_SESSIONS_WITH_PAGINATION($page: Int!, $limit: Int!) {
	getFutureSessionsWithPagination(page: $page, limit: $limit) {
		sessions {
			id
			date
			weekNumber
			type
			info
			image
			cancelled
			author {
				group
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

export const GET_MY_SESSIONS_WITH_PAGINATION = gql `
query GET_MY_SESSIONS_WITH_PAGINATION($page: Int!, $limit: Int!) {
	getMySessionsWithPagination(page: $page, limit: $limit) {
		sessions {
			id
			date
			weekNumber
			type
			info
			image
			cancelled
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

export const GET_SESSION_BY_ID = gql `
query GET_SESSION_BY_ID($id: ID!) {
	getSessionById(id: $id) {
		id
		date
		weekNumber
		type
		info
		image
		cancelled
		createdAt
		updatedAt
		author {
			group
		}
	}
}
`

export const CREATE_SESSION = gql `
mutation CREATE_SESSION(
	$date: String!
	$weekNumber: Int!
	$type: String!
	$info: String!
	$image: String
	$cancelled: Boolean!
) {
	createSession(
		newSession: { date: $date, weekNumber: $weekNumber, type: $type, info: $info, image: $image, cancelled: $cancelled }
	) {
		id
		type
		info
		image
		cancelled
	}
}
`

export const UPDATE_SESSION = gql `
mutation UPDATE_SESSION(
	$id: ID!
	$date: String!
	$weekNumber: Int!
	$type: String!
	$info: String!
	$image: String
	$cancelled: Boolean!
) {
	updateSession(
		id: $id
		updatedSession: {
			date: $date
			weekNumber: $weekNumber
			type: $type
			info: $info
			image: $image
			cancelled: $cancelled
		}
	) {
		id
	}
}
`

export const TOGGLE_CANCELLED = gql `
mutation TOGGLE_CANCELLED(
	$id: ID!
	$cancelled: Boolean!
) {
	toggleCancelled(
		id: $id
		cancelled: $cancelled
	) {
		id
	}
}
`

export const DELETE_SESSION = gql `
mutation DELETE_SESSION($id: ID!) {
	deleteSession(id: $id) {
		id
		message
		success
	}
}
`