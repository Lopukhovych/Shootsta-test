import React from 'react';
import {Route, Switch, useRouteMatch} from 'react-router-dom';
import VideoUploadContainer from './VideoUpload';
import VideoItemContainer from './VideoItem';
import VideoListContainer from './VideoList';


const VideoContainer = () => {
	let match = useRouteMatch();
	return (
		<Switch>
			<Route exact path={`${match.path}/upload`} component={VideoUploadContainer} />
			<Route path={`${match.path}/item/:id`} component={VideoItemContainer} />
			<Route path={match.path} component={VideoListContainer} />
		</Switch>

	);
};

export default VideoContainer;