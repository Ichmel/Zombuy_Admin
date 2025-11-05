import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import ListesCommercials from './Listes _commercials';
import ListsePrimes from './Listes_Primes';
import DetailsPrimes from './Listes_Primes/DetailPrime';
import DetailsAll from './Listes_Primes/detailAll';


export default class Commercial extends Component {
    render() {
        const { match } = this.props;
        return (
            <div id="layoutSidenav_content">
                <main>
                    <Switch>
                        < Route path={[`${match.path}/list`]} component={ListesCommercials } />
                       <Route path={[`${match.path}/listeprime`]} component={ListsePrimes } />
                       <Route path={[`${match.path}/detailprime`]} component={DetailsPrimes } />
                       <Route path={[`${match.path}/detailall`]} component={DetailsAll } />
                      
                    </Switch>
                </main>
            </div>
        );
    }
}