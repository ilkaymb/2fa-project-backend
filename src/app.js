const express = require("express");
const jwt = require("jsonwebtoken");
const speakeasy = require("speakeasy");
const QRCode = require("qrcode");

const app = express();
app.use(express.json());

const users = {}; // Basitlik adına kullanıcıları saklamak için bir obje
const secretKey = "supersecretkey"; // JWT için gizli anahtar

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
