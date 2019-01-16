var express = require('express');
var router = express.Router();
var request = require('request');
var btoa = require('btoa');
var axios = require('axios');
var querystring = require('querystring');


/* GET home page.*/
router.get('/', function(req, res, next) {
  res.render('todel', { title: 'MAPPINGS' });
});

/* GET MAPPINGS FORM (index)*/
router.get('/index.ejs', function(req, res, next) {
  res.render('index', { title: 'GET' });
});

/* POST MAPPINGS FORM (index2)*/
router.get('/index2.ejs', function(req, res, next) {
  res.render('index2', { title: 'POST' });
});

/* HOME PAGE */
router.get('/todel.ejs', function(req, res, next) {
  res.render('todel', { title: 'HOME' });
});

/* FOR POST REQUEST */
router.get('/api', (req, res)=>{

  var data = {
    "domain": "mydomain.com",
    "jabberAddress": req.query.xmpp,
    "externalAddress": req.query.number
    }
  var url = 'https://cloud.restcomm.com/xmpp/xmppMappings';
  var username = req.query.name;
  var password = req.query.password;

  request.post( {
    url : url,
    body : data,
    json : true,
    method : 'POST',
    headers: {
      "Authorization": "Basic " + btoa(username + ":" + password),
      "content-type": "application/json",
    }

  } , (err , doc,body)=>{

    if ( err ){
      res.send( err )
    }else{
      res.send(doc)
    }
  } )

} )


/* FOR GET REQUEST */
router.get('/api/get' , (req, res)=>{

//console.log(req.body.name);
  var username = req.query.name;
  var password = req.query.password;
  
  var url = 'https://cloud.restcomm.com/xmpp/xmppMappings';

  request.get( {
    url : url,
    method : 'GET',
    headers: {
      'Content-Type': 'application/json',
      "Authorization": "Basic " + btoa(username + ":" + password)
    }

  } , (err , doc)=>{

    if ( err ){
      res.send( err )
    }
      else{
        
         var body = doc.body;
          console.log(body)
        var data = [];
        for (a in body){
         val =body[a];
          var temp={
            id : val.id,
            jabberAddress : val.jabberAddress  
          }
            data.push(temp)      
        } 
     //res.send(body)
        res.send({data : data}) 
    }
console.log("Basic " + btoa(username + ":" + password));

  } )
})

module.exports = router;



/*
$.ajax({
    type:"POST",
    url: proxy + url,
    dataType: 'json',
  headers: {
    "Authorization": "Basic " + btoa(username + ":" + password)
  },
    data:{
    
    "jabberAddress": "sunnyd@xmpp.xyz",
    "externalAddress": "12017780615"

    
    },
    success: function(json) {
        alert("Success", json);
    },
    error: function(XMLHttpRequest, textStatus, errorThrown) {
       alert(textStatus, errorThrown);
    }
*/



/* 
"domain": "mydomain.com",
"jabberAddress": "sunnyd@xmpp.xyz",
"externalAddress": "12017780615"
}
var url = 'https://cloud.restcomm.com/xmpp/xmppMappings';
var username = "AC23f1b11bbb99a46436c365cb7bec246e";
var password = "eef96b9afe3b9ebcbf051d8adf715943"; */










