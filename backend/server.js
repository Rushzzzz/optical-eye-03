const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require('./routes/auth');
const patientRoutes = require('./routes/patients');
const invoiceRoutes = require('./routes/invoices');
const reminderRoutes = require('./routes/reminders');

app.use('/api/auth', authRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/invoices', invoiceRoutes);
app.use('/api/reminders', reminderRoutes);

// Health Check
app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'Optical Eye Clinic API is running' });
});

// Start Server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
