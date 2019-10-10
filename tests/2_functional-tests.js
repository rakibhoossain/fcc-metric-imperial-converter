/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       (if additional are added, keep them at the very end!)
*/


// We'll be using the Chai.js TDD assertion library to run our functional tests, so let's require the dependency...
const chai = require('chai');
// ... and instantiate it's assert style/module:
const assert = chai.assert;

// We'll also be needing the Chai HTTP addon plugin for our chai assertion library. We'll be using this addon to conduct integration testing on our app, making sure
// that the different modules work together correctly.
const chaiHttp = require('chai-http');
// We'll make sure to tell chai to use the HTTP addon:
chai.use(chaiHttp);

// Finally, we'll need to access the content of our server.js file in order to run our tests, so let's require that as well:
const server = require('../server');



// With all of our dependencies ready to go, let's write our functional/integration tests:

suite('Functional Tests', function() {

  suite('Routing Tests', function() {
    
    suite('GET /api/convert => conversion object', function() {
      
      
      test('Convert 10L (valid input)', function(done) {
       chai.request(server)
        .get('/api/convert')
        .query({input: '10L'})
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.equal(res.body.initNum, 10);
          assert.equal(res.body.initUnit, 'L');
          assert.approximately(res.body.returnNum, 2.64172, 0.1);
          assert.equal(res.body.returnUnit, 'gal');
          done();
        });
      });
      
      
      
      
      
      test('Convert 32g (invalid input unit)', function(done) {
        chai.request(server)
          .get("/api/convert")
          .query( {input: "32g"} )
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.body, "invalid unit");
            
            done();
          });
      });
      
      
      
      
      
      test('Convert 3/7.2/4kg (invalid number)', function(done) {
        chai.request(server)
          .get("/api/convert")
          .query( {input: "3/7.2/4kg"} )
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.body, "invalid number")
            
            done();
          });
      });  
      
      
      
      
      
      test('Convert 3/7.2/4kilomegagram (invalid number and unit)', function(done) {
        chai.request(server)
          .get("/api/convert")
          .query( {input: "3/7.2/4kilomegagram"} )
          .end(function(err, res) {
            assert.equal(res.status, 200);          
            assert.equal(res.body, "invalid number and unit");
            
            done();
          });
      });
      
      
      
      
      
      test('Convert kg (no number)', function(done) {
        chai.request(server)
          .get("/api/convert")
          .query( {input: "kg"} )
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.body.initNum, 1);
            assert.equal(res.body.initUnit, "kg");
            assert.approximately(res.body.returnNum, 2.20462, 0.001);  // We set a tolerance of 0.001 just in case of any odd rounding errors
            assert.equal(res.body.returnUnit, "lbs");
            
            done();          
          });
      });
      
    });

  });

});
