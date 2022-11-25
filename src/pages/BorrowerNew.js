import React,{useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import './BorrowerNew.css';
import DataTable from "./books-list";

//function that makes a POST request using fetch to the backend api (currently set as http://localhost:8080/login) to get the test token.
//TODO once the database is set up, send the user credentials (stored as 'credentials') to the backend to recieve a real token

async function searchBorrower(credentials) {
    return fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
        .then(data => data.json())
}

export function BorrowerNew ({setToken}) {
    //useState to store username and password as user enters them
    const [name, setName] = useState('');
    const [ssn, setSSN] = useState('');
    const [address, setAddress] = useState('');

    //handles form submission (login attempts) by calling the loginUser function with inputted credentials
    //credentials is an object that contains username and password
    const handleSubmit = async e => {
        e.preventDefault();
        const token = await searchBorrower({
            name,
            ssn,
            address
        });
        setToken(token);
    }

    //the body is a form that calls the handleSubmit function above on submit
    return (
        <div className="borrower">
            <h1>New user:</h1>
            <form onSubmit={handleSubmit}>
                <label>Name:</label>

                <input
                    type="text"
                    required
                    value={name}
                    onChange={
                        (e) => setName(e.target.value)
                    }
                />
                <label>SSN:</label>
                <input
                    type="text"
                    required
                    value={ssn}
                    onChange={
                        (e) => setSSN(e.target.value)
                    }
                />
                <label>Address:</label>
                <input
                    type="text"
                    required
                    value={address}
                    onChange={
                        (e) => setAddress(e.target.value)
                    }
                />
                <button type = "submit">Create</button>
            </form>
        </div>
    )
}

BorrowerNew.propTypes = {
    setToken: PropTypes.func.isRequired
}