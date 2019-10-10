'use strict';

// Our requirements/dependencies:
const express = require('express');
const bodyParser = require('body-parser');       // Needed to handle HTTP POST in Express 4+. It extracts the body portion of a request and exposes it on req.body.
//const expect = require('chai').expect;         // In freeCodeCamp boilerplate code, but not used in server.js
const apiRoutes = require('./routes/api.js');    // for tidiness' sake, we're keeping our routes in a separate file/module
const helmet = require("helmet");                // Used to help secure our Express app


// Let's instantiate Express:
const app = express();

// We'll also tell our app to use Helmet.js:
    // N.B. Helmet will by default load with these modules active: dnsPrefetchControl (control browser DNS prefetching), frameguard (prevent clickjacking), 
    // hidePoweredBy (remove X-Powered-By header), hsts (HTTP Strict Transport Security), ieNoOpen (X-Download-Options for IE8+), noSniff (stop clients from
    // sniffing MIME type), and xssFilter (small XSS protections).

    // For the user stories we need noSniff and xssFilter, which load by default, so we don't have to do anything there.
    // In order to be able to embed this glitch project (e.g. in my portfolio), we'll need to disable the frameguard module, which loads by default:
app.use( helmet({
  frameguard: false
}));





// For FCC testing purposes...
const cors = require('cors');
app.use(cors({origin: '*'}));
const fccTestingRoutes = require('./routes/fcctesting.js');
const runner = require('./test-runner');
// ...END


// We'll tell our Express server where to store our static files (e.g. images, CSS, JS):
app.use('/public', express.static(process.cwd() + '/public'));

// We'll tell Express to use our body-parser middleware to handle incoming requests so that we can access the data in req.body:
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Next, we'll define which page to serve as our home page:
app.route('/')
  .get(function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
  });



// For tidiness' sake, we're keeping all of our route handlers in a separate file. Let's make those (and FCC's testing routes) available to our app here:

//For FCC testing purposes...
fccTestingRoutes(app);
// ...END

// Our own routes...
apiRoutes(app);

// ... to which we'll add one last handler, our 404 catch-all for any pages that the user might try to access but that don't exist:
app.use(function(req, res, next) {
  res.status(404)
    .sendFile(__dirname + "/views/404.html");
});



// To make sure that our app is "alive", we'll make sure that our server is listening for incoming requests:
    // (we'll also have some code in here for freeCodeCamp's test suite:)
app.listen(process.env.PORT, function () {
  // Our log to make sure we're "live":
  console.log("Listening on port " + process.env.PORT);
  
  // freeCodeCamp's test-suite logging. If we set the .env variable NODE_ENV to test, the FCC test-suite will run:
  if(process.env.NODE_ENV==='test') {
    console.log('Running Tests...');
    setTimeout(function () {
      try {
        runner.run();
      } catch(e) {
        const error = e;
          console.log('Tests are not valid:');
          console.log(error);
      }
    }, 1500);
  }
});


// For freeCodeCamp's test-suite...
module.exports = app;
// ... END
