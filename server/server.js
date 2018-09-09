var path=require('path');                                                             
var http=require('http');
var express=require('express');
var socketIO=require('socket.io');
var {generateMessage, generateLocationMessage} =require('./utils/message')
var PublicPath=path.join(__dirname,'../public');
var port=process.env.PORT || 3000;
var app=express();                                                                             

var server=http.createServer(app);
var io=socketIO(server);
app.use(express.static(PublicPath));
io.on('connection',(socket)=>{
    console.log('new user connected.....');
    socket.emit('newMessage',generateMessage('admin','welcome to chat app'))
        socket.broadcast.emit('newMessage',generateMessage('admin','new user connected..'));
   socket.on('createMessage',function(createMessage,callback){
        console.log(createMessage);
        
        io.emit('newMessage',{
            from:createMessage.from,                                          //heroku git:remote -a [app_name]
            text:createMessage.text,
            createdAt: new Date().getTime()
        })
        callback();
    })
    socket.on('createLocation',function(coords){
        io.emit('newLocationMessage',generateLocationMessage(`admin `,coords.latitude, coords.longitude));
    })
   
  
   socket.on('disconnect',()=>{
        console.log('user disconnect...')
    })
    
})
server.listen(port,()=>{
    console.log('start listing.........')
})

