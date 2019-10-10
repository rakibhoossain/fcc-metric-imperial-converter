'use strict';

// We'll make sure to require our converHandler file/module so that we can call its functions:
const ConvertHandler = require('../controllers/convertHandler.js');

// const expect = require('chai').expect;    // part of the freeCodeCamp boilerplate code, but not needed in this file


// We'll make sure that our API's route is available as a module (to import into server.js):
module.exports = function (app) {
  
  // Before defining any routes, we'll create a new instance of our convertHandler:
  const convertHandler = new ConvertHandler();
  
  // Now, we can go ahead and set up the route for our form:
  app.route('/api/convert')
    .get(function (req, res){
      const input = req.query.input;
      const initNum = convertHandler.getNum(input);
      const initUnit = convertHandler.getUnit(input);
      const returnNum = convertHandler.convert(initNum, initUnit);
      const returnUnit = convertHandler.getReturnUnit(initUnit);
      const toString = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);

      // With all of our variables from convertHandler.js in hand, let's now prepare our response.
      
      // As per the user stories, let's start by handling invalid units and numbers:
      if (initUnit == "invalid unit" && initNum == "invalid number") {
        return res.json("invalid number and unit");
      }
      else if (initUnit == "invalid unit") {
        return res.json(initUnit);
      }
      else if (initNum == "invalid number") {
        return res.json(initNum);
      }
      // If there are no invalid numbers and/or units, then we can return the result as per the user stories:
      else {
        return res.json(
          {
            initNum: initNum,
            initUnit: initUnit,
            returnNum: returnNum,
            returnUnit: returnUnit,
            string: toString
          }
        );
      }
    
  
  });  // END of app.route().get()
};