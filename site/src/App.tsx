import React from 'react';
import './Styles/App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import CustomAppBar from "./Components/CustomAppBar";
import Profile from "./Components/Profile";
import Logout from "./Components/Logout";
import Manage from "./Components/Manage";

console.log(process.env);
process.env.NODE_CONFIG_DIR = __dirname + '/Config/';

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