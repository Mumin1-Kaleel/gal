import React,{useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import './Search.css';
import DataTable from "./books-list";

//function that makes a POST request using fetch to the backend api (currently set as http://localhost:8080/login) to get the test token.
//TODO once the database is set up, send the user credentials (stored as 'credentials') to the backend to recieve a real token

export function Search ({setToken}) {
    //useState to store username and password as user enters them
    const [ISBN, setISBN] = useState('');
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [result, setResult] = useState('');
    const [available, setAvailable] = useState('');
    //handles form submission (login attempts) by calling the loginUser function with inputted credentials
    //credentials is an object that contains username and password
    const handleSubmit = async e => {
        e.preventDefault();
        console.log(ISBN);
        console.log(title);
        console.log(author);
        const token = await searchBook({
            ISBN,
            title,
            author
        });
        //console.log(token);
    }

    async function searchBook(credentials) {
        console.log(credentials);
        return (
            fetch('http://localhost:3000/Search', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credentials),
            })
            .then(response => {
                console.log("test");
                //console.log(response.text());
                return response.text();
            })
            .then(data => {
                console.log("test2");
                setResult(data);
                //alert(data);
                fetch('http://localhost:3000/Search/:' + String(ISBN), {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                })
                .then(response => {
                    console.log("test12");
                    //console.log(response.text());
                    return response.text();
                })
                .then(data => {
                    console.log("test13");
                    setAvailable(data);
                })
            })
        );
    }

    //the body is a form that calls the handleSubmit function above on submit
    return (
        <div>
        <div className="login">
            <h1>Search:</h1>
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
            <div>
                <h2>{result}</h2>
                <h2>{available}</h2>
            </div>
        </div>
            <div className = "booktable">
                <DataTable/>
            </div>
        </div>

    )
}

Search.propTypes = {
    setToken: PropTypes.func.isRequired
}