import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import MainCategory from './main-category';
import List from './list';
import SubCategory from './sub-category';
import SubChildCategory from './child-category';
import Coultail from './Couleur_taille'
import Edit from './main-category/edit'
import Homepub from './homepub';
import Edithome from './homepub/edit';
import Editback from './Couleur_taille/editback';

export default class Category extends Component {
    render() {
        const { match } = this.props;
        return (
            <div id="layoutSidenav_content">
                <main>
                    <Switch>
                        <Route path={[`${match.path}/list`]} component={List} />
                        <Route path={[`${match.path}/main-category`]} component={MainCategory} />
                        <Route path={[`${match.path}/sub-category`]} component={SubCategory} />
                        <Route path={[`${match.path}/child-category`]} component={SubChildCategory} />
                        <Route path={[`${match.path}/coultail-category`]} component={Coultail} />
                        <Route path={[`${match.path}/edit`]} component={Edit} />
                        <Route path={[`${match.path}/homepub`]} component={Homepub} />
                        <Route path={[`${match.path}/edithome`]} component={Edithome} />
                        <Route path={[`${match.path}/editback`]} component={Editback} />

                    </Switch>
                </main>
            </div>
        );
    }
}