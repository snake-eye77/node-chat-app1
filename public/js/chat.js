var socket=io();
 function scrollToBottam(){
     var messages=jQuery('#messages');
     var newMessage=messages.children('li:last-child');
     var clientHeight=messages.prop('clientHeight');                                                    //Height
     var scrollTop=messages.prop('scrollTop');
     var scrollHeight=messages.prop('scrollHeight')
    var newMessageHeight=newMessage.innerHeight();
     var lastMessageHeight=newMessage.prev().innerHeight();
     if(clientHeight+scrollTop+newMessageHeight+lastMessageHeight>=scrollHeight){
        // console.log('should scroll...')
        messages.scrollTop(scrollHeight)
     }
 }
socket.on('connect',()=>{
   var params=jQuery.deparam(window.location.search);
   socket.emit('join',params,function(err){
       if(err){
           alert(err);
           window.location.href='/'
}else{
           console.log('no err');
 }
   })
  
})

socket.on('newMessage', function (message) {
    var template=jQuery('#message-template').html();
    var formettedTime=moment(message.createdAt).format('hh:mm a')
    var html=Mustache.render(template,{
        text:message.text,
        from:message.from,
        createdAt:formettedTime
    });
    jQuery('#messages').append(html)
    scrollToBottam();

    // var formettedTime=moment(message.createdAt).format('hh:mm a')
    // console.log('newMessage', message);
    // var li = jQuery('<li></li>'); 
    // li.text(`${message.from} ${formettedTime}: ${message.text}`);
    // jQuery('#messages').append(li);
    // console.log("work it")
  });

  socket.on('newLocationMessage',function(message){
    var template=jQuery('#location-message-template').html();
    var formettedTime=moment(message.createdAt).format('hh:mm a')
    var html=Mustache.render(template,{
       from:message.from,
       url:message.url,
       createdAt:formettedTime
    });
    jQuery('#messages').append(html)
    scrollToBottam();

    // var formettedTime=moment(message.createdAt).format('hh:mm a')
    //   var li=jQuery('<li></li>');
    //   var a=jQuery('<a target="_blank">my current location<a>');
    //   li.text(`${message.from} ${formettedTime}:`);
    //   a.attr('href',message.url);
    //   li.append(a);
    //   jQuery('#message').append(li);
  })



socket.on('disconnect',()=>{
    console.log('disconnect from server....')
})
socket.on('updateUserList',function(users){
   var ol=jQuery('<ol></ol>');
   users.forEach(function(user){
       ol.append(jQuery('<li></li>').text(user))
   })
   jQuery('#users').html(ol)
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


