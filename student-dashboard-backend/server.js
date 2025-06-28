const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());


app.use('/announcements', require('./routes/announcements_routes'));
app.use('/quizzes', require('./routes/quizzes_routes'));
app.use('/students', require('./routes/student_routes'));

connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
