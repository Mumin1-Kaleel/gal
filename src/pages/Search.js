import React,{useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import './Search.css';

//function that makes a POST request using fetch to the backend api (currently set as http://localhost:8080/login) to get the test token.
//TODO once the database is set up, send the user credentials (stored as 'credentials') to the backend to recieve a real token

async function searchBook(credentials) {
    return fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
        .then(data => data.json())
}

export function Search ({setToken}) {
    //useState to store username and password as user enters them
    const [ISBN, setISBN] = useState('');
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');

    //handles form submission (login attempts) by calling the loginUser function with inputted credentials
    //credentials is an object that contains username and password
    const handleSubmit = async e => {
        e.preventDefault();
        const token = await searchBook({
            ISBN,
            title,
            author
        });
        setToken(token);
    }

    //the body is a form that calls the handleSubmit function above on submit
    return (
        <div className="login">
            <h1>Login:</h1>
            <form onSubmit={handleSubmit}>
                <label>ISBN:</label>

                <input
                    type="text"
                    required
                    value={ISBN}
                    onChange={
                        (e) => setISBN(e.target.value)
                    }
                />
                <label>Title:</label>
                <input
                    type="text"
                    required
                    value={title}
                    onChange={
                        (e) => setTitle(e.target.value)
                    }
                />
                <label>Author:</label>
                <input
                    type="text"
                    required
                    value={author}
                    onChange={
                        (e) => setAuthor(e.target.value)
                    }
                />
                <button type = "submit">Search</button>
            </form>
        </div>
    )
}

Search.propTypes = {
    setToken: PropTypes.func.isRequired
}