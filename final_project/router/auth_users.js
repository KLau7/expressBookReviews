const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.

}

//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here
  const {username, password} = req.body;
  const user = users.find(user => user.username === username);
  let accessToken;
  if (user && user.password === password) {
    accessToken = jwt.sign({
        data: user
    }, 'access', { expiresIn: 60 * 60 });

    req.session.authorization = {
        accessToken
    }
    
    req.user = user;
  }

  return res.status(200).json({message: "Success", data: accessToken});
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  const user = req.user;
  const isbn = req.params.isbn;
  const book = books[isbn];
  const {review} = req.body;
  book.reviews[user.username] = review;
  return res.status(200).json({message: "Success", data: book});
});

regd_users.delete("/auth/review/:isbn", (req, res) => {
  const user = req.user;
  const isbn = req.params.isbn;
  const book = books[isbn];
  if (user.username in book.reviews) {
      delete book.reviews[user.username]
  }

  return res.status(200).json({message: "Success"});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
