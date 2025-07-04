const express = require('express');
const cors = require('cors');
require('dotenv').config();

const bookingsRoute = require('./routes/bookings');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/bookings', bookingsRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);
