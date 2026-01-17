const express = require('express');
const router = express.Router();
const supabase = require('../db');

// Get all invoices
router.get('/', async (req, res) => {
  const { data, error } = await supabase
    .from('invoices')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// Create invoice
router.post('/', async (req, res) => {
  const invoice = req.body;
  
  const { data, error } = await supabase
    .from('invoices')
    .insert([invoice])
    .select()
    .single();

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// Delete invoice
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  
  const { error } = await supabase
    .from('invoices')
    .delete()
    .eq('id', id);

  if (error) return res.status(500).json({ error: error.message });
  res.json({ message: 'Invoice deleted' });
});

module.exports = router;
