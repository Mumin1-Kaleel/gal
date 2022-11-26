import React from "react";
import "./Navbar.css";
import {Nav} from "react-bootstrap";

const Navbar = () => {

    return(
        <section>
            <div className = "sidebar" >
                <ul>
                    <li className = "firstSideComponent">
                        <Nav.Item><Nav.Link className = "sideButtons" href="/home">Home</Nav.Link></Nav.Item>
                    </li>
                    <li className = "theRestOfSide">
                        <Nav.Item><Nav.Link className = "sideButtons" href="/fine">Fines</Nav.Link></Nav.Item>
                    </li>
                    <li className = "theRestOfSide">
                        <Nav.Item><Nav.Link className = "sideButtons" href="/Search">Search</Nav.Link></Nav.Item>
                    </li>
                    <li className = "theRestOfSide">
                        <Nav.Item><Nav.Link className = "sideButtons" href="/AddBorrower">Add Borrower</Nav.Link></Nav.Item>
                    </li>
                </ul>
            </div>
        </section>
    );
}

export default Navbar;