/* 
start, ask users if they want to bid on or post an item
post item ask user complete item fields (name, startingbid), 
postdb values,
, 
bid, 
updatebid, 
checkbid,*/


const mysql = require('mysql');
const inquirer = require ('inquirer');

const connection = mysql.createConnection({
  host: 'localhost',

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: 'root',

  // Be sure to update with your own MySQL password!
  password: process.env.PASSWORD,
  database: 'great_bayDB',
});

const start = () => {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'prompt',
        message: 'What would you like to post or bid?',
        choices: ['Post', 'Bid']
      }
    ])
    .then((answers) => {
      if (answers.prompt === 'Post') {
        postItem(answers);
      }
      else {
        displayProducts();
      }
    });
  };

  connection.connect((err) => {
    if (err) throw err;
    start();
  });


const displayProducts = () => {
    console.log('Selecting all products...\n');
    connection.query('SELECT * FROM products', (err, res) => {
      if (err) throw err;
      // Log all results of the SELECT statement
      console.log(res);
      connection.end();
    });
  };

const postItem = (answers) => {
  inquirer
  .prompt([
    {
      type: 'input',
      name: 'item',
      message: 'What is the name of this item?',
    },
    {
      type: 'input',
      name: 'startingBid',
      message: 'How much would you like for the starting bid?',
    }
  ])
  .then((answers) => {
    console.log('Inserting a new product...\n');

    const query = connection.query(
      'INSERT INTO products SET ?',
      {
        item: `${answers.item}`,
        starting_bid: `${answers.startingBid}`,
        // highest_bid: `${answers.highestBid}`,
      },
      (err, res) => {
        if (err) throw err;
        console.log(`${res.affectedRows} product inserted!\n`);
        // Call updateProduct AFTER the INSERT completes
        displayProducts();
      }
    )
  })
};
