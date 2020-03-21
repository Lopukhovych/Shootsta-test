import React, {useState} from 'react';
import {useMutation} from "@apollo/react-hooks";
import {Container} from 'react-bootstrap';
import {useHistory} from "react-router-dom";

import {UPLOAD_FILE} from './queries';
import VideoFormContainer from "../../../components/VideoForm";
import VideoErrorMessage from '../../../components/VideoErrorMessage';

import './VideoUpload.styles.css';

const VideoUploadContainer = () => {
	const history = useHistory();
	const [videoForm, setVideoForm] = useState({
		title: "",
		description: "",
	});
	const [file, setUploadFile] = useState(null);
	const [error, setUploadFileError] = useState(null);
	const [uploadVideo] = useMutation(UPLOAD_FILE);

	const disabled = !videoForm.title || !file;

	const changeFormInputHandler = (event) => {
		const {value, name} = event.target;
		if (!name) return null;
		setVideoForm({...videoForm, [name]: value});
	};

	const changeFileHandler = (event) => {
		setUploadFile(event.target.files[0]);
	};

	const submitUploadForm = async (e) => {
		e.preventDefault();
		const videoData = {
			file,
			title: videoForm.title,
			description: videoForm.description
		};
		try {
			const {data: {uploadVideo: {id}}, error} = await uploadVideo({
				variables: videoData,
				context: {
					useMultipart: true
				}
			});
			if (id) {
				history.push(`/video/item/${id}`);
				return;
			}
			new Error(error || 'Couldn\'t upload new video');
		} catch (error) {
			setUploadFileError(error);
			console.log('submitUploadForm error: ', error);
		}
	};


	return (
		<Container className='col-12 uploadVideoWrapper'>
			<h3>Upload Video</h3>
			{error && <VideoErrorMessage error={error}/>}
			<div className='col-12 col-md-8'>
				<VideoFormContainer
					submitUploadForm={submitUploadForm}
					changeFormInputHandler={changeFormInputHandler}
					changeFileHandler={changeFileHandler}
					file={file}
					videoForm={videoForm}
					disabled={disabled}
				/>
			</div>
		</Container>
	);
};

export default VideoUploadContainer;