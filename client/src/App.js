import React from 'react';
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect
} from 'react-router-dom';
import {ApolloClient} from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';
import {createUploadLink} from 'apollo-upload-client';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {Container, Row} from 'react-bootstrap';

import Header from './components/Header';

import HomeContainer from './pages/Home';
import VideoContainer from './pages/Video';
import NotFoundContainer from './pages/NotFound';
import {serverURL} from './constants';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


const client = new ApolloClient({
	cache: new InMemoryCache(),
	link: createUploadLink({
		uri: `${serverURL}/graphql/`,
	})
});

function App() {
	return (
		<ApolloProvider client={client}>
			<Router>
				<Container className="App">
					<Header/>
					<Row>
						<Switch>
							<Route exact path="/" component={HomeContainer}/>
							<Redirect exact path="/home" to="/"/>
							<Route path="/video" component={VideoContainer}/>
							<Route path="/not-found" component={NotFoundContainer}/>
							<Redirect from="*" to="/not-found"/>
						</Switch>
					</Row>
				</Container>
			</Router>
		</ApolloProvider>
	);
}

export default App;
