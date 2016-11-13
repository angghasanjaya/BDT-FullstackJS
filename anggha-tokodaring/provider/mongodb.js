var MongoClient = require('mongodb').MongoClient //mongo module
	, assert = require('assert');

var url = 'mongodb://localhost:27017/tokoshop';



var mongo=function(err,callback){
	MongoClient.connect(url, function(err, db) {
	  	assert.equal(null, err);
		    callback(err,db);
		    db.close();	
	  	});
}

module.exports = mongo;