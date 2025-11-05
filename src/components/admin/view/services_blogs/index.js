import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import Blogs from './blogs';
import Services from './services';
import Editphoto from './services/editphoto';
import Editvideo from './services/editvideo';

export default class Serblog extends Component {
    render() {
        const { match } = this.props;
        return (
            <div id="layoutSidenav_content">
                <main>
                    <Switch>
                        <Route path={[`${match.path}/service`]} component={Services} />
                        <Route path={[`${match.path}/blog`]} component={Blogs} />
                        <Route path={[`${match.path}/editphoto`]} component={Editphoto} />
                        <Route path={[`${match.path}/editvideo`]} component={Editvideo} />
                    </Switch>
                </main>
            </div>
        );
    }
}