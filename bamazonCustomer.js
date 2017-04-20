var mysql = require("mysql");
 
var connection = mysql.createConnection({
 host: "localhost",
 port: 3306,
 
 user: "root",
 
 password: "mrhanky101",
 database: "bamazon"
});
 
connection.connect(function(err) {
 if (err) throw err;
 console.log("connected as id " + connection.threadId);
});

connection.query('SELECT * FROM products', function(err, res){
	if(err) throw err;
	for (var ida=0; ida<res.length; ida++) {
		console.log("ID: " + res[ida].item_id + " PRODUCT NAME: " + res[ida].product_name + " PRICE: $" + res[ida].price);
	}
	//console.log(res);
});