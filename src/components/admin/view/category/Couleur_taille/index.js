import React, { Component } from 'react'
import {
    Button, Typography
} from "@material-ui/core";
import ReactPaginate from 'react-paginate';
import { GetCategoryList } from "../../../../services"
import { GetProductDetails } from '../../../../services';
import Edit from './edit'
import swal from 'sweetalert';
import EditTitle from './editTiitle';
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';


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

export default class Coultaille extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '', listtitle: [], listcouleur: [], color: '', image: '', getList: [], titre: '',
            nom: '', desc: '', description: '', descript: '', offset: 0,
            perPage: 5,
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
    handleProduct = (value) => {
        this.setState({ selectedProduct: value });
    }
    // pagination 


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
    /*........................Fonction de Liste et Ajout de couleur................................*/


    async getcouleur() {
        let list = await GetCategoryList.getcouleurList();
        this.setState({ listcouleur: list.data })
    }


    handleSubmit = async () => {
        let { color } = this.state;
        let data = { color: color };
        let list = await GetCategoryList.createcouleurList(data);
        if (list) {
            this.getcouleur()
        }
    }

    /*........................Fonction de Liste et Ajout de Taille................................*/


    async gettitleList() {
        let list = await GetCategoryList.getTitleList();
        this.setState({ listtitle: list.data })

    }



    handleSubmitTitle = async () => {
        let { title, nom, desc, description } = this.state;
        let data = { title: title, titre: nom, description: description, desc: desc };
        let list = await GetCategoryList.createtitleList(data);
        if (list) {
            this.gettitleList()
        }
    }


    /*........................Fonction d affichage................................*/


    async getbackground() {
        let list = await GetCategoryList.getbackgroundList();
        this.setState({ getList: list.data })
    }



    async componentDidMount() {

        this.gettitleList();
        //affichage des Liste des Produit  
        this.getcouleur();

        this.getbackground();


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
                    let value = await GetCategoryList.getCouleurDeleteById(id);
                    if (value) {
                        this.getcouleur();
                    }
                }
            });
    }

    async handlDeletetitleById(id) {
        swal({
            title: "Are you sure?",
            text: "You want to delete Category from the List",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(async (success) => {
                if (success) {
                    let value = await GetCategoryList.getTitleDeleteById(id);
                    if (value) {
                        this.gettitleList();
                    }
                }
            });
    }






    handleSubmitbackground = event => {
        event.preventDefault();
        this.setState({ isLoaded: true })
        const { titre, image, descript } = this.state;
        const formData = new FormData();
        formData.append('titre', titre);
        formData.append('description', descript);
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
                    let list = await GetCategoryList.createbackgroundList(formData, config);
                    if (list) {
                        toast.success("successfully added");
                        this.getbackground();
                        this.setState({ isLoaded: false })
                    } else {
                        toast.error("error");
                    }
                }
            });

    }




    async handlbackgoundDeleteById(id) {
        swal({
            title: "Are you sure?",
            text: "You want to delete Category from the List",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(async (success) => {
                if (success) {
                    let value = await GetCategoryList.getDeletebackgroundById(id);
                    if (value) {
                        this.getbackground();
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
            listtitle: slice
        })

    }



    render() {

        let { listcouleur, listtitle, getList } = this.state;
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
                    <li className="breadcrumb-item active">Couleur/Donnees</li>
                </ol>

                <div className="row">

                    <div className="card-title-2 ml-3 mt-3">
                        <h4>Ajouter Titre</h4>
                    </div>

                        <div className="col-lg-2 col-md-2">
                            <div className="form-group">
                                <label className="form-label mt-3">Titre*</label>
                                <input type="text" className="form-control" placeholder="titre" name="title" value={this.state.title} onChange={(e) => this.handleChange(e)} />
                            </div>
                        </div>

                        <div className="col-lg-2 col-md-4">
                            <div className="form-group">
                                <label className="form-label mt-3">Nom*</label>
                                <input type="text" className="form-control" placeholder="nom" name="nom" value={this.state.nom} onChange={(e) => this.handleChange(e)} />
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-4">
                                <label className="form-label">Description*</label>
                                <textarea rows='4' cols='30' type="text" className="form-control" placeholder="description" name="description" value={this.state.description} onChange={(e) => this.handleChange(e)} />
                        </div>

                        <div className="col-lg-4 col-md-4  ">
                                <label className="form-label mt-3">Commentaire*</label>
                                <textarea rows='4' cols='30' type="text" className="form-control" placeholder="commentaire" name="desc" value={this.state.desc} onChange={(e) => this.handleChange(e)} />
                        </div>

                       

                </div>
                <div className="form-group  mb-4">
                <button className="save-btn hover-btn" type="submit" onClick={this.handleSubmitTitle} >Ajouter</button>
</div>
                <div className="row">
                    <div className="col-lg-12 col-md-5">
                        <div className="all-cate-tags">
                            <div className="row justify-content-between">
                                <div className="col-lg-12 col-md-12">
                                    <div className="card card-static-2 mb-30">
                                        <div className="card-title-2">
                                            <h4>Listes Des Donnees </h4>
                                        </div>
                                        <div className="card-body-table">
                                            <div className="table-responsive">
                                                <table className="table ucp-table table-hover">
                                                    <thead>
                                                        <tr>
                                                            <th style={{ width: 60 }}><input type="checkbox" className="check-all" /></th>
                                                            <th style={{ width: 50 }}>Titre(ALL) </th>
                                                            <th style={{ width: 40 }}>Nom(1) </th>
                                                            <th style={{ width: 200 }}>Description</th>
                                                            <th style={{ width: 150 }}>Commentaire</th>
                                                            <th style={{ width: 100 }}>Date</th>
                                                            <th style={{ width: 100 }}>Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            listtitle.map((row, index) => (
                                                                <tr key={index}>
                                                                    <td><input type="checkbox" className="check-item" name="ids[]" defaultValue={5} />{row.id} </td>
                                                                    <td>{row.title}</td>
                                                                    <td>{row.titre}</td>
                                                                    <td>{row.description}</td>
                                                                    <td>{row.desc}</td>
                                                                    <td>
                                                                        <span className="delivery-time">{this.formatDate(row.createdAt)}</span>
                                                                    </td>
                                                                    <td className="action-btns">
                                                                        {<EditTitle state={row} />}


                                                                        <Typography className="delete-btn" onClick={(e) => this.handlDeletetitleById(row.id)} ><i className="fas fa-trash-alt" /></Typography>

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
                                <h4>Ajouter Background</h4>
                            </div>
                            <div className="card-body-table">
                                <div className="news-content-right pd-20 m-3">
                                    <div className="form-group mb-0">
                                        <div className="form-group">
                                            <label className="form-label mt-3">Titre background*</label>
                                            <input type="text" className="form-control" placeholder="titre background" name="titre" value={this.state.titre} onChange={(e) => this.handleChange(e)} />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label mt-3">Description background*</label>
                                            <input type="text" className="form-control" placeholder="description background" name="descript" value={this.state.descript} onChange={(e) => this.handleChange(e)} />
                                        </div>
                                        <div className="form-group mt-3">
                                            <label className="form-label">Slider Image*</label>
                                            <input className="form-control" type="file" name="image" onChange={this.onFileChange} />
                                        </div>
                                    </div>
                                    <button className="save-btn hover-btn" type="submit" onClick={this.handleSubmitbackground} >Ajouter</button>
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
                                            <h4>Listes Des Background </h4>
                                        </div>
                                        <div className="card-body-table">
                                            <div className="table-responsive">
                                                <table className="table ucp-table table-hover">
                                                    <thead>
                                                        <tr>
                                                            <th style={{ width: 60 }}><input type="checkbox" className="check-all" /></th>
                                                            <th scope="col">Image</th>
                                                            <th>Titre</th>
                                                            <th>description</th>
                                                            <th scope="col">Date</th>
                                                            <th scope="col">Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            getList.map((row, index) => (
                                                                <tr key={index}>
                                                                    <td><input type="checkbox" className="check-item" name="ids[]" defaultValue={5} /></td>
                                                                    <td>
                                                                        <div className="cate-img-5">
                                                                            <img 
                                                                            src={`http://localhost:4001/${row.photo}`} 
                                                                            alt='' className='image' />
                                                                        </div>
                                                                    </td>
                                                                    <td>{row.titre}</td>
                                                                    <td>{row.description}</td>
                                                                    <td>
                                                                        <span className="delivery-time">{this.formatDate(row.createdAt)}</span>
                                                                    </td>
                                                                    <td className="action-btns gap-2">
                                                                        <Link to={{
                                                                            pathname: `/admin/category/editback`,
                                                                            state: { row }
                                                                        }}>
                                                                            <Typography className="edit-btn"><i className="fas fa-edit" /></Typography>
                                                                        </Link>

                                                                        <Typography className="delete-btn" onClick={(e) => this.handlbackgoundDeleteById(row.id)} ><i className="fas fa-trash-alt" /></Typography>
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
                                <h4>Ajouter Couleur</h4>
                            </div>
                            <div className="card-body-table">
                                <div className="news-content-right pd-20 m-3">
                                    <div className="form-group">
                                        <label className="form-label mt-3">Couleurs*</label>
                                        <input type="text" className="form-control" placeholder="couleur" name="color" value={this.state.color} onChange={(e) => this.handleChange(e)} />
                                    </div>
                                    <button className="save-btn hover-btn" type="submit" onClick={this.handleSubmit} >Ajouter</button>
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
                                                            <th scope="col">Couleur</th>
                                                            <th scope="col">Date</th>
                                                            <th scope="col">Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            listcouleur.map((row, index) => (
                                                                <tr key={index}>
                                                                    <td><input type="checkbox" className="check-item" name="ids[]" defaultValue={5} /></td>
                                                                    <td>{row.color}</td>
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
