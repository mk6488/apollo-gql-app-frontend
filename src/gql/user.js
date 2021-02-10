import gql from 'graphql-tag'

export const LOGIN_USER = gql `
query LOGIN_USER($username: String!, $password: String!) {
  loginUser(username: $username, password: $password) {
    user {
      id
      firstName
      lastName
      username
      email
      avatarImage
    }
    token
  }
}
`

export const AUTH_USER = gql `
query AUTH_USER {
	authUser {
		id
		firstName
		lastName
		username
		email
		avatarImage
	}
}
`

export const ALL_USERS = gql `
query ALL_USERS {
	allUsers {
		id
		firstName
		lastName
		username
		email
		avatarImage
	}
}
`

export const GET_USERS_WITH_PAGINATION = gql `
query GET_USERS_WITH_PAGINATION {
	getUsersWithPagination(page: 1, limit: 10) {
		users {
			firstName
			lastName
			username
			email
			avatarImage
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

export const GET_USER_BY_ID = gql `
query GET_USER_BY_ID($id: ID!) {
	getUserById(id: $id) {
		id
		firstName
		lastName
		username
		email
		avatarImage
	}
}
`

export const REGISTER_USER = gql `
mutation REGISTER_USER(
  $username: String!
  $firstName: String!
  $lastName: String!
  $email: String!
  $password: String!
  $avatarImage: String
) {
  registerUser(
    newUser: {
      username: $username
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
      avatarImage: $avatarImage
    }
  ) {
    token
    user {
      id
      firstName
      lastName
      username
      email
      avatarImage
    }
  }
}
`