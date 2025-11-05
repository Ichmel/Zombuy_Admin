import React, { Component } from 'react'
import {
    Typography,Button
} from "@material-ui/core";

import { NotificationManager } from 'react-notifications';
import swal from 'sweetalert';
import { GetCommercialListe  } from '../../../../services';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';


export default class ListesPrimes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            getList: [],isloaded: false, limit: 2,
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
    async getCommercialList() {
        this.setState({ isloaded: false })
        let list = await GetCommercialListe.getAllCommercialList();
        console.log('list',list)
        if (list) {
            var tdata = list.data;
            var slice = tdata.slice(this.state.offset, this.state.offset + this.state.perPage)
            this.setState({
                pageCount: Math.ceil(tdata.length / this.state.perPage),
                orgtableData: tdata,
                getList: slice,
                isloaded: true
            })
        }
           
   
    }

    calculateDaysFromCreation(date) {
        const currentDate = new Date();
        const creationDate = new Date(date);
        const millisecondsPerDay = 24 * 60 * 60 * 1000; // Number of milliseconds in a day

        const daysSinceCreation = Math.floor((currentDate - creationDate) / millisecondsPerDay) % 31  ;

        return daysSinceCreation;
    }
    
    async componentDidMount() {
        this.getCommercialList();
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

    loadMoreData() {
        const data = this.state.orgtableData;

        const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
        this.setState({
            pageCount: Math.ceil(data.length / this.state.perPage),
            getList: slice
        })

    }
    
    async handlDeleteById(id) {
        swal({
            title: "Are you sure?",
            text: "You want to delete Category from the List",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(async (success) => {
                if (success) {
                    let value = await GetCommercialListe.getCommercialDeleteById(id);
                    if (value) {
                        this.getCommercialList();  
                    }
                }
            });
    }


    render() {
        const{ getList } = this.state;
        return (
            <div className="container-fluid">
               <div className="row">
                    <div className="col-lg-5 col-md-9 col-lg-6">
                        <h2 className="mt-30 page-title">Customer</h2>
                    </div>
                    <div className="col-lg-5 col-md-3 col-lg-6 back-btn">
                        <Button variant="contained" onClick={(e) => this.handleBack()}><i class="fas fa-arrow-left" /> Back</Button>
                    </div>
                </div>
                <ol className="breadcrumb mb-30">
                    <li className="breadcrumb-item"><a href="index.html">Dashboard</a></li>
                    <li className="breadcrumb-item active">Commercial</li>
                </ol>
                <div className="row justify-content-between">
                    <div className="col-lg-3 col-md-4">
                        <div className="bulk-section mt-30">
                            <div className="input-group">
                                <select id="action" name="action" className="form-control">
                                    <option selected>Bulk Actions</option>
                                    <option value={1}>Active</option>
                                    <option value={2}>Inactive</option>
                                    <option value={3}>Delete</option>
                                </select>
                                <div className="input-group-append">
                                    <button className="status-btn hover-btn" type="submit">Apply</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-5 col-md-6">
                        <div className="bulk-section mt-30">
                            <div className="search-by-name-input">
                                <input type="text" className="form-control" placeholder="Search" />
                            </div>
                            <div className="input-group">
                                <select id="categeory" name="categeory" className="form-control">
                                    <option selected>Active</option>
                                    <option value={1}>Inactive</option>
                                </select>
                                <div className="input-group-append">
                                    <button className="status-btn hover-btn" type="submit">Search Customer</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-12 col-md-12">
                        <div className="card card-static-2 mt-30 mb-30">
                            <div className="card-title-2">
                                <h4>All Areas</h4>
                            </div>
                            <div className="card-body-table">
                                <div className="table-responsive">
                                    <table className="table ucp-table table-hover">
                                        <thead>
                                            <tr>
                                                <th style={{ width: 60 }}><input type="checkbox" className="check-all" /></th>
                                                <th style={{ width: 60 }}>ID</th>
                                                <th>Nombres Jours</th>
                                                <th>Nom Commercials</th>                                  
                                                <th>Adresse</th>
                                                <th>Phone</th>
                                                <th>CodeRemise</th>
                                                <th>Nom client</th>
                                                <th>Numero_Commande </th>
                                                <th>Date_Creation </th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                getList.map((row, index) => (
                                                    <tr key={index}>
                                                        <td><input type="checkbox" className="check-item" name="ids[]" defaultValue={7} /></td>
                                                        <td>{row.id}</td>
                                                        <td>{this.calculateDaysFromCreation(row.createdAt)}  jours </td>
                                                        <td>{row.nom}</td>
                                                        <td>{row.adresse}</td>
                                                        <td>
                                                           {row.phone}
                                                        </td>
                                                        <td>{row.codeBonnus}</td>
                                                        <td>{row.custid}</td>
                                                        <td>{row.ordernumber}</td>  
                                                        <td>{this.formatDate (row.createdAt)}</td>
                                                        <td className="action-btns gap-2">
                                                        <Link to={{
                                                                pathname: `/admin/commercial/detailprime/${row.codeBonnus}`,
                                                                query: row
                                                            }}>
                                                                <Typography className="edit-btn"> <i className="fas fa-eye" /> </Typography>
                                                            </Link>
                                                           
                                                            <Typography className="delete-btn" onClick={(e) => this.handlDeleteById(row.id)} ><i className="fas fa-trash-alt" /></Typography>
                                                           
                                                            <Link to={{
                                                                pathname: `/admin/commercial/detailall/${row.codeBonnus}`,
                                                                query: row
                                                            }}>
                                                                <Typography className="edit-btn"> <i class="fas fa-eye"></i> </Typography>
                                                            </Link>

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

        )
    }
}
