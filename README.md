# HW - Bamazon

## Requirements
- Create a MySQL Database called Bamazon.

![Alt text](/BamazonSS/0.png?raw=true "database")

- run bamazonCustomer.js  and show ids, names, and prices of all products available

![Alt text](/BamazonSS/1.png?raw=true "customer view")

- prompt the id of the product you would like to buy

![Alt text](/BamazonSS/2.png?raw=true "id prompt")

- prompt the quantity you would like to buy

![Alt text](/BamazonSS/3.png?raw=true "quantity prompt")

- if there is not enough of an item log insufficient quantity

![Alt text](/BamazonSS/4.png?raw=true "insufficient")

- if a transaction goes through upadate the database to reflect this and show the cost

![Alt text](/BamazonSS/5.png?raw=true "customer purchase")

- Create a new Node application called bamazonManager.js

- initial menu with four options 

![Alt text](/BamazonSS/6.png?raw=true "bamazonManager js start")

- view products for sale

![Alt text](/BamazonSS/7.png?raw=true "products")

- view low inventory (under 5 units)

![Alt text](/BamazonSS/8.png?raw=true "no low inventory")

![Alt text](/BamazonSS/9.png?raw=true "low inventory")

- add new products

![Alt text](/BamazonSS/10.png?raw=true "add new products")

## Technologies Used

- Javascript

- Node

- MySQL

## Code Explaination

- takes user input from inquirer node module to get data from a sql database

- makes changes to the database based on user input