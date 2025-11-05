import React, { Component } from 'react';
import rootRoutes from './components/admin/rootRoutes';
import NoMatch from './components/nomatch';
import {Switch, Route, BrowserRouter } from 'react-router-dom';
import { NotificationContainer } from "react-notifications";
import "react-notifications/lib/notifications.css";
import Signin from './components/auth/login';
import Register from './components/auth/register';

export default class App extends Component {
	render() {
		return (
			
				<div className="App">
			
				{/*	<NotificationContainer /> */}
					<BrowserRouter>
						<Switch>
							<Route path='/adminlogin' component={Signin} />
							<Route path='/adminregister' component={Register } />
							<Route path='/admin' component={rootRoutes} />
							<Route component={NoMatch} />
						</Switch>
					</BrowserRouter>
				</div>
			
		);
	}
}
