import React, { Component } from 'react'
import {
    Typography,Button
} from "@material-ui/core";

import { NotificationManager } from 'react-notifications';
import swal from 'sweetalert';
import { GetCustomerDetails } from '../../../../services';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import AutoSelect from '../../../../common/autoselect';



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


export default class Discussion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            getList: [],isloaded: false, limit: 20, selectedSearchProduct: '',
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
    async getCutomerList() {
        this.setState({ isloaded: false })
        let list = await GetCustomerDetails.getAllCustomerMsgList();
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
    
    async componentDidMount() {
        this.getCutomerList();
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

    
    handleSelectedSearchProduct = (name, selected) => {
        if (name === "product_id") {
            this.setState({
                list: {
                    ...this.state.list,
                    [name]: selected.value,
                },
                selectedSearchProduct: selected,
            });
            this.setState({ changed: true });
        }
    }

    handleSearchProduct = async (event) => {
        event.preventDefault();
        this.setState({ isLoaded: true })
        let list = await GetCustomerDetails.getCustomerById(this.state.selectedSearchProduct.value);
        if (list) {
            this.setState({ getList: list.data, isLoaded: false })
        }
    }


    render() {
        const{ getList, selectedSearchProduct } = this.state;
        return (
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
                    <li className="breadcrumb-item"><a href="index.html">Dashboard</a></li>
                    <li className="breadcrumb-item active">Discussion </li>
                </ol>
                <div className="row justify-content-between">
                <div className="col-lg-12">
                                <div className="row">
                                    <div className="col-lg-8 col-md-8">
                                        {/* <label className="form-label"><b>Select Product*</b></label> */}
                                        <br />
                                        <AutoSelect
                                            className="basic-single"
                                            value={selectedSearchProduct}
                                            onChange={this.handleSelectedSearchProduct}
                                            isSearchable={true}
                                            name="product_id"
                                            options={Arrays(getList, "firstName", "id")}
                                        />
                                    </div>
                                    <div className="col-lg-2 col-md-2">
                                        <button className="save-btn hover-btn" type="submit" onClick={this.handleSearchProduct}>Search</button>
                                    </div>
                                </div>
                            </div>
                   
                    <div className="col-lg-12 col-md-12">
                        <div className="card card-static-2 mt-30 mb-30">
                            <div className="card-title-2">
                                <h4>Listes Des Clients En Discussions</h4>
                            </div>
                            <div className="card-body-table">
                                <div className="table-responsive">
                                    <table className="table ucp-table table-hover">
                                        <thead>
                                            <tr>
                                                <th style={{ width: 60 }}><input type="checkbox" className="check-all" /></th>
                                                <th style={{ width: 60 }}>ID</th>
                                                <th>Prenom</th>
                                                <th>Nom</th>
                                                <th>Contact</th>
                                                <th>Email</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                getList.map((row, index) => (
                                                    <tr key={index}>
                                                        <td><input type="checkbox" className="check-item" name="ids[]" defaultValue={7} /></td>
                                                        <td>{index}</td>
                                                        <td>{row.firstName}</td>
                                                        <td>{row.lastName}</td>
                                                        <td>
                                                           {row.phone}
                                                        </td>
                                                        <td>{row.email}</td>
                                                        <td className="action-btns gap-2">
                                                        <Link to={{
                                                                pathname: `/admin/customer/detailmsg/${row.email}`,
                                                                query: row
                                                            }}>
                                                                <Typography className="edit-btn"> <i className="fas fa-eye" /> </Typography>
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
