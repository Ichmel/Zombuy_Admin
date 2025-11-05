import React, { Component } from 'react';
import { Modal } from '@material-ui/core';
import { GetCommercialListe } from '../../../../../../services';

export default class EditPrime extends Component {
    constructor(props) {
        super(props);
        const { commission } = this.props.state;
        this.state = {
            commission: commission
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
        let data = { id: this.props.state.id, commission: this.state.commission }
        console.log('data', data)
        let list = await GetCommercialListe.getCommissionUpdate(data);
        console.log('list', list)
        if (list) {
            window.location.reload();
        }
    }

    render() {
        return (
            <div>
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
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => this.handleClose()}>
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label className="form-label">Commission *</label>
                                    <select id="commission" name="commission" className="custom-select" value={this.state.commission} onChange={(e) => this.handleChange(e)}>
                                        <option value="">Select commission</option>
                                        <option value="nonpaye">Non_paye</option>
                                        <option value="paye">Paye</option>
                                    </select>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => this.handleClose()}>Close</button>
                                <button type="button" className="btn btn-primary" onClick={() => this.handleSubmit()}>Save changes</button>
                            </div>
                        </div>
                    </div>
                </Modal>
            </div>
        )
    }
}
