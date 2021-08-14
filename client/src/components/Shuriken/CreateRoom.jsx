import React,{useState} from "react";
import { v1 as uuid } from "uuid";
import {navigate} from '@reach/router';
import NavBar from "../Navbar/NavBar";
import RoomNav from "../Navbar/RoomNav";


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
        <RoomNav/>
        <button onClick={create}>Create Room</button>
        </div>
    );
}

export default CreateRoom;