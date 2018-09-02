var socket=io();
socket.on('connect',()=>{
    console.log('connected to server..')
  
})
socket.on('newMessage',function(newMsg){
    console.log(newMsg);
})

    
socket.on('disconnect',()=>{
    console.log('disconnect from server....')
})
