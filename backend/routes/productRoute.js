const express = require("express");
const { routeCheck, getAllProducts, getProductDetails, createProduct, updateProduct ,deleteProduct} = require("../controllers/productController");
const {isAuthenticatedUser} = require("../middleware/auth");

const router = express.Router();

//Get request
router.route("/routeCheck").get(routeCheck);
router.route("/products").get(getAllProducts);
router.route("/product/:id").get(getProductDetails);

//Post request
router.route("/product/new").post(isAuthenticatedUser,createProduct);

//Put request
router.route("/product/:id").put(isAuthenticatedUser,updateProduct);

//Delete request
router.route("/product/:id").delete(isAuthenticatedUser,deleteProduct);

module.exports = router