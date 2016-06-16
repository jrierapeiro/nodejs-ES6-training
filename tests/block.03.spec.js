var chai = require('chai');
var expect = chai.expect;

describe('default function parameters', function () {
    'use strict';   

    beforeEach(function () {
    });

    it('V8 doesn not support default parameters yet', function(){      
        // Unexpected token =
       /* var getProduct = function(productId = 100){
            return { productId: productId };
        }
        expect(getProduct().productId).to.be.equal(100);*/
    });   
});
