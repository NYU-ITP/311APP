import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './Header';
import HomePage from './HomePage';
// import NewIssue from './NewIssue';
import { MapContainer } from './MapContainer';


class App extends React.Component {
    render () {
        return (
            <div>
            <BrowserRouter>
                <div>
                    <Header /> 
                    <Route exact path="/" component={HomePage} />
                </div>
            </BrowserRouter>
            </div>

        );
    }
};

export default App;