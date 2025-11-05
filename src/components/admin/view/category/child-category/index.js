import React, { Component } from 'react'
import {
    Button, Typography
} from "@material-ui/core";
//import MainCategorylist from '../../../../../common/category/main-category';
//import SubCategorylist from '../../../../../common/category/sub-category';
import { GetCategoryList } from '../../../../services';
import swal from 'sweetalert';
import Edit from './edit';
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

export default class SubChildCategory extends Component {
    constructor(props) {
        super(props);
        this.state = { name: '', description:'', subCatId: '', childList: [] , getList: [], getSubList: [], selectedCategory: '', selectedSubCategory: '', 
  
        isloaded: false, 
        offset: 0,
        perPage: 10,
        orgtableData: [],
        currentPage: 0,
    }
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

    handleBack() {
        this.props.history.goBack();
    }
    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    handleSubCategory = (value) => {
        this.setState({ selectedSubCategory: value });
    }

    
    handleMainCategory = async (e) => {
        this.setState({ isloaded: false });
        let {value} = e.target;
        let list = await GetCategoryList.getSubCatListById(value);
       if(list){
        this.setState({ getSubList: list.data , isloaded:true, selectedCategory: value })
       }
    }
   

    

    async getCategory() {
        let list = await GetCategoryList.getMainCategoryList();
        this.setState({ getList: list.data })
    }

    
    async getSubCategory() {
        let list = await GetCategoryList.getSubCategoryList();
        this.setState({ getSubList: list.data  })
    }

    
    async getChildCategoryList() {
        this.setState({ isloaded: false })
        let list = await GetCategoryList.getChildCategoryList();
        if (list) {
            var tdata = list.data;
            var slice = tdata.slice(this.state.offset, this.state.offset + this.state.perPage)
            this.setState({
                pageCount: Math.ceil(tdata.length / this.state.perPage),
                orgtableData: tdata,
                childList: slice,
                isloaded: true
            })
        }
    }

    async componentDidMount() {
        this.getCategory();
        this.getSubCategory();
        this.getChildCategoryList();
    }
    

    handleSubmit = async()=> {
        let { name,description, selectedCategory, selectedSubCategory } = this.state;   
        let data = { name: name,description: description, categoryId: selectedCategory, subCatId: selectedSubCategory };
        let list = await GetCategoryList.createChildCategoryList(data);
        if (list) {
            this.getChildCategoryList();
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
                    let value = await GetCategoryList.getChildDeleteById(id);
                    if (value) {
                        this.getChildCategoryList();  
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
            childList : slice
        })

    }
 
    render() {
        const { getList, childList, getSubList, selectedCategory, selectedSubCategory } = this.state;
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
                        <div className="card card-static-2 mb-30 p-3">
                            <div className="card-title-2">
                                <h4>Add Child Category</h4>
                            </div>
                            <div className="card-body-table">
                                <div className="news-content-right pd-20">
                                    <div className="form-group">
                                        <label className="form-label">Name*</label>
                                        <input type="text" className="form-control" placeholder="Category Name" name="name"  onChange={(e) => this.handleChange(e)} />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Description*</label>
                                        <input type="text" className="form-control" placeholder="Category description" name="description" onChange={(e) => this.handleChange(e)} />
                                    </div>
                                    <div className="form-group mb-0">
                                        <label className="form-label">Main Category*</label>
                                        <select className=" p-2  form-select-sm w-100" name="selectedCategory" value={selectedCategory} onChange={(e) => this.handleMainCategory(e)} >
                                            <option>Select category</option>
                                           {
                                            getList.map((row, index)=>(
                                                <option key={index} value={row.id} >{row.name}</option>
                                            ))
                                           }
                                           
                                        </select>
                                    </div>
                                    <div className="form-group mt-2">
                                        <label className="form-label">Sub Category*</label>
                                        <select className=" p-2  form-select-sm w-100" name="selectedSubCategory" value={selectedSubCategory} onChange={(e) => this.handleChange(e)} >
                                            <option>Select sub category</option>
                                           {
                                            getSubList.map((row, index)=>(
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
                                            <h4>All Child Categories</h4>
                                        </div>
                                        <div className="card-body-table">
                                            <div className="table-responsive">
                                                <table className="table ucp-table table-hover">
                                                    <thead>
                                                        <tr>
                                                            <th style={{ width: 60 }}><input type="checkbox" className="check-all" /></th>
                                                            <th scope="col">Category    </th>
                                                            <th scope="col">Sub Category</th>
                                                            <th scope="col">Item Name</th>
                                                            <th scope="col">Date</th>
                                                            <th scope="col">Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            childList.map((row, index) => (
                                                                <tr key={index}>
                                                                    <td><input type="checkbox" className="check-item" name="ids[]" defaultValue={5} /></td>
                                                                    <td>{row.SubCategory ? row.SubCategory.category.name : ''}</td>
                                                                    <td>{row.SubCategory ? row.SubCategory.name : ''}</td>
                                                                    <td>{row.name}</td>
                                                                    <td>
                                                                        <span className="delivery-time">{this.formatDate(row.createdAt)}</span>
                                                                    </td>
                                                                    <td className="action-btns">
                                                                        { <Edit state={row} /> }
                                                                        
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
