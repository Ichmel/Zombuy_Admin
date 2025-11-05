import React, { Component } from 'react';
import {
    Button
} from "@material-ui/core";
import {  GetProductDetails } from '../../../../../services';
import Loader from '../../../../../loader';
import { NotificationManager } from 'react-notifications';
import swal from 'sweetalert';

export default class Edithome extends Component {
    constructor(props) {
        super(props);
        let self = this.props.location.state.row;
        this.state = {
           id: self.id, titre: self.titre, text: self.text, video: ''
        }
    }
    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    handleBack() {
        this.props.history.goBack();
    }
    
    
    onFileChange = event => {
        this.setState({ video: event.target.files[0] });
    };

    handleContentChange = contentHtml => {
        this.setState({
            content: contentHtml
        });
    };

    handleClose() {
        this.setState({ open: !this.state.open })
    }

    handleSubmit = event => {
        event.preventDefault();
        const { id, titre, text, video } = this.state
        const formData = new FormData();
        formData.append('id', id);
        formData.append('titre', titre);
        formData.append('text', text);
        formData.append('video', video);
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
                    let list = await GetProductDetails.getUpdatehomevideo(formData, config);
                    if (list) {
                        this.setState({ loading: false })
                        this.props.history.push("/admin/category/homepub")
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
                        <h2 className="mt-30 page-title">Categories</h2>
                    </div>
                    <div className="col-lg-5 col-md-3 col-lg-6 back-btn">
                        <Button variant="contained" onClick={(e) => this.handleBack()}><i class="fas fa-arrow-left" /> Back</Button>
                    </div>
                </div>
                <ol className="breadcrumb mb-30">
                    <li className="breadcrumb-item"><a href="/">Dashboard</a></li>
                    <li className="breadcrumb-item"><a href="/admin/product/create">Products</a></li>
                    <li className="breadcrumb-item active">Update Product</li>
                </ol>


                <div className="card-body-table">
                    {
                        loading ? <Loader /> : ''
                    }

                    <div className="col-lg-12 col-md-12 ">
                        <div className="card card-static-2 mb-30 ">
                            <div className="card-title-2 m-3">
                                <h4>Update Product</h4>
                            </div>
                            <div className="card-body-table m-3">
                                <div className="news-content-right pd-20">
                                    <div className="row">

                                    <div className="col-lg-3 col-md-2">
                                        <div className="form-group ">
                                            <label className="form-label">Video*</label>
                                            <input className="form-control" type="file" name="video" onChange={this.onFileChange} accept="video/*" /> {/* Utilisez accept="video/*" pour accepter uniquement les fichiers vidéo */}
                                        </div>
                                    </div>


                                        <div className="col-lg-4 col-md-2">
                                            <div className="form-group">
                                                <label className="form-label">Titre*</label>
                                                <input type="text" className="form-control" placeholder="titre" name="titre" value={this.state.titre} onChange={(e) => this.handleChange(e)} />
                                            </div>
                                        </div>

                                        <div className="col-lg-5 col-md-2">
                                            <div className="form-group">
                                                <label className="form-label">Description*</label>
                                                <textarea  rows='4' cols='50' type="text" className="form-control" placeholder="description" name="text" value={this.state.text} onChange={(e) => this.handleChange(e)} />
                                            </div>
                                        </div>


                                    </div>
                                </div>



                                <div className="col-lg-2 col-md-2 mt-3">
                                  


                                    <div className="button_price d-sm-flex align-items-center">

                                        <div className="form-group">
                                            <button className="save-btn hover-btn" type="submit" onClick={this.handleSubmit}>Update Category</button>
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

