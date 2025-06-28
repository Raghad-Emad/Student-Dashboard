const mongoose = require('mongoose');

const QuizSchema = new mongoose.Schema({
  name: { type: String, required: true },
  totalQuestions: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Quiz', QuizSchema);
