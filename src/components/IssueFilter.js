import React, { Component } from 'react'
import PropTypes from 'prop-types';

export default class IssueFilter extends Component {

    constructor(props) {
        super(props);
        this.state = {
            status: this.props.initFilter.status || '',
            effort_gte: this.props.initFilter.effort_gte || '',
            effort_lte: this.props.initFilter.effort_lte || '',
            changed: false
        }
        this.onChangeStatus = this.onChangeStatus.bind(this);
        this.onChangeEffortGte = this.onChangeEffortGte.bind(this);
        this.onChangeEffortLte = this.onChangeEffortLte.bind(this);
        this.applyFilter = this.applyFilter.bind(this);
        this.clearFilter = this.clearFilter.bind(this);
        this.resetFilter = this.resetFilter.bind(this);
    }

    onChangeStatus(e) {
        this.setState({
            status: e.target.value,
            changed: true
        });
    }

    onChangeEffortGte(e) {
        const effortString = e.target.value;
        if (effortString.match(/^\d*$/)) {
            this.setState({
                effort_gte: e.target.value,
                changed: true
            });
        }
    }

    onChangeEffortLte(e) {
        const effortString = e.target.value;
        if (effortString.match(/^\d*$/)) {
            this.setState({
                effort_lte: e.target.value,
                changed: true
            })
        }
    }

    applyFilter() {
        const newFilter = {};
        if (this.state.status) newFilter.status = this.state.status;
        if (this.state.effort_gte) newFilter.effort_gte = this.state.effort_gte;
        if (this.state.effort_lte) newFilter.effort_lte = this.state.effort_lte;
        this.props.setFilter(newFilter);
    }

    clearFilter() {
        this.props.setFilter({});
    }

    resetFilter() {
        this.setState({
            status: this.props.initFilter.status || '',
            effort_gte: this.props.initFilter.effort_gte || '',
            effort_lte: this.props.initFilter.effort_lte || '',
            changed: false,
        });
    }

    render() {
        return (
            <div className="row mt-4 mb-3">
                <label htmlFor="cboStatus" className="col-1 col-form-label">Status: </label>
                <div className="col-2">
                    <select className="form-select"
                        id="cboStatus" value={this.state.status} onChange={this.onChangeStatus}>
                        <option value="">(Any)</option>
                        <option value="New">New</option>
                        <option value="Open">Open</option>
                        <option value="Assigned">Assigned</option>
                        <option value="Fixed">Fixed</option>
                        <option value="Verify">Verify</option>
                        <option value="Closed">Closed</option>
                    </select>
                </div>
                <label htmlFor="" className="col-2 col-form-label text-center">Effort between: </label>
                <div className="col-1"><input type="text"
                    className="form-control" name="effort_gte" value={this.state.effort_gte} onChange={this.onChangeEffortGte} /></div>-
                <div className="col-1"><input type="text"
                    className="form-control" name="effort_lte" value={this.state.effort_lte} onChange={this.onChangeEffortLte} /></div>
                <div className="col-3 d-flex justify-content-between">
                    <button className="btn btn-primary" onClick={this.applyFilter}>Apply</button>
                    <button className="btn btn-primary" disabled onClick={this.resetFilter}>Reset</button>
                    <button className="btn btn-primary" onClick={this.clearFilter}>Cancel</button>
                </div>
            </div>
        )
    }
}

IssueFilter.propTypes = {
    setFilter: PropTypes.func.isRequired
}