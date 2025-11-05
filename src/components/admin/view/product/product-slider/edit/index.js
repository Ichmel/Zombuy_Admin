import React, { Component } from 'react';
import { Modal,  Button } from '@material-ui/core';
import { GetCategoryList } from '../../../../../services';
import Loader from '../../../../../loader';
import { NotificationManager } from 'react-notifications';
import swal from 'sweetalert';

export default class Edit extends Component {
    constructor(props) {
        super(props);
        const { taille, couleur } = this.props.state;
        this.state = {
            taille: taille , couleur : couleur, image:''
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

    onFileChange = event => {
        this.setState({ image: event.target.files[0] });
    };
  
    async handleSubmit(e) {
        let data = { id: this.props.state.id, taille: this.state.taille, couleur: this.state.couleur}
        let list = await GetCategoryList.getupdateproductphotoList(data);
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
                                <h5 className="modal-title" id="exampleModalLabel">Update Location</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={()=>this.handleClose()}>
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label className="form-label">Couleur*</label>
                                    <input type="text" className="form-control" name="couleur" value={this.state.couleur} onChange={(e) => this.handleChange(e)} />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Taille*</label>
                                    <input type="text" className="form-control" name="taille" value={this.state.taille} onChange={(e) => this.handleChange(e)} />
                                </div>
                                
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={()=>this.handleClose()}>Close</button>
                                < button
                                type="button"
                                className="btn btn-primary"
                                onClick={(e) => this.handleSubmit(e)} 
                            >
                                Save changes
                            </button>
                            </div>
                        </div>
                    </div>
                </Modal>
            </div>
        )
    }
}

