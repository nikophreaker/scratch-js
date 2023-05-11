// const path = require('path');
// const express = require('express');
// const PORT = process.env.PORT || 8080;

// const app = express();
// const DIST_DIR = path.join(__dirname, "/");
// const HTML_FILE = path.join(DIST_DIR, "index.html");

// app.use(express.static(DIST_DIR));
// app.engine('html', require('ejs').renderFile);
// app.get('*', (req, res) => {
//     // res.sendFile(HTML_FILE);
//     res.render(HTML_FILE, {
//         token: req.query.token
//     })
// });

// app.listen(PORT, () => {
//     console.log(`App Listening to ${PORT}....`)
// })



import path from "path";
import express from "express";
import { fileURLToPath } from "url";
import ejs from "ejs";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const DIST_DIR = path.join(__dirname, "/");
const HTML_FILE = path.join(DIST_DIR, "index.html");

app.use(express.static(DIST_DIR));
app.engine("html", ejs.renderFile);
app.get("*", (req, res) => {
  // res.sendFile(HTML_FILE);
  res.render(HTML_FILE, {
    token: req.query.token,
  });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`App Listening to ${PORT}....`);
});