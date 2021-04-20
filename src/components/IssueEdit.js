import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export default class IssueEdit extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { params } = this.props.match;
        return (
            <div>
                {params.id}
                <br/><Link to="/">Regresar</Link>
            </div>
        )
    }
}
