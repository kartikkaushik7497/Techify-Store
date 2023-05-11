const express = require("express");
const {
  newOrder,
  getSingleOrder,
  myOrders,
  getAllOrders,
  updateOrder,
  deleteOrder,
} = require("../controllers/orderController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

//Post request
router.route("/order/new").post(isAuthenticatedUser, newOrder);

//Get orders 
router.route("/order/:id").get(isAuthenticatedUser, getSingleOrder);

//Logged in User orders
router.route("/orders/me").get(isAuthenticatedUser, myOrders);

//Get all orders --Admin
router.route("/admin/orders").get(isAuthenticatedUser,authorizeRoles("admin"), getAllOrders);

//Update Order Status --Admin
router.route("/admin/order/:id").put(isAuthenticatedUser,authorizeRoles("admin"), updateOrder);

//Delete Order --Admin
router.route("/admin/order/:id").delete(isAuthenticatedUser,authorizeRoles("admin"), deleteOrder);

module.exports = router;
