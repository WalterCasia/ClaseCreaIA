const express = require('express');
const path = require('path')
const app = express();
const PORT = 3080;

app.use(express.static(path.join(__dirname, ' public')));

app.use(express.urlencoded({extended: true}))