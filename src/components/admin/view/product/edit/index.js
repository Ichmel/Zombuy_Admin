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
import Loader from '../../../../loader';
import { NotificationManager } from 'react-notifications';
import swal from 'sweetalert';
export default class Edit extends Component {
    constructor(props) {
        super(props);
        let self = this.props.location.state.row;
        let value = self.engros === "active" ? 1 : 0;
        this.state = {
            getListe: [],  
            getList: [], getsublist: [],  /* selectedCategory: '', selectedSubCategory: '', selectedChildCategory: '' */  blockhide: false, toggle: false, isLoaded: false,
            productId: self.id , nomprod: self.nomprod, image: '',prixF: self.prixF,  description: self.description, prix: self.prix, ancienprix: self.ancienprix, qty: self.qty, nomF: self.nomF, contactF:  self.contactF, localF: self.localF,adresseF: self.adresseF, engros: value
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




    handleSubmit = event => {
        event.preventDefault();
        this.setState({ isLoaded: true })
        const { /*selectedCategory, selectedSubCategory, selectedChildCategory */ adresseF, prixF,productId, nomprod, image, prix, ancienprix, qty, taille, couleur, nomF, contactF, localF, description, engros } = this.state;
        const formData = new FormData();
       // formData.append('categoryId', selectedCategory);
        //formData.append('typeId', selectedSubCategory);
        //formData.append('categorieId', selectedChildCategory);
        formData.append('productId', productId);
        formData.append('nomprod', nomprod);
        formData.append('taille', taille);
        formData.append('couleur', couleur);
        formData.append('engros', engros);
        formData.append('description', description);
        formData.append('photo', image);
        formData.append('prix', prix);
        formData.append('ancienprix', ancienprix);
        formData.append('qty', qty);
        formData.append('nomF', nomF);
        formData.append('prixF', prixF);
        formData.append('contactF', contactF);
        formData.append('adresseF', adresseF);
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
                    let list = await GetProductDetails.getUpdateProduct(formData, config);
                    if (list) {
                        this.setState({ loading: false })
                        this.props.history.push("/admin/product/list")
                    } else {
                        NotificationManager.error("Please! Check input field", "Input Field");
                    }
                }
            });

    }

    render() {
        const {  loading } = this.state;
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
                    <li className="breadcrumb-item active">Update Produit</li>
                </ol>


                <div className="card-body-table">
                                {
                                    loading ? <Loader /> : ''
                                }

                    <div className="col-lg-12 col-md-12 ">
                        <div className="card card-static-2 mb-30 ">
                            <div className="card-title-2 m-3">
                                <h4>Produit Update</h4>
                            </div>
                            <div className="card-body-table m-3">
                                <div className="news-content-right pd-20">
                                    <div className="row">

                                    <div className="col-lg-2 col-md-2">
                                            <div className="form-group">
                                                <label className="form-label">Image*</label>
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
                                                <label className="form-label">AncienPrix*</label>
                                                <input type="number" className="form-control" placeholder="Produit ancienprix" name="ancienprix" value={this.state.ancienprix} onChange={(e) => this.handleChange(e)} />
                                            </div>
                                        </div>

                                        <div className="col-lg-2 col-md-2">
                                            <div className="form-group">
                                                <label className="form-label">Nom_F*</label>
                                                <input type="text" className="form-control" placeholder="Nom fournisseur" name="nomF" value={this.state.nomF} onChange={(e) => this.handleChange(e)} />
                                            </div>
                                        </div>

                                        <div className="col-lg-2 col-md-2 ">
                                            <div className="form-group">
                                                <label className="form-label">Contact__F*</label>
                                                <input type="text" className="form-control" placeholder="numero fournisseur" name="contactF" value={this.state.contactF} onChange={(e) => this.handleChange(e)} />
                                            </div>
                                        </div>


                                        <div className="col-lg-2 col-md-2 mt-3">
                                            <div className="form-group">
                                                <label className="form-label">Localisation__F*</label>
                                                <input type="text" className="form-control" placeholder="localisation fournisseur" name="localF" value={this.state.localF} onChange={(e) => this.handleChange(e)} />
                                            </div>
                                        </div>

                                        <div className="col-lg-2 col-md-2 mt-3">
                                            <div className="form-group">
                                                <label className="form-label">Adresse__F*</label>
                                                <input type="text" className="form-control" placeholder="adresse fournisseur" name="adresseF" value={this.state.adresseF} onChange={(e) => this.handleChange(e)} />
                                            </div>
                                        </div>


                                        <div className="col-lg-2 col-md-2 mt-3">
                                            <div className="form-group">
                                                <label className="form-label">prixF*</label>
                                                <input type="number" className="form-control" placeholder="Prix fournisseur" name="prixF" value={this.state.prixF} onChange={(e) => this.handleChange(e)} />
                                            </div>
                                        </div>

                                        <div className="col-lg-2 col-md-2  mt-3">
                                            <div className="form-group">
                                                <label className="form-label">Status*</label>
                                                <select id="status" name="engros" className="form-control" value={this.state.engros} onChange={(e) => this.handleChange(e)}>
                                                    <option value={1}>Oui</option>
                                                    <option value={0}>non</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="col-lg-2 col-md-2 mt-3">
                                            <div className="form-group">
                                                <label className="form-label">qty*</label>
                                                <input type="number" className="form-control" placeholder="localisation fournisseur" name="qty" value={this.state.qty} onChange={(e) => this.handleChange(e)} />
                                            </div>
                                        </div>


                                        <div className="form-group col-md-4   mt-4">
                                            <label className="form-label">Description*</label>
                                            <textarea rows="4" cols="50" className="form-control" name="description" value={this.state.description} onChange={(e) => this.handleChange(e)} />
                                        </div>



                                    </div>


                                    <div className="button_price d-sm-flex align-items-center">

                                        <div className="form-group">
                                            <button className="save-btn hover-btn" type="submit" onClick={this.handleSubmit}>Update Produit</button>
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
