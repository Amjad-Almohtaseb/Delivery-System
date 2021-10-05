const express = require("express");

//Mini Express App
const router = express.Router();
const {
  deliveriesList,
  deliveriesUpdate,
} = require("../controllers/deliveriesControllers");

// Deliveries LIST ROUTE
router.get("/", deliveriesList);

// Deliveries UPDATE ROUTE
router.put("/:deliveryId", deliveriesUpdate);

module.exports = router;
