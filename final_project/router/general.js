const express = require('express');
const axios = require('axios');

let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  const {username, password} = req.body;
  users.push({
      username,
      password
  })
  return res.status(201).json({message: "Created"});
});

// Get the book list available in the shop
public_users.get('/', async (req, res) => {
  return res.status(200).json({data: books});
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  return res.status(200).json({data: books[isbn]});
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  const author = req.params.author;
  const filtered_books = {}
  Object.entries(books).forEach(([isbn, details]) => {
      if (details.author === author) {
          filtered_books[isbn] = details;
      } 
  })
  return res.status(200).json({data: filtered_books});
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  const title = req.params.title;
  const filtered_books = {}
  Object.entries(books).forEach(([isbn, details]) => {
      if (details.title === title) {
          filtered_books[isbn] = details;
      } 
  })
  return res.status(200).json({data: filtered_books});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  return res.status(200).json({data: books[req.params.isbn].reviews});
});

module.exports.general = public_users;
