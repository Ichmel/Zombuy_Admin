import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import List from './list';
import Createproduct from './create';
import MultiCreateproduct from './multicreate';
import Editcat from './edit';
import Uploadphoto from './product-slider';
import Edit from './product-slider/edit';

export default class Product extends Component {
    render() {
        const { match } = this.props;
        return (
            <div id="layoutSidenav_content">
                <main>
                    <Switch>
                        <Route path={[`${match.path}/create`]} component={Createproduct} /> 
                         <Route path={[`${match.path}/list`]} component={List} />
                         <Route path={[`${match.path}/more-photo`]} component={Uploadphoto} /> 
                         <Route path={[`${match.path}/multicreate`]} component={MultiCreateproduct} /> 
                         <Route path={[`${match.path}/edit`]} component={Editcat} />
                         <Route path={[`${match.path}/editphoto`]} component={Edit} />
                        
                    </Switch>
                </main>
            </div>
        );
    }
}