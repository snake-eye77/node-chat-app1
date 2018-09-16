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









