import React, { Component } from 'react';
import {
    Button, Typography
} from "@material-ui/core";
import ReactPaginate from 'react-paginate';
import Moment from 'react-moment';
import { GetOrderDetails } from '../../../../../services';


export default class Editorder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cartproduct: null,
        };
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


    async componentDidMount() {


        // Récupérez le dernier segment de l'URL ici et effectuez la requête pour les détails de la commande
        window.scrollTo(0, 0)
        let url = window.location.href.split('/');
        var lastSegment = url.pop() || url.pop();
        console.log('id',lastSegment)
        let list = await GetOrderDetails.getOrderProductById(lastSegment);
        console.log('list', list);
        this.setState({ cartproduct: list.data });
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
 
       
        const { cartproduct, } = this.state;
        return (
            <div>
                <main>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-5 col-md-9 col-lg-6">
                                <h2 className="mt-30 page-title">Commandes</h2>
                            </div>
                            <div className="col-lg-5 col-md-3 col-lg-6 back-btn">
                                <Button variant="contained" onClick={(e) => this.handleBack()}><i class="fas fa-arrow-left" /> Back</Button>
                            </div>
                        </div>
                        <ol className="breadcrumb mb-30">
                            <li className="breadcrumb-item"><a href="/">Dashboard</a></li>
                            <li className="breadcrumb-item"><a href="/admin/order/list">Listes Commandes </a></li>
                        </ol>
                        <div className="row">

                            <div className="col-xl-12 col-md-12">
                                <div className="card card-static-2 mb-30">
                                
                                    <div className="invoice-content">
                                        <div className="row">

                                            <div className="col-lg-12 col-md-12">
                                                <div className="card card-static-2 mt-30 mb-30">
                                                    <div className="card-title-2 ml-3">
                                                        <h4>Liste des Commandes</h4>
                                                    </div>
                                                    <div className="card-body-table m-2">
                                                        <div className="order-body10">
                                                          
                                        <div className="col-lg-12 col-md-12">
                                            {cartproduct ? (
                                                <div className="pdpt-bg">
                                                   
                                                    <div className="order-body10">
                                                        <div className="table-responsive">
                                                            <table className="table ucp-table table-hover">
                                                                <thead>
                                                                    <tr>
                                                                        <th style={{ width: 50 }}>#</th>
                                                                        <th>Image</th>
                                                                        <th>Nom_Produit</th>
                                                                        <th style={{ width: 150 }} className="text-center">Couleur</th>
                                                                        <th style={{ width: 50 }} className="text-center">Taille</th>
                                                                        <th style={{ width: 150 }} className="text-center">Prix</th>
                                                                        <th style={{ width: 150 }} className="text-center">Qty</th>
                                                                        <th style={{ width: 150 }} className="text-center">NomF</th>
                                                                        <th style={{ width: 150 }} className="text-center">ContactF</th>
                                                                        <th style={{ width: 150 }} className="text-center">AdresseF</th>
                                                                        <th style={{ width: 100 }} className="text-center">Total</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {cartproduct.Carts.map((p, index) => (
                                                                        <tr key={index}>
                                                                            <td>{p.id}</td>
                                                                            <td>
                                                                                <img src={p.photo} alt="cartimage" style={{ height: '50px' }} />
                                                                            </td>
                                                                            <td>{p.name}</td>
                                                                            <td className="text-center">{p.couleur} Fcfa</td>
                                                                            <td className="text-center">{p.taille}</td>
                                                                            <td className="text-center">{p.price} Fcfa</td>
                                                                            <td className="text-center">{p.qty}</td>
                                                                            <td className="text-center">{p.nomF}</td>
                                                                            <td className="text-center">{p.contactF}</td>
                                                                            <td className="text-center">{p.localF}</td>
                                                                            <td className="text-center">{p.total} Fcfa </td>
                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                            </table>
                                                        </div>

                                                    </div>
                                                </div>
                                            ) : (
                                                <p>Loading...</p>
                                            )}
                                        </div>
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
