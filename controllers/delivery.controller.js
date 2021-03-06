const Delivery = require('../models/delivery.model');
const User = require('../models/user.model');

const availableDelivery = async (req, res) => {
  try {
    let delivers = await Delivery.find().populate('deliveryId');

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
    // {{userId}}

    const user_id = req.user.user_id;
    let {
      pickup_location,
      dropoff_location,
      quintal_per_km,
      rate,
    } = req.body;

    let new_delivery = new Delivery({
      deliveryId: user_id,
      pickup_Location: pickup_location,
      dropoff_Location: dropoff_location,
      quintal_per_km,
      rate,
    });

    let data = await new_delivery.save();
    await User.findOneAndUpdate(
      { _id: user_id },
      {
        $push: {
          deliveryHistory: {
            delivery: data._id,
          },
        },
      },
      { new: true, useFindAndModify: false }
    );
    return res.status(201).json({
      message: 'delivery successfully saved',
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'unable to add delivery',
      success: false,
      error,
    });
  }
};

const edit_delivery_detail = async (req, res) => {
  try {
    const delivery_id = req.params.deliveryId;

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

const rateDelivery = async (req, res) => {
  try {
    const { rate, comment } = req.body;

    let UserDetail = req.user;

    let response = await Delivery.findOneAndUpdate(
      {
        deliveryId: UserDetail.deliveryId,
      },
      {
        rate,
        comment,
      },
      {
        new: true,
        useFindAndModify: false,
      }
    );

    res.status(201).json({
      success: true,
      message: 'Thank You for rating us.',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'sorry for the inconvinience',
      error: error,
    });
  }
};

module.exports = {
  availableDelivery,
  add_delivery,
  edit_delivery_detail,
  rateDelivery,
};
