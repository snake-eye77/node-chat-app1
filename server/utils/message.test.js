var expect=require('expect');
var {generateMessage,generateLocationMessage}=require('./message');
describe('generateMessage',()=>{
    it('genrate correct message',()=>{
        var from='akash';
        var text='some text';
        var message=generateMessage(from ,text);
        expect(typeof message.createdAt).toBe('number');
        expect(message).toMatchObject({from ,text})


    })
})





// describe('generateLocationMessage',()=>{
//     it('it should henerate coirrect location object...',()=>{
//        var from='akash';
//       var  latitude=15;
//       var   longitude=19;
//       var url='https://www.google.com/maps?q=15,19';
//       var message=generateLocationMessage(from,latitude,longitude);

//       expect( typeof message.createdAt).toBe('number');
//       expect(message).toInclude({from ,url})

        
//     })
// })




