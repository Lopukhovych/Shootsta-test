import React, {useState} from 'react';
import {Button, Container, Row} from "react-bootstrap";
import ReactPlayer from "react-player";
import {useApolloClient, useMutation} from "@apollo/react-hooks";
import {useHistory, Link, Redirect} from 'react-router-dom';

import {EDIT_FILE} from "./queries";
import {REMOVE_VIDEO_BY_ID} from '../queries';
import VideoErrorMessage from '../../../../components/VideoErrorMessage';
import VideoSuccessMessage from '../../../../components/VideoSuccessMessage';
import VideoFormContainer from '../../../../components/VideoForm';
import {serverURL} from '../../../../constants';

import './VideoItemEdit.styles.css';

const VideoItemEditContainer = ({video}) => {
	const history = useHistory();
	const {id, title, description, location} = video;
	const apolloClient = useApolloClient();
	const [videoForm, setVideoForm] = useState({
		title: title,
		description: description,
	});
	const [file, setUploadFile] = useState(null);
	const [editVideo, {data: editVideoData}] = useMutation(EDIT_FILE);
	const [deleteVideo, {data: deletedVideo}] = useMutation(REMOVE_VIDEO_BY_ID);

	const disabled = !videoForm.title;
	let editVideoMessage;

	if (editVideoData && editVideoData.editVideo) {
		editVideoMessage = <VideoSuccessMessage success={
			<div>
				Data successfully updated!&nbsp;
				<Link onClick={() => history.goBack()}>Go back</Link>
			</div>
		}/>
	} else if (editVideoData && !editVideoData.editVideo) {
		editVideoMessage = <VideoErrorMessage error="Invalid data, try again"/>
	}

	const changeFormInputHandler = (event) => {
		const {value, name} = event.target;
		if (!name) return null;
		setVideoForm({...videoForm, [name]: value});
	};

	const changeFileHandler = (event) => {
		setUploadFile(event.target.files[0]);
	};

	const submitEditForm = async (e) => {
		e.preventDefault();
		const videoData = {
			id,
			file,
			title: videoForm.title,
			description: videoForm.description
		};
		try {
			await editVideo({
				variables: videoData,
				context: {
					useMultipart: true
				}
			});
			apolloClient.resetStore();
			setUploadFile(null);
		} catch(error) {
			console.log('submitEditForm error: ', error);
		}
	};

	if (deletedVideo && deletedVideo.deleteVideo) {
		const {success, error: deleteError} = deletedVideo.deleteVideo;
		if (success) return <Redirect to="/"/>;
		if (deleteError) return <VideoErrorMessage error={deleteError}/>
	}

	return (
		<Container className='col-12 editVideoWrapper'>
			{editVideoMessage}
			<h3>Edit Video</h3>
			<Row className="d-flex">
				<div className="col-12 col-md-8">
					<VideoFormContainer
						submitUploadForm={submitEditForm}
						changeFormInputHandler={changeFormInputHandler}
						changeFileHandler={changeFileHandler}
						file={file}
						videoForm={videoForm}
						disabled={disabled}
					/>
					<Button onClick={() => deleteVideo({variables: {id}})} variant="danger">Delete</Button>
				</div>
				<div className="col-12 col-md-4 pl-2">
					<h5>Uploaded video</h5>
					<p>If you want to update video, please load new one</p>
					<div className="videoItemPlayerBlock">
						<ReactPlayer
							url={`${serverURL}/${location}`}
							className='videoItemPlayer'
							controls
							muted={false}
							volume={0.5}
							width='100%'
							height='100%'
						/>
					</div>
				</div>
			</Row>
		</Container>
	);
};

export default VideoItemEditContainer;