var socket=io();
socket.on('connect',()=>{
    console.log('connected to server..')
  
})
socket.on('newMessage', function (message) {
    var formettedTime=moment(message.createdAt).format('hh:mm a')
    console.log('newMessage', message);
    var li = jQuery('<li></li>'); 
    li.text(`${message.from} ${formettedTime}: ${message.text}`);
    jQuery('#message').append(li);
    console.log("work it")
  });

  socket.on('newLocationMessage',function(message){
    var formettedTime=moment(message.createdAt).format('hh:mm a')
      var li=jQuery('<li></li>');
      var a=jQuery('<a target="_blank">my current location<a>');
      li.text(`${message.from} ${formettedTime}:`);
      a.attr('href',message.url);
      li.append(a);
      jQuery('#message').append(li);
  })



socket.on('disconnect',()=>{
    console.log('disconnect from server....')
})
jQuery('#message-form').on('submit',function(e){
    e.preventDefault();
    var messageTextBox=jQuery('[name=message]');
    socket.emit('createMessage',{
        from:'User',
        text:messageTextBox.val()
    },function(){
        messageTextBox.val('');
    })
})
var locationButton=jQuery('#send-location');
locationButton.on('click',function(){
    if(!navigator.geolocation){
        return alert('not availbe in geolocation');
    }
    locationButton.attr('disabled','disabled').text('send location...');
    navigator.geolocation.getCurrentPosition(function(Position){
        locationButton.removeAttr('disabled').text('send location')
        socket.emit('createLocation',{
            latitude:Position.coords.latitude,
            longitude : Position.coords.longitude
        })
    },function(){
        locationButton.removeAttr('disabled')
        alert('unable to fetch location').text('send location...');
    })
})


