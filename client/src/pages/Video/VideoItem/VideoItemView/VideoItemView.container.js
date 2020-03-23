import React from 'react';
import {useMutation,} from "@apollo/react-hooks";
import {Redirect, Link} from "react-router-dom";
import {Container, Button} from "react-bootstrap";
import ReactPlayer from 'react-player'
import VideoErrorMessage from "../../../../components/VideoErrorMessage";
import {serverURL} from '../../../../constants';

import {REMOVE_VIDEO_BY_ID} from "../queries";

import './VideoItemView.styles.css';

function displayVideoData({id, title, description, location}, deleteVideo) {
	return (
		<div className="col-12 videoItemBlock">
			<div className="col-xs-12 col-md-7 videoItemContent">
				<h3>{title}</h3>
				<p>{description}</p>
			</div>
			<div className='col-xs-12 col-md-5 videoItemPlayerWrapper'>
				<div className="videoItemPlayerControls">
					<Button as={Link} to={`/video/item/${id}/edit`}>Edit</Button>
					<Button onClick={() => deleteVideo({variables: {id}})} variant="danger">Delete</Button>
				</div>
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
		</div>
	);
}


const VideoItemViewContainer = ({video}) => {
	const [deleteVideo, {data: deletedVideo}] = useMutation(REMOVE_VIDEO_BY_ID);

	if (deletedVideo && deletedVideo.deleteVideo) {
		const {success, error: deleteError} = deletedVideo.deleteVideo;
		if (success) return <Redirect to="/"/>;
		if (deleteError) return <VideoErrorMessage error={deleteError}/>
	}

	return (
		<Container className="col-12 videoListWrapper">
			{displayVideoData(video, deleteVideo)}
		</Container>
	);
};

export default VideoItemViewContainer;