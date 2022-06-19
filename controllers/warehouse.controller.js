const Warehouse = require('../models/warehouse.model');

/**
 * It's an async function that uses the mongoose model to find all the warehouses in the database and
 * returns them in a json response
 * @param req - The request object.
 * @param res - The response object.
 * @returns An array of warehouses
 */
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

/**
 * It takes in a request and a response object, and returns a response object
 * @param req - The request object. This contains information about the HTTP request that raised the
 * event.
 * @param res - The response object.
 */
const addWarehouse = async (req, res) => {
  console.log("body request", req.body)
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

/**
 * It updates the warehouse details of a warehouse with a given id
 * @param req - This is the request object. It contains information about the HTTP request that raised
 * the event.
 * @param res - The response object.
 * @returns a response object with a status code of 201 and a json object with a message and success
 * property.
 */
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

/**
 * It deletes a warehouse from the database
 * @param req - The request object. This contains information about the HTTP request that raised the
 * event.
 * @param res - the response object
 * @returns a promise.
 */
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
