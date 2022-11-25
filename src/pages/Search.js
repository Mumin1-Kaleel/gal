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
                console.log(data);
                //setResult(data);
                //alert(data);
                data = JSON.parse(data);
                console.log(data[0]);
                for(let i = 0; i < data.length; i++){
                    console.log(data[i]);
                    var js_obj = JSON.parse(JSON.stringify(data[i]));
                    console.log(js_obj);
                    let keys = Object.keys(js_obj);
                    var isbn10 = String(js_obj[keys[0]]);
                    console.log(isbn10);
                    fetch('http://localhost:3000/Search/:' + String(isbn10), {
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
                    .then(data2 => {
                        console.log("test13");
                        console.log(data2);
                        Object.assign(data[i], {"available": String(data2)});
                    })
                    console.log(data[i]);
                }
                console.log(data);
                setResult(data.toString());
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
                    value={ISBN}
                    onChange={
                        (e) => setISBN(e.target.value)
                    }
                />
                <label>Title:</label>
                <input
                    type="text"
                    value={title}
                    onChange={
                        (e) => setTitle(e.target.value)
                    }
                />
                <label>Author:</label>
                <input
                    type="text"
                    value={author}
                    onChange={
                        (e) => setAuthor(e.target.value)
                    }
                />
                <button type = "submit">Search</button>
            </form>
        </div>
        <div>
            <h2>{result}</h2>
        </div>
           {/*  <div className = "booktable">
                <DataTable setResults = {result}/>
            </div> */}
        </div>

    )
}

Search.propTypes = {
    setToken: PropTypes.func.isRequired
}