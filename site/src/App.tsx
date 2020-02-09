import React from 'react';
import './styles/App.css';
import CustomAppBar from "./components/CustomAppBar";
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Profile from "./components/Profile";

const App: React.FC = () => {
    return (
        <div className="App">
            <Router>
                <CustomAppBar />
                <Route path="/user/profile" component={Profile} />
            </Router>
        </div>
    );
};

export default App;