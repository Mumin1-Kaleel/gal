
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

    const handleRefresh = async e => {
        e.preventDefault();
        fetch('http://localhost:3000/fine/:' + String(card), {
            method: 'POST',
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
            console.log(data);
            console.log(typeof data);
            setRes(data);
            console.log(res);
        })

        var my;
        if(res.charAt(0) == '[') {

            my = '{"books":' +   res   + '}';
        } else {

            my = '{"books":[' +   res   + ']}';
        }

        var objInfo
        var obj = [];

        try {

            obj = JSON.parse(my);
        } catch (err) {
            obj = [];
        }
        console.log(typeof obj);
// [{"loanid":"1","isbn10":"0195153448","cardid":"ID001000","date_out":"2022-11-25T06:00:00.000Z","due_date":"2022-12-09T06:00:00.000Z","date_in":null},{"loanid":"2","isbn10":"1234567890","cardid":"ID001000","date_out":"2022-11-25T06:00:00.000Z","due_date":"2022-12-09T06:00:00.000Z","date_in":null}]
        try {

            objInfo = obj.books.map(function (order) {

                if(order.date_in === null) {

                    const date1 = new Date(order.date_out);
                    const date2 = new Date();
                    console.log(date1);
                    console.log(date2);
                    const diffTime = Math.abs(date2 - date1);
                    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
                    console.log(diffDays + " days");
                    if (diffDays > 14) {

                        const time = diffDays - 14
                        const cost = .25 * time;
                        fetch('http://localhost:3000/fine/:' + String(order.loanid) + '/:' + String(cost), {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json',
                                'Accept': 'application/json'
                            },
                            })
                            .then(response => {
                                console.log("test12");
                                return response.text();
                            })
                            .then(data => {
                                console.log("test13");
                                console.log(data);
                                alert(data);
                            })
                    }
                }

            });

        } catch (err) {

        }

    }

    //the body is a form that calls the handleSubmit function above on submit
    return (
        <div>
            <div className="borrower">
                <h1>Fines:</h1>
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
                    <button className = "refreshbutton" type="button" onClick={handleRefresh}>Refresh</button>
                </form>
            </div>
            <div>
                <FineTable setResults={results}/>
            </div>
        </div>
    )
}