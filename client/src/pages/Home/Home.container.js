import React from 'react';
import VideoListContainer from '../Video/VideoList';
import {Container} from "react-bootstrap";

const HomeContainer = () => {
	return (
		<Container>
			<VideoListContainer />
		</Container>
	);
};

export default HomeContainer;