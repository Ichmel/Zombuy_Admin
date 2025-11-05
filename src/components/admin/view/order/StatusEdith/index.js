import React, { Component } from 'react';
import {
    Button
} from "@material-ui/core";

import { NotificationManager } from 'react-notifications';
import Moment from 'react-moment';
import { GetOrderDetails } from '../../../../services';
import 'moment/locale/fr'; 

export default class StatusEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.location.state.row.id, status: this.props.location.state.row.status,deliverydate:''
        }
    }
    handleBack() {
        this.props.history.goBack();
    }
    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    handleUpdateStatus = async (event) => {
        let data = { status: this.state.status, id: this.state.id,deliverydate: new Date(this.state.deliverydate) }
        if (data) {
            let update = await GetOrderDetails.getOrderStatusUpdate(data);
            if (update) {
                NotificationManager.success(update.msg, 'Status');
                setTimeout(
                    async function () {
                        window.location.href = "/admin"
                    },
                    1000
                );
            } else {
                NotificationManager.error("Check Status", "Status");
            }
        }
        console.log("Edit -> handleUpdateStatus -> data", data)
    }
    render() {
        let self = this.props.location.state;
        console.log("Edit -> render -> self", self)
        return (
            <div>
                <main>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-5 col-md-9 col-lg-6">
                                <h2 className="mt-30 page-title">Commandes </h2>
                            </div>
                            <div className="col-lg-5 col-md-3 col-lg-6 back-btn">
                                <Button variant="contained" onClick={(e) => this.handleBack()}><i class="fas fa-arrow-left" /> Back</Button>
                            </div>
                        </div>
                        <ol className="breadcrumb mb-30">
                            <li className="breadcrumb-item"><a href="/">Dashboard</a></li>
                            <li className="breadcrumb-item"><a href="/admin">Commandes</a></li>
                            <li className="breadcrumb-item active">Edit</li>
                        </ol>
                        <div className="row">
                            {self.row ?
                                <div className="col-xl-12 col-md-12">
                                    <div className="card card-static-2 mb-30">
                                        <div className="card-title-2">
                                            <h2 className="title1458">Facture</h2>
                                            <span className="order-id">Commmande #N° - {self.row.number}</span>
                                        </div>
                                        <div className="invoice-content">
                                            <div className="row">
                                                <div className="col-lg-4 col-sm-4">
                                                {
                                                        self.row.Addresses.map((data, index) => (
                                                    <div className="ordr-date">
                                                        <b>Date de Livraison :</b> <Moment locale="fr" format='Do MMMM  YYYY  '>{data.dateL}</Moment>
                                                    </div>
                                                     ))
                                                    }
                                                </div>
                                                <div className="col-lg-6 col-sm-6">
                                                    {
                                                        self.row.Addresses.map((data, index) => (
                                                            <div className="ordr-date right-text" key={index}>
                                                                <b>Adresse de Livraison :</b><br />
                                                                {data.nomCom},<br />
                                                                {data.phone},<br />
                                                                {data.ville},<br />
                                                                {data.quartier},<br />
                                                                {data.googlemap},<br />                 
                                                               
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                                <div className="col-lg-12">
                                                    <div className="card card-static-2 mb-30 mt-30">
                                                        <div className="card-title-2">
                                                            <h4>Commande Recent </h4>
                                                        </div>
                                                        <div className="card-body-table">
                                                            <div className="table-responsive">
                                                                <table className="table ucp-table table-hover">
                                                                    <thead>
                                                                        <tr>
                                                                            <th style={{ width: 130 }}>#</th>
                                                                            <th style={{ width: 150 }}>Image</th>
                                                                            <th style={{ width: 150 }} className="text-center" >Nom</th>
                                                                            <th style={{ width: 150 }} className="text-center">PrixF</th>
                                                                            <th style={{ width: 150 }} className="text-center">NomF</th>
                                                                            <th style={{ width: 150 }} className="text-center">ContactF</th>
                                                                            <th style={{ width: 150 }} className="text-center">AdresseF</th>
                                                                            <th style={{ width: 150 }} className="text-center">LocaF</th>
                                                                            <th style={{ width: 150 }} className="text-center">Prix</th>
                                                                            <th style={{ width: 150 }} className="text-center">Qty</th>
                                                                            <th style={{ width: 100 }} className="text-center">Total</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {self.row.Carts.map(( p,index) => ( 
                                                                          
                                                                                    <tr key={index}>
                                                                                        <td>{p.id}</td>
                                                                                        <td >
                                                                                            <img src={p.photo} alt="cartimage" style={{ height: '50px' }} />
                                                                                        </td>
                                                                                        <td>
                                                                                            {p.name}
                                                                                        </td>
                                                                                        <td className="text-center">{p.prixF} </td>
                                                                                        <td className="text-center">{p.nomF} </td>
                                                                                        <td className="text-center">{p.contactF} </td>
                                                                                        <td className="text-center">{p.localF} </td>
                                                                                        <td className="text-center">{p.adresseF} </td>
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
                                                            Livraison
                                                    </div>
                                                        <div className="order-total-right-text">
                                                         {self.row.prixlocalite}
                                                    </div>
                                                    </div>
                                                    <div className="order-total-dt">
                                                        <div className="order-total-left-text fsz-18">
                                                             Total à Payer 
                                                    </div>
                                                        <div className="order-total-right-text fsz-18  ">
                                                            {self.row.GrandTotal} Fcfa
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-7" />
                                                <div className="col-lg-5">
                                                    <div className="select-status">
                                                        <label htmlFor="status">Date Livré*</label>
                                                        <div className="input-group">
                                                            <input className="custom-select" type="date" name="deliverydate" value={this.state.deliverydate} onChange={(e) => this.handleChange(e)}/>
                                                        </div>
                                                    </div>
                                                    <div className="select-status">
                                                        <label htmlFor="status">Status*</label>
                                                        <div className="input-group">
                                                            <select id="status" name="status" className="custom-select" value={this.state.status} onChange={(e) => this.handleChange(e)}>
                                                                <option value="processing">Traitement</option>
                                                                <option value="Livraison">Expedition</option>
                                                                <option value="Livre">Livre</option>
                                                                <option value="Annuler">Anuler</option>
                                                            </select>
                                                            <div className="input-group-append">
                                                                <button className="status-btn hover-btn" type="submit" onClick={this.handleUpdateStatus}>Submit</button>
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
