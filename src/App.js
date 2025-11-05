import React, { Component } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { NotificationContainer } from "react-notifications";
import "react-notifications/lib/notifications.css";

import rootRoutes from "./components/admin/rootRoutes";
import NoMatch from "./components/nomatch";
import Signin from "./components/auth/login";
import Register from "./components/auth/register";

export default class App extends Component {
  render() {
    return (
      <div className="App">
        {/* Notifications */}
        <NotificationContainer />

        <BrowserRouter>
          <Switch>
            {/* Redirige vers la page de login par défaut */}
            <Route exact path="/">
              <Redirect to="/adminlogin" />
            </Route>

            {/* Authentification */}
            <Route path="/adminlogin" component={Signin} />
            <Route path="/adminregister" component={Register} />

            {/* Tableau de bord admin */}
            <Route path="/admin" component={rootRoutes} />

            {/* Page non trouvée */}
            <Route component={NoMatch} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
