//file system
const fs = require("fs");
const jsonData = fs.readFileSync("data.json", "utf-8");
const data = JSON.parse(jsonData);
const Api_Key = "123456789";

exports.deliveriesList = (req, res) => {
  res.json(data);
  console.log("object");
};

exports.deliveriesUpdate = (req, res) => {
  if (req.header("x-Api-Key") === Api_Key) {
    const foundDelivery = data.find(
      (delivery) => delivery.id === req.params.deliveryId
    );

    if (foundDelivery) {
      const updatedDelivery = { ...foundDelivery, status: req.body.status };

      const updatedDeliveries = data.map((delivery) =>
        delivery.id === updatedDelivery.id ? updatedDelivery : delivery
      );

      fs.writeFileSync("data.json", JSON.stringify(updatedDeliveries, null, 2));

      res.json(updatedDelivery);
    } else {
      res.status(404).json({ message: "Path Not Found" });
    }
  } else {
    res.status(401).json({ message: "You Not Allowed" });
  }
};
