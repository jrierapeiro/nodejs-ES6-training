var chai = require('chai');
var expect = chai.expect;

describe('objects literal ', function () {
    'use strict';   

    beforeEach(function () {
    });

    it('initialization from declared variables', function(){    
        var price = 5, quantity = 2;
        var productView = { price, quantity };
        expect(productView.price).to.be.equal(5);  
        expect(productView.quantity).to.be.equal(2);
    });  

    it('initialization from declared variables with function this is the global context', function(){    
        var price = 5, quantity = 2;
        var productView = { 
            price, 
            quantity,
            calculatePrice(){ return this.price * this.quantity; } 
        };
        expect(productView.calculatePrice()).to.be.equal(10);
    });  

    it('initialization overriding declared variables with function this is local global context', function(){    
        var price = 5, quantity = 2;
        var productView = { 
            price: 1, 
            quantity: 5,
            calculatePrice(){ return this.price * this.quantity; } 
        };
        expect(productView.calculatePrice()).to.be.equal(5);
    });  

    it('initialization from declared variables with string function this is the global context', function(){    
        var price = 5, quantity = 2;
        var productView = { 
            price, 
            quantity,
            'calculate Price'(){ return this.price * this.quantity; } 
        };
        expect(productView['calculate Price']()).to.be.equal(10);
    }); 

    it('initialization from declared variables using a varibale name', function(){    
        var fieldName = 'quantity', quantity = 2;
        var productView = { 
            [fieldName]: quantity 
        };
        expect(productView.quantity).to.be.equal(2);
    }); 

    it('initialization from declared variables using a varibale name with concatenation', function(){    
        var fieldName = 'quantity', quantity = 2;
        var productView = { 
            [fieldName+'001']: quantity 
        };
        expect(productView.quantity001).to.be.equal(2);
    }); 

    it('initialization from declared variables using a method name with concatenation', function(){    
        var fieldName = 'quantity', quantity = 2;
        var productView = { 
            ['get'+fieldName+'001'](){ return quantity;} 
        };
        expect(productView.getquantity001()).to.be.equal(2);
    }); 

    it('initialization from declared variables using a dynamic property name with get and set', function(){    
        var fieldName = 'quantity', quantity = 2;
        var productView = {            
            get [fieldName] () { return this,quantity;},
            set [fieldName] (value) { this,quantity = value;}
        };
        expect(productView.quantity).to.be.equal(2);
        productView.quantity = 10;
        expect(productView.quantity).to.be.equal(10);
    }); 
});
