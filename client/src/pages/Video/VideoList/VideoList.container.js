import React, {useCallback} from 'react';
import {useQuery} from "@apollo/react-hooks";
import {LOAD_VIDEOS_LIST} from './queries';
import {Container, Spinner, Alert, Button, Image, Table} from "react-bootstrap";
import {Link, Redirect, useHistory} from 'react-router-dom';


import {serverURL} from '../../../constants';

import './VideoList.styles.css';

function stopPropagation(event) {
	event.stopPropagation();
}

function retrieveDataList(videos, goToVideo) {
	return videos.map(({id, title, description, preview}) => (
		<tr  key={id} className="video-table-item__wrapper" data-id={id} onClick={goToVideo} >
			<td>
				<Image className="videoThumbnailImg" src={`${serverURL}/${preview}`} thumbnail />
			</td>
			<td className="video-table-item__text-field">{title}</td>
			<td className="video-table-item__text-field">{description}</td>
			<td onClick={stopPropagation}>
				<Link to={`/video/item/${id}/edit/`}>Edit</Link>
			</td>
		</tr>
	));
}

const VideoListContainer = () => {
	const history = useHistory();
	let content;
	const {loading, error, data} = useQuery(LOAD_VIDEOS_LIST, {
		fetchPolicy: 'network-only'
	});

	const goToVideo = useCallback((event)=> {
		const videoId = event.currentTarget.dataset.id;
		if (+videoId) history.push(`/video/item/${videoId}`);
	} , [history]);

	if (data && data.videos) {
		if (!data.videos.length) {
			content = (<div>
				<p>Video list is empty, so add one</p>
				<Button as={Link} to="/video/upload">Add Video</Button>
			</div>);
		} else {
			content = (
				<Table responsive="sm">
					<thead>
					<tr>
						<th />
						<th>Title</th>
						<th>Description</th>
						<th />
					</tr>
					</thead>
					<tbody>
				{retrieveDataList(data.videos, goToVideo)}
				</tbody>
			</Table>
			);
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
		<Container className="col-12">
			{content}
		</Container>
	);
};

export default VideoListContainer;