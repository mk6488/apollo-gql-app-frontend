import gql from 'graphql-tag'

export const ALL_ATHLETES = gql `
query ALL_ATHLETES {
  allAthletes {
    id
    firstName
  }
}
`

export const ALL_ACTIVE_ATHLETES = gql `
query ALL_ACTIVE_ATHLETES {
  allActiveAthletes {
    id
    firstName
  }
}
`

export const GET_ATHLETES_WITH_PAGINATION = gql `
query GET_ATHLETES_WITH_PAGINATION($page: Int!, $limit: Int!) {
	getAthletesWithPagination(page: $page, limit: $limit) {
		athletes {
			id
			firstName
      lastName
			gender
			squad
      weight
      current
      doe
      dob
			avatar
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
			gender
			squad
      weight
      current
      doe
      dob
			avatar
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
		gender
    squad
    weight
    current
    doe
    dob
		avatar
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
	$gender: String!
	$squad: String!
	$weight: Float
	$current: Boolean!
  $doe: String
  $dob: String
	$avatar: String
) {
	createAthlete(
		newAthlete: {
      firstName: $firstName
      lastName: $lastName
			gender: $gender
      squad: $squad
      weight: $weight
      current: $current
      doe: $doe
      dob: $dob
			avatar: $avatar
    }
	) {
		id
		firstName
		lastName
		gender
		squad
    weight
    current
    doe
    dob
		avatar
	}
}
`

export const UPDATE_ATHLETE = gql `
mutation UPDATE_ATHLETE(
	$id: ID!
	$firstName: String!
	$lastName: String!
	$gender: String!
	$squad: String!
	$weight: Float
	$current: Boolean!
  $doe: String
  $dob: String
	$avatar: String
) {
	updateAthlete(
		id: $id
		updatedAthlete: {
			firstName: $firstName
      lastName: $lastName
			gender: $gender
      squad: $squad
      weight: $weight
      current: $current
      doe: $doe
      dob: $dob
			avatar: $avatar
		}
	) {
		id
	}
}
`

export const TOGGLE_CURRENT = gql `
mutation TOGGLE_CURRENT(
	$id: ID!
	$current: Boolean!
) {
	toggleCurrent(
		id: $id
		current: $current
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