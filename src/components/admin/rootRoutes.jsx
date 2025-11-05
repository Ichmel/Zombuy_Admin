import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import Header from './header';
import Home from './dashboard';
import SideBar from './sidebar';
import Shop from './view/shop';
import Product from './view/product'
import Category from './view/category';
//import Areas from './view/areas';
//import Location from './view/location';
import Order from './view/order';
import Customer from './view/customer';
import User from './view/user';
import Payment from './view/payment';
//import VendorProduct from './view/shop/product';
import OrderGros from './view/orderGros';
import ProductGros from './view/productgros';
import Serblog from './view/services_blogs';
import Commercial from './view/commercial';



export default class rootRoutes extends Component {
  render() {
    const { match } = this.props;
    return (
      <main>
        <Header />
        <div id="layoutSidenav">
          <SideBar />
         
            <Switch>
              <Route exact path={[`${match.path}/admin`, `${match.path}`]} component={Home} />
              <Route path={`${match.path}/shop`} component={Shop} />
              <Route path={`${match.path}/category`} component={Category} />
             <Route path={`${match.path}/product`} component={Product} />
             <Route path={`${match.path}/customer`} component={Customer} />
             <Route path={`${match.path}/payment`} component={Payment} />
             <Route path={`${match.path}/order`} component={Order} />

             <Route path={`${match.path}/productgros`} component={ProductGros} />
             <Route path={`${match.path}/ordergros`} component={OrderGros} />
             <Route path={`${match.path}/serblog`} component={Serblog} />
            <Route path={`${match.path}/commercial`} component={Commercial} /> 
            <Route path={`${match.path}/user`} component={User} />

            </Switch>
          </div>
       
      </main>
    );
  }
}