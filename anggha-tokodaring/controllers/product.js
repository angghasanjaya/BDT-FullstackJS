var express = require('express');
var products = express.Router();
var productModel = require('../model/productModel.js');
var _ = require('lodash-addons');

products.get('/',function(req,res){
	var param = {};
	var search = req.query.search || '';
	var sort = req.query.sort || '';
	var order = req.query.order || '';
	
	
	param = (search==''?{}:{name:{$regex:".*" + search + "*.",$options:'i'}});

	productModel.getAll(param,function(err,data){
		data=_.orderBy(data,[sort],[order]);
		res.render('./product/product',{
				title:'Product Page',
				products:data,
				search:search || '',
				baseUrl:req.baseUrl
			});	

	})
});

products.get('/detail/:sku/:name',function(req,res){
	productModel.getAll({'sku':req.params.sku},function(err,data){
		res.render('./product/detail',{
				products:data[0],
				baseUrl:req.baseUrl
			});	
	})
});


module.exports = products;

