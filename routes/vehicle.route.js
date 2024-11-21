const vehiceleRouter = require('express').Router();

const {
  get_vehicles,
  add_vehicle,
  edit_vehicle_detail,
  delete_vehicle,
} = require('../controllers/vehicle.controller');

vehiceleRouter.get('/getVehicles', get_vehicles);
vehiceleRouter.post('/addVehicles/:userId', add_vehicle);
vehiceleRouter.post('/editVehicleDetail/:vehicleId', edit_vehicle_detail);
vehiceleRouter.delete('/deleteVehicle/:vehicleId', delete_vehicle);

module.exports = vehiceleRouter;
