const {
  createvendorProfile,
  getAllVendors,
  updateVendorProfile,
  getVendorProfile,
  getVendorByUsername,
} = require("../controllers/vendorprofileController.js");

const {
  createOrder,
  getVendorOrders,
  acceptOrder,
  getUserOrders,
  cancelOrder,
} = require("../controllers/orderController.js");

const {
  updateUserLocation,
  updateVendorLocation,
  getNearbyVendors,
} = require("../controllers/locationController");

const auth = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");
const express = require("express");
const router = express.Router();

router.get("/user/vendors", auth, authorize("user"), getAllVendors);

router.post("/user/create-order", auth, authorize("user"), createOrder);

router.get("/user/orders", auth, authorize("user"), getUserOrders);

router.patch("/user/orders/:id/cancel", auth, authorize("user"), cancelOrder);

router.post(
  "/vendor/create-profile",
  auth,
  authorize("vendor"),
  createvendorProfile,
);

router.get("/vendor/orders", auth, authorize("vendor"), getVendorOrders);

router.get("/vendor/profile", auth, authorize("vendor"), getVendorProfile);

router.patch(
  "/vendor/orders/:id/accept",
  auth,
  authorize("vendor"),
  acceptOrder,
);

router.get(
  "/user/vendor/:username",
  auth,
  authorize("user"),
  getVendorByUsername,
);

router.put(
  "/vendor/update-profile",
  auth,
  authorize("vendor"),
  updateVendorProfile,
);

router.put(
  "/user/location",

  auth,

  authorize("user"),

  updateUserLocation,
);

router.put(
  "/vendor/location",

  auth,

  authorize("vendor"),

  updateVendorLocation,
);

router.get(
  "/user/nearby-vendors",

  auth,

  authorize("user"),

  getNearbyVendors,
);

module.exports = router;
