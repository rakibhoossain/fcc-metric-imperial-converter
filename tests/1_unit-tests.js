/*
*
*
*       FILL IN EACH UNIT TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]----
*       (if additional are added, keep them at the very end!)
*/


// We'll be using the Chai.js TDD assertion library to make sure that our ConverHandler module is working correctly.

// We'll require chai...
const chai = require('chai');
// ... and instantiate its TDD assert style/module:
const assert = chai.assert;

// We'll require our ConvertHandler module/constructor:
const ConvertHandler = require('../controllers/convertHandler.js');

// With our constructor in hand, we'll create a new instance:
const convertHandler = new ConvertHandler();




// With everything set up and ready to go, we'll start our test scenarios:
suite('Unit Tests', function(){
  
  
  
  // We'll start by testing the .getNum() method of our convertHandler:
  suite('Function convertHandler.getNum(input)', function() {
    
    // We'll start by testing our converter with whole number inputs:
    test('Whole number input', function(done) {
      let input = '32L';
      
      // If the converter's getNum() method works correctly, it should be able to strip out the number from 32L and return 32:
      assert.equal(convertHandler.getNum(input),32);
      done();
    });
    
    test('Decimal Input', function(done) {
      let input = "0.67L";
      
      // If the converter's getNum() method works correctly, it should be able to strip decimal numbers from their written (letter) units:
      assert.equal(convertHandler.getNum(input), 0.67);
      
      done();
    });
    
    test('Fractional Input', function(done) {
      let input = "1/5Kg";
      
      // If the converter's getNum() method works correctly, it should be able to handle fractional input:
      assert.equal(convertHandler.getNum(input), 0.2);
      
      done();
    });
    
    test('Fractional Input w/ Decimal', function(done) {
      let input = "2.5/10";
      
      // The converter's getNum() method should be able to handle fractions with decimals in the numerator or denominator:
      assert.equal(convertHandler.getNum(input), 0.25);
      
      done();
    });
    
    test('Invalid Input (double fraction)', function(done) {
      let input = "4/2/10";
      
      // The converter should return "invalid number" if there are two fractions:      
      assert.equal(convertHandler.getNum(input), "invalid number");
      
      done();
    });
    
    test('No Numerical Input', function(done) {
      let input = "L";
      
      // If the input doesn't contain any numbers, but does have a unit, the converter's getNum() method should return 1
      assert.equal(convertHandler.getNum(input), 1);
      
      done();
    }); 
    
  });
  
  
  
  
  
  // Next, we'll test the .getUnit() method of our converter:
  suite('Function convertHandler.getUnit(input)', function() {
    
    // For each of the possible units that our converter is designed to manage, irrespective of capitalization, it should return a properly formatted unit:
    test('For Each Valid Unit Inputs', function(done) {
      // Given the following possible unit inputs...
      let input = ['gal','l','mi','km','lbs','kg','GAL','L','MI','KM','LBS','KG'];
      // ... we expect the following, correctly typed, unit formats to be returned by our converter:
          // N.B. The metric units should actually be Kg, Km, and L.... but that's not how this boilerplate and its test suite are set up...
      let expected = ["gal", "L", "mi", "km", "lbs", "kg", "gal", "L", "mi", "km", "lbs", "kg"];
      
      // We'll make sure that each of the inputs will return the matching expected output:
      input.forEach(function(ele, i) {
        assert.equal(convertHandler.getUnit(ele), expected[i]);
      });
      
      done();
    });
    
    
    // If the input unit is not of a valid type, we expect our converter to respond with, "invalid unit":
    test('Unknown Unit Input', function(done) {
      let input = ["20.0", "12.5 pounds", "3/5kilograms"];
      
      // If the input units are either missing or not in an expected format, the getUnit() method of our converter should return, "invalid unit":
      input.forEach(function (ele) {        
        assert.equal(convertHandler.getUnit(ele), "invalid unit");
      });
      
      done();
    });  
    
  });
  
  
  
  
  
  // We'll now test our converter to make sure that it returns the correct "opposite" unit:
  suite('Function convertHandler.getReturnUnit(initUnit)', function() {
    
    test('For Each Valid Unit Inputs', function(done) {
      let input = ['gal','L','mi','km','lbs','kg'];
      let expected = ['L','gal','km','mi','kg','lbs'];
      
      input.forEach(function(ele, i) {
        assert.equal(convertHandler.getReturnUnit(ele), expected[i]);
      });
      
      done();
    });
    
  });  
  
  
  
  
  
  // We also need to make sure that our converter returns a correctly "spelled-out" set of units:
  suite('Function convertHandler.spellOutUnit(unit)', function() {
    
    test('For Each Valid Unit Inputs', function(done) {
      let input = ["gal", "l", "mi", "km", "lbs", "kg", "GAL", "L", "MI", "KM", "LBS", "KG"];
      let expected = ["gallons", "liters", "miles", "kilometers", "pounds", "kilograms", "gallons", "liters", "miles", "kilometers", "pounds", "kilograms"];
      
      input.forEach(function(ele, i) {
        assert.equal(convertHandler.spellOutUnit(ele), expected[i]);
      });
      
      done();
    });
    
  });
  
  
  
  
  
  // Finally, we want to make sure that the converter is performing conversions correctly, and to the correct tolerance level:
  suite('Function convertHandler.convert(num, unit)', function() {
    
    test('Gal to L', function(done) {
      let input = [5, 'gal'];
      let expected = 18.9271;
      
      assert.approximately(convertHandler.convert(input[0],input[1]), expected, 0.1); //0.1 tolerance
      
      done();
    });
    
    test('L to Gal', function(done) {
      let input = [5, "L"];
      let expected = 1.32086088
      
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
      
      done();
    });
    
    test('Mi to Km', function(done) {
      let input = [10, "mi"];
      let expected = 16.0934;
      
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
      
      done();
    });
    
    test('Km to Mi', function(done) {
      let input = [20, "km"];
      let expected = 12.4274547;
      
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
      
      done();
    });
    
    test('Lbs to Kg', function(done) {
      let input = [12, "lbs"];
      let expected = 5.443104;
      
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
      
      done();
    });
    
    test('Kg to Lbs', function(done) {
      let input = [6, "kg"];
      let expected = 13.22774652;
      
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
      
      done();
    });
    
  });

});