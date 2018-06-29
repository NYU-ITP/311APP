import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './Header';
import HomePage from './HomePage';
import NewIssue from './NewIssue';



const IssueNew = () => <h2>IssueNew</h2>

class App extends React.Component {
    render () {
        return (
            <div>
            <BrowserRouter>
                <div>
                    <Header /> 
                    <Route exact path="/" component={HomePage} />
                    <Route path="/issues" component={NewIssue} />
                </div>
            </BrowserRouter>
            </div>

        );
    }
};

export default App;