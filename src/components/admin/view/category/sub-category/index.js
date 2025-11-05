import React, { Component } from 'react'
import {
    Button, Typography
} from "@material-ui/core";
//import MainCategorylist from '../../../../../common/category/main-category';
import { GetCategoryList } from '../../../../services';
import Edit from './edit'
import swal from 'sweetalert';
import ReactPaginate from 'react-paginate';



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



export default class SubCategory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '', subCatId: '', description: '', getList: [], subList: []
            ,isloaded: false, 
            offset: 0,
            perPage: 10,
            orgtableData: [],
            currentPage: 0,
        }
    }
    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
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


    async getCategory() {
        let list = await GetCategoryList.getMainCategoryList();
        this.setState({ getList: list.data })
    }


    async getSubCategory() {
        let list = await GetCategoryList.getSubCategoryList();
        if (list) {
            var tdata = list.data;
            var slice = tdata.slice(this.state.offset, this.state.offset + this.state.perPage)
            this.setState({
                pageCount: Math.ceil(tdata.length / this.state.perPage),
                orgtableData: tdata,
                subList: slice,
                isloaded: true
            })
        }
    }

    async componentDidMount() {
        this.getCategory();
        this.getSubCategory();
    }


    handleSubmit = async () => {
        let { subCatId, description, name } = this.state;
        let data = { name: name, description: description, categoryId: subCatId };
        let list = await GetCategoryList.createSubCategoryList(data);
        if (list) {
            this.getSubCategory()
        }
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
                    let value = await GetCategoryList.getSubDeleteById(id);
                    if (value) {
                        this.getSubCategory();  
                    }
                }
            });
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
            subList : slice
        })

    }



    render() {
        let { getList, subList } = this.state;
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-5 col-md-9 col-lg-6">
                        <h2 className="mt-30 page-title">Categories</h2>
                    </div>
                    <div className="col-lg-5 col-md-3 col-lg-6 back-btn">
                        <Button variant="contained" onClick={(e) => this.handleBack()}><i class="fas fa-arrow-left" /> Back</Button>
                    </div>
                </div>
                <ol className="breadcrumb mb-30">
                    <li className="breadcrumb-item"><a href="/">Dashboard</a></li>
                    <li className="breadcrumb-item active">Category</li>
                </ol>
                <div className="row">
                    <div className="col-lg-4 col-md-5">
                        <div className="card card-static-2 mb-30">
                            <div className="card-title-2">
                                <h4>Add Sub Category</h4>
                            </div>
                            <div className="card-body-table">
                                <div className="news-content-right pd-20 m-3">
                                    <div className="form-group">
                                        <label className="form-label">Genre/Type*</label>
                                        <input type="text" className="form-control" placeholder="genre/type" name="name" onChange={(e) => this.handleChange(e)} />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Description*</label>
                                        <input type="text" className="form-control" placeholder="Category description" name="description" onChange={(e) => this.handleChange(e)} />
                                    </div>
                                    <div className="form-group mb-0">
                                        <label className="form-label"> Categories*</label>
                                        <select className=" p-2 mr-2 form-select-sm w-100" name="subCatId" value={this.state.subCatId} onChange={(e) => this.handleChange(e)} >
                                            <option>Select category</option>
                                            {
                                                getList.map((row, index) => (
                                                    <option key={index} value={row.id} >{row.name}</option>
                                                ))
                                            }

                                        </select>
                                    </div>
                                    <button className="save-btn hover-btn" type="submit" onClick={this.handleSubmit}>Add New</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-8 col-md-7">
                        <div className="all-cate-tags">
                            <div className="row justify-content-between">
                                <div className="col-lg-12 col-md-12">
                                    <div className="card card-static-2 mb-30">
                                        <div className="card-title-2">
                                            <h4>All Sub Categories</h4>
                                        </div>
                                        <div className="card-body-table">
                                            <div className="table-responsive">
                                                <table className="table ucp-table table-hover">
                                                    <thead>
                                                        <tr>
                                                            <th style={{ width: 60 }}><input type="checkbox" className="check-all" /></th>
                                                            <th scope="col">Category</th>
                                                            <th scope="col">Sub Category</th>
                                                            <th scope="col">Description</th>
                                                            <th scope="col">Date</th>
                                                            <th scope="col">Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            subList.map((row, index) => (
                                                                <tr key={index}>
                                                                    <td><input type="checkbox" className="check-item" name="ids[]" defaultValue={5} /></td>
                                                                    <td>{row.category ? row.category.name : ''}</td>
                                                                    <td>{row.name}</td>
                                                                    <td>{row.description}</td>
                                                                    <td>
                                                                        <span className="delivery-time">{this.formatDate(row.createdAt)}</span>
                                                                    </td>
                                                                    <td className="action-btns">
                                                                        {<Edit state={row} />}

                                                                        
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

        )
    }
}
