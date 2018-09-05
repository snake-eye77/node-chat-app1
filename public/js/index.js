var socket=io();
socket.on('connect',()=>{
    console.log('connected to server..')
  
})
socket.on('newMessage', function (message) {
    console.log('newMessage', message);
    var li = jQuery('<li></li>');
    li.text(`${message.from}: ${message.text}`);
    jQuery('#message').append(li);
    console.log("work it")
  });

socket.on('disconnect',()=>{
    console.log('disconnect from server....')
})
jQuery('#message-form').on('submit',function(e){
    e.preventDefault();
    socket.emit('createMessage',{
        from:'User',
        text:jQuery('[name=message]').val()
    },function(){

    })
})

// var socket = io();

// socket.on('connect', function () {
//   console.log('Connected to server');
// });

// socket.on('disconnect', function () {
//   console.log('Disconnected from server');
// });

// socket.on('newMessage', function (message) {
//   console.log('newMessage', message);
//   var li = jQuery('<li></li>');
//   li.text(`${message.from}: ${message.text}`);
//   jQuery('#message').append(li);
// });

// jQuery('#message-form').on('submit', function (e) {
//   e.preventDefault();

//   socket.emit('createMessage', {
//     from: 'User',
//     text: jQuery('[name=message]').val()
//   }, function () {

//   });
// });

