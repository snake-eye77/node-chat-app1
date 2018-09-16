var expect=require('expect');
var {isRealString}=require('./validation');
describe('isRealString',()=>{
    it('should work expectfully..',()=>{
        var res=isRealString(9);
        expect(res).toBe(false)
    })
})
describe('isRealString',()=>{
    it('should work expectfully..',()=>{
        var res=isRealString('    ');
        expect(res).toBe(false)
    })
})
describe('isRealString',()=>{
    it('should work expectfully..',()=>{
        var res=isRealString(' akash   ');
        expect(res).toBe(true)
    })
})