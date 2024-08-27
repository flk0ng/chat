const WebSocket = require('ws')

const server =new WebSocket.Server({port : 8080})

let clients = []
server.on('connection',(ws)=>{
    clients.push(ws)
    ws.on('message', (message)=>{
        clients.forEach(client =>{
            if (client.radyState === WebSocket.OPEN){
                client.send(message)
            }
        })
    });
    ws.on ('close', ()=>{
    client = clients.filter(client=> client !== ws)
})    
})

console.log ("WebSocket server running on ws://localhost:8080");

