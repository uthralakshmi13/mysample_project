const assert=require('chai').assert;
const app = require('../app');
const sayHello=require('../app');
const index=require('../index');


describe('App',function(){

it('app should return hello',function(){
assert.equal(app(),'hello');

});



it('sayHello should return type string', function(){
let result = sayHello();
assert.typeOf(result,'string');
});




});
