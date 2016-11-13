var express = require('express');
var app = express();
var exphbs = require('express-handlebars');
var _ = require('lodash-addons');
var numeral = require('numeral');

//numeral localization
numeral.language('id', {
    delimiters: {
        thousands: '.',
        decimal: ','
    },
    abbreviations: {
        thousand: 'k',
        million: 'm',
        billion: 'b',
        trillion: 't'
    },
    currency: {
        symbol: 'Rp'
    }
});

// switch between languages
numeral.language('id');




//setup template engine

app.engine('.hbs',exphbs({ 
	extname : '.hbs', // template extension
	defaultLayout : 'main', //default layout
	helpers : {
		shortener:function(text){
			if(text.length>=20){
				return text.substring(0,20)+"..."
			}
			return text;
		},
		slugify : function(text){
			text.replace("/", "-");
			return _.slugify(text);
		},
		currency : function(text){
			return numeral(text).format('$ 0,0[.]00');
		}
	}
}));



app.set('view engine', '.hbs');


app.use(express.static('public')); //serving static file

var controller = require('./controllers/index.js');
app.use('/',controller);


// var productsRouter = require('./controllers/product/product.js');
// app.use('/product',productsRouter);

app.listen(3000,function(){
	console.log('Your app is running');
});