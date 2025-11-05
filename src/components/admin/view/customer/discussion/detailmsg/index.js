import React, { Component } from 'react';
import {
    Button, Typography
} from "@material-ui/core";
import ReactPaginate from 'react-paginate';
import Moment from 'react-moment';
import { GetCustomerDetails } from '../../../../../services';


export default class DetailMsg extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: '',
            getListcust: [],
            getListadmin: [],
            getList: [],
            loading: false

        };
    }


    handleBack() {
        this.props.history.goBack();
    }


    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
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



    async getMessageProduit() {
        // Récupérez le dernier segment de l'URL ici et effectuez la requête pour les détails de la commande
        let url = window.location.href.split('/');
        var lastSegment = url.pop() || url.pop();
        this.setState({ email: lastSegment });


        console.log('email1', lastSegment)
        let list = await GetCustomerDetails.getProduiList(lastSegment);
        console.log('listclient', list);
        this.setState({ getList: list.data, loading: true });
    }



    async getMessageCustomer() {
        // Récupérez le dernier segment de l'URL ici et effectuez la requête pour les détails de la commande
        window.scrollTo(0, 0)
        let url = window.location.href.split('/');
        var lastSegment = url.pop() || url.pop();
        console.log('email2', lastSegment)
        let list = await GetCustomerDetails.getMessageCustList(lastSegment);
        console.log('list', list);
        this.setState({ getListcust: list.data });
    }


    async getMessageAdmin() {
        window.scrollTo(0, 0)
        let url = window.location.href.split('/');
        var lastSegment = url.pop() || url.pop();
        console.log('emailadim', lastSegment)
        let list = await GetCustomerDetails.getMessageAdminList(lastSegment);
        console.log('listadmin', list);
        this.setState({ getListadmin: list.data })
    }


    async componentDidMount() {

        this.getMessageAdmin();
        this.getMessageCustomer();
        this.getMessageProduit();
    }

    handleSubmit = async () => {
        let url = window.location.href.split('/');
        var lastSegment = url.pop() || url.pop();
        this.setState({ email: lastSegment });

        let { message, email } = this.state;

        let data = { message: message, email: email, };
        console.log('mesage', data)
        let list = await GetCustomerDetails.createmsgList(data);
        if (list) {
            this.getMessageAdmin()
        }
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


        const { getList, getListadmin, getListcust } = this.state;

        return (
            <div>
                <main>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-5 col-md-9 col-lg-6">
                                <h2 className="mt-30 page-title">Client</h2>
                            </div>
                            <div className="col-lg-5 col-md-3 col-lg-6 back-btn">
                                <Button variant="contained" onClick={(e) => this.handleBack()}><i class="fas fa-arrow-left" /> Back</Button>
                            </div>
                        </div>
                        <ol className="breadcrumb mb-30">
                            <li className="breadcrumb-item"><a href="/">Dashboard</a></li>
                            <li className="breadcrumb-item"><a href="/admin/order/list">Discusion </a></li>
                        </ol>
                        <div className="row">

                            <div className="col-xl-7 col-md-7">
                                <div className="card card-static-2 mb-30">
                                    <div className="invoice-content">
                                        <div className="row">

                                            <div className="col-lg-12 col-md-12 ">
                                                <div className="card card-static-2 mt-30 mb-30">
                                                    <div className="card-title-2 ml-3">
                                                        <h4>Produit du Message  </h4>
                                                    </div>
                                                    <div className="card-body-table m-2">
                                                        <div className="order-body10">

                                                            <div className="col-lg-12 col-md-12">

                                                                <div className="pdpt-bg">

                                                                    <div className="order-body10">
                                                                        <div className="table-responsive">
                                                                            <table className="table ucp-table table-hover">
                                                                                <thead>
                                                                                    <tr>
                                                                                        <th style={{ width: 50 }}>#</th>
                                                                                        <th>Image</th>
                                                                                        <th>Nom_P</th>
                                                                                        <th>qty</th>
                                                                                        <th>prix</th>
                                                                                        <th>Nom_F</th>
                                                                                        <th>prix_F</th>
                                                                                        <th>Contact_F</th>
                                                                                        <th>Adresse_F</th>
                                                                                       
                                                                                        <th>Created At</th>
                                                                                    </tr>
                                                                                </thead>
                                                                                <tbody>
                                                                                    {getList.map((row, index) => (
                                                                                        <tr key={index}>
                                                                                            <td>{row.id}</td>
                                                                                            <td>
                                                                                                <img src={row.photo} alt="product-name" height="65px" />
                                                                                            </td>
                                                                                            <td>{row.nomprod}</td>
                                                                                            <td>{row.qty}</td>
                                                                                            <td>{row.prix} </td>
                                                                                           
                                                                                            <td>{row.nomF} </td>
                                                                                            <td>{row.prixF}</td>
                                                                                            <td>{row.contactF} </td>
                                                                                             <td>{row.localF} </td>
                                                                                           
                                                                                           
                                                                                            <td style={{widh:'120px'}}>
                                                                                                {/* Format the date using Moment */}
                                                                                                <Moment format="DD-MM-YYYY HH:mm:ss">{row.createdAt}</Moment>
                                                                                            </td>
                                                                                        </tr>
                                                                                    ))}

                                                                                </tbody>
                                                                            </table>
                                                                        </div>
                                                                    </div>
                                                                </div>

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

                            <div className="col-xl-5 col-md-5 ">
                                <div className="card card-static-2 mb-30">
                                    
                                    <div className="invoice-content">
                                        <div className="row">

                                            <div className="col-lg-12 col-md-12">
                                                <div className="card card-static-2 mt-30 mb-30">
                                                    <div className="card-title-2 ml-3">
                                                        <h4>Message  </h4>
                                                    </div>

                                                    <div className="card m-2">
                                                        <div className='row p-4'>
                                                            <div className='col-xl-5' >
                                                                <h4 className='titlemg' > Client </h4>
                                                                {getListcust.map((row, index) => (
                                                                    <div className='msgclient m-2' key={index} >
                                                                        <h7>{row.message}  </h7>
                                                                        <p>  <Moment format="DD-MM-YYYY HH:mm:ss">{row.createdAt}</Moment></p>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                            <div className='col-xl-2'>

                                                            </div>
                                                            <div className='col-xl-5' >
                                                                <h4 className='titlemg' >Admin  </h4>
                                                                {getListadmin.map((row, index) => (
                                                                    <div className='msgadmin m-2' key={index}>
                                                                        <h7>{row.message}  </h7>
                                                                        <p>    <Moment format="DD-MM-YYYY HH:mm">{row.createdAt}</Moment> </p>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>

                                                        <div className="order-body10 p-3">
                                                            <div className="row d-flex align-items-center">
                                                                <div className="col-lg-8 col-md-3">
                                                                    <div className="form-group w-100">
                                                                        <input
                                                                            type="text"
                                                                            className="form-control"
                                                                            placeholder="Message"
                                                                            name="message"
                                                                            value={this.state.message}
                                                                            onChange={(e) => this.handleChange(e)}
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-2 col-md-2 mb-4">
                                                                    <button className="save-btn hover-btn" type="submit" onClick={this.handleSubmit}>
                                                                        envoyer
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
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
