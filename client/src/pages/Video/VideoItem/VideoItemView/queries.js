import {gql} from "apollo-boost";

export const REMOVE_VIDEO_BY_ID = gql`
	mutation deleteVideo($id: ID) {
    deleteVideo(id: $id) {
      success,
      error
    }
	}
`;