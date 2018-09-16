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
    // socket.emit('newMessage',generateMessage('admin','welcome to chat app'))
    //     socket.broadcast.emit('newMessage',generateMessage('admin','new user connected..'));
        socket.on('join',(params,callback)=>{
                if(!isRealString(params.name || !isRealString(params.Room))){
                   return callback('name and room name is require..')
                }
         socket.join(params.room);
         users.removeUser(socket.id);
       users.addUser(socket.id,params.name,params.room);
       io.to(params.room).emit('updateUserList',users.getUserList(params.room));
        socket.emit('newMessage',generateMessage('Admin','welcome to chat app'));
          socket.broadcast.to(params.room).emit('newMessage',generateMessage('Admin',`${params.name} has joined....`));
         callback();
  })
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
    // var user=users.removeUser(socket.id);
    // if(user){
    //     io.to(user.room).emit('updateUserList',users.getUserList(user.room))
    //     io.to(user.room).emit('newMessage',generateMessage('Admin',`${user.name}  has left...`))
        
    // }
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
    console.log('start listing.........')
})

