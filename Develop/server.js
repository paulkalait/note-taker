const express = require('express');
const path = require('path');
const fs = require('fs');

const PORT = 3001;

const app = express();

//parses incoming data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//a middleware that drills in and allows access for style sheet and htmls
app.use(express.static('public'));