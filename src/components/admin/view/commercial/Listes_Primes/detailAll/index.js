import React, { Component } from 'react'
import {
    Typography, Button
} from "@material-ui/core";

import { NotificationManager } from 'react-notifications';
import swal from 'sweetalert';
import Moment from 'react-moment';
import ReactPaginate from 'react-paginate';
import { GetCommercialListe } from '../../../../../services';
import EditPrime from '../DetailPrime/editprime';

export default class DetailsAll extends Component {
    constructor(props) {
        super(props);
        this.state = {
            getList: [], isloaded: false, limit: 2,
            offset: 0,
            perPage: 30,
            orgtableData: [],
            currentPage: 0,
            totalReductionSum: 0,
            datecreated: '',
            daysSinceCreation: 0,
            com: ''

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
    async getCommercialListPrime() {
        let url = window.location.href.split('/');
        var codeBonnus = url.pop() || url.pop();


        this.setState({ isloaded: false })
        let list = await GetCommercialListe.getPrimeListeAll(codeBonnus);
        console.log('Listebo', list)
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



        let totalReductionSum = 0;
        list.data.forEach((row, index) => {
            let prime = index < 5 ? row.TotalReduction * 0.05 : row.TotalReduction * 0.08;
            totalReductionSum += prime;
            row.prime = prime;
        });

        this.setState({
            com: list.data,
            totalReductionSum: totalReductionSum,
        });


    }

    async componentDidMount() {
        this.getCommercialListPrime();
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



    render() {
        const { getList, totalReductionSum } = this.state;
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-5 col-md-9 col-lg-6">
                        <h2 className="mt-30 page-title">Commercial </h2>
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
                  
                  
                    <div className="col-lg-12 col-md-12">
                        <div className="card card-static-2 mt-30 mb-30">
                            <div className="card-title-2">
                                <h4> Commisssion</h4>
                            </div>
                            <div className="card-body-table">
                                <div className="table-responsive">
                                    <table className="table ucp-table table-hover">
                                        <thead>
                                            <tr>
                                                <th style={{ width: 60 }}><input type="checkbox" className="check-all" /></th>
                                                <th style={{ width: 60 }}>ID</th>
                                                <th>N_Commande </th>
                                                <th>Date_Commande</th>
                                                <th>Prix_Livraison</th>
                                                <th>Reduction </th>
                                                <th>Total_Panier</th>
                                                <th>T_Reduction</th>
                                                <th>T_Payer</th>
                                               
                                                <th>Status </th>
                                                <th>Commission</th>
                                                <th>Prime </th>
                                                <th>Action</th>
                                              
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                getList.map((row, index) => (
                                                    <tr key={index}>
                                                        <td><input type="checkbox" className="check-item" name="ids[]" defaultValue={7} /></td>
                                                        <td>{row.id}</td>
                                                        <td>{row.number}</td>
                                                        <td><Moment format="Do/MM/YYYY HH:mm">{row.createdAt}</Moment></td>
                                                        <td>{row.prixlocalite}</td>
                                                        <td>{row.Reduction}</td>
                                                        <td>{row.TotalCart}</td>
                                                        <td>{row.TotalReduction}</td>
                                                        <td>
                                                            {row.GrandTotal}
                                                        </td>
                                                        <td>{row.status} </td>
                                                        <td>{row.commission} </td>
                                                        <td>{row.prime} Fcfa</td>
                                                        <td className="action-btns">
                                                            {<EditPrime state={row} />}


                                                        </td>

                                                    </tr>
                                                ))
                                            }

                                        </tbody>
                                    </table>
                                    <div className="card-title-2  justify-content-between mt-4">

                                        <h3>Total : </h3>
                                        <span style={{ fontSize: '16px', color: '#e96125', fontWeight: '550' }}>{totalReductionSum || 0} Fcfa</span>
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

        )
    }
}
