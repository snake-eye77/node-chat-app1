var expect=require('expect');
var {Users}=require('./Users')
describe('Users',()=>{
    it('it should work ',()=>{
         var users=new Users();
         var user={
             id:'123',

             name:'akash',
             room:'nodejs'
         }
         var resUser=users.addUser(user.id,user.name,user.room);
         expect(users.users).toEqual([user]);
    })
})

