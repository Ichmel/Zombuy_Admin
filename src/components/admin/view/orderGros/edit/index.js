import React, { Component } from 'react';
import {
    Button, Typography
} from "@material-ui/core";
import ReactPaginate from 'react-paginate';
import Moment from 'react-moment';
import { GetOrderDetails } from '../../../../services';
import { Link } from 'react-router-dom';


const Arrays = (data, fieldName, fieldValue) => {
    let arrayItem = [];
    if (data && Array.isArray(data)) {
        data.map((item, key) => {
            arrayItem.push({ label: ++key + '--' + item[fieldName], value: item[fieldValue] });
            return null;
        });
    }
    return arrayItem;
};

export default class Edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            getList: [],
            getdata: [],
            offset: 0,
            perPage: 20,
            orgtableData: [],
            currentPage: 0

        }
    }
    handleBack() {
        this.props.history.goBack();
    }
    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }


    async getProductcartList() {
        this.setState({ isLoaded: true })
        let list = await GetOrderDetails.getcartlist();

        this.setState({ getdata: list.order })

    }


    async componentDidMount() {

        this.getProductcartList();
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
        const { selectedProduct, selectedSearchProduct, getdata, loading, isLoaded } = this.state;
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
                            <li className="breadcrumb-item"><a href="/admin/order/list">Orders liste</a></li>
                            <li className="breadcrumb-item active">Order Edit</li>
                        </ol>
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
                                                                    <h4>Liste des Produits Commandés</h4>
                                                                </div>
                                                                <div className="card-body-table m-2">
                                                                    <div className="table-responsive">
                                                                        <table className="table ucp-table table-hover">
                                                                            <thead>
                                                                                <tr>
                                                                                    <th style={{ width: 60 }}>Id</th>
                                                                                    <th>Nom</th>
                                                                                    <th>Numero</th>
                                                                                    <th>Liste_Commandes</th>
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody>
                                                                                {
                                                                                    getdata.map((row, index) => (
                                                                                        row.Carts.length ?

                                                                                            <tr key={index}>
                                                                                                <th style={{ width: 60 }}>{row.id}</th>
                                                                                                
                                                                                                <th>{row.fullname} </th>
                                                                                                <th>{row.phone} </th>

                                                                                                <td>
                                                                                                    <table>
                                                                                                        <thead>
                                                                                                            <tr>
                                                                                                                <th style={{ width: '150px' }}>Photo</th>
                                                                                                                <th >Nom_Produit</th>
                                                                                                                <th >Prix_Unitaire</th>
                                                                                                                <th >Qty</th>
                                                                                                                <th >Taille</th>
                                                                                                                <th >couleur</th>
                                                                                                                <th >Nom_F</th>
                                                                                                                <th >Numero</th>
                                                                                                                <th >Loacal_F</th>
                                                                                                                <th >Action</th>
                                                                                                            </tr>
                                                                                                        </thead>
                                                                                                        <tbody>
                                                                                                            {row.Carts.map((row, index) => (
                                                                                                                <tr key={index}>
                                                                                                                    <td><img src={`http://localhost:4001/${row.photo}`} alt="product-name" height="65px" /></td>
                                                                                                                    <td>{row.name}</td>
                                                                                                                    <td>{row.price}</td>
                                                                                                                    <td>{row.qty}</td>
                                                                                                                    <td>{row.taille}</td>
                                                                                                                    <td>{row.couleur}</td>
                                                                

                                                                                                                </tr>
                                                                                                            ))}
                                                                                                        </tbody>
                                                                                                    </table>

                                                                                                </td>
                                                                                            </tr> : ''

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
                    </div>
                </main>

            </div>
        )
    }
}
