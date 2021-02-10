import gql from 'graphql-tag'

export const UPLOAD_FILE = gql `
mutation UPLOAD_FILE($file: Upload!) {
  imageUploader(file: $file)
}
`