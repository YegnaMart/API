const deliveryRouter = require('express').Router();
const {
  add_delivery,
  availableDelivery,
  edit_delivery_detail,
  rateDelivery,
} = require('../controllers/delivery.controller');

const { checkAuth } = require('../middleware/check-auth');

deliveryRouter.get('/available_delivery', availableDelivery);
deliveryRouter.post('/add_delivery', add_delivery);
deliveryRouter.patch('/rate_delivery', rateDelivery);
deliveryRouter.post('/edit_delivery/:deliveryId', edit_delivery_detail);
// warehouseRouter.delete('/deleteDelivery/:deliveryId', deleteWarehouse);

module.exports = deliveryRouter;
