import './App.css';
import Navbar from "./navbar/Navbar";
import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {Routes} from "react-router-dom";
import {Search} from "./pages/Search";
import {BorrowerNew} from "./pages/BorrowerNew";
import UseToken from "./comps/useToken";


function App() {
    const { token, setToken } = UseToken();
    return (
    <div className="App">
        <div>
            <React.Fragment>
                <Router>
                    <Navbar/>
                </Router>
            </React.Fragment>
            <Router>
                <Routes>
                    <Route exact path="/Search" element={<Search/>}/>
                    <Route exact path="/AddBorrower" element={<BorrowerNew/>}/>
                </Routes>
            </Router>
        </div>
    </div>
  );
}

export default App;
