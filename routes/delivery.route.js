const deliveryRouter = require('express').Router();
const {
  add_delivery,
  availableDelivery,
  edit_delivery_detail,
} = require('../controllers/delivery.controller');

deliveryRouter.get('/availableDelivery', availableDelivery);
deliveryRouter.post('/addDelivery', add_delivery);
deliveryRouter.post('/editDeliveryDetail/:deliveryId', edit_delivery_detail);
// warehouseRouter.delete('/deleteDelivery/:deliveryId', deleteWarehouse);

module.exports = deliveryRouter;
