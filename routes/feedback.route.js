const feedbackRoute = require('express').Router();
const {
  getFeedbacks,
  giveFeedback,
  editFeedback,
  deleteFeedback,
} = require('../controllers/feedback.controller');

feedbackRoute.get('/get_feedbacks', getFeedbacks);
feedbackRoute.post('/give_feedback/:userId', giveFeedback);
feedbackRoute.post('/edit_feedback/:feedbackId', editFeedback);
feedbackRoute.delete('/delete_feedback/:feedbackId', deleteFeedback);

module.exports = feedbackRoute;
