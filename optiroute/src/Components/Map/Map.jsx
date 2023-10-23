import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import Datetime from "react-datetime";
import {useGoogleMap, useLoadScript,} from '@react-google-maps/api'


export default function Map() {

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: 'AIzaSyDxtuA0Hdx5B0t4X3L0n9STcsGeDXNTYXY'
    })


    const [chosenDate, setChosenDate] = useState(new Date());
    return (
        <div>
            <div>
                <label className="label">Chose Date:</label>
                <Datetime value={chosenDate} onChange={(date) => setChosenDate(date)} />
            </div>
            <input id = "name" type='text' placeholder='Name' onChange={handleChangeName}
                value = {name}/>
            <button>
            Create Map
                onClick
            </button>
        </div>
    );
}