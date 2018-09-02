var path=require('path');                                                             
var http=require('http');
var express=require('express');
var socketIO=require('socket.io');
var PublicPath=path.join(__dirname,'./public');
var port=process.env.PORT || 3000;
var app=express();                                                                             

var server=http.createServer(app);
var io=socketIO(server);
app.use(express.static(PublicPath));
io.on('connection',(socket)=>{
    console.log('new user connected.....');
   socket.on('createMessage',function(createMessage){
        console.log(createMessage);
        io.emit('newMessage',{
            from:createMessage.from,
            text:createMessage.text,
            createdAt: new Date().getTime()
        })
    })
   
 
    socket.on('disconnect',()=>{
        console.log('user disconnect...')
    })
    
})

server.listen(port,()=>{
    console.log('start listing.........')
})

