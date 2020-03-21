import React from 'react';
import {Alert} from 'react-bootstrap';

import './VideoSuccessMessage.styles.css';

const VideoSuccessMessage = ({success}) => {
	return (
		<Alert className="successMessageBlock" variant={'success'}>
			{success}
		</Alert>
	);
};

export default VideoSuccessMessage;
