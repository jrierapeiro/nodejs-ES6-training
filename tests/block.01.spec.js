var sinon = require('sinon');
var chai = require('chai');
var expect = chai.expect;

describe('block 1', function () {
    'use strict';
    const DEFAULT_PRODUCT_ID = 12;

    var tester;
    beforeEach(function () {
       tester = {
           handler : function(value)
           { 
               // console.log(value);
           }
        };
       sinon.spy(tester, 'handler');  
    });

    it('should be undefined when a variable is used before it is declared using var', function () {

        (() => {
            var result = typeof(productid);
            var productid = DEFAULT_PRODUCT_ID;
            tester.handler(result);
        })();

        expect(tester.handler.calledWith('undefined')).to.be.true;            
    });

    it('should throw and error when a variable is used before it is declared using let', function () {

        var func = () => {
          
            tester.handler(productid);
            let productid = DEFAULT_PRODUCT_ID;
        };

        expect(() => func()).to.throw('productid is not defined');
    });

    it('should be defaultProductId when a variable is used after it is declared and asigned', function () {

        (() => {
         
            let productid = DEFAULT_PRODUCT_ID;
            tester.handler(productid); 
        })();

        expect(tester.handler.calledWith(DEFAULT_PRODUCT_ID)).to.be.true;            
    });

    it('should be undefined when a variable is used after it is declared but no asigned', function () {
        (() => {
           
            let productid;
            tester.handler(productid);   
        })();

        expect(tester.handler.calledWith(undefined)).to.be.true;
    });

    it('should use the initial value even when the same variable is declared in a block', function () {
        (() => {
           
            let productid = DEFAULT_PRODUCT_ID;
            {
                let productid = 2000;
            }
            tester.handler(productid);  
        })();

        expect(tester.handler.calledWith(DEFAULT_PRODUCT_ID)).to.be.true;
    });

    it('should throw an error when the variable is not declared even if it is decalred in a block', function () {
        var func = () => {
               
            {
                let productid = 2000;
            }
            tester.handler(productid); 
        };

        expect(() => func()).to.throw('productid is not defined');
    });

    it('should find the scope variable even if it is not passed as parameter',function(){
       
        function updateProductId(){
            productid = DEFAULT_PRODUCT_ID;
        }
        let productid = null;
        updateProductId();
        tester.handler(productid); 
        expect(tester.handler.calledWith(DEFAULT_PRODUCT_ID)).to.be.true;
    });

    it('should use the default value even if the variable is declared again in a loop',function(){
        (() => {
          
            let productid = DEFAULT_PRODUCT_ID;
            for(let productid = 0; productid < 10; productid++){}           
            tester.handler(productid);  
        })();

        expect(tester.handler.calledWith(DEFAULT_PRODUCT_ID)).to.be.true;
    });

    it('should keep the reference to the scope loop variable when is declared using let',function(){
        (() => {
           
            let updateFunction = [];
            for(let i = 0; i < 10; i++){
                updateFunction.push(function(){return i;});
            }           
            tester.handler(updateFunction[0]());  
        })();

        expect(tester.handler.calledWith(0)).to.be.true;
    });

    it('should not keep the reference to the scope loop variable when is declared using var',function(){
        (() => {
          
            let updateFunction = [];
            for(var i = 0; i < 10; i++){
                updateFunction.push(function(){ return i; });
            }           
            tester.handler(updateFunction[0]());  
        })();

        expect(tester.handler.calledWith(10)).to.be.true;
    });

     it('should throw an error when it access an undeclared const', function () {

        var func = () => {
           
            const TEMP = 10;
            TEMP = 15;
            tester.handler(TEMP); 
        };

        expect(() => func()).to.throw('Assignment to constant variable.');
     });

    it('should not overide a const variable with a block declaration', function () {

        (() => {
           
            const TEMP = 10;
            if( TEMP == 10){
                const TEMP = 50;
            }
            tester.handler(TEMP); 
        })();

        expect(tester.handler.calledWith(10)).to.be.true;
     });

});