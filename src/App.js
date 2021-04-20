import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import IssueList from './components/IssueList';
import IssueEdit from './components/IssueEdit';
import { BrowserRouter as Router, Redirect, Route, Switch, withRouter } from 'react-router-dom';

const NotFound = () => (<div>Not Found</div>)

const Routes = () => (
  <Router>
    <Switch>
      <Route path="/issues/:id" component={IssueEdit} />
      <Route path="/issues" component={withRouter(IssueList)} />
      <Redirect from="/" to="/issues" />
      <Route path="*" component={NotFound} />
    </Switch>
  </Router>
)

function App() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-12 mx-auto">
          <h1 className="text-center my-3">Issue Tracker</h1>
          <div className="contents">
            <Routes />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App;