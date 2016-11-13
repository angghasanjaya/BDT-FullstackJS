class Product {
	constructor(sku,name,price,categories) {
	
	  	this.sku=this.sku || "SKU Produk";
		this.name=this.name || "Nama Produk";
		this.price=this.price || 0;
		this.categories=[];
	}
	

};

class Book extends Product {

	constructor(sku,name,price,categories,isbn,author) {
		super(sku,name,price,categories);
	  	this.isbn=this.isbn || "ISBN buku";
	  	this.author=this.author || "Penulis";

	}

}

class Fashion extends Product {
	constructor(color,size) {
		super(color,size);
		this.color=this.color || "#fff";
		this.size=this.size || "S";
	}
	getPromoPrice(){
		var d = new Date();
		var n = d.getDay();
		var promo=this.price; 
		if(n==6){ // jika hari sabtu
			promo=this.price*20/100;
		}else{
			promo=this.price;
		}
		return ;
	}
}





class OrderLineItem {
	constructor(product,totalItem) {
		this.product = this.product || {};
		this.totalItem = this.totalItem || 0;
	}
};

class ProductManagerBase{

	constructor(products){
		this.products = [];
	}	

	addProduct(item){
		this.products.push(item);
		return;
	}

	getAllProducts(){
		console.log(this.products);
		return this.products;
	}
	
	getProduct(sku){
		return this.products.find((item)=>{
			if(item.sku==sku){
				return item;
			}
		});
		
	}

	removeProduct(sku){
		var idx=this.products.findIndex(ele => ele.sku==sku);
		//return;
		if(idx>-1){
			this.products.splice(idx,1);	
			console.log("Product's been removed \n ".this.products);
		}else{
			console.log("Sku : '"+sku+"'' not found");
		}	
		return;
	}
	updateProduct(sku){ 
		return;
	}
};

class bookManager extends ProductManagerBase{};
class fashionManager extends ProductManagerBase{};


class Cart{
	constructor(orderLineItems) {
	
	  this.orderLineItems = this.orderLineItems || [];
	}
	
	addOrder(item){
		this.orderLineItems.push(item);
		console.log("Order line's been added");
		console.log(this.orderLineItems);
	}

	removeOrder(sku){

		var idx=this.orderLineItems.findIndex(ele => ele.product.sku==sku);
		if(idx>-1){
			this.orderLineItems.splice(idx,1);	
			console.log("Order line's been removed \n"+this.orderLineItems);
		}else{
			console.log("Sku : '"+sku+"'' not found");
		}	
	}
	checkout(){
		return;
	}	
	totalPrice(){
		let total=0;
		console.log("Your item(s)");
		this.orderLineItems.forEach((item)=>{
			total+=item.product.price*item.totalItem;
			console.log(`SKU : ${item.product.sku} | Name : ${item.product.name} | \
ISBN : ${item.product.isbn} | Qty : ${item.totalItem} | \
Price :  ${item.product.price} | Subtotal : ${item.product.price*item.totalItem}`);
		});

		if(this.orderLineItems.length<1){
			console.log(`No items on your cart`);
		}else{
			console.log(`Total : ${total}`);
		}

	}

}



/// testing ......


var myBook = new Book();
myBook.price=60000;
myBook.name="Buku mewarnai gambar dewasa";
myBook.sku="0001";

var myBook2 = new Book();
myBook2.price=80000;
myBook2.name="Lean Startup";
myBook2.sku="0002";

var order=new OrderLineItem(); // order
order.product=myBook;
order.totalItem=2;
var order2=new OrderLineItem(); // order
order2.product=myBook2;
order2.totalItem=2;

var myCart=new Cart(); 
myCart.addOrder(order); //masuk cart
myCart.addOrder(order2);

var bookData=new bookManager();
bookData.addProduct(myBook);
bookData.addProduct(myBook2);

