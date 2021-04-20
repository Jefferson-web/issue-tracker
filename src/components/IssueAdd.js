import React, { Component } from 'react'

export default class IssueAdd extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        let form = document.forms.issueAdd;
        this.props.createIssue({
            owner: form.owner.value,
            title: form.title.value,
            status: 'New',
            created: new Date()
        });
        form.owner.value = '';
        form.title.value = '';
    }

    render() {
        return (
            <div className="col-4 mx-auto">
                <form name="issueAdd" className="card" onSubmit={this.handleSubmit}>
                    <div className="card-header">Issue Add</div>
                    <div className="card-body">
                        <div className="mb-3">
                            <input type="text" name="owner" className="form-control" placeholder="Owner" />
                        </div>
                        <div className="mb-3">
                            <input type="text" name="title" className="form-control" placeholder="Title" />
                        </div>
                        <button className="btn btn-primary" style={{ width: '100%' }}>Register</button>
                    </div>
                </form>
            </div>
        )
    }
}
