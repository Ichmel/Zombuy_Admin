import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import View from './view';
import Edit from './edit';
import Editorder from './view/editorder';
import DashEdit from './dasEdith';
import StatusEdit from './StatusEdith';
import Dashboard from './Commercial_Client';



export default class Order extends Component {
    render() {
        const { match } = this.props;
        return (
            <div id="layoutSidenav_content">
                <main>
                    <Switch>
                        <Route path={[`${match.path}/list`]} component={View} />
                        <Route path={[`${match.path}/edit`]} component={Edit} />
                        <Route path={[`${match.path}/editorder`]} component={Editorder} />
                        <Route path={[`${match.path}/dashedit`]} component={DashEdit} />
                        <Route path={[`${match.path}/statusedit`]} component={StatusEdit} />
                        <Route path={[`${match.path}/dashbord`]} component={Dashboard} />
                    </Switch>
                </main>
            </div>
        );
    }
}