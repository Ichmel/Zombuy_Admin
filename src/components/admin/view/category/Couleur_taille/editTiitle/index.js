import React, { Component } from 'react';
import { Modal } from '@material-ui/core';
import { GetCategoryList } from '../../../../../services';

export default class EditTitle extends Component {
    constructor(props) {
        super(props);
        const { title ,  titre , desc , description } = this.props.state;
        this.state = {
            title: title ,  titre : titre, description : description , desc: desc
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
        let data = { id: this.props.state.id, title: this.state.title , titre: this.state.titre ,
             desc: this.state.desc, description: this.state.description}
        let list = await GetCategoryList.getUpdatetitleList(data);
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
                                <h5 className="modal-title" id="exampleModalLabel">Update  De Title </h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={()=>this.handleClose()}>
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label className="form-label">Title*</label>
                                    <input type="text" className="form-control" name="title"value={this.state.title} onChange={(e) => this.handleChange(e)} />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Nom*</label>
                                    <input type="text" className="form-control" name="titre"value={this.state.titre} onChange={(e) => this.handleChange(e)} />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">description*</label>
                                    <textarea rows='4' cols='30' type="text" className="form-control" name="description"value={this.state.description} onChange={(e) => this.handleChange(e)} />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Commentaire*</label>
                                    <textarea rows='4' cols='30' type="text" className="form-control" name="desc"value={this.state.desc} onChange={(e) => this.handleChange(e)} />
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

