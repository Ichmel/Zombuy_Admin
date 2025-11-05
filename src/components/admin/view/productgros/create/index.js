 import React, { Component } from 'react';
import {
    Button
} from "@material-ui/core";
//import MainCategorylist from '../../../../common/category/main-category';
import { GetCategoryList, GetProductDetails } from '../../../../services';
//import SubCategorylist from '../../../../common/category/sub-category';
//import ChildCategorylist from '../../../../common/category/child-category';
import { GetProductGros } from '../../../../services'
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
            nomprod: '', image: '', adresseF: ``, description: '',prixF: '' , prix: '', qty: '', nomF: '', contactF: '', localF: ''
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


    caculationTable = () => {
        let price = this.state.price;
        let qty = this.state.qty;
        let discountPer = this.state.discountPer;
        if (price > 0 && qty > 0 && discountPer >= 0) {
            let discount = (Math.round(((price * qty) * discountPer) / 100));
            let total = (Math.round(price * qty));
            let grand_total = (Math.round((price * qty) - discount));

            this.setState({ total: total, grand_total: grand_total, discount: discount })
        } else {
            NotificationManager.error("Negative value & Zero Price not allowed", "Input Field");
        }
    }
    handleCheckPrice() {
        this.caculationTable();
        this.setState({ toggle: !this.state.toggle })
    }
    handleSubmit = event => {
        event.preventDefault();
        this.setState({ isLoaded: true })
        const { selectedCategory, selectedSubCategory, selectedChildCategory, nomprod, image, prix, qty, taille, couleur,prixF, nomF, contactF, localF, description, adresseF } = this.state;
        const formData = new FormData();
        formData.append('categoryId', selectedCategory);
        formData.append('typeId', selectedSubCategory);
        formData.append('categorieId', selectedChildCategory);
        formData.append('nomprod', nomprod);
        formData.append('taille', taille);
        formData.append('couleur', couleur);
        formData.append('qty', qty);
        formData.append('description', description);
        formData.append('photo', image);
        formData.append('prix', prix);
        formData.append('adresseF', adresseF);
        formData.append('qty', qty);
        formData.append('nomF', nomF);
        formData.append('prixF', prixF);
        formData.append('contactF', contactF);
        formData.append('localF', localF);
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
                    let list = await GetProductGros.addProductList(formData, config);
                    if (list) {
                        this.setState({ isLoaded: false })
                        this.props.history.push("/admin/productgros/list")
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

                    <div className="col-lg-4 col-md-6">
                        <div className="card card-static-2 mb-30">
                            <div className="card-body-table ">
                                <div className="news-content-right pd-20">
                                    <div className="form-group m-3">
                                        <label className="form-label">Child Category*</label>
                                        <select className=" p-2  form-select-sm w-100" name="selectedChildCategory" value={selectedChildCategory} onChange={(e) => this.handleChange(e)} >
                                            <option>Select sub category</option>
                                            {
                                                childList.map((row, index) => (
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
                                                <input type="text" className="form-control" placeholder="Produit Nom" name="nomprod" value={this.state.nomprod} onChange={(e) => this.handleChange(e)} />
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
                                                <label className="form-label">adresseF*</label>
                                                <input type="text" className="form-control" placeholder="adresse Fournisseur" name="adresseF" value={this.state.adresseF} onChange={(e) => this.handleChange(e)} />
                                            </div>
                                        </div>

                                        <div className="col-lg-2 col-md-2">
                                            <div className="form-group">
                                                <label className="form-label">Nom_F*</label>
                                                <input type="text" className="form-control" placeholder="nom fournisseur" name="nomF" value={this.state.nomF} onChange={(e) => this.handleChange(e)} />
                                            </div>
                                        </div>

                                        <div className="col-lg-2 col-md-2 ">
                                            <div className="form-group">
                                                <label className="form-label">Contact__F*</label>
                                                <input type="number" className="form-control" placeholder="numero fournisseur" name="contactF" value={this.state.contactF} onChange={(e) => this.handleChange(e)} />
                                            </div>
                                        </div>


                                        <div className="col-lg-2 col-md-2 mt-3">
                                            <div className="form-group">
                                                <label className="form-label">Localisation__F*</label>
                                                <input type="text" className="form-control" placeholder="localisation fournisseur" name="localF" value={this.state.localF} onChange={(e) => this.handleChange(e)} />
                                            </div>
                                        </div>

                                        <div className="col-lg-2 col-md-2 mt-3 ">
                                            <div className="form-group">
                                                <label className="form-label">Prix__F*</label>
                                                <input type="number" className="form-control" placeholder="Prix fournisseur" name="prixF" value={this.state.prixF} onChange={(e) => this.handleChange(e)} />
                                            </div>
                                        </div>

                                        <div className="col-lg-2 col-md-2 mt-3">
                                            <div className="form-group">
                                                <label className="form-label">qty*</label>
                                                <input type="number" className="form-control" placeholder="qty" name="qty" value={this.state.qty} onChange={(e) => this.handleChange(e)} />
                                            </div>
                                        </div>


                                        <div className="form-group col-md-4   mt-4">
                                            <label className="form-label">Description*</label>
                                            <textarea rows="4" cols="50" className="form-control" name="description" value={this.state.description} onChange={(e) => this.handleChange(e)} />
                                        </div>



                                    </div>


                                    <div className="button_price d-sm-flex align-items-center">

                                        <div className="form-group">
                                            <button className="save-btn hover-btn" type="submit" onClick={this.handleSubmit}>Add New Product</button>
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
