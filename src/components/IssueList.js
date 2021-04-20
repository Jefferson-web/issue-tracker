import React, { Component, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import IssueFilter from './IssueFilter';
import IssueAdd from './IssueAdd';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { searchParams, toQueryString } from '../lib';

function IssueRow(props) {
    const issue = props.issue;
    return (
        <tr>
            <td><Link to={`/issues/${issue._id}`}>{issue._id.substr(-4)}</Link></td>
            <td>{issue.status}</td>
            <td>{issue.owner}</td>
            <td>{issue.created.toDateString()}</td>
            <td>{issue.effort}</td>
            <td>{issue.completionDate ? issue.completionDate.toDateString() : 'Unspecified'}</td>
            <td>{issue.title}</td>
        </tr>
    )
}

function IssueTable(props) {
    const issueRows = props.issues.map(issue => <IssueRow
        key={issue._id} issue={issue} />)
    return (
        <div>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Status</th>
                        <th>Owner</th>
                        <th>Created</th>
                        <th>Effort</th>
                        <th>Completation Date</th>
                        <th>Title</th>
                    </tr>
                </thead>
                <tbody>
                    {issueRows}
                </tbody>
            </table>
            {issueRows.length == 0 && (<div className="alert alert-info">No hay registros</div>)}
        </div>
    )
}

export default class IssueList extends Component {

    endpoint = 'http://localhost:3000/api/issues';

    constructor(props) {
        super(props);
        this.state = { issues: [] }
        this.createIssue = this.createIssue.bind(this);
        this.loadData = this.loadData.bind(this);
        this.setFilter = this.setFilter.bind(this);
    }

    componentDidUpdate(prevProps) {
        const oldQuery = searchParams(prevProps.location.search);
        const newQuery = searchParams(this.props.location.search);
        if (oldQuery.status === newQuery.status &&
            oldQuery.effort_lte === newQuery.effort_lte &&
            oldQuery.effort_gte === newQuery.effort_gte) {
            return;
        }
        this.loadData();
    }

    componentDidMount() {
        this.loadData();
    }

    setFilter(query) {
        this.props.history.push({ pathname: this.props.location.pathname, search: `?${toQueryString(query)}` });
    }

    createIssue(newIssue) {
        fetch(this.endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newIssue)
        })
            .then(response => {
                if (response.ok) {
                    response.json().then(data => {
                        let createdIssue = data.issue;
                        createdIssue.created = new Date(createdIssue.created);
                        if (createdIssue.completionDate)
                            createdIssue.completionDate = new Date(createdIssue.completionDate);
                        this.setState({
                            issues: [...this.state.issues, createdIssue]
                        });
                    })
                } else {
                    response.json().then(err => {
                        alert(err.message);
                    });
                }
            })
            .catch(err => console.log(err));
    }

    loadData() {
        fetch(`${this.endpoint}/${this.props.location.search}`)
            .then(response => {
                if (response.ok) {
                    response.json().then(data => {
                        data.records.forEach(issue => {
                            issue.created = new Date(issue.created);
                            if (issue.completionDate)
                                issue.completionDate = new Date(issue.completionDate);
                        });
                        this.setState({ issues: data.records });
                    });
                } else {
                    response.json().then(error => {
                        alert("Failed to fetch issues:" + error.message);
                    });
                }
            }).catch(err => {
                alert("Error in fetching data from server: " + err.message);
            });
    }

    render() {
        return (
            <div>
                <IssueFilter setFilter={this.setFilter} initFilter={searchParams(this.props.location.search)} />
                <IssueTable issues={this.state.issues} />
                <IssueAdd createIssue={this.createIssue} />
            </div>
        )
    }
}

IssueList.propTypes = {
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
}