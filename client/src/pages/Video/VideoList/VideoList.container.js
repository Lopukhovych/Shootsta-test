import React from 'react';
import {useQuery} from "@apollo/react-hooks";
import {LOAD_VIDEOS_LIST} from './queries';
import {Container, Spinner, Alert, Card, Button} from "react-bootstrap";
import {Link, Redirect} from 'react-router-dom';

import {serverURL} from '../../../constants';

import './VideoList.styles.css';

function retrieveDataList(videos) {
	return videos.map(({id, title, description, preview}) => (
		<div key={id} className="col-md-4 col-sm-6 col-xs-12 mb-2">
			<Card >
				<Card.Img className="videoThumbnailImg" variant="top" src={`${serverURL}/${preview}`} alt='Video thumbnail'/>
				<Card.Body>
					<Card.Title>{title}</Card.Title>
					<Card.Text>
						{description}
					</Card.Text>
					<Button as={Link} to={`/video/item/${id}`}>Go to video</Button>
				</Card.Body>
			</Card>
		</div>
	));
}

const VideoListContainer = () => {
	let content;
	const {loading, error, data} = useQuery(LOAD_VIDEOS_LIST, {
		fetchPolicy: 'network-only'
	});

	if (data && data.videos) {
		if (!data.videos.length) {
			content = (<div>
				<p>Video list is empty, so add one</p>
				<Button as={Link} to="/video/upload">Add Video</Button>
			</div>);
		} else {
			content = retrieveDataList(data.videos);
		}
	} else if (error) {
		content = (
			<Alert variant={'danger'}>
				{error}
			</Alert>
		);
	} else if(loading) {
		content = (
			<Spinner animation="border" role="status">
				<span className="sr-only">Loading...</span>
			</Spinner>
		);
	} else {
		return <Redirect to="/not-found"/>;
	}
	return (
		<Container className="col-12 videoListWrapper">
			{content}
		</Container>
	);
};

export default VideoListContainer;