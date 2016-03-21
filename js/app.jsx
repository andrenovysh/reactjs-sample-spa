import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, IndexLink, Link, hashHistory } from 'react-router';

import { activeLink, contentCentered, blurIn, blurOut, flexCenter } from './styles';

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
						<ul>
							<li><IndexLink to='/' activeStyle={activeLink}>Home</IndexLink></li>
							<li><Link to='records'activeStyle={activeLink}>Records</Link></li>
							<li><Link to='records/new' activeStyle={activeLink}>Create new record</Link></li>
							<li><Link to='about' activeStyle={activeLink}>About</Link></li>
							<li><Link to='notfound'>Link to not found</Link></li>
						</ul>
					</div>
					<div style={flexCenter}>{this.props.children}</div>
				</div>;
	}
}

let Home = () => {
	return <h1>React sample SPA application</h1>;
}

let About = () => {
	return <h1>Just small demo project.</h1>;	
}

let NotFound = () => {
	return <h1>Oops. Something was there. Or not...</h1>;
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