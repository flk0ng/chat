import React, { useEffect, useState , useRef} from "react";
import Mensaje from "./Mensaje";

function ChatBox(){
const [mensaje, setMensaje]= useState([]);
const [input, setInput]= useState('');
const[isUserTurn, setIsUserTurn]=useState(true);
const ws =useRef(null)

useEffect(()=>{
    ws.current = new WebSocket('ws.//localhost:8080')

    ws.current.onmessage = (event) =>{
        const newMessage = JSON.parse(event.data)
        setMensaje(prevMessages =>[...prevMessages, newMessage])
    }
    return()=> ws.current.close();
}, [])



const handleSend= ()=>{
    if (ws.current && ws.current.readState  === WebSocket.OPEN){
    if (input.trim()){
        const newMessage ={
            sender: isUserTurn ? 'user' :'other',
            text: input          
        }

        ws.current.send(JSON.stringify(newMessage))
        setInput('')
        setIsUserTurn(!isUserTurn);
    }
}else{
console.error('El WebSocket no esta abierto' + ws.current.readState)

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
}
export default ChatBox;