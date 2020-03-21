import React from 'react';
import {Spinner} from "react-bootstrap";

import './Spinner.styles.css';

const LoadingSpinner = () => {
	return (
		<div className="spinnerCenter">
			<Spinner animation="border" role="status">
				<span className="sr-only">Loading...</span>
			</Spinner>
		</div>
	);
};

export default LoadingSpinner;