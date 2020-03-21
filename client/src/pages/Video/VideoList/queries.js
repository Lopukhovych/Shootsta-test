import {gql} from 'apollo-boost';

export const LOAD_VIDEOS_LIST = gql`
	query VideoQuery {
  videos {
    id
    title
    description
  }
}
`;