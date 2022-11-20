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
                        <Nav.Item><Nav.Link className = "sideButtons" href="/about">About</Nav.Link></Nav.Item>
                    </li>
                    <li className = "theRestOfSide">
                        <Nav.Item><Nav.Link className = "sideButtons" href="/Search">Search</Nav.Link></Nav.Item>
                    </li>
                    <li className = "theRestOfSide">
                        <Nav.Item><Nav.Link className = "sideButtons" href="/AddEvent">Add Event</Nav.Link></Nav.Item>
                    </li>
                </ul>
            </div>
        </section>
    );
}

export default Navbar;