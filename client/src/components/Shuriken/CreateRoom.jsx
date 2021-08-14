import React,{useState} from "react";
import { v1 as uuid } from "uuid";
import {navigate} from '@reach/router';


const CreateRoom = (props) => {
    const room = [];
    function create() {
        const id = uuid();
        room.push(id);
        console.log(room);
        navigate(`/room/${id}`);
    }
console.log(room);
    return (
        <div>
        <button onClick={create}>Create Room</button>
        </div>
    );
}

export default CreateRoom;