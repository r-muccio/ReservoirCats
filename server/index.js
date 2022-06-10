"use strict";
const express = require("express");
const morgan = require("morgan");

const {
  getProducts,
  getProductById,
  updateStock,
  getCompanies,
  getCompany,
  postPurchases,
  getPurchases,
} = require("./handlers");

const PORT = 4000;

express()
  .use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Methods",
      "OPTIONS, HEAD, GET, PUT, POST, DELETE"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  })
  .use(morgan("tiny"))
  .use(express.static("./server/assets"))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use("/", express.static(__dirname + "/"))

  // REST endpoints here
  // ********************
  // returns all the product objects
  .get("/products", getProducts)
  // returns a product based on the id
  .get("/products/:_id", getProductById)
  // will update the stock of the product base on id
  .patch(`/products`, updateStock)
  // returns all the companies
  .get("/companies", getCompanies)
  // returns a company by company ID
  .get("/companies/:_id", getCompany)
  // will post purchases made to a Purchases collection
  .post("/purchases", postPurchases)
  // returns all the purchases made
  .get("/purchases", getPurchases)
  // catch all endpoint
  .get(`*`, (req, res) => {
    res.status(404).json({
      status: 404,
      message: "This is not the server you are looking for.",
    });
  })
  // .get("/bacon", (req, res) => res.status(200).json("🥓"))

  // ******************************
  .listen(PORT, () => console.info(`Listening on port ${PORT}`));
