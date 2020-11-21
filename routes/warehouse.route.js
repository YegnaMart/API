const warehouseRouter = require('express').Router();
const {
  getWarehouses,
  addWarehouse,
  editWarehouseDetail,
  deleteWarehouse,
} = require('../controllers/warehouse.controller');

warehouseRouter.get('/getWarehouses', getWarehouses);
warehouseRouter.post('/addWarehouse', addWarehouse);
warehouseRouter.post('/editWarehouseDetail/:warehouse_id', editWarehouseDetail);
warehouseRouter.delete('/deleteWareHouse/:warehouse_id', deleteWarehouse);

module.exports = warehouseRouter;
