const io = require("socket.io-client");

const socket = io(

"http://localhost:5000"

);

socket.on(

"connect",

()=>{

console.log(

"Connected:",

socket.id

);

socket.emit(

"joinWorkspace",

"workspace123"

);

setTimeout(()=>{

socket.emit(

"taskUpdated",

{

workspaceId:"workspace123",

task:"Setup Backend",

status:"Done"

}

);

},3000);

});

socket.on(

"taskChanged",

(data)=>{

console.log(

"Realtime update:",

data

);

});