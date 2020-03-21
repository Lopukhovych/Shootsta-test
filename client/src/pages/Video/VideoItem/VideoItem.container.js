import React from 'react';
import {Route, Switch} from 'react-router';
import {Redirect, useParams, useRouteMatch} from "react-router-dom";
import VideoItemEditContainer from "./VideoItemEdit";
import VideoItemViewContainer from "./VideoItemView";
import {useQuery} from "@apollo/react-hooks";
import {LOAD_VIDEO_BY_ID} from "./queries";
import Spinner from '../../../components/Spinner';
import VideoErrorMessage from '../../../components/VideoErrorMessage';

const VideoItemContainer = () => {
	let match = useRouteMatch();
	const {id} = useParams();
	const {loading, error, data} = useQuery(LOAD_VIDEO_BY_ID, {
		variables: {id},
	});

	if (data && data.video) {
		return (
			<Switch>
				<Route
					path={`${match.path}/edit`}
					render={(props) => <VideoItemEditContainer {...props} video={data.video}/>}
				/>
				<Route
					path={`${match.path}/`}
					render={(props) => <VideoItemViewContainer {...props} video={data.video}/>}
				/>
				<Redirect from="*" to="/not-found"/>
			</Switch>
		);
	} else if (error) {
		return <VideoErrorMessage error={error}/>
	} else if (loading) {
		return <Spinner/>
	} else {
		return <Redirect to="/not-found"/>;
	}

};

export default VideoItemContainer;