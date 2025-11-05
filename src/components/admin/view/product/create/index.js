import React, { Component } from 'react';
import {
    Button
} from "@material-ui/core";
//import MainCategorylist from '../../../../common/category/main-category';
import { GetCategoryList } from '../../../../services';
//import SubCategorylist from '../../../../common/category/sub-category';
//import ChildCategorylist from '../../../../common/category/child-category';
import { GetProductDetails } from '../../../../services'
//import RichTextEditor from '../../../../RichTextEditor';
//import Loader from '../../../../loader';
import { NotificationManager } from 'react-notifications';
import swal from 'sweetalert';
export default class Newproduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            getListe: [],
            getList: [], getsublist: [], childList: [], getChildList: [], getSubList: [], selectedCategory: '', selectedSubCategory: '', selectedChildCategory: '', blockhide: false, toggle: false, isLoaded: false,
            nomp: '', image: '', vendeur: "DETAIL", phone: ``, email: '', prix: '', ancienprix: '', qty: 1, contactF: '', localgooglemap: '', villeF: '',quartiershop:'', paysshop:''
        }
    }
    handleBack() {
        this.props.history.goBack();
    }
    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    onFileChange = event => {
        this.setState({ image: event.target.files[0] });
    };
    handleContentChange = contentHtml => {
        this.setState({
            content: contentHtml
        });
    };



    handleMainCategory = async (e) => {
        this.setState({ isloaded: false });
        let { value } = e.target;
        let list = await GetCategoryList.getSubCatListById(value);
        if (list) {
            this.setState({ getSubList: list.data, isloaded: true, selectedCategory: value })
        }
    }



    handleChildCategory = async (e) => {
        this.setState({ isloaded: false });
        let { value } = e.target;
        let list = await GetCategoryList.getChildCatListById(value);
        if (list) {
            this.setState({ childList: list.data, isloaded: true, selectedSubCategory: value })
        }
    }






    async getCategory() {
        let list = await GetCategoryList.getMainCategoryList();
        this.setState({ getList: list.data })
    }

    async getSubCategory() {
        let list = await GetCategoryList.getSubCategoryList();
        this.setState({ getSubList: list.data })
    }

    async getChildCategoryList() {
        let liste = await GetCategoryList.getChildCategoryList();
        this.setState({ childList: liste.data })
    }



    async componentDidMount() {
        this.getCategory();
        this.getSubCategory();
        this.getChildCategoryList();
        this.getProductList();

    }

    async getProductList() {
        this.setState({ isloaded: false })
        let list = await GetProductDetails.getAllProductList();
        if (list.success) {
            this.setState({ isloaded: true, getListe: list.product })
        }
    }


    handleSubmit = event => {
        event.preventDefault();
        this.setState({ isLoaded: true })
        const { selectedCategory, selectedSubCategory,nomp,email , image, prix, ancienprix, qty, phone, localgooglemap, vendeur, quartiershop,villeshop,paysshop } = this.state;
        const formData = new FormData();
        formData.append('nomprod', nomp);
        formData.append('prix', prix);
        formData.append('ancienprix', ancienprix);
        formData.append('categoryId', selectedCategory);
        formData.append('subCategoryId', selectedSubCategory);
        formData.append('photo', image);
        formData.append('email', email);
        formData.append('contact', phone);
        formData.append('paysshop', paysshop);
        formData.append('villeshop', villeshop);
        formData.append('quartiershop', quartiershop);
        formData.append('localgooglemap', localgooglemap);
        formData.append('vendeur', vendeur);
        formData.append('qty', qty); 
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        swal({
            title: "Are you sure?",
            text: "You want to Add New Product",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(async (success) => {
                if (success) {
                    let list = await GetProductDetails.addProductList(formData, config);
                    if (list) {
                        this.setState({ isLoaded: false })
                    } else {
                        NotificationManager.error("Please! Check input field", "Input Field");
                    }
                }
            });

    }
    render() {
        const { getList, getListe, childList, getSubList, selectedCategory, selectedSubCategory, selectedChildCategory, isLoaded } = this.state;
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
                    <li className="breadcrumb-item active">Ajouter Produit</li>
                </ol>

                <div className="row">
                    <div className="col-lg-4 col-md-6 mb-3">
                        <div className="card card-static-2 mb-30">
                            <div className="card-body-table">
                                <div className="news-content-right pd-20">
                                    <div className="form-group m-3">
                                        <label className="form-label">Category*</label>
                                        <select className=" p-2  form-select-sm w-100" name="selectedCategory" value={selectedCategory} onChange={(e) => this.handleMainCategory(e)} >
                                            <option>Select category</option>
                                            {
                                                getList.map((row, index) => (
                                                    <option key={index} value={row.id} >{row.name}</option>
                                                ))
                                            }

                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                        <div className="card card-static-2 mb-30">
                            <div className="card-body-table">
                                <div className="news-content-right pd-20">
                                    <div className="form-group m-3">
                                        <label className="form-label">Sub Category*</label>
                                        <select className=" p-2  form-select-sm w-100" name="selectedSubCategory" value={selectedSubCategory} onChange={(e) => this.handleChildCategory(e)} >
                                            <option>Select sub category</option>
                                            {
                                                getSubList.map((row, index) => (
                                                    <option key={index} value={row.id} >{row.name}</option>
                                                ))
                                            }

                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="row" >

                    <div className="col-lg-12 col-md-12 ">
                        <div className="card card-static-2 mb-30 ">
                            <div className="card-title-2 m-3">
                                <h4>Add New Product</h4>
                            </div>
                            <div className="card-body-table m-3">
                                <div className="news-content-right pd-20">
                                    <div className="row">

                                        <div className="col-lg-2 col-md-2">
                                            <div className="form-group">
                                                <label className="form-label">Categorie Image*</label>
                                                <input type="file" className="form-control" name="image" onChange={this.onFileChange} />
                                            </div>
                                        </div>

                                        <div className="col-lg-2 col-md-2">
                                            <div className="form-group">
                                                <label className="form-label">Produit Nom*</label>
                                                <input type="text" className="form-control" placeholder="Produit Nom" name="nomp" value={this.state.nomp} onChange={(e) => this.handleChange(e)} />
                                            </div>
                                        </div>

                                        <div className="col-lg-2 col-md-2">
                                            <div className="form-group">
                                                <label className="form-label">Prix*</label>
                                                <input type="number" className="form-control" placeholder="Produit prix" name="prix" value={this.state.prix} onChange={(e) => this.handleChange(e)} />
                                            </div>
                                        </div>

                                        <div className="col-lg-2 col-md-2">
                                            <div className="form-group">
                                                <label className="form-label">AncienPrix*</label>
                                                <input type="number" className="form-control" placeholder="Produit ancienprix" name="ancienprix" value={this.state.ancienprix} onChange={(e) => this.handleChange(e)} />
                                            </div>
                                        </div>

                                        <div className="col-lg-2 col-md-2">
                                            <div className="form-group">
                                                <label className="form-label">email*</label>
                                                <input type="text" className="form-control" placeholder="Nom fournisseur" name="email" value={this.state.email} onChange={(e) => this.handleChange(e)} />
                                            </div>
                                        </div>

                                        <div className="col-lg-2 col-md-2 ">
                                            <div className="form-group">
                                                <label className="form-label">Contact__F*</label>
                                                <input type="number" className="form-control" placeholder="numero fournisseur" name="phone" value={this.state.phone} onChange={(e) => this.handleChange(e)} />
                                            </div>
                                        </div>


                                        <div className="col-lg-2 col-md-2 mt-3">
                                            <div className="form-group">
                                                <label className="form-label">Localisation__F*</label>
                                                <input type="text" className="form-control" placeholder="localisation fournisseur" name="localgooglemap" value={this.state.localF} onChange={(e) => this.handleChange(e)} />
                                            </div>
                                        </div>


                                        <div className="col-lg-2 col-md-2 mt-3">
                                            <div className="form-group">
                                                <label className="form-label">Adresse_F*</label>
                                                <input type="text" className="form-control" placeholder="adresse fournisseur" name="quartiershop" value={this.state.quartiershop} onChange={(e) => this.handleChange(e)} />
                                            </div>
                                        </div>

                                        <div className="col-lg-2 col-md-2 mt-3">
                                            <div className="form-group">
                                                <label className="form-label">ville*</label>
                                                <input type="text" className="form-control" placeholder="ville fournisseur" name="villeshop" value={this.state.villeshop} onChange={(e) => this.handleChange(e)} />
                                            </div>
                                        </div>
                                        <div className="col-lg-2 col-md-2 mt-3">
                                            <div className="form-group">
                                                <label className="form-label">Pays*</label>
                                                <input type="text" className="form-control" placeholder="pays fournisseur" name="paysshop" value={this.state.paysshop} onChange={(e) => this.handleChange(e)} />
                                            </div>
                                        </div>

                                       

                                        <div className="col-lg-2 col-md-2 mt-3">
                                            <div className="form-group">
                                                <label className="form-label">qty*</label>
                                                <input type="number" className="form-control" placeholder="qty " name="qty" value={this.state.qty} onChange={(e) => this.handleChange(e)} />
                                            </div>
                                        </div>

                                    </div>


                                    


                                    <div className="button_price d-sm-flex align-items-center">

                                        <div className="form-group">
                                            <button className="save-btn hover-btn" type="submit" onClick={this.handleSubmit}>Ajouter Produit</button>
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
