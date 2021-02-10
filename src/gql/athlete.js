import gql from 'graphql-tag'

export const GET_ATHLETES_WITH_PAGINATION = gql `
query GET_ATHLETES_WITH_PAGINATION($page: Int!, $limit: Int!) {
	getAthletesWithPagination(page: $page, limit: $limit) {
		athletes {
			id
			firstName
      lastName
			squad
      weight
      current
      doe
      dob
			author {
				username
				firstName
				lastName
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

export const GET_MY_ATHLETES_WITH_PAGINATION = gql `
query GET_MY_ATHLETES_WITH_PAGINATION($page: Int!, $limit: Int!) {
	getMyAthletesWithPagination(page: $page, limit: $limit) {
		athletes {
			id
			firstName
      lastName
			squad
      weight
      current
      doe
      dob
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

export const GET_ATHLETE_BY_ID = gql `
query GET_ATHLETE_BY_ID($id: ID!) {
	getAthleteById(id: $id) {
		id
    firstName
    lastName
    squad
    weight
    current
    doe
    dob
		createdAt
		updatedAt
		author {
			group
		}
	}
}
`

export const CREATE_ATHLETE = gql `
mutation CREATE_ATHLETE(
	$firstName: String!
	$lastName: String!
	$squad: String!
	$weight: Float
	$current: Boolean!
  $doe: String
  $dob: String
) {
	createAthlete(
		newAthlete: {
      firstName: $firstName
      lastName: $lastName
      squad: $squad
      weight: $weight
      current: $current
      doe: $doe
      dob: $dob
    }
	) {
		id
		firstName
		lastName
		squad
    weight
    current
    doe
    dob
	}
}
`

export const UPDATE_ATHLETE = gql `
mutation UPDATE_ATHLETE(
	$id: ID!
	$firstName: String!
	$lastName: String!
	$squad: String!
	$weight: Float
	$current: Boolean!
  $doe: String
  $dob: String
) {
	updateAthlete(
		id: $id
		updatedAthlete: {
			firstName: $firstName
      lastName: $lastName
      squad: $squad
      weight: $weight
      current: $current
      doe: $doe
      dob: $dob
		}
	) {
		id
	}
}
`

export const DELETE_ATHLETE = gql `
mutation DELETE_ATHLETE($id: ID!) {
	deleteAthlete(id: $id) {
		id
		message
		success
	}
}
`