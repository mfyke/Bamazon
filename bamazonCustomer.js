var mysql = require("mysql");
var inquirer = require("inquirer");
 
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

	buyProduct();
});

function buyProduct () {
	inquirer.prompt([
		{
			name: "productID",
			message: "What is the ID of the product you would like to buy?",
			validate: function(value) {
    			if (isNaN(value) === false && parseInt(value) > 0) {
        			return true;
    			}
    				return false;
				}
		},
		{
			name: "units",
			message: "How many units of the product would you like to buy?",
			validate: function(value) {
    			if (isNaN(value) === false && parseInt(value) > 0) {
        			return true;
    			}
    				return false;
				}
		}

		]).then(function(answers) {
			var query = 'SELECT * FROM products WHERE ?'; 
			connection.query(query, {item_id: answers.productID}, function (err, res) {
				if(answers.units>res[0].stock_quantity) {
					console.log("Insufficient quantity!");
					connection.end();
				}
				else {
					console.log("Order placed! The total cost is " + answers.units*res[0].price);
					var quantity = (res[0].stock_quantity-answers.units);
					var update = 'UPDATE products SET ? WHERE ?'
					connection.query(update, [{stock_quantity: quantity}, {item_id: answers.productID}], function (err, res) {
							connection.end();

					});

				}
				
			});
			
		});


}

