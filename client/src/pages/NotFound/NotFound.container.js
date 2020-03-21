import React from 'react';
import {Button, Container} from "react-bootstrap";
import {Link} from "react-router-dom";

const NotFoundContainer = () => {
	return (
		<Container>
			<h4>Content was not found(</h4>
			<Button as={Link} to="/">Go home</Button>
		</Container>
	);
};

export default NotFoundContainer;