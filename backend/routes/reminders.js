const express = require('express');
const router = express.Router();
const supabase = require('../db');

// Get all reminders
router.get('/', async (req, res) => {
  const { data, error } = await supabase
    .from('reminders')
    .select('*')
    .order('date', { ascending: true });

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// Create reminder
router.post('/', async (req, res) => {
  const reminder = req.body;
  
  const { data, error } = await supabase
    .from('reminders')
    .insert([reminder])
    .select()
    .single();

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// Complete reminder
router.put('/:id/complete', async (req, res) => {
  const { id } = req.params;
  
  const { data, error } = await supabase
    .from('reminders')
    .update({ status: 'completed' })
    .eq('id', id)
    .select()
    .single();

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// Delete reminder
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  
  const { error } = await supabase
    .from('reminders')
    .delete()
    .eq('id', id);

  if (error) return res.status(500).json({ error: error.message });
  res.json({ message: 'Reminder deleted' });
});

module.exports = router;
