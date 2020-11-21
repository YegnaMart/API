const Warehouse = require('../models/warehouse.model');

const getWarehouses = async (req, res) => {
  try {
    const warehouses = await Warehouse.find();
    return res.status(200).json({
      warehouses,
      success: true,
    });
  } catch (error) {
    return res.status(404).json({
      message: 'unable to find warehouses',
      success: false,
    });
  }
};

const addWarehouse = async (req, res) => {
  try {
    const {
      warehouse_code,
      placeName,
      location,
      region,
      storage_capacity,
    } = req.body;

    let newWarehouse = new Warehouse({
      warehouse_code,
      placeName,
      location,
      region,
      storage_capacity,
    });

    let data = await newWarehouse.save();

    return res.status(201).json({
      data,
      message: 'Warehouse SUccessfully Registered',
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'unable to add warehouse',
      success: false,
    });
  }
};

const editWarehouseDetail = async (req, res) => {
  const id = req.params.warehouse_id;
  try {
    const { warehouse_code, storage_capacity } = req.body;
    let warehouse = Warehouse.findOne(id);

    warehouse.warehouse_code = warehouse_code;
    warehouse.storage_capacity = storage_capacity;

    await warehouse.save();

    return res.status(201).json({
      message: 'warehouse details successfully updated',
      success: true,
    });
  } catch (error) {
    return res.status(404).json({
      message: `unable to find warehouse with id of ${id}`,
      success: false,
      error,
    });
  }
};

const deleteWarehouse = async (req, res) => {
  const id = req.params.warehouse_id;
  try {
    await Warehouse.findOneAndRemove(id);
    return res.status(200).json({
      message: 'warehouse successfully deleted',
      success: true,
    });
  } catch (error) {
    return res.status(404).json({
      message: `unable to find warehouse with id of ${id}`,
    });
  }
};

module.exports = {
  getWarehouses,
  addWarehouse,
  editWarehouseDetail,
  deleteWarehouse,
};
