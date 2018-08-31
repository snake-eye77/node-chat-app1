var socket=io();
socket.on('connect',()=>{
    console.log('connected to server..')
    socket.emit('Msg',{
        from:'akash',
        text:'what is going on???'
    })
})
socket.on('disconnect',()=>{
    console.log('disconnect from server....')
})
socket.on('newMsg',function(msg){
console.log('newmsg:',msg)
})