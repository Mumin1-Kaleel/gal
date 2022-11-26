import React, {useState} from "react";
import './askForCard.css'

function Modal({ setOpenModal }) {

    const [CardID, setCardID] = useState('');
    const handleSubmit = async e => {
        e.preventDefault();
        fetch('http://localhost:3000/Search/:' + CardID, {
                method: 'GET',
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
                
                

            })


    }

    return (
        <div className="modalBackground">
            <div className="modalContainer">
                <div className="titleCloseBtn">
                    <button
                        onClick={() => {
                            setOpenModal(false);
                        }}
                    >
                        X
                    </button>
                </div>
                <div className="body">
                    <form onSubmit = {handleSubmit}>
                        <label className = "cardno" >Card no.</label>

                        <input
                            className = "cardArea"
                            type="text"
                            required
                            value={ISBN}
                            onChange={
                                (e) => setCardID(e.target.value)
                            }
                        />

                        <button className = "close" type = "submit"
                                onClick={() => {
                                setOpenModal(false);
                        }}
                        >
                            Submit
                        </button>
                    </form>
                </div>

            </div>
        </div>
    );
}

export default Modal;