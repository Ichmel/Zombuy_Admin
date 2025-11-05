import React, { Component } from 'react'
import {
    Button,  Typography
} from "@material-ui/core";

import { GetCategoryList } from "../../../../services"
import Edit from './edit'
import swal from 'sweetalert';
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';
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

export default class MainCategory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '', slug: '', getList: [], image: '', loading: false, isLoaded: false,
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

    onFileChange = event => {
        this.setState({ image: event.target.files[0] });
    };

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
    /*........................Fonction de Liste et Ajout de category................................*/


    async getCategory() {
        let list = await GetCategoryList.getMainCategoryList();
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
        this.getCategory();
    }


    handleSubmit = event => {
        event.preventDefault();
        this.setState({ isLoaded: true })
        const { name, slug, image } = this.state;
        const formData = new FormData();
        formData.append('name', name);
        formData.append('slug', slug);
        formData.append('photo', image)
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };

        swal({
            title: "Are you sure?",
            text: "You want to add Images",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(async (success) => {
                if (success) {
                    let list = await GetCategoryList.createMainCategoryList(formData, config);
                    if (list) {
                        toast.success("successfully added");
                        this.getCategory();
                        this.setState({ isLoaded: false })
                    } else {
                        toast.error("error");
                    }
                }
            });

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
                    let value = await GetCategoryList.getCatDeleteById(id);
                    if (value) {
                        this.getCategory();  
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
            getList: slice
        })

    }

    render() {
        let self = this.state.getList

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
                            <div className="card-title-2 ml-3 mt-3">
                                <h4>Add Main Category</h4>
                            </div>
                            <div className="card-body-table">
                                <div className="news-content-right pd-20 m-3">
                                    <div className="form-group">
                                        <label className="form-label">Nom*</label>
                                        <input type="text" className="form-control" placeholder="Category name" name="name" onChange={(e) => this.handleChange(e)} />
                                    </div>
                                    <div className="form-group mb-0">
                                        <label className="form-label">Description*</label>
                                        <input type="text" className="form-control" placeholder="grocery-staple" name="slug"  onChange={(e) => this.handleChange(e)} />
                                    </div>
                                    <div className="form-group mb-0">
                                        <div className="form-group mt-3">
                                            <label className="form-label">Slider Image*</label>
                                            <input className="form-control" type="file" name="image" onChange={this.onFileChange} />
                                        </div>
                                    </div>
                                    <button className="save-btn hover-btn" type="submit" onClick={this.handleSubmit}>Ajouter</button>
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
                                            <h4>All Main Categories</h4>
                                        </div>
                                        <div className="card-body-table">
                                            <div className="table-responsive">
                                                <table className="table ucp-table table-hover">
                                                    <thead>
                                                        <tr>
                                                            <th style={{ width: 60 }}><input type="checkbox" className="check-all" /></th>
                                                            <th scope="col">#id</th>
                                                            <th scope="col">Image</th>
                                                            <th scope="col">Name</th>
                                                            <th scope="col">Slug</th>
                                                            <th scope="col">Date</th>
                                                            <th scope="col">Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            self.map((row, index) => (
                                                                <tr key={index}>
                                                                    
                                                                    <td><input type="checkbox" className="check-item" name="ids[]" defaultValue={5} /></td>
                                                                    <td>{row.id}</td>
                                                                    <td>
                                                                        <div className="cate-img-5">
                                                                            <img  
                                                                            src={`http://localhost:4001/${row.photo}`}
                                                                            alt='' className='image' />
                                                                        </div>
                                                                    </td>
                                                                    <td>{row.name}</td>
                                                                    <td>{row.slug}</td>
                                                                    <td>
                                                                        <span className="delivery-time">{this.formatDate(row.createdAt)}</span>
                                                                    </td>
                                                                    <td className="action-btns gap-2">
                                                                        <Link to={{
                                                                            pathname: `/admin/category/edit`,
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

        )
    }
}
