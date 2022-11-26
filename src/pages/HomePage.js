
import {DataGrid} from "@mui/x-data-grid";
import {useState} from "react";
import './HomePage.css';
import * as React from 'react';
import DataTable from "./check-in";
import FineTable from "./fine";


export default function HomePage() {

    const [card, setCard] = useState('');
    const [results, setResults] = useState('');
    const handleSubmit = async e => {
        e.preventDefault();
        fetch('http://localhost:3000/home/:' + String(card), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(response => {
            console.log("test12");
            return response.text();
        })
        .then(data => {
            console.log("test13");
            console.log(data);
            setResults(data);
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
                </form>
            </div>
            <div>
                <h2>{results}</h2>
            </div>
            <div>
                <DataTable/>
            </div>
            <div>
                <FineTable/>
            </div>
        </div>
    )
}