import React, { Component } from 'react'
import {
    Button, Typography
} from "@material-ui/core";
//import MainCategorylist from '../../../../../common/category/main-category';
//import { GetCategoryDetails } from '../../../../../services';

import swal from 'sweetalert';

export default class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            getdata: []
        }
    }
    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    handleBack() {
        this.props.history.goBack();
    }
    handleChangeCategoryList = (value) => {
        this.setState({ selectCategory: value });
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


    render() {
        const { getList, getdata } = this.state;
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="d-sm-flex align-items-center justify-content-between mb-3">
                        <h2 className="mt-30 page-title">Shop</h2>

                        <Button variant="contained" onClick={(e) => this.handleBack()}><i class="fas fa-arrow-left" /> Back</Button>
                    </div>
                </div>
                <ol className="breadcrumb mb-30">
                    <li className="breadcrumb-item"><a href="/">Dashboard</a></li>
                    <li className="breadcrumb-item active">Categories</li>
                </ol>


                <div className="news-content-right pd-20">
                    <button className="save-btn hover-btn" type="submit" >Add New</button>
                    <div className='row' >
                        <div className="d-sm-flex align-items-center justify-content-between mb-3">
                            <div className="col-4  form-group d-sm-flex align-items-center">

                                <select className="form-select p-2 mr-2 form-select-sm w-100" aria-label=".form-select-sm example">
                                    <option selected>Bulk Actions</option>
                                    <option value={1}>Active</option>
                                    <option value={2}>Inactive</option>
                                    <option value={3}>Delete</option>
                                </select>
                                <button className="save-btn hover-btn m-0" type="submit" >Appy</button>
                            </div>
                            <div className="col-7 form-group d-sm-flex align-items-center">
                                <input type="text" className="form-control" placeholder="Category Name" name="name" />
                                <select className="form-select p-2 mr-2 form-select-sm" aria-label=".form-select-sm example">
                                    <option selected>Active</option>
                                    <option value={1}>Inactive</option>
                                </select>
                                <button className="save-btn hover-btn fs-15" type="submit" >Search </button>
                            </div>
                        </div >
                    </div >


                </div>


                <div className="">
                    <div className="all-cate-tags">
                        <div className="row justify-content-between">
                            <div className="col-lg-12 col-md-12">
                                <div className="card card-static-2 mb-30">
                                    <div className="card-title-2">
                                        <h4>All Shop</h4>
                                    </div>
                                    <div className="card-body-table">
                                        <div className="table-responsive">
                                            <table className="table ucp-table table-hover">
                                                <thead>
                                                    <tr>
                                                        <th style={{ width: 60 }}><input type="checkbox" className="check-all" /></th>
                                                        <th scope="col">ID</th>
                                                        <th scope="col">Name</th>
                                                        <th scope="col">Users</th>
                                                        <th scope="col">Location</th>
                                                        <th scope="col">Status</th>
                                                        <th scope="col">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        getdata.map((row, index) => (
                                                            <tr key={index}>
                                                                <td><input type="checkbox" className="check-item" name="ids[]" defaultValue={5} /></td>
                                                                <td>{row.SubCategory ? row.SubCategory.category.name : ''}</td>
                                                                <td>{row.SubCategory ? row.SubCategory.sub_name : ''}</td>
                                                                <td>{row.name}</td>
                                                                <td>
                                                                    <span className="delivery-time">{this.formatDate(row.createdAt)}</span>
                                                                </td>
                                                                <td className="action-btns">
                                                                    {/* <SubEdit state={row} /> */}
                                                                    <Typography className="delete-btn" onClick={(e) => this.handlDeleteById(row.id)} ><i className="fas fa-trash-alt" /></Typography>
                                                                </td>
                                                            </tr>
                                                        ))
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        )
    }
}
