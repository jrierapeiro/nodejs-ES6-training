var chai = require('chai');
var expect = chai.expect;

describe('arrow functions', function () {
    'use strict';
    const DEFAULT_PRODUCT_ID = 12;
   
    beforeEach(function () {      
    });

    it('basic of arrow function', function(){
        var getPrice = () => 5.99;
        expect(getPrice()).to.be.equal(5.99);
        expect(typeof getPrice).to.be.equal('function');
    });

    it('arrow function with one paramater', function(){
        var getPrice = count => count * 5;
        expect(getPrice(2)).to.be.equal(10);        
    });

    it('arrow function with multiple paramater', function(){
        var getPrice = (count, tax) => count * 5 + tax;
        expect(getPrice(2,3)).to.be.equal(13);        
    });

    it('arrow function with a return block', function(){
        var getPrice = (count, tax) => {
            var price = count * 5 + tax;
            return price;
        };
        expect(getPrice(2,3)).to.be.equal(13);        
    });

    it('arrow functions have the global context', function(){
        var invoice = {
            number: 123,
            process: () => this.number
        };

        expect(typeof invoice.process()).to.be.equal(typeof undefined);   
    });

    it('arrow function should keep the original context', function(){
        var invoice = {
            number: 123,
            process: function () {
                return () => this.number;
            }
        };

        expect(invoice.process()()).to.be.equal(123);   
    });

    it('arrow function should keep the original context even when it is binded to other object', function(){
        var invoice = {
            number: 123,
            process: function () {
                return () => this.number;
            }
        };

        var invoice2 = { number: 456 };

        // You cannot bind an obejct to an arrow function. It doesn't change the context
        expect(invoice.process().bind(invoice2)()).to.be.equal(123);   
    });

    it('arrow function should keep the original context even when it is called with other object', function(){
        var invoice = {
            number: 123,
            process: function () {
                return () => this.number;
            }
        };

        var invoice2 = { number: 456 };
        
        expect(invoice.process().call(invoice2)).to.be.equal(123);   
    });

     it('arrow function has no prototype', function(){
         var getPrice = (count, tax) => count * 5 + tax;
        expect(getPrice.hasOwnProperty('prototype')).to.be.equal(false);        
    });
});