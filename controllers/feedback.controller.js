const Feedback = require('../models/feedback.model');

/**
 *
 * @ get user feedbacks
 */
const getFeedbacks = async (req, res) => {
  try {
    let feedbacks = await Feedback.find().populate('userId');
    return res.status(200).json({
      feedbacks,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      error,
      success: false,
    });
  }
};
/**
 *
 * @ give feedback which is given by either ordinary user or admins
 */
const giveFeedback = async (req, res) => {
  try {
    let userid = req.params.userId;
    const { title, description } = req.body;
    let feedback = new Feedback({
      user: userid,
      title,
      description,
    });
    await feedback.save();
    return res.status(201).json({
      message: 'feedback sent.',
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'unable to send feedback',
      error,
    });
  }
};
/**
 *
 * @ edit user's feedback in case they make some glitches
 */
const editFeedback = async (req, res) => {
  try {
    // get feedback identification
    const id = req.params.feedbackId;

    //   give the new feeback title and description
    let { title, description } = req.body;

    let updateFeedback = Feedback.findOne(id);

    // update the the old feedback with the new one
    updateFeedback.title = title;

    updateFeedback.description = description;

    await updateFeedback.save();

    return res.status(201).json({
      message: 'feedback successfully updated',
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'unable to edit your feedback',
      error,
    });
  }
};

const deleteFeedback = async (req, res) => {
  try {
    const id = req.params.feedbackId;
    let data = await Feedback.findByIdAndRemove(id);
    return res.status(200).json({
      data,
      message: 'feedback deleted successfully',
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
  getFeedbacks,
  giveFeedback,
  editFeedback,
  deleteFeedback,
};
