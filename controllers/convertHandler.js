/*
*
*
*       Complete the handler logic below
*       
*       
*/

// Though not strictly necessary for the user stories, it would be nice for the user to be able to input quantities such as "20*5/2+1lbs". We'll use Math.js for this:
const math = require("mathjs");



function ConvertHandler() {
  
  this.getNum = function(input) {
    // Let's figure out where the units start by finding the position of the first letter in the input string:
    let indexOfUnits = input.search(/[a-zA-Z]/);
    
    // We'll want to isolate the number portion of the input and save it as a variable, which we'll define here:
    let numbers;
    
    // Though the following wouldn't affect the functionality of the app (because it will return "invalid units" in this scenario), for the Chai tests, we need to
    // correctly handle cases when there are no units in the input, hence this if/else statement. If indexOfUnits = -1, then we know that no units are included in
    // the input and we don't have to strip anything off of the input...
    if (indexOfUnits == -1) {
      numbers = input;
    }
    // ... otherwise, there IS a unit component to the input which we should discard in order to isolate the numbers portion:
    else {
      numbers = input.substring(0, indexOfUnits);
    }
    
    // According to the user stories, if no numbers have been submitted, but a unit has (e.g. "km" vs "11.5km"), we should consider there to be 1 of that unit:
    if (numbers.length == 0) {
      numbers = "1";  // We save this as a string so we can still run string operations such as .split() on it (see next validation step)
    };
    
    
    // With our numbers now separated from the input and validated, we'll do one more spot of validation:    
    // According to the Chai tests in 1_unit-tests.js, we can't have a double division in our input. To check for this, we'll count the number of divisions (i.e. "/")
    // and if there is more than 1, we'll return "invalid number":
    if (numbers.split(/\//).length > 2) return "invalid number";
    
    // Finally, we'll use Math.js to evaluate the input numbers and return that result:
    return math.eval(numbers);
  };
  
  
  
  
  
  this.getUnit = function(input) {
    // We'll start by figuring out where the units start (including any extraneous space (e.g. \s ) characters):
    let indexOfUnits = input.search(/[\sa-zA-Z]/);
    
    // With that index, we can pull out a substring containing all the characters of the input unit:
    let units = input.substring( input.search(/[\sa-zA-Z]/), input.length);
    
    // Next, we need to make sure that the input units are in a format that is acceptable according to the user stories:
    let acceptable = ['gal','l','mi','km','lbs','kg','GAL','L','MI','KM','LBS','KG'];
    // Let's also keep in mind that we expect the following, correctly typed, unit formats to be returned by our converter:
        // N.B. The metric units should actually be Kg, Km, and L.... but that's not how this boilerplate and its test suite are set up...
    let outputUnits = ["gal", "L", "mi", "km", "lbs", "kg", "gal", "L", "mi", "km", "lbs", "kg"];
    
    
    // Let's check if our input units have a match in our acceptable array:
    let acceptableIndex = acceptable.indexOf(units);
    
    if ( acceptableIndex >= 0 ) {
      // If the input unit has a match in the array of acceptable units, we'll return the correctly formatted version of that unit:
      return outputUnits[acceptableIndex];
    }
    else {
      // If the input unit doesn't have a match in the array of acceptable units, as per the user stories, we'll return "invalid unit":
      return "invalid unit";
    }
    
  };
  
  
  
  
  
  this.getReturnUnit = function(initUnit) {
    // We need to figure out which unit is the counterpoint for the input unit:
    let input = ['gal','l','mi','km','lbs','kg','GAL','L','MI','KM','LBS','KG'];
    let output = ['L','gal','km','mi','kg','lbs', "L", "gal", "km", "mi", "kg", "lbs"];
    
    // We'll find the index of the initUnit in our input array, and then return the corresponding unit in the output array:
    let inputIndex = input.indexOf(initUnit);
    // If inputIndex is >=0, then there's a match and we can return it...
    if (inputIndex >= 0) {
      return output[inputIndex];
    }
    // ... otherwise inputIndex = -1 because no match was found, which can only mean that the initUnit was invalid:
    else {
      return "invalid unit";
    }
  };
  
  
  
  

  this.spellOutUnit = function(unit) {
    // We need to be able to convert our abbreviated input units into longform units:
    let input = ["gal", "l", "mi", "km", "lbs", "kg", "GAL", "L", "MI", "KM", "LBS", "KG"];
    let output = ["gallons", "liters", "miles", "kilometers", "pounds", "kilograms", "gallons", "liters", "miles", "kilometers", "pounds", "kilograms"];
    
    let inputIndex = input.indexOf(unit);
    
    // If inputIndex is >=0, then there's a match and we can return it...
    if (inputIndex >= 0) {
      return output[inputIndex];
    }
    // ... otherwise inputIndex = -1 because no match was found, which can only mean that the initUnit was invalid:
    else {
      return "invalid unit";
    }
  };
  
  
  
  
  
  this.convert = function(initNum, initUnit) {
    // It's time to do the actual conversions. Let's save the rates in an object for easy access:
    const rates = {
      gal: 3.78541,
      L: 1/3.78541,
      lbs: 0.453592,
      kg: 1/0.453592,
      mi: 1.60934,
      km: 1/1.60934
    }
    
    // Now it's easy to return the conversion. The user stories request that the results be round to five decimal places, so let's make sure to do so:
        // N.B. After some testing, .toFixed(5) returns the most accurate results (vs. Math.round(result *100000)/100000 and Math.floor(result * 100000)/100000 ).
        // However, .toFixed() returns a string, so we'll need to parse it back into a number:
    
    let conversion = parseFloat( (initNum * rates[initUnit]).toFixed(5) );
    
    // There's a posibility that initNum and/or initUnit are not valid, in which case we should respond accordingly...    
    if (initNum == "invalid number" && initUnit == "invalid unit") {
      return "invalid number and unit";
    }
    else if (initNum == "invalid number") {
      return "invalid number";
    }
    else if (initUnit == "invalid unit") {
      return "invalid unit";
    }
    // ... otherwise, we should have a valid conversion amount and we should return that:
    else {
      return conversion;
    }
    
  };
  
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    // As part of the user stories, we need to return a long-form string of the conversion (e.g.: '3.1 miles converts to 4.98895 kilometers' ).
    // To return our string, we'll use backticks (`) to insert a template literal which allows us to do string interpolation, including placeholders (e.g. ${stuff} )
    // wherein we can place any javascript expression.
    
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${this.convert(initNum, initUnit)} ${this.spellOutUnit(returnUnit)}`;
  };
  
}





// Finally, we'll make sure that our converter is accessible to other files in our app by exporting it as a module:
module.exports = ConvertHandler;