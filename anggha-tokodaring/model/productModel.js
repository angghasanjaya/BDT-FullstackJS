var express = require('express');
var mongo = require('../provider/mongodb.js'); //database connection & initialization

var getAll = function(param,callback){
	mongo(param,function(err,db){
	  	var _productList = db.collection("products");
	  	_productList.find(param).toArray( function(err,data){
		    db.close();	
		    callback(err,data); // dipecah biar ga callback hell 
	  	});
	});
}

module.exports = {
	getAll:getAll
}