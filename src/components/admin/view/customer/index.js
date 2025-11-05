import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import View from './view';

import Discussion from './discussion';
import DetailMsg from './discussion/detailmsg';

export default class Customer extends Component {
    render() {
        const { match } = this.props;
        return (
            <div id="layoutSidenav_content">
                <main>
                    <Switch>
                        <Route path={[`${match.path}/list`]} component={View} />
                        
                        <Route path={[`${match.path}/discu`]} component={Discussion} />
                        <Route path={[`${match.path}/detailmsg`]} component={DetailMsg} />
                    </Switch>
                </main>
            </div>
        );
    }
}