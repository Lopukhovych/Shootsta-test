import {gql} from 'apollo-boost';

export const UPLOAD_FILE = gql`
 mutation uploadVideo($file: Upload!, $title: String, $description: String) {
  uploadVideo(file: $file, title: $title, description: $description) {
    id
  }
}`;