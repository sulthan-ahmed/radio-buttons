'use strict';

const express = require('express');
const app = express();
// mustache govuk template
const govukTemplate = require('hof-govuk-template');
// hogan renderer engine, this is better than hogan express because it throws an error when you've done your mustache wrong
const hoganExpressStrict = require('hogan-express-strict');
// Allows the use of partials
const expressPartialTemplates = require('express-partial-templates');
const path = require('path');

const config = require('./config')
const port = config.port;

// POST request: post request pass in a body. Gets do not usually. This adds the body to the
// req object
var bodyParser = require('body-parser'); 
// parse html forms
app.use(bodyParser.urlencoded({ extended: true })); 

// setup for front end toolkit
govukTemplate.setup(app);

// this recognises html files
app.set('view engine', 'html');

//setting where my views are, you can have arrays
app.set('views', [path.resolve(__dirname, 'views')]);

// using the hoganExpress engine
app.engine('html', hoganExpressStrict);
// need to call this after the others
app.use(expressPartialTemplates(app));

// serving static files
app.use('/public', express.static(path.resolve(__dirname, 'public')));

app.get('/', function(req, res){
    res.render('get-example')
});

app.get('/post-example', function(req, res){
  res.render('post-example')
});

app.get('/post', (req, res) => {
  res.redirect('/post-example')
});

app.get('/england', function(req, res){

  console.log('req', req.query)
  if (req.query.location==="scotland") {
    res.render('scotland')
  } else {
    res.render('england')
  }
});

app.post('/tree-hug', function(req, res){
  if (req.body['tree-hugger'] === 'yes') {
    res.render('tree-hugger-yes')
  } else {
    res.render('tree-hugger-no')
  } 
});

// Set server port
app.listen(port, function() {
  console.log(`App listening on port ${port}!`)
});
