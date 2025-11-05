import React, { Component } from 'react'
import {
    Button
} from "@material-ui/core";
import Moment from 'react-moment';
import 'moment/locale/fr';



export default class View extends Component {
    handleBack() {
        this.props.history.goBack();
    }
    render() {
        let self = this.props.location.state
        return (
            <div>
                <main>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-5 col-md-9 col-lg-6">
                                <h2 className="mt-30 page-title">Orders</h2>
                            </div>
                            <div className="col-lg-5 col-md-3 col-lg-6 back-btn">
                                <Button variant="contained" onClick={(e) => this.handleBack()}><i class="fas fa-arrow-left" /> Back</Button>
                            </div>
                        </div>
                        <ol className="breadcrumb mb-30">
                            <li className="breadcrumb-item"><a href="/">Dashboard</a></li>
                            <li className="breadcrumb-item"><a href="/admin">Commande</a></li>
                            <li className="breadcrumb-item active">Details Commande</li>
                        </ol>
                        <div className="row">
                            {self ?
                                <div className="col-xl-12 col-md-12">
                                    <div className="card card-static-2 mb-30">
                                        <div className="card-title-2">
                                            <h2 className="title1458">Facture</h2>
                                            <span className="order-id">Commmande #N° - {self.number}</span>
                                        </div>
                                        <div className="invoice-content">
                                            <div className="row">
                                                <div className="col-lg-6 col-sm-6">
                                                {
                                                        self.Addresses.map((data, index) => (
                                                    <div className="ordr-date">
                                                        <b>Date de Livraison :</b> <Moment locale="fr" format='Do MMMM  YYYY  '>{data.dateL}</Moment>
                                                    </div>
                                                     ))
                                                    }
                                                </div>
                                                <div className="col-lg-6 col-sm-6">
                                                    {
                                                        self.Addresses.map((data, index) => (
                                                            <div className="ordr-date right-text" key={index}>
                                                                <b>Adresse Livraison :</b><br />
                                                                #{data.ville},<br />
                                                                {data.quartier},<br />
                                                                {data.googlemap},<br />
                                                                {data.phone},<br />
                                                                {data.nomCom},<br />
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                                <div className="col-lg-12">
                                                    <div className="card card-static-2 mb-30 mt-30">
                                                        <div className="card-title-2">
                                                            <h4>Commandes  Recent</h4>
                                                        </div>
                                                        <div className="card-body-table">
                                                            <div className="table-responsive">
                                                                <table className="table ucp-table table-hover">
                                                                    <thead>
                                                                        <tr>
                                                                            <th style={{ width: 130 }}>#</th>
                                                                            <th  style={{ width: 150 }}>Image</th>
                                                                            <th  style={{ width: 150 }}>Nom</th>
                                                                            <th style={{ width: 150 }} className="text-center">Prix</th>
                                                                            <th style={{ width: 150 }} className="text-center">Qty</th>
                                                                            <th style={{ width: 100 }} className="text-center">Total</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                    {self.Carts.map(( p,index) => ( 
                                                                          
                                                                          <tr key={index}>
                                                                              <td>{p.id}</td>
                                                                              <td >
                                                                                  <img src={p.photo} alt="cartimage" style={{ height: '50px' }} />
                                                                              </td>
                                                                              <td>
                                                                                  {p.name}
                                                                              </td>
                                                                              <td className="text-center">{p.price} fCFA</td>
                                                                              <td className="text-center">{p.qty} </td>
                                                                              <td className="text-center">{p.total} Fcfa </td>
                                                                          </tr>
                                                                      ))
                                                              
                                                              }
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-7" />
                                                <div className="col-lg-5">
                                                <div className="order-total-dt">
                                                        <div className="order-total-left-text">
                                                            CodeRemise
                                                    </div>
                                                        <div className="order-total-right-text">
                                                         {self.codeBonnus || 'Aucune  Reduction  '}
                                                    </div>
                                                    </div>
                                                <div className="order-total-dt">
                                                        <div className="order-total-left-text">
                                                            Reduction
                                                    </div>
                                                        <div className="order-total-right-text">
                                                         {self.Reduction}
                                                    </div>
                                                    </div>
                                                    <div className="order-total-dt">
                                                        <div className="order-total-left-text">
                                                            Livraison
                                                    </div>
                                                        <div className="order-total-right-text">
                                                         {self.prixlocalite}
                                                    </div>
                                                    </div>
                                                    <div className="order-total-dt">
                                                        <div className="order-total-left-text fsz-18">
                                                             Total à Payer 
                                                    </div>
                                                        <div className="order-total-right-text fsz-18">
                                                            {self.GrandTotal} Fcfa
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-7" />
                                                <div className="col-lg-5">
                                                    <div className="select-status">
                                                        <label htmlFor="status">Status*</label>
                                                        <div className="input-group">
                                                            <div className="status-active">
                                                                {self.status}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                : 'Loading'}
                        </div>
                    </div>
                </main>

            </div>
        )
    }
}
