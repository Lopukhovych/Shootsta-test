import {gql} from 'apollo-boost';

export const LOAD_VIDEO_BY_ID = gql`
	query getVideo($id: ID!) {
  video(id: $id) {
    id
    title
    description
    location
  }
}
`;

export const REMOVE_VIDEO_BY_ID = gql`
	mutation deleteVideo($id: ID) {
    deleteVideo(id: $id) {
      success,
      error
    }
	}
`;
