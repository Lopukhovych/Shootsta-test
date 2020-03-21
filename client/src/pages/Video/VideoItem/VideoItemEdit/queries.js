import {gql} from 'apollo-boost';

export const EDIT_FILE = gql`
  mutation editVideo($id: ID, $file: Upload, $title: String, $description: String) {
	  editVideo(id: $id, file: $file, title: $title, description: $description) {
	    id, 
	    location,
	    title,
	    description
	  }
  }
`;