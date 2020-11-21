const deliveryRouter = require('express').Router();
const {
  add_delivery,
  availableDelivery,
  edit_delivery_detail,
} = require('../controllers/delivery.controller');

warehouseRouter.get('/availableDelivery', availableDelivery);
warehouseRouter.post('/addDelivery', add_delivery);
warehouseRouter.post('/editDeliveryDetail/:deliveryId', edit_delivery_detail);
// warehouseRouter.delete('/deleteDelivery/:deliveryId', deleteWarehouse);

module.exports = deliveryRouter;
