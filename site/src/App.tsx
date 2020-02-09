import React from 'react';
import './styles/App.css';
import CustomAppBar from "./components/CustomAppBar";
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Profile from "./components/Profile";
import Logout from "./components/Logout";
import Manage from "./components/Manage";

const App: React.FC = () => {
    return (
        <div className="App">
            <Router>
                <CustomAppBar />
                <Route path="/user/profile" component={Profile} />
                <Route path="/user/manage" component={Manage} />
                <Route path="/user/logout" component={Logout} />
            </Router>
        </div>
    );
};

export default App;