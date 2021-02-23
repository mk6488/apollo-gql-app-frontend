import gql from 'graphql-tag'

export const GET_MY_TESTS_WITH_PAGINATION = gql `
query GET_MY_TESTS_WITH_PAGINATION($page: Int!, $limit: Int!) {
	getMyTestsWithPagination(page: $page, limit: $limit) {
		tests {
			id
			date
      weekNumber
      test
      result
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

export const GET_TEST_BY_ID = gql `
query GET_TEST_BY_ID($id: ID!) {
	getTestById(id: $id) {
		id
    date
    weekNumber
    test
    result
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

export const CREATE_TEST = gql `
mutation CREATE_TEST(
	$date: String!
	$weekNumber: Int!
	$test: String!
	$result: String!
  $athlete: ID!
) {
	createTest(
		newTest: {
      date: $date
      weekNumber: $weekNumber
      test: $test
      result: $result
      athlete: $athlete
    }
	) {
		id
	}
}
`

export const UPDATE_TEST = gql `
mutation UPDATE_TEST(
	$id: ID!
	$date: String!
	$weekNumber: Int!
	$test: String!
	$result: String!
  $athlete: ID!
) {
	updateTest(
		id: $id
		updatedTest: {
			date: $date
      weekNumber: $weekNumber
      test: $test
      result: $result
      athlete: $athlete
		}
	) {
		id
	}
}
`

export const DELETE_TEST = gql `
mutation DELETE_TEST($id: ID!) {
	deleteTest(id: $id) {
		id
		message
		success
	}
}
`