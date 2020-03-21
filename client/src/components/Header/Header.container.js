import React from 'react';
import {Nav, Navbar} from 'react-bootstrap';
import {Link} from 'react-router-dom';

const HeaderContainer = () => {
	return (
		<Navbar bg="light" variant="light" className="mb-3">
			<Nav.Link as={Link} to="/">Home</Nav.Link>
			<Nav.Link as={Link} to="/video/upload">Upload Video</Nav.Link>
		</Navbar>
	);
};

export default HeaderContainer;