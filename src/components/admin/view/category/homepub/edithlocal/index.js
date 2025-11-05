import React, { Component } from 'react';
import { Modal } from '@material-ui/core';
import { GetCategoryList } from '../../../../../services';

export default class Editlocal extends Component {
    constructor(props) {
        super(props);
        const { ville, local , km ,prix } = this.props.state;
        this.state = {
            ville: ville , local:local , km:km , prix:prix
        }
    }
    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    handleOpen() {
        this.setState({ open: !this.state.open, loading: true })
    }

    handleClose() {
        this.setState({ open: !this.state.open })
    }
    
    async handleSubmit(e) {
        let data = { id: this.props.state.id, ville: this.state.ville, local: this.state.local,
        km: this.state.km, prix: this.state.prix}
        let list = await GetCategoryList.getUpdatelocalList(data);
        if(list){
             window.location.reload();
        }
    }
    render() {
        return (
            <div >
                <a className="edit-btn" onClick={(e) => this.handleOpen()}><i className="fas fa-edit" /></a>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.open}
                >
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Update  De Couleur </h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={()=>this.handleClose()}>
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body">
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
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={()=>this.handleClose()}>Close</button>
                                <button type="button" className="btn btn-primary" onClick={()=>this.handleSubmit()}>Save changes</button>
                            </div>
                        </div>
                    </div>
                </Modal>
            </div>
        )
    }
}

