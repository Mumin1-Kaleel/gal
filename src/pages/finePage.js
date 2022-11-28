
import './HomePage.css';
import * as React from 'react';
import {useState} from "react";
import './finePage.css';

import FineTable from "./fine";


export default function FinePage() {

    const [card, setCard] = useState('');
    const [results, setResults] = useState('');
    const [res, setRes] = useState('');

    const handleSubmit = async e => {
        e.preventDefault();
        fetch('http://localhost:3000/fine/:' + String(card), {
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
            setResults(data);
            console.log(results);
        })
    }

    //the body is a form that calls the handleSubmit function above on submit
    return (
        <div>
            <div className="borrower">
                <h1>Profile:</h1>
                <form onSubmit={handleSubmit}>
                    <label>Card Id:</label>

                    <input
                        type="text"
                        required
                        value={card}
                        onChange={
                            (e) => setCard(e.target.value)
                        }
                    />

                    <button type = "submit">Submit</button>
                    <button className = "refreshbutton" type="button">Refresh</button>
                </form>
            </div>
            <div>
                <FineTable setResults={results}/>
            </div>
        </div>
    )
}