import React, { useEffect, useState } from "react";
import Mensaje from "./Mensaje";

function ChatBox(){
const [mensaje, setMensaje]= useState([]);
const [input, setInput]= useState('');
const[isUserTurn, setIsUserTurn]=useState(true);

//Carga mensajes desde el localStorage
useEffect(()=>{
    const savedMessages = JSON.parse(localStorage.getItem('messages')) || [];
}, []);

//Guarda mensajes en el localStorage
useEffect(()=>{
    localStorage.setItem('mensaje', JSON.stringify(mensaje));
},[mensaje]);

const handleSend= ()=>{
    if (input.trim()){
        const sender=isUserTurn ? 'user' : 'other';
        const newMessage ={sender, text:input}
        setMensaje([...mensaje, newMessage]);
        setInput('')
        setIsUserTurn(!isUserTurn);
    }
}
 
return(
<div className="ChatBox">
    <div className="mensaje">
        {mensaje.map((msg,index)=>(
            <div key ={index}>
                <strong>{msg.sender === 'user' ? 'Tu' : 'Otro'}</strong>   
                <Mensaje text={msg.text}/>      
            </div>
    
            ))}
    </div>
    <div className="inputbox">
            <input
            type="text"
            value={input}
            onChange={(e)=>setInput(e.target.value)} 
            placeholder="Habla conmigo!"></input>
            <button onClick={handleSend}>Enviar</button>
    </div>
</div>
);
}

export default ChatBox;