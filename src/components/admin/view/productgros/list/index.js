import React, { Component } from 'react';
import {
    Button, Typography
} from "@material-ui/core";
import { GetProductDetails, GetProductGros } from '../../../../services';
//import AutoSelect from "../../../../common/autoselect";
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import swal from 'sweetalert';
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
export default class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            getList: [], selectedProduct: '', isloaded: false, limit: 20,
            offset: 0,
            perPage: 10,
            orgtableData: [],
            currentPage: 0,
            selectedSearchProduct:''

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

    async getProductList() {
        this.setState({ isloaded: false })
        let list = await GetProductGros.getAllProductList();
        console.log('data',list.product)
        if (list) {
            var tdata = list.product;
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
        this.getProductList();
    }

    //pagination 
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
                    let value = await GetProductGros.getProductDeleteById(id);
                    if (value) {
                        this.getProductList();
                    }
                }
            });
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
        let list = await GetProductGros.getProductgrosById(this.state.selectedSearchProduct.value);
        if (list) {
            this.setState({ getList : list.data, isLoaded: false })
        }
    }

    //end pagination 
    render() {
        const { getList, selectedProduct, selectedSearchProduct , isloaded } = this.state;
        return (
            <div className="container-fluid">
                 <div className="row">
                            <div className="col-lg-5 col-md-9 col-lg-6">
                                <h2 className="mt-30 page-title">ProduitTGros</h2>
                            </div>
                            <div className="col-lg-5 col-md-3 col-lg-6 back-btn">
                                <Button variant="contained" onClick={(e) => this.handleBack()}><i class="fas fa-arrow-left" /> Back</Button>
                            </div>
                        </div>
                <ol className="breadcrumb mb-30">
                    <li className="breadcrumb-item"><a href="index.html">Dashboard</a></li>
                    <li className="breadcrumb-item active">Produiits</li>
                </ol>
                <div className="row justify-content-between">
                    <div className="col-lg-12">
                        <a href="/admin/productgros/create" className="add-btn hover-btn">Ajouter Produiit </a>

                    </div>

                    <div className="col-lg-12">
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
                                            options={Arrays(getList, "nomprod", "id")}
                                        />
                                    </div>
                                    <div className="col-lg-2 col-md-2">
                                        <button className="save-btn hover-btn" type="submit" onClick={this.handleSearchProduct}>Search</button>
                                    </div>
                                </div>
                            </div>
                    </div>



                    <div className="col-lg-12 col-md-12">
                        <div className="card card-static-2 mt-30 mb-30">
                            <div className="card-title-2 ml-3">
                                <h4>Listes Produits</h4>
                            </div>
                            <div className="card-body-table m-2">
                                <div className="table-responsive">
                                    <table className="table ucp-table table-hover">
                                        <thead>
                                            <tr>
                                                <th style={{ width: 60 }}>Id</th>
                                                <th style={{ width: 100 }}>Image</th>
                                                <th>Nom</th>
                                                <th>Models</th>
                                                <th>Types</th>
                                                <th>Categories</th>
                                                <th>Prix</th>
                                                <th>Qty</th>
                                                <th>Prix_F</th>
                                                <th>Nom_F</th>
                                                <th>Contact_F</th>
                                                <th>Adresse_F</th>
                                                <th>Local_F</th>
                                               
                                                <th>Date</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                getList.map((row, index) => (
                                                    <tr key={index}>
                                                        <td>{row.id}</td>
                                                        <td>
                                                            <div className="cate-img-5">
                                                                <img 
                                                                src={`http://localhost:4001/${row.photo}`}
                                                                alt='' className='image' />
                                                            </div>
                                                        </td>
                                                        <td>{row.nomprod}</td>
                                                        <td>{row.ChildCategory ? row.ChildCategory.SubCategory.category.name : ''}</td>
                                                        <td>{row.ChildCategory ? row.ChildCategory.SubCategory.name : '' }</td>
                                                        <td>{row.ChildCategory ? row.ChildCategory.name : ''}</td>
                                                        <td>{row.prix}</td>                                                      
                                                        <td>{row.qty}</td>
                                                        <td>{row.prixF}</td>
                                                        <td>{row.nomF}</td>
                                                        <td>{row.contactF}</td>
                                                        <td>{row.adresseF} </td>
                                                        <td>{row.localF}</td>
                                                        <td>
                                                                        <span className="delivery-time">{this.formatDate(row.createdAt)}</span>
                                                        </td>
                                                        <td className="action-btns d-flex gap-2">

                                                        <Link to={{
                                                                pathname: `/admin/productgros/multicreate`,
                                                                state: { row }
                                                            }}>
                                                                <Typography className="edit-btn"><i className="fas fa-edit" /></Typography>
                                                            </Link>

                                                          
                                                            <Typography className="delete-btn" onClick={(e) => this.handlDeleteById(row.id)} ><i className="fas fa-trash-alt" /></Typography>
                                                       
                                                            
                                                            <Link to={{
                                                                pathname: `/admin/productgros/edit`,
                                                                state: { row }
                                                            }}>
                                                                <Typography className="edit-btn ml-3"><i className="fas fa-edit" /></Typography>
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
