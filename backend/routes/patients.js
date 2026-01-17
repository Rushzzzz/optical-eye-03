const express = require('express');
const router = express.Router();
const supabase = require('../db');

// Get all patients
router.get('/', async (req, res) => {
  const { data, error } = await supabase
    .from('patients')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// Create patient
router.post('/', async (req, res) => {
  const { full_name, phone, address, visit_date, right_eye_power, left_eye_power, notes } = req.body;
  
  const { data, error } = await supabase
    .from('patients')
    .insert([{ full_name, phone, address, visit_date, right_eye_power, left_eye_power, notes }])
    .select()
    .single();

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// Update patient
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  const { data, error } = await supabase
    .from('patients')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// Delete patient
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  
  const { error } = await supabase
    .from('patients')
    .delete()
    .eq('id', id);

  if (error) return res.status(500).json({ error: error.message });
  res.json({ message: 'Patient deleted' });
});

module.exports = router;
