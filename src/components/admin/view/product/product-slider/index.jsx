import React, { Component } from 'react'
import {
    Button,  Typography
} from "@material-ui/core";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AutoSelect from "../../../../common/autoselect";
import { GetProductDetails } from '../../../../services';
import ReactPaginate from 'react-paginate';
import swal from 'sweetalert';
import { GetCategoryList } from "../../../../services"
import Edit from './edit';

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


export default class Uploadphoto extends Component {
    constructor(props) {
        super(props);
        this.state = {
            getList: [], image: '', selectedProduct: '', selectedSearchProduct: '', imagelist: [], loading: false, isLoaded: false,
            getdata: [],
            couleur: '', taille: '',color:'',color: [],
            offset: 0,
            perPage: 10,
            orgtableData: [],
            currentPage: 0
        }
    }
    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    onFileChange = event => {
        this.setState({ image: event.target.files[0] });
    };

    handleProduct = (value) => {
        this.setState({ selectedProduct: value });
    }
    // pagination 
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
            getdata: slice
        })

    }
    //end pagination 
    async getProductList() {
        this.setState({ isLoaded: true })
        let list = await GetProductDetails.getAllProductList();

        this.setState({ getList: list.product })
        console.log('list',list)

    }



    async getProductphotoList() {
        this.setState({ isLoaded: true })
        let list = await GetProductDetails.getAllProductPhoto();
 
        this.setState({ getdata: list.data })

    }


    async getcouleur() {
        let list = await GetCategoryList.getcouleurList();
        this.setState({ color: list.data })
    }


    async componentDidMount() {
        this.getProductList();
        this.getProductphotoList();
        this.getcouleur();
    }
  
  

    handleSubmit = event => {
        event.preventDefault();
        this.setState({ isLoaded: true })
        const { selectedProduct, image, couleur, taille } = this.state;
        const formData = new FormData();
        formData.append('productId', selectedProduct);
        formData.append('couleur', couleur);
        formData.append('taille', taille);
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
                    let list = await GetProductDetails.getUploadProductImage(formData, config);
                    if (list) {
                        toast.success("successfully added");
                        this.getProductphotoList();
                        this.setState({ isLoaded: false })
                        window.location.href = "/admin/product/more-photo"
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
                    let value = await GetProductDetails.getImageDeleteById(id);
                    if (value) {
                        this.getProductphotoList();
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
        let list = await GetProductDetails.getProductById(this.state.selectedSearchProduct.value);
        if (list) {
            this.setState({ getdata: list.data, isLoaded: false })
        }
    }

    render() {
        const { getList, selectedProduct, selectedSearchProduct, getdata,color ,selectcolor ,loading } = this.state;
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-5 col-md-9 col-lg-6">
                        <h2 className="mt-30 page-title">Produits</h2>
                    </div>
                    <div className="col-lg-5 col-md-3 col-lg-6 back-btn">
                        <Button variant="contained" onClick={(e) => this.handleBack()}><i class="fas fa-arrow-left" /> Back</Button>
                    </div>
                </div>
                <ol className="breadcrumb mb-30">
                    <li className="breadcrumb-item"><a href="/">Dashboard</a></li>
                    <li className="breadcrumb-item"><a href="/admin/product/create">Produits</a></li>
                    <li className="breadcrumb-item active">Ajouter autres images</li>
                </ol>
                <div className="row">
                    <div className="col-lg-12 col-md-12">

                        <div className="card card-static-2 mb-30">
                            <div className="card-title-2">
                                <h4>Upload  Image Produit </h4>
                            </div>
                            <div className="card-body-table">
                                <div className="news-content-right pd-20  ">
                                    <div className="row ">
                                        <div className="col-lg-3  col-md-3">
                                            <div className="form-group">
                                                <label className="form-label">Category*</label>
                                                <select className=" p-2  form-select-sm w-100" name="selectedProduct" value={selectedProduct} onChange={(e) => this.handleChange(e)} >

                                                    <option>Select produit</option>
                                                    {
                                                        getList.map((row, index) => (
                                                            <option key={index} value={row.id} >{row.nomprod}</option>
                                                        ))
                                                    }

                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-lg-2 col-md-3">
                                            <div className="form-group">
                                                <label className="form-label">Taille*</label>
                                                <input type="text" className="form-control" placeholder=" taille" name="taille" value={this.state.taille} onChange={(e) => this.handleChange(e)} />
                                            </div>
                                        </div>
                                        <div className="col-lg-3 col-md-3">
                                            <div className="form-group">
                                                <label className="form-label">Couleur*</label>
                                                <input type="text" className="form-control" placeholder="couleur" name="couleur" value={this.state.couleur} onChange={(e) => this.handleChange(e)} />
                                            </div>
                                        </div>
                                        <div className="col-lg-2 col-md-2">
                                            <div className="form-group">
                                                <label className="form-label">Slider Image*</label>
                                                <input className="form-control" type="file" multiple name="image" onChange={this.onFileChange} />
                                            </div>
                                        </div>
                                        <div className="col-lg-2 col-md-2 mt-2">
                                            <div className="form-group">
                                                <button className="save-btn hover-btn" type="submit" onClick={this.handleSubmit} disabled={loading}>
                                                    {loading && <i className="fa fa-refresh fa-spin" />}
                                                    {loading && <span>Upload</span>}
                                                    {!loading && <span>Upload</span>}
                                                </button>
                                                <ToastContainer autoClose={1500} />
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-12 col-md-12">

                        <div className="card card-static-2 mt-30 mb-30">
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

                            <div className="card-title-2">
                                <h4>Listes Produits</h4>
                            </div>
                            <div className="row">
                            <div className="card-body-table  col-lg-8">
                                <div className="table-responsive">
                                    <table className="table ucp-table table-hover">
                                        <thead>
                                            <tr>
                                                <th style={{ width: 160 }}>S.N</th>
                                                <th style={{ width: '100px' }}>Nom_Produit</th>
                                                <th style={{ width: '350px' }} >Images</th>
                                                <th className="center">Detailles_Produits</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                getdata.map((row, index) => (
                                                    row.productphotos.length ?
                                                        <tr key={index}>
                                                            <td>{row.id}</td>
                                                            <td style={{ width: '350px' }}>{row.nomprod}</td>
                                                            <td style={{ width: '100px' }}><img src={`http://localhost:4001/${row.photo}`}  alt="product-name" height="65px" /></td>
                                                            <td>
                                                                <table>
                                                                    <thead>
                                                                        <tr>
                                                                            <th style={{ width: '250px' }}>Photo</th>
                                                                            <th style={{ width: '100px' }}>Couleur</th>
                                                                            <th style={{ width: '100px' }}>Taille</th>
                                                                            <th style={{ width: '100px' }} >Action</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {row.productphotos.map((data, index) => (
                                                                            <tr key={index}>
                                                                                <td><img src={`http://localhost:4001/${data.photo}`} alt="product-name" height="65px" /></td>
                                                                                <td>{data.couleur} </td>
                                                                                <td>{data.taille} </td>

                                                                                <td className='action-btns d-flex gap-2'>
                                                                                    {<Edit state={data} />}
                                                                                    <Typography className="delete-btn" onClick={(e) => this.handlDeleteById(data.id)} ><i className="fas fa-trash-alt" /></Typography>
                                                                                </td>

                                                                            </tr>
                                                                        ))}
                                                                    </tbody>
                                                                </table>

                                                            </td>
                                                        </tr> : ''
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

                            <div className="col-lg-4 col-md-7">
                                    <div className="all-cate-tags">
                                        <div className="row justify-content-between">
                                            <div className="col-lg-12 col-md-12">
                                                <div className="card card-static-2 mb-30">
                                                    <div className="card-title-2">
                                                        <h4>Listes Des Couleurs </h4>
                                                    </div>
                                                    <div className="card-body-table">
                                                        <div className="table-responsive">
                                                            <table className="table ucp-table table-hover">
                                                                <thead>
                                                                    <tr>
                                                                        <th style={{ width: 60 }}><input type="checkbox" className="check-all" /></th>
                                                                        <th scope="col">nom</th>
                                                                        <th scope="col">couleur</th>

                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {
                                                                        color.map((row, index) => (
                                                                            <tr key={index}>
                                                                                <td><input type="checkbox" className="check-item" name="ids[]" defaultValue={5} /></td>
                                                                                <td>{row.color}</td>
                                                                                <td>
                                                                                    <input
                                                                                        type="button"
                                                                                        className="btn-color "
                                                                                        style={{ background: row.color }}
                                                                                    />
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
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
