import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './Header';
import HomePage from './HomePage';



const IssueNew = () => <h2>IssueNew</h2>

const App = () => {
    return (
        <div>
           <BrowserRouter>
              <div>
                <Header /> 
                <Route exact path="/" component={HomePage} />
                <Route path="/issues" component={IssueNew} />
              </div>
           </BrowserRouter>
        </div>

    );
};

export default App;