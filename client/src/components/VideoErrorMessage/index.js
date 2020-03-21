import React from 'react';
import {Alert} from 'react-bootstrap';

import './VideoErrorMessage.styles.css';

const VideoErrorMessage = ({error}) => {
	return (
		<Alert className="errorMessageBlock" variant={'danger'}>
			{error}
		</Alert>
	);
};

export default VideoErrorMessage;