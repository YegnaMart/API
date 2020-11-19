const Delivery = require('../models/delivery.model');

const availableDelivery = async (req, res) => {
  try {
    let delivers = await Delivery.find().populate(
      'deliveryId pickup_Location dropoff_Location'
    );

    return res.status(200).json({
      delivers,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'unable to find available delivers',
      success: false,
      error,
    });
  }
};

const add_delivery = async (req, res) => {
  try {
    const delivery_id = req.params.delivery_id;

    let { pickup_location, dropoff_location, quintal_per_km } = req.body;

    let new_delivery = new Delivery({
      delivery_id,
      pickup_location,
      dropoff_location,
      quintal_per_km,
    });

    await new_delivery.save();
    return res.status(201).json({
      message: 'delivery successfully saved',
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'unable to add delivery',
      success: false,
      error,
    });
  }
};

const edit_delivery_detail = async (req, res) => {
  try {
    const delivery_id = req.params.delivery_id;

    let { pickup_location, dropoff_location, quintal_per_km } = req.body;

    let delivery = await Delivery.findOne(delivery_id);

    // update old data with the new one
    delivery.pickup_Location = pickup_location;
    delivery.dropoff_Location = dropoff_location;
    delivery.quintal_per_km = quintal_per_km;

    await delivery.save();

    return res.status(201).json({
      message: 'delivery successfully updated',
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'unable to update delivery detail',
      success: false,
      error,
    });
  }
};

module.exports = {
  availableDelivery,
  add_delivery,
  edit_delivery_detail,
};
