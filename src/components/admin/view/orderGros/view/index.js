import React, { Component } from 'react'
import {
    Button, Typography
} from "@material-ui/core";
import ReactPaginate from 'react-paginate';
import Moment from 'react-moment';
import { GetOrderDetails } from '../../../../services';
import { Link } from 'react-router-dom';

export default class View extends Component {
    constructor(props) {
        super(props);
        this.state = {
            getList: [], selectedProduct: '', isloaded: false, limit: 20,
            offset: 0,
            perPage: 30,
            orgtableData: [],
            currentPage: 0
           
        }
    }
    


    handleBack() {
        this.props.history.goBack();
    }


    formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;
        return [year, month, day].join('-');
    }
    async getProductList() {
        this.setState({ isloaded: false })
        let list = await GetOrderDetails.getAdressList();
        if (list) {
            var tdata = list.order;
            var slice = tdata.slice(this.state.offset, this.state.offset + this.state.perPage)
            this.setState({
                pageCount: Math.ceil(tdata.length / this.state.perPage),
                orgtableData: tdata,
                getList: slice,
                isloaded: true
            })
        }
    }
    async componentDidMount() {
        this.getProductList();
    }


    handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;

        this.setState({
            currentPage: selectedPage,
            offset: offset
        }, () => {
            this.loadMoreData()
        });

    };

    render() {
        const { getList, selectedProduct, isloaded } = this.state;
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
                            <li className="breadcrumb-item active">Orders</li>
                            <li className="breadcrumb-item"><a href="/admin/order/edit">Orders Edit</a></li>
                        </ol>
                        <div className="row">
                           
                                <div className="col-xl-12 col-md-12">
                                    <div className="card card-static-2 mb-30">
                                        <div className="card-title-2">
                                            <h2 className="title1458">Invoice</h2>
                                            <span className="order-id">Order #ORDR-</span>
                                        </div>
                                        <div className="invoice-content">
                                            <div className="row">
                                                <div className="col-lg-6 col-sm-6">
                                                    <div className="ordr-date">
                                                        <b>Order Date :</b> <Moment format='MMMM Do YYYY'></Moment>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 col-sm-6">
                                                   
                                                            <div className="ordr-date right-text" >
                                                                <b>Order Date :</b><br />
                                                               
                                                            </div>
                                                      
                                                </div>
                                              
                    <div className="col-lg-12 col-md-12">
                        <div className="card card-static-2 mt-30 mb-30">
                            <div className="card-title-2 ml-3">
                                <h4>Liste des Commandes</h4>
                            </div>
                            <div className="card-body-table m-2">
                                <div className="table-responsive">
                                    <table className="table ucp-table table-hover">
                                        <thead>
                                            <tr>
                                                <th style={{ width: 60 }}>Id</th>
                                                <th>Nom</th>
                                                <th>Numero</th>
                                                <th>Pays</th>
                                                <th>Villes</th>
                                                <th>Quartier</th>
                                                <th>Prix_Achat</th>
                                                <th>Date_Commande</th>
                                                <th>Data_Livraison</th>
                                                <th>Identifiant_Utilisateur</th>

                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        { 
                                                getList.map((row, index) => (
                                                    <tr key={index}>
                                                        <td>{row.id}</td>
                                                        <td>{row. nomCom}</td>
                                                        <td>{row.phone}</td>
                                                        <td>{row.ville}</td>
                                                        <td>{row.quartier}</td>
                                                        <td>{row.adresse}</td>
                                                        <td>{row.Order ? row.Order.grandtotal: ''}</td>
                                                        <td>  <span className="delivery-time">{this.formatDate(row.createdAt)}</span></td>
                                                         <td>{row.deliverydate}</td>
                                                        <td></td>
                                                        <td className="action-btns d-flex gap-2">
                                                            <Link to={{
                                                                pathname: `/admin/product/edit`,
                                                                state: { row }
                                                            }}>
                                                                <Typography className="edit-btn"><i className="fas fa-edit" /></Typography>
                                                            </Link>
                                                            <Typography className="delete-btn" onClick={(e) => this.handlDeleteById(row.id)} ><i className="fas fa-trash-alt" /></Typography>
                                                        </td>
                                                    </tr>
                                                ))
                                               

                                            }
                                          
                                        </tbody>
                                    </table>
                                </div>
                                <ReactPaginate
                                    previousLabel={"prev"}
                                    nextLabel={"next"}
                                    breakLabel={"..."}
                                    breakClassName={"break-me"}
                                    pageCount={this.state.pageCount}
                                    marginPagesDisplayed={2}
                                    pageRangeDisplayed={5}
                                    onPageChange={this.handlePageClick}
                                    containerClassName={"pagination"}
                                    subContainerClassName={"pages pagination"}
                                    activeClassName={"active"} />
                            </div>
                        </div>
                    </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                        </div>
                    </div>
                </main>

            </div>
        )
    }
}
