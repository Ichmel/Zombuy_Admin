import React, { Component } from 'react'
import { Button, Typography } from "@material-ui/core";
import { GetCategoryList } from "../../../../services"
import swal from 'sweetalert';
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import Editlocal from './edithlocal';

export default class Homepub extends Component {
    constructor(props) {
        super(props);
        this.state = {
            titre: '',
            text: '',
            getList: [],
            video: null,  // Ajout de la propriété video
            loading: false,
            isLoaded: false,
            ville:'',
            local: '',
            km:'',
            prix:'',
            getdata: [],
        };
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
        let list = await GetCategoryList.getafficheVideohome();
        this.setState({ getList: list.data })
    }


    handleSubmit = event => {
        event.preventDefault();
        this.setState({ isLoaded: true });
        const { titre, text, video } = this.state;
        const formData = new FormData();
        formData.append('titre', titre);
        formData.append('text', text);
        formData.append('video', video);  // Ajout de la vidéo à FormData
        console.log('video',video)
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };

        swal({
            title: "Are you sure?",
            text: "You want to add Video",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(async (success) => {
                if (success) {
                    let list = await GetCategoryList.createhomepub(formData, config);
                    if (list) {
                        toast.success("successfully added");
                        this.getCategory();
                        this.setState({ isLoaded: false });
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
                    let value = await GetCategoryList.getDeletehomevideoById(id);
                    if (value) {
                        this.getCategory();
                    }
                }
            });
    }


    
    async getlocal() {
        let list = await GetCategoryList.getlocalList();
        this.setState({ getdata: list.data })
    }


    handleSubmitlocal = async () => {
        let { ville, local , km ,prix } = this.state;
        let data = { ville: ville , local:local , km:km , prix:prix };
        let list = await GetCategoryList.createtlocalList (data);
        if (list) {
            this.getlocal()
        }
    }

    
    async componentDidMount() {
        this.getCategory();
        this.getlocal();
    }
    
    async handlDeleteByIdlocal(id) {
        swal({
            title: "Are you sure?",
            text: "You want to delete Category from the List",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(async (success) => {
                if (success) {
                    let value = await GetCategoryList.getlocalDeleteById(id);
                    if (value) {
                        this.getlocal();
                    }
                }
            });
    }


    render() {
        let self = this.state.getList
        let { getdata } = this.state;

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
                    <li className="breadcrumb-item active"> Video/Localité</li>
                </ol>
                <div className="row">
                    <div className="col-lg-4 col-md-5">
                        <div className="card card-static-2 mb-30">
                            <div className="card-title-2 ml-3 mt-3">
                                <h4>Adjouter Un  Video</h4>
                            </div>
                            <div className="card-body-table">
                                <div className="news-content-right pd-20 m-3">
                                    <div className="form-group">
                                        <label className="form-label">Ttre*</label>
                                        <input type="text" className="form-control" placeholder="titre" name="titre" onChange={(e) => this.handleChange(e)} />
                                    </div>
                                    <div className="form-group mb-0">
                                        <label className="form-label">Description*</label>
                                        <textarea rows='4' cols='30'  type="text" className="form-control" placeholder="description" name="text" onChange={(e) => this.handleChange(e)} />
                                    </div>


                                    <div className="form-group mb-0">
                                        <div className="form-group mt-3">
                                            <label className="form-label">Video*</label>
                                            <input className="form-control" type="file" name="video" onChange={this.onFileChange} accept="video/*" /> {/* Utilisez accept="video/*" pour accepter uniquement les fichiers vidéo */}
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
                                            <h4>Listes des Videos </h4>
                                        </div>
                                        <div className="card-body-table">
                                            <div className="table-responsive">
                                                <table className="table ucp-table table-hover">
                                                    <thead>
                                                        <tr>
                                                            <th style={{ width: 30 }}><input type="checkbox" className="check-all" /></th>
                                                            <th style={{ width: 150 }}>Video</th>
                                                            <th style={{ width: 60 }}>Titre</th>
                                                            <th style={{ width: 250 }} >Description</th>
                                                            <th style={{ width: 80 }}>Date</th>
                                                            <th style={{ width: 60 }} >Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            self.map((row, index) => (
                                                                <tr key={index}>

                                                                    <td><input type="checkbox" className="check-item" name="ids[]" defaultValue={5} /></td>
                                                                    <td>
                                                                        
                                                                            <video controls className='video'>
                                                                                <source 
                                                                                src={`http://localhost:4001/${row.video}`}
                                                                                type='video/mp4' />

                                                                            </video>

                                                                        
                                                                    </td>
                                                                    <td>{row.titre}</td>
                                                                    <td>{row.text}</td>
                                                                    <td>
                                                                        <span className="delivery-time">{this.formatDate(row.createdAt)}</span>
                                                                    </td>
                                                                    <td className="action-btns gap-2">
                                                                        <Link to={{
                                                                            pathname: `/admin/category/edithome`,
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
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                
                <div className="row">
                    <div className="col-lg-4 col-md-5">
                        <div className="card card-static-2 mb-30">
                            <div className="card-title-2 ml-3 mt-3">
                                <h4>Ajouter Localite</h4>
                            </div>
                            <div className="card-body-table">
                                <div className="news-content-right pd-20 m-3">
                                    <div className="form-group">
                                        <label className="form-label mt-3">Pays/Ville*</label>
                                        <input type="text" className="form-control" placeholder="pays/ville" name="ville" value={this.state.ville} onChange={(e) => this.handleChange(e)} />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label mt-3">Lacalite*</label>
                                        <input type="text" className="form-control" placeholder="lacalite" name="local" value={this.state.local} onChange={(e) => this.handleChange(e)} />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label mt-3">Km*</label>
                                        <input type="text" className="form-control" placeholder="kilometre" name="km" value={this.state.km} onChange={(e) => this.handleChange(e)} />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label mt-3">Prix*</label>
                                        <input type="number" className="form-control" placeholder="prix" name="prix" value={this.state.prix} onChange={(e) => this.handleChange(e)} />
                                    </div>
                                    <button className="save-btn hover-btn" type="submit" onClick={this.handleSubmitlocal} >Ajouter</button>
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
                                            <h4>Listes Des Couleurs </h4>
                                        </div>
                                        <div className="card-body-table">
                                            <div className="table-responsive">
                                                <table className="table ucp-table table-hover">
                                                    <thead>
                                                        <tr>
                                                            <th style={{ width: 60 }}><input type="checkbox" className="check-all" /></th>                                       
                                                            <th scope="col">Pays/Ville</th>
                                                            <th scope="col">Localite</th>
                                                            <th scope="col">Km</th>
                                                            <th scope="col">Prix</th>
                                                            <th scope="col">Date</th>
                                                            <th scope="col">Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            getdata.map((row, index) => (
                                                                <tr key={index}>
                                                                    <td><input type="checkbox" className="check-item" name="ids[]" defaultValue={5} /></td>
                                                                    <td>{row.ville}  </td>
                                                                    <td>{row.local}</td>
                                                                    <td>{row.km} </td>
                                                                    <td>{row.prix} </td>
                                                                    <td>
                                                                        <span className="delivery-time">{this.formatDate(row.createdAt)}</span>
                                                                    </td>
                                                                    <td className="action-btns">
                                                                    {<Editlocal state={row} />}


                                                                        <Typography className="delete-btn" onClick={(e) => this.handlDeleteByIdlocal(row.id)} ><i className="fas fa-trash-alt" /></Typography>

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

        )
    }
}
