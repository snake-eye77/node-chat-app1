var path=require('path');                                                             
var http=require('http');
var express=require('express');
var socketIO=require('socket.io');
var {generateMessage, generateLocationMessage} =require('./utils/message');
var {isRealString}=require('./utils/validation');
var {Users}=require('./utils/Users');
var PublicPath=path.join(__dirname,'../public');
var port=process.env.PORT || 4000;
var app=express();                                                                             

var server=http.createServer(app);
var io=socketIO(server);
var users=new Users();
app.use(express.static(PublicPath));
io.on('connection',(socket)=>{
    console.log('new user connected.....');


socket.on('join', (params, callback) => {
    if (!isRealString(params.name) || !isRealString(params.room)) {
      return callback('Name and room name are required.');
    }

    socket.join(params.room);
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);

    io.to(params.room).emit('updateUserList', users.getUserList(params.room));
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined.`));
    callback();
  });
socket.on('createMessage',function(createMessage,callback){
        var user=users.getUser(socket.id);
        if(user && isRealString(createMessage.text)){
            io.to(user.room).emit('newMessage', generateMessage(user.name,createMessage.text));

        }
        
      
        callback();
    })
    socket.on('createLocation',function(coords){
        var user=users.getUser(socket.id);
        if(user){
            io.to(user.room).emit('newLocationMessage',generateLocationMessage(user.name,coords.latitude, coords.longitude));
        }
       
    })
   
  
   socket.on('disconnect',()=>{

    var user = users.removeUser(socket.id);
   

    if (user) {
    io.to(user.room).emit('updateUserList', users.getUserList(user.room))
    io.to(user.room).emit('newMessage',generateMessage('Admin', `${user.name} has left.`));
    console.log(users.room);
    console.log( users.getUserList(user.room))
      console.log('in disconnected')
    }
    //console.log('user desconnected...');
})



    
})
server.listen(port,()=>{
    console.log(`Server started at port ${port}`);
})





