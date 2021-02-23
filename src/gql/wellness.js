import gql from 'graphql-tag'

export const GET_MY_WELLNESS_WITH_PAGINATION = gql `
query GET_MY_WELLNESS_WITH_PAGINATION($page: Int!, $limit: Int!) {
	getMyWellnessWithPagination(page: $page, limit: $limit) {
		wellness {
			id
      date
      weekNumber
      sleep
      stress
      fatigue
      soreness
      nutrition
      average
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

export const GET_WELLNESS_BY_ID = gql `
query GET_WELLNESS_BY_ID($id: ID!) {
	getWellnessById(id: $id) {
		id
    date
    weekNumber
    sleep
    stress
    fatigue
    soreness
    nutrition
    average
    athlete {
      firstName
      lastName
    }
    author {
      username
    }
	}
}
`

export const ALL_WELLNESS_FOR_ATHLETE = gql `
query ALL_WELLNESS_FOR_ATHLETE($id: ID!) {
  allWellnessForAthlete(id: $id) {
    date
    weekNumber
    sleep
    stress
    fatigue
    soreness
    nutrition
    average
  }
}
`

export const CREATE_WELLNESS = gql `
mutation CREATE_WELLNESS(
	$date: String!
  $weekNumber: Int!
  $sleep: Int!
  $stress: Int!
  $fatigue: Int!
  $soreness: Int!
  $nutrition: Int!
  $average: Float!
  $athlete: ID!
) {
	createWellness(
		newWellness: {
      date: $date
      weekNumber: $weekNumber
      sleep: $sleep
      stress: $stress
      fatigue: $fatigue
      soreness: $soreness
      nutrition: $nutrition
      average: $average
      athlete: $athlete
    }
	) {
		id
	}
}
`

export const UPDATE_WELLNESS = gql `
mutation UPDATE_WELLNESS(
	$id: ID!
	$date: String!
  $weekNumber: Int!
  $sleep: Int!
  $stress: Int!
  $fatigue: Int!
  $soreness: Int!
  $nutrition: Int!
  $average: Float!
  $athlete: ID!
) {
	updateWellness(
		id: $id
		updatedWellness: {
			date: $date
      weekNumber: $weekNumber
      sleep: $sleep
      stress: $stress
      fatigue: $fatigue
      soreness: $soreness
      nutrition: $nutrition
      average: $average
      athlete: $athlete
		}
	) {
		id
	}
}
`

export const DELETE_WELLNESS = gql `
mutation DELETE_WELLNESS($id: ID!) {
	deleteWellness(id: $id) {
		id
		message
		success
	}
}
`