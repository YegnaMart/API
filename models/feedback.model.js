const { Schema, model, SchemaTypes } = require('mongoose');

const feedbackShema = new Schema({
  user: {
    type: SchemaTypes.ObjectId,
    ref: 'User',
  },
  title: {
    type: 'String',
    required: true,
  },
  description: {
    type: 'String',
    required: true,
    min: [50, 'description should contain at least 50 characters'],
  },
});

module.exports = model('feedback', feedbackShema);
