var expect=require('expect');
var {generateMessage}=require('./message');
describe('generateMessage',()=>{
    it('genrate correct message',()=>{
        var from='akash';
        var text='some text';
        var message=generateMessage(from ,text);
        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({from ,text})


    })
})


