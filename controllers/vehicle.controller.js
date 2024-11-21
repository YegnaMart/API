let Vehicle = require('../models/vehicle.model');

const get_vehicles = async (req, res) => {
  try {
    let vehicles = await Vehicle.find().populate('deliveryId');
    return res.status(200).json({
      vehicles,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error,
    });
  }
};

const add_vehicle = async (req, res) => {
  try {
    let userId = req.params.userId;
    const { model, loadCapacity, plateNo, color } = req.body;

    let newVehicle = new Vehicle({
      userId,
      model,
      loadCapacity,
      plateNo,
      color,
    });
    let data = await newVehicle.save();
    return res.status(201).json({
      data,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      error,
      success: false,
    });
  }
};

const edit_vehicle_detail = async (req, res) => {
  try {
    let vehicle_id = req.params.vehicleId;
    let vehicle = await Vehicle.findOne(vehicle_id);

    const { userId, color } = req.body;
    vehicle.userId = userId;
    vehicle.color = color;

    await vehicle.save();
    return res.status(201).json({
      message: 'vehicle Information successfully updated.',
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'unable to edit your feedback',
      error,
    });
  }
};

const delete_vehicle = async (req, res) => {
  try {
    const id = req.params.vehicleId;
    let data = await Vehicle.findByIdAndRemove(id);
    return res.status(200).json({
      data,
      message: 'vehicle deleted successfully',
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'unable to delete feedback',
      error,
    });
  }
};

module.exports = {
  get_vehicles,
  add_vehicle,
  edit_vehicle_detail,
  delete_vehicle,
};
