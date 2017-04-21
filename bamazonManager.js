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
 //console.log("\nconnected as id " + connection.threadId);
});
start();
function start () {
	console.log("MENU:");
	console.log("view products for sale");
	console.log("view low inventory");
	console.log("add to inventory");
	console.log("add new product");
	inquirer.prompt([
		{
			name: "action",
			message: "What menu option would you like to perform? (type the complete option)",
		}

		]).then(function(answers) {
				if (answers.action=="view products for sale") {
					connection.query('SELECT * FROM products', function(err, res){
					if(err) throw err;
						for (var ida=0; ida<res.length; ida++) {
							console.log("ID: " + res[ida].item_id + "\n PRODUCT NAME: " + res[ida].product_name + "\n PRICE: $" + res[ida].price + "\n QUANTITY: " + res[ida].stock_quantity);
						}
						connection.end();

					});
			}
			else if (answers.action=="view low inventory") {
				connection.query('SELECT * FROM products WHERE stock_quantity < 5', function(err, res){
					if(err) throw err;
					if(res.length<1) {
						console.log("no low inventory!");
					}
						for (var ida=0; ida<res.length; ida++) {
							console.log("ID: " + res[ida].item_id + "\n PRODUCT NAME: " + res[ida].product_name + "\n PRICE: $" + res[ida].price + "\n QUANTITY: " + res[ida].stock_quantity);
						}
						connection.end();

					});

			}
			else if (answers.action=="add to inventory") {
				var addUnits=0;
				inquirer.prompt([
					{
						name: "itemID",
						message: "What is the id of the item you would like to add inventory to?"
					},
					{
						name: "quantity",
						message: "How many units of inventory would you like to add?"

					}	
						]).then(function(answers) {

							var read = 'SELECT * FROM products WHERE ?'
							connection.query(read, {item_id: answers.itemID}, function(err, res) {
								var existing=res[0].stock_quantity;
								addUnits=parseInt(existing)+parseInt(answers.quantity);
						
								var query = 'UPDATE products SET ? WHERE ?'
								connection.query(query, [{stock_quantity: addUnits}, {item_id: answers.itemID}], function(err, res){
									console.log(answers.quantity + " units added!");
									connection.end();
								});
							});
							
						});
				

			}
			else if(answers.action=="add new product") {
				inquirer.prompt(
					[{
						name: "name",
						message: "What is the name of the product you would like to add?"
					},
					{
						name: "dep",
						message: "What is the name of the department for this product?"
					},
					{
						name: "price",
						message: "What is the price of this product?",
						validate: function(value) {
					      if (isNaN(value) === false) {
					        return true;
					      }
					      return false;
					    }

					},
					{
						name: "units",
						message: "How many units of this product would you like to add?",
						validate: function(value) {
					      if (isNaN(value) === false) {
					        return true;
					      }
					      return false;
					    }
					}]
				).then(function(answers){
					connection.query('INSERT INTO products SET ?', {
						product_name: answers.name,
						department_name: answers.dep,
						price: answers.price,
						stock_quantity: answers.units
					}, function(err, res){
						console.log("New product added!");
						connection.end();

					});

				});

			}
			else {
				console.log("command not recognized.")
				start();
			}
		});

}