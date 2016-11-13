var express = require('express');
var controller = express.Router();

// controller.get('/',function(res,res){
// 	res.render('./home',{
// 		title:'Home Page'
// 	});	
// });

var productController = require('./product.js');
controller.use('/',productController);

module.exports = controller;