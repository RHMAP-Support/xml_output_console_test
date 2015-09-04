var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

function helloRoute() {
  var hello = new express.Router();
  hello.use(cors());
  hello.use(bodyParser());


  // GET REST endpoint - query params may or may not be populated
  hello.get('/', function(req, res) {
    console.log(new Date(), 'In hello route GET / req.query=', req.query);

    var xmltest = '<?xml version="1.0" encoding="UTF-8" ?>'+
                          '<StatusUpdate xmlns="http://www.antennasoftware.com/TKSmart/" xmlns:tns="http://www.antennasoftware.com/TKSmart/" xmlns:xsd="http://www.w3.org/2001/XMLSchema">'+
                              '<tns:employeeId>EMPLOYEE_ID</tns:employeeId>'+
                              '<tns:deviceID/>'+
                              '<tns:appID>APP_ID</tns:appID>'+
                              '<tns:source>SOURCE</tns:source>'+
                              '<tns:Status>'+
                                  '<tns:ticketID>TICKET_ID</tns:ticketID>'+
                                  '<tns:status>delivered</tns:status>'+
                                  '<tns:ticketType>TICKET_TYPE</tns:ticketType>'+
                                  '<tns:actualStartTime/>'+
                                  '<tns:actualEndTime/>'+
                                  '<tns:actualDuration/>'+
                                  '<tns:incompleteCode/>'+
                              '</tns:Status>'+
                          '</StatusUpdate>'

    var world = req.query && req.query.hello ? req.query.hello : 'World';

    // see http://expressjs.com/4x/api.html#res.json
    console.log(xmltest);
    res.json(xmltest + ' has been sent to the console log');
  });

  // POST REST endpoint - note we use 'body-parser' middleware above to parse the request body in this route.
  // This can also be added in application.js
  // See: https://github.com/senchalabs/connect#middleware for a list of Express 4 middleware
  hello.post('/', function(req, res) {
    console.log(new Date(), 'In hello route POST / req.body=', req.body);
    var world = req.body && req.body.hello ? req.body.hello : 'World';

    // see http://expressjs.com/4x/api.html#res.json
    res.json({msg: 'Hello ' + world});
  });

  return hello;
}

module.exports = helloRoute;
