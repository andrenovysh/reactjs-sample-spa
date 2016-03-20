import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, IndexLink, Link, hashHistory } from 'react-router';

import { activeLink, contentCentered, blurIn, blurOut } from './styles';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from './reducers';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

class App extends React.Component {
	constructor(props) {
		super(props);
		this.displayName = "App";
	}

	render() {
		return 	<div>
					<div>
						<li>
							<ul><IndexLink to='/' activeStyle={activeLink}>Home</IndexLink></ul>
							<ul><Link to='records'activeStyle={activeLink}>Records</Link></ul>
							<ul><Link to='records/new' activeStyle={activeLink}>Create new record</Link></ul>
							<ul><Link to='about' activeStyle={activeLink}>About</Link></ul>
							<ul><Link to='notfound'>Link to not found</Link></ul>
						</li>
					</div>
					<div>{this.props.children}</div>
				</div>;
	}
}

let Home = () => {
	return <div>React sample SPA application</div>;
}

let About = () => {
	return <div>Just small demo project.</div>;	
}

let NotFound = () => {
	return <div>Oops. Something was there. Or not...</div>;
}

import Records from './components/Records.jsx';
import CreateRecord from './components/CreateRecord.jsx';
import RecordDetails from './components/RecordDetails.jsx';

let store = createStore(reducers);

let router = 	<Provider store={store}>
					<Router history={hashHistory}>
						<Route path='/' component={App}>
							<IndexRoute component={Home} />
							<Route path="records" component={Records} />
							<Route path='records/new' component={CreateRecord} />
							<Route path='records/:id' component={RecordDetails} />
							<Route path='about' component={About} />
							<Route path='*' component={NotFound} />
						</Route>
					</Router>
				</Provider>;

render(router, document.getElementById("app"));